// core.js — Core calculation functions

// Model categories where GGUF quantization (Q4/Q8) doesn't apply
const NO_QUANT_CATS = new Set(["image","video","audio","embed","threeD"]);

function getBackend(id) {
  return BACKENDS.find(b => b.v === id) || BACKENDS[0];
}

// Estimate typical memory bandwidth (GB/s) from VRAM size and GPU type
function estimateBandwidth(vram, gpuType) {
  // Apple: VRAM alone can't fully distinguish Pro vs Max at 48GB. Use best-guess estimates.
  // 192+: Ultra (819), 64-128: M4 Max (546), 48: Pro/Max avg (350), 36: M4 Max (546), 18-24: Pro (150-273), ≤16: base (100-120)
  if (gpuType==="apple") return vram>=192?819:vram>=64?546:vram>=48?350:vram>=36?546:vram>=18?200:vram>=16?120:100;
  if (gpuType==="nvidia-uni") return vram>=128?273:vram>=96?273:vram>=64?273:vram>=32?200:100;
  if (gpuType==="amd-apu") return vram>=128?256:vram>=96?256:vram>=64?200:vram>=32?150:100;
  if (gpuType==="amd") return vram>=192?5300:vram>=48?1000:vram>=24?500:200;
  if (gpuType==="intel") return vram>=24?560:vram>=16?560:vram>=12?456:vram>=8?512:200;
  if (gpuType==="cpu") return 40;
  // nvidia discrete default
  return vram>=192?3000:vram>=160?2500:vram>=80?2000:vram>=48?1000:vram>=40?900:vram>=32?800:vram>=24?700:vram>=16?500:vram>=12?360:vram>=8?300:vram>=4?200:vram>=2?100:50;
}

function getTPS(vramOrBw, gpuType, pb, isBandwidth, totalPb) {
  const bwGBs = isBandwidth ? vramOrBw : estimateBandwidth(vramOrBw, gpuType);
  // Token generation is memory-bandwidth bound: TPS ≈ bandwidth / (bytes_per_param * active_params)
  // At Q4 (~0.6 bytes/param), with overhead factor for KV cache, attention, etc.
  const bytesPerParam = 0.6; // Q4 baseline — caller applies qScale for Q8/FP16
  const overhead = 1.15; // ~15% overhead for KV cache, compute, etc.
  // MoE models: bandwidth bottleneck is closer to total weight size, not just active params.
  // Expert weights are scattered in memory, reducing effective bandwidth utilization.
  // Use blended size: active + 80% of inactive weights as bandwidth cost.
  let effectivePb = pb;
  if (totalPb && totalPb > pb * 1.5) {
    effectivePb = pb + (totalPb - pb) * 0.8;
  }
  const rawTPS = bwGBs / (effectivePb * bytesPerParam * overhead);
  // Soft ceiling: small models can't fully saturate high-bandwidth GPUs due to
  // kernel launch overhead, sampling, KV cache writes, and attention compute.
  const ceiling = bwGBs <= 300 ? 80 : bwGBs <= 600 ? 120 : bwGBs <= 1100 ? 150 : bwGBs <= 2000 ? 200 : 300;
  return Math.min(ceiling, Math.max(1, Math.round(rawTPS)));
}

// Parse total param count from model's p field (e.g. "35B MoE" → 35, "1T MoE" → 1000)
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

function compat(m, vram, ram, gpuType, quant, backendId) {
  const be = getBackend(backendId);
  const totalPb = parseTotalPb(m);
  // Scale VRAM need by quantization. m.vram is Q4 for text models, FP16 for non-quant.
  const skipQ = NO_QUANT_CATS.has(m.c);
  const qMult = skipQ ? 1 : quant === "q8" ? (1.1/0.6) : quant === "fp16" ? (2/0.6) : 1;
  const baseNeed = Math.round(m.vram * qMult * 10) / 10;
  // Apply backend VRAM overhead (vLLM pre-allocates KV cache, etc.)
  const need = Math.round(baseNeed * be.vramMult * 10) / 10;
  const ev = gpuType==="cpu" ? 0 : vram;
  const qScale = skipQ ? 1 : quant === "q4" ? 1 : quant === "q8" ? 0.55 : 0.3;
  // Non-quantizable models (image/video/audio/embed/3D): fit check only, TPS not meaningful
  if (skipQ) {
    const fits = (gpuType==="apple" || gpuType==="amd-apu" || gpuType==="nvidia-uni") ? vram >= need : (ev >= need && ram >= m.ram);
    return fits ? {s:"yes", tps:0} : {s:"no", tps:0};
  }
  // Unified memory (Apple Silicon, AMD APU, NVIDIA DGX): VRAM and RAM are the same pool — no CPU offload concept
  if (gpuType==="apple" || gpuType==="amd-apu" || gpuType==="nvidia-uni") {
    if (vram >= need) return {s:"yes", tps: Math.max(1, Math.round(getTPS(vram, gpuType, m.pb, false, totalPb) * qScale * be.tpsMult))};
    return {s:"no", tps:0};
  }
  const effectiveRam = ram;
  if (ev >= need && effectiveRam >= m.ram) return {s:"yes", tps: Math.max(1, Math.round(getTPS(vram, gpuType, m.pb, false, totalPb) * qScale * be.tpsMult))};
  // CPU offload: need enough total memory (VRAM + RAM) to hold the model weights plus ~4GB OS overhead
  const totalMem = ev + ram;
  const needed = need + 4;
  if (totalMem >= needed) {
    // Fraction of model layers in VRAM vs RAM
    const offR = ev > 0 ? Math.min(.95, ev / need) : 0;
    // Bytes per active param at this quant level
    const bpp = skipQ ? 2 : quant === "q4" ? 0.6 : quant === "q8" ? 1.1 : 2;
    // GPU bandwidth (estimated from VRAM size)
    const gpuBwGBs = ev > 0 ? estimateBandwidth(vram, gpuType) : 0;
    // CPU/RAM bandwidth (~40 GB/s DDR4/DDR5 average)
    const cpuBwGBs = estimateBandwidth(0, "cpu");
    // Effective bandwidth is weighted blend
    const effBw = offR * gpuBwGBs + (1 - offR) * cpuBwGBs;
    // TPS using effective params (blended for MoE) — no tpsMult for offload
    let effPb = m.pb;
    if (totalPb > m.pb * 1.5) effPb = m.pb + (totalPb - m.pb) * 0.8;
    const tps = effBw / (effPb * bpp * 1.15);
    return {s:"slow", tps: Math.max(1, Math.round(tps))};
  }
  return {s:"no", tps:0};
}

function catBadge(c) {
  const s = CAT_STYLE[c] || CAT_STYLE.general;
  return `<span style="font-size:10px;padding:1px 6px;border-radius:3px;background:${s.bg};color:${s.fg}">${CATS[c]||c}</span>`;
}
