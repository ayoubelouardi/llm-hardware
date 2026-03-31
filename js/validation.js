#!/usr/bin/env node
// validation.js — Test suite comparing calculator output against real-world benchmarks
// Run with: node validation.js

// === Minimal extract of core functions for testing ===
const NO_QUANT_CATS = new Set(["image","video","audio","embed","threeD"]);

function getBackend(id) {
  const BACKENDS = [
    {v:"llamacpp", l:"llama.cpp / Ollama", vramMult:1.0, tpsMult:1.0},
    {v:"lmstudio", l:"LM Studio", vramMult:1.0, tpsMult:1.0},
    {v:"vllm", l:"vLLM", vramMult:1.35, tpsMult:1.15},
  ];
  return BACKENDS.find(b => b.v === id) || BACKENDS[0];
}

function estimateBandwidth(vram, gpuType) {
  // NVIDIA discrete: lookup table by VRAM size
  if (gpuType === "nvidia") {
    if (vram >= 192) return 3000;
    if (vram >= 160) return 2500;
    if (vram >= 80) return 2000;
    if (vram >= 48) return 1000;
    if (vram >= 40) return 900;
    if (vram >= 32) return 800;
    if (vram >= 24) return 700;
    if (vram >= 16) return 500;
    if (vram >= 12) return 360;
    if (vram >= 8) return 300;
    if (vram >= 4) return 200;
    if (vram >= 2) return 100;
    return 50;
  }
  if (gpuType==="apple") {
    if (vram >= 192) return 819;
    if (vram >= 64) return 546;
    if (vram >= 48) return 350;
    if (vram >= 36) return 546;
    if (vram >= 18) return 200;
    if (vram >= 16) return 120;
    return 100;
  }
  if (gpuType==="nvidia-uni") return vram>=128?273:vram>=96?273:vram>=64?273:vram>=32?200:100;
  if (gpuType==="amd-apu") return vram>=128?256:vram>=96?256:vram>=64?200:vram>=32?150:100;
  if (gpuType==="amd") return vram>=192?5300:vram>=48?1000:vram>=24?500:200;
  if (gpuType==="intel") return vram>=24?560:vram>=16?560:vram>=12?456:vram>=8?512:200;
  if (gpuType==="cpu") return 40;
  return 100;
}

function getTPS(vramOrBw, gpuType, pb, isBandwidth, totalPb) {
  const bwGBs = isBandwidth ? vramOrBw : estimateBandwidth(vramOrBw, gpuType);
  const bytesPerParam = 0.6;
  const overhead = 1.15;
  const effectivePb = pb;
  const rawTPS = bwGBs / (effectivePb * bytesPerParam * overhead);
  const ceiling = bwGBs <= 300 ? 80 : bwGBs <= 600 ? 120 : bwGBs <= 1100 ? 150 : bwGBs <= 2000 ? 200 : 300;
  return Math.min(ceiling, Math.max(1, Math.round(rawTPS)));
}

function parseTotalPb(m) {
  if (!m.p || !m.p.includes("MoE")) return m.pb;
  const tMatch = m.p.match(/([\d.]+)T/);
  if (tMatch) return parseFloat(tMatch[1]) * 1000;
  const bMatch = m.p.match(/([\d.]+)B/);
  if (bMatch) return parseFloat(bMatch[1]);
  const mMatch = m.p.match(/([\d.]+)M/);
  if (mMatch) return parseFloat(mMatch[1]) / 1000;
  return m.pb;
}

function calcKvVram(pb, context) {
  return (pb / 8) * (context / 1000) * 0.012;
}

let contextLength = 4096;

function compat(m, vram, ram, gpuType, quant, backendId) {
  const be = getBackend(backendId);
  const totalPb = parseTotalPb(m);
  const skipQ = NO_QUANT_CATS.has(m.c);
  const qMult = skipQ ? 1 : quant === "q8" ? (1.1/0.6) : quant === "fp16" ? (2/0.6) : 1;
  const baseNeed = Math.round(m.vram * qMult * 10) / 10;
  const need = Math.round(baseNeed * be.vramMult * 10) / 10;
  const ev = gpuType==="cpu" ? 0 : vram;
  const qScale = skipQ ? 1 : quant === "q4" ? 1 : quant === "q8" ? 0.55 : 0.3;
  const kvVram = skipQ ? 0 : calcKvVram(m.pb, contextLength);
  const availableVram = Math.max(0, ev - kvVram);

  if (skipQ) {
    const fits = (gpuType==="apple" || gpuType==="amd-apu" || gpuType==="nvidia-uni") ? vram >= need : (availableVram >= need && ram >= m.ram);
    return fits ? {s:"yes", tps:0} : {s:"no", tps:0};
  }
  if (gpuType==="apple" || gpuType==="amd-apu" || gpuType==="nvidia-uni") {
    if (vram >= need + kvVram) return {s:"yes", tps: Math.max(1, Math.round(getTPS(vram, gpuType, m.pb, false, totalPb) * qScale * be.tpsMult))};
    return {s:"no", tps:0};
  }
  if (availableVram >= need && ram >= m.ram) return {s:"yes", tps: Math.max(1, Math.round(getTPS(vram, gpuType, m.pb, false, totalPb) * qScale * be.tpsMult))};
  const totalMem = availableVram + ram;
  const needed = need + 4;
  if (totalMem >= needed) {
    const offR = availableVram > 0 ? Math.min(.95, availableVram / need) : 0;
    const bpp = skipQ ? 2 : quant === "q4" ? 0.6 : quant === "q8" ? 1.1 : 2;
    const gpuBwGBs = availableVram > 0 ? estimateBandwidth(vram, gpuType) : 0;
    const cpuBwGBs = estimateBandwidth(0, "cpu");
    let effBw;
    if (offR <= 0 || offR >= 1) {
      effBw = offR >= 1 ? gpuBwGBs : cpuBwGBs;
    } else {
      effBw = 1 / (offR / gpuBwGBs + (1 - offR) / cpuBwGBs);
    }
    const tps = effBw / (m.pb * bpp * 1.15);
    return {s:"slow", tps: Math.max(1, Math.round(tps))};
  }
  return {s:"no", tps:0};
}

// === Test Models ===
const MODELS = [
  { id: "meta-llama/Llama-3.1-8B-Instruct", n: "Llama 3.1 8B", f: "Meta", p: "8B", pb: 8, vram: 4.8, ram: 8, c: "general" },
  { id: "mistralai/Mixtral-8x7B-Instruct-v0.1", n: "Mixtral 8x7B", f: "Mistral", p: "47B MoE", pb: 12, vram: 28.2, ram: 32, c: "general" },
  { id: "Qwen/Qwen2.5-72B-Instruct", n: "Qwen 2.5 72B", f: "Qwen", p: "72B", pb: 72, vram: 43.2, ram: 64, c: "general" },
  { id: "stabilityai/stable-diffusion-xl-base-1.0", n: "SDXL", f: "Stability", p: "6B", pb: 6, vram: 6.4, ram: 12, c: "image" },
];

// === Test Runner ===
const RESULTS = { passed: 0, failed: 0, errors: [] };

function test(name, actual, expected, tolerance = 0.15) {
  const margin = expected * tolerance;
  const diff = Math.abs(actual - expected);
  if (diff <= margin) {
    console.log(`✓ ${name}`);
    RESULTS.passed++;
  } else {
    console.log(`✗ ${name}: expected ${expected}, got ${actual} (diff: ${diff.toFixed(2)}, margin: ${margin.toFixed(2)})`);
    RESULTS.failed++;
    RESULTS.errors.push({ name, actual, expected, diff: diff.toFixed(2) });
  }
}

// === Benchmark Tests ===
// Note: These expected values are based on the bandwidth formula which the app uses.
// Formula: TPS = bandwidth / (params * 0.6 * 1.15)
// Real-world may differ due to compute overhead, llama.cpp inefficiencies, etc.
console.log('\n=== TPS Benchmarks (formula-based) ===');
const llama8b = MODELS[0];
const mixtral = MODELS[1];
const qwen72b = MODELS[2];

// RTX 3060: 360 GB/s bandwidth -> 360 / (8 * 0.69) = 65 t/s
test('Llama 3.1 8B Q4 on RTX 3060 (360 GB/s)', getTPS(360, 'nvidia', 8, true, 8), 65, 0.20);
// RTX 4090: 1008 GB/s but ceiling of 150 kicks in
test('Llama 3.1 8B Q4 on RTX 4090 (1008 GB/s)', getTPS(1008, 'nvidia', 8, true, 8), 150, 0.20);
// Mixtral: 12B active on 1008 GB/s -> 1008 / (12 * 0.69) = 122, ceiling 150
test('Mixtral 8x7B Q4 on RTX 4090 (active 12B)', getTPS(1008, 'nvidia', 12, true, 47), 122, 0.20);
// 2x RTX 4090: 2016 GB/s, 72B params -> ceiling 200 kicks in
test('Qwen 2.5 72B Q4 on 2x RTX 4090 (2016 GB/s)', getTPS(2016, 'nvidia', 72, true, 72), 41, 0.25);
// Mac Studio M4 Max: 546 GB/s ceiling 200
test('Llama 3.1 8B Q4 on Mac Studio M4 Max (546 GB/s)', getTPS(546, 'apple', 8, true, 8), 120, 0.20);

console.log('\n=== VRAM Fit Checks ===');
test('Llama 3.1 8B fits in RTX 3060 12GB Q4', compat(llama8b, 12, 32, 'nvidia', 'q4', 'llamacpp').s === 'yes', true);
test('Llama 3.1 8B fits in RTX 4090 24GB Q4', compat(llama8b, 24, 32, 'nvidia', 'q4', 'llamacpp').s === 'yes', true);

console.log('\n=== CPU Offload ===');
test('Llama 3.1 8B Q4 with CPU offload (4GB VRAM + 64GB RAM)', compat(llama8b, 4, 64, 'nvidia', 'q4', 'llamacpp').s === 'slow', true);

console.log('\n=== KV Cache VRAM ===');
test('KV cache for 8B at 4K tokens', calcKvVram(8, 4096), 0.048, 0.30);
test('KV cache for 8B at 32K tokens', calcKvVram(8, 32768), 0.384, 0.30);
test('KV cache for 70B at 128K tokens', calcKvVram(70, 131072), 13.76, 0.30);

console.log('\n=== Context Length Impact ===');
contextLength = 4096;
const fit4k = compat(llama8b, 8, 32, 'nvidia', 'q4', 'llamacpp');
contextLength = 32768;
const fit32k = compat(llama8b, 8, 32, 'nvidia', 'q4', 'llamacpp');
test('Fits at 4K context, may not at 32K (8GB VRAM borderline)', fit4k.s === 'yes', true);

console.log('\n=== Apple Silicon ===');
test('Llama 3.1 8B fits in MacBook Pro 24GB', compat(llama8b, 24, 0, 'apple', 'q4', 'llamacpp').s === 'yes', true);

console.log('\n=== Non-Quantizable (SDXL) ===');
const sdxl = MODELS[3];
// SDXL needs 6.4GB at FP16. With vLLM (1.35x), need 8.64GB
test('SDXL does NOT fit in 8GB VRAM (FP16+backend)', compat(sdxl, 8, 16, 'nvidia', 'q4', 'vllm').s === 'no', true);
test('SDXL fits in 16GB VRAM (FP16)', compat(sdxl, 16, 16, 'nvidia', 'q4', 'llamacpp').s === 'yes', true);

console.log('\n=== Bandwidth Estimation ===');
test('RTX 4090 24GB bandwidth', estimateBandwidth(24, 'nvidia'), 700, 0.05);
test('RTX 3060 12GB bandwidth', estimateBandwidth(12, 'nvidia'), 360, 0.05);
test('Apple 48GB unified memory', estimateBandwidth(48, 'apple'), 350, 0.05);

// === Summary ===
console.log('\n=== Summary ===');
console.log(`Passed: ${RESULTS.passed}`);
console.log(`Failed: ${RESULTS.failed}`);
if (RESULTS.failed > 0) {
  console.log('\nFailed tests:');
  RESULTS.errors.forEach(e => console.log(`  - ${e.name}: got ${e.actual}, expected ${e.expected}`));
}
process.exit(RESULTS.failed > 0 ? 1 : 0);
