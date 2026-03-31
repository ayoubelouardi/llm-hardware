// model.js — Model mode, analysis, build specs, and rendering
let lastM = null, tmr;

function renderModelShell() {
  document.getElementById("mpanel").innerHTML = `
    <input class="si" type="text" id="mq" 
      placeholder="search: llama 3.1, deepseek r1, qwen coder... or any HuggingFace ID"
      autocomplete="off" oninput="onMQ(this.value)">
    <div id="rlist"></div>
    <div id="mpout"></div>`;
  if (lastM) {
    document.getElementById("mq").value = lastM.n;
    doAnalysis(lastM);
  }
}

window.onMQ = function(v) {
  clearTimeout(tmr);
  document.getElementById("mpout").innerHTML = "";
  const rl = document.getElementById("rlist");
  if (!v.trim()) { rl.innerHTML = ""; return; }
  tmr = setTimeout(() => {
    const q = v.toLowerCase();
    const hits = M.filter(m =>
      m.n.toLowerCase().includes(q) ||
      m.f.toLowerCase().includes(q) ||
      m.id.toLowerCase().includes(q) ||
      m.p.toLowerCase().includes(q)
    ).slice(0, 8);

    if (!hits.length) {
      rl.innerHTML = `<div class="ac"><div class="aci" style="flex-direction:column;align-items:flex-start;gap:6px;cursor:default">
        <div><div class="ain">"${v}" not found in our catalog</div>
        <div class="ais">Try searching by model family (e.g. "llama", "qwen", "flux") or check the spelling</div></div>
      </div></div>`;
    } else {
      rl.innerHTML = `<div class="ac">${hits.map(m => `
        <div class="aci">
          <div><div class="ain">${m.n}</div><div class="ais">${m.f} · ${m.p}</div></div>
          ${catBadge(m.c)}
        </div>`).join("")}</div>`;
      rl.querySelectorAll(".aci").forEach((el, i) => {
        el.onclick = () => {
          rl.innerHTML = "";
          document.getElementById("mq").value = hits[i].n;
          doAnalysis(hits[i]);
        };
      });
    }
  }, 160);
}

const BUILDS = {
  gpus: [
    // NVIDIA consumer
    {name:"RTX 3060 12GB",       v:12,  type:"nvidia", bw:360,  pr:280,  q:"RTX+3060+12GB", tf:13.2},
    {name:"RTX 3070 8GB",        v:8,   type:"nvidia", bw:448,  pr:350,  q:"RTX+3070+8GB", tf:20.3},
    {name:"RTX 3080 10GB",       v:10,  type:"nvidia", bw:760,  pr:450,  q:"RTX+3080+10GB", tf:29.7},
    {name:"RTX 3090 24GB",       v:24,  type:"nvidia", bw:936,  pr:700,  q:"RTX+3090+24GB", tf:35.6},
    {name:"RTX 4060 8GB",        v:8,   type:"nvidia", bw:272,  pr:300,  q:"RTX+4060+8GB", tf:15.1},
    {name:"RTX 4060 Ti 16GB",    v:16,  type:"nvidia", bw:288,  pr:450,  q:"RTX+4060+Ti+16GB", tf:15.1},
    {name:"RTX 4070 12GB",       v:12,  type:"nvidia", bw:504,  pr:550,  q:"RTX+4070+12GB", tf:29.2},
    {name:"RTX 4070 Ti 12GB",    v:12,  type:"nvidia", bw:504,  pr:650,  q:"RTX+4070+Ti+12GB", tf:29.2},
    {name:"RTX 4070 Ti Super 16GB",v:16,type:"nvidia", bw:672,  pr:780,  q:"RTX+4070+Ti+Super+16GB", tf:44.0},
    {name:"RTX 4080 Super 16GB", v:16,  type:"nvidia", bw:736,  pr:950,  q:"RTX+4080+Super+16GB", tf:48.7},
    {name:"RTX 4090 24GB",       v:24,  type:"nvidia", bw:1008, pr:1800, q:"RTX+4090+24GB", tf:82.6},
    {name:"RTX 5070 12GB",       v:12,  type:"nvidia", bw:672,  pr:550,  q:"RTX+5070+12GB", tf:31.0},
    {name:"RTX 5070 Ti 16GB",    v:16,  type:"nvidia", bw:896,  pr:850,  q:"RTX+5070+Ti+16GB", tf:43.0},
    {name:"RTX 5080 16GB",       v:16,  type:"nvidia", bw:960,  pr:1000, q:"RTX+5080+16GB", tf:50.0},
    {name:"RTX 5090 32GB",       v:32,  type:"nvidia", bw:1792, pr:2000, q:"RTX+5090+32GB", tf:104.0},
    // NVIDIA multi-GPU
    {name:"2x RTX 3090 24GB",    v:48,  type:"nvidia", bw:1872, pr:1400, q:"RTX+3090+24GB", tf:71.2},
    {name:"2x RTX 4090 24GB",    v:48,  type:"nvidia", bw:2016, pr:3600, q:"RTX+4090+24GB", tf:165.2},
    // NVIDIA professional / datacenter
    {name:"RTX A6000 48GB",      v:48,  type:"nvidia", bw:768,  pr:3500, q:"NVIDIA+RTX+A6000+48GB", tf:38.7},
    {name:"NVIDIA A100 80GB",    v:80,  type:"nvidia", bw:2039, pr:8000, q:"NVIDIA+A100+80GB", tf:312.0},
    {name:"NVIDIA H100 80GB",    v:80,  type:"nvidia", bw:3350, pr:25000,q:"NVIDIA+H100+80GB", tf:513.0},
    {name:"2x NVIDIA A100 80GB", v:160, type:"nvidia", bw:4078, pr:16000,q:"NVIDIA+A100+80GB", tf:624.0},
    {name:"2x NVIDIA H100 80GB", v:160, type:"nvidia", bw:6700, pr:50000,q:"NVIDIA+H100+80GB", tf:1026.0},
    {name:"NVIDIA L40S 48GB",    v:48,  type:"nvidia", bw:864,  pr:10000,q:"NVIDIA+L40S+48GB", tf:91.0},
    {name:"RTX PRO 6000 96GB",   v:96,  type:"nvidia", bw:1800, pr:6800, q:"NVIDIA+RTX+PRO+6000+96GB", tf:96.0},
    // AMD
    {name:"RX 7800 XT 16GB",     v:16,  type:"amd",    bw:624,  pr:450,  q:"AMD+RX+7800+XT+16GB", tf:24.0},
    {name:"RX 7900 XT 20GB",     v:20,  type:"amd",    bw:800,  pr:650,  q:"AMD+RX+7900+XT+20GB", tf:28.0},
    {name:"RX 7900 XTX 24GB",    v:24,  type:"amd",    bw:960,  pr:850,  q:"AMD+RX+7900+XTX+24GB", tf:29.7},
    {name:"RX 9070 XT 16GB",     v:16,  type:"amd",    bw:650,  pr:550,  q:"AMD+RX+9070+XT+16GB", tf:25.0},
    {name:"AMD MI300X 192GB",    v:192, type:"amd",    bw:5300, pr:15000,q:"AMD+Instinct+MI300X", tf:98.0},
    // Intel
    {name:"Intel Arc A750 8GB",   v:8,   type:"intel",  bw:512,  pr:200,  q:"Intel+Arc+A750+8GB", tf:13.5},
    {name:"Intel Arc B580 12GB",  v:12,  type:"intel",  bw:456,  pr:250,  q:"Intel+Arc+B580+12GB", tf:14.2},
    {name:"Intel Arc A770 16GB",   v:16,  type:"intel",  bw:560,  pr:300,  q:"Intel+Arc+A770+16GB", tf:17.8},
    // AMD APU Unified
    {name:"Strix Halo 96GB",     v:96,  type:"amd-apu", bw:256, pr:2500, q:"AMD+Strix+Halo+96GB", tf:18.0},
    {name:"Strix Halo 128GB",    v:128, type:"amd-apu", bw:256, pr:3000, q:"AMD+Strix+Halo+128GB", tf:18.0},
    // NVIDIA Unified
    {name:"DGX Spark 128GB",     v:128, type:"nvidia-uni", bw:273, pr:3000, q:"NVIDIA+DGX+Spark", tf:20.0},
    // Apple — MacBook Air (M3/M4, 100 GB/s, ~0.5 TFLOPS)
    {name:"MacBook Air M3 8GB",    v:8,   type:"apple", bw:100, pr:1100, q:"MacBook+Air+M4+8GB", tf:0.5},
    {name:"MacBook Air M3 16GB",   v:16,  type:"apple", bw:100, pr:1200, q:"MacBook+Air+M4+16GB", tf:0.5},
    {name:"MacBook Air M3 24GB",   v:24,  type:"apple", bw:100, pr:1300, q:"MacBook+Air+M4+24GB", tf:0.5},
    {name:"MacBook Air M4 8GB",    v:8,   type:"apple", bw:120, pr:999,  q:"MacBook+Air+M4+8GB", tf:0.6},
    {name:"MacBook Air M4 16GB",   v:16,  type:"apple", bw:120, pr:1099, q:"MacBook+Air+M4+16GB", tf:0.6},
    {name:"MacBook Air M4 24GB",   v:24,  type:"apple", bw:120, pr:1299, q:"MacBook+Air+M4+24GB", tf:0.6},
    // Apple — MacBook Pro M3 Pro (150 GB/s, ~4.0 TFLOPS)
    {name:"MacBook Pro M3 Pro 18GB", v:18, type:"apple", bw:150, pr:1600, q:"MacBook+Pro+M3+Pro+18GB", tf:4.0},
    {name:"MacBook Pro M3 Pro 36GB", v:36, type:"apple", bw:150, pr:2200, q:"MacBook+Pro+M3+Pro+36GB", tf:4.0},
    // Apple — MacBook Pro M4 Pro (273 GB/s, ~6.0 TFLOPS)
    {name:"MacBook Pro M4 Pro 24GB", v:24, type:"apple", bw:273, pr:2000, q:"MacBook+Pro+M4+Pro+24GB", tf:6.0},
    {name:"MacBook Pro M4 Pro 48GB", v:48, type:"apple", bw:273, pr:2500, q:"MacBook+Pro+M4+Pro+48GB", tf:6.0},
    // Apple — MacBook Pro M3 Max (400 GB/s, ~15.0 TFLOPS)
    {name:"MacBook Pro M3 Max 36GB", v:36, type:"apple", bw:400, pr:2500, q:"MacBook+Pro+M3+Max+36GB", tf:15.0},
    {name:"MacBook Pro M3 Max 48GB", v:48, type:"apple", bw:400, pr:3000, q:"MacBook+Pro+M3+Max+48GB", tf:15.0},
    // Apple — MacBook Pro M4 Max (546 GB/s, ~18.0 TFLOPS)
    {name:"MacBook Pro M4 Max 36GB", v:36, type:"apple", bw:546, pr:2500, q:"MacBook+Pro+M4+Max+36GB", tf:18.0},
    {name:"MacBook Pro M4 Max 48GB", v:48, type:"apple", bw:546, pr:3000, q:"MacBook+Pro+M4+Max+48GB", tf:18.0},
    {name:"MacBook Pro M4 Max 64GB", v:64, type:"apple", bw:546, pr:3500, q:"MacBook+Pro+M4+Max+64GB", tf:18.0},
    {name:"MacBook Pro M4 Max 128GB",v:128,type:"apple", bw:546, pr:4500, q:"MacBook+Pro+M4+Max+128GB", tf:18.0},
    // Apple — Mac Mini M4 (120 GB/s, ~0.6 TFLOPS)
    {name:"Mac Mini M4 16GB",        v:16, type:"apple", bw:120, pr:700,  q:"Mac+Mini+M4+16GB", tf:0.6},
    {name:"Mac Mini M4 Pro 24GB",    v:24, type:"apple", bw:273, pr:1200, q:"Mac+Mini+M4+Pro+24GB", tf:6.0},
    {name:"Mac Mini M4 Pro 48GB",    v:48, type:"apple", bw:273, pr:1400, q:"Mac+Mini+M4+Pro+48GB", tf:6.0},
    // Apple — Mac Studio M4 Max (546 GB/s, ~18.0 TFLOPS)
    {name:"Mac Studio M4 Max 36GB",  v:36, type:"apple", bw:546, pr:2200, q:"Mac+Studio+M4+Max", tf:18.0},
    {name:"Mac Studio M4 Max 64GB",  v:64, type:"apple", bw:546, pr:2800, q:"Mac+Studio+M4+Max+64GB", tf:18.0},
    {name:"Mac Studio M4 Max 128GB", v:128,type:"apple", bw:546, pr:3500, q:"Mac+Studio+M4+Max+128GB", tf:18.0},
    // Apple — Mac Studio M4 Ultra (819 GB/s, ~38.0 TFLOPS)
    {name:"Mac Studio M4 Ultra 192GB",v:192,type:"apple",bw:819, pr:4000, q:"Mac+Studio+M4+Ultra", tf:38.0},
    {name:"Mac Studio M4 Ultra 256GB",v:256,type:"apple",bw:819, pr:5000, q:"Mac+Studio+M4+Ultra+256GB", tf:38.0},
    // Apple — Mac Pro M3 Ultra (819 GB/s, ~38.0 TFLOPS)
    {name:"Mac Pro M3 Ultra 192GB",  v:192,type:"apple", bw:819, pr:3500, q:"Mac+Pro+M3+Ultra+192GB", tf:38.0},
    {name:"Mac Pro M3 Ultra 256GB",  v:256,type:"apple", bw:819, pr:5500, q:"Mac+Pro+M3+Ultra+256GB", tf:38.0},
    {name:"Mac Pro M3 Ultra 512GB",  v:512,type:"apple", bw:819, pr:8000, q:"Mac+Pro+M3+Ultra+512GB", tf:38.0},
  ],
  cpus: [
    {name:"Intel i5-13400F",     tier:0, pr:180, q:"Intel+i5-13400F"},
    {name:"Intel i5-14600KF",    tier:1, pr:260, q:"Intel+i5-14600KF"},
    {name:"AMD Ryzen 7 7800X3D", tier:2, pr:340, q:"AMD+Ryzen+7+7800X3D"},
    {name:"AMD Ryzen 9 7950X",   tier:3, pr:480, q:"AMD+Ryzen+9+7950X"},
    {name:"AMD Threadripper 7960X",tier:4,pr:1400,q:"AMD+Threadripper+7960X"},
  ],
  ram: [
    {name:"16GB DDR5-5600",      gb:16,  pr:35,  q:"16GB+DDR5+5600MHz"},
    {name:"32GB DDR5-5600",      gb:32,  pr:65,  q:"32GB+DDR5+5600MHz+kit"},
    {name:"64GB DDR5-5600",      gb:64,  pr:130, q:"64GB+DDR5+5600MHz+kit"},
    {name:"128GB DDR5-4800 ECC", gb:128, pr:300, q:"128GB+DDR5+ECC+RAM"},
    {name:"256GB DDR5-4800 ECC", gb:256, pr:600, q:"256GB+DDR5+ECC+RAM"},
  ],
  storage: [
    {name:"1TB NVMe SSD",        tb:1,  pr:70,  q:"1TB+NVMe+SSD"},
    {name:"2TB NVMe SSD",        tb:2,  pr:120, q:"2TB+NVMe+SSD"},
    {name:"4TB NVMe SSD",        tb:4,  pr:250, q:"4TB+NVMe+SSD"},
  ],
  psu: [
    {name:"750W 80+ Gold",       w:750,  pr:90,  q:"750W+80+Gold+PSU"},
    {name:"850W 80+ Gold",       w:850,  pr:110, q:"850W+80+Gold+PSU"},
    {name:"1000W 80+ Gold",      w:1000, pr:150, q:"1000W+80+Gold+PSU"},
    {name:"1200W 80+ Platinum",  w:1200, pr:200, q:"1200W+80+Platinum+PSU"},
    {name:"1600W 80+ Titanium",  w:1600, pr:350, q:"1600W+80+Titanium+PSU"},
  ],
  mobos: [
    {name:"B650 Micro-ATX",          tier:0, pr:130,  q:"B650+Micro+ATX+motherboard+DDR5"},
    {name:"B650 ATX",                tier:1, pr:160,  q:"B650+ATX+motherboard+DDR5"},
    {name:"X670E ATX",               tier:2, pr:280,  q:"X670E+ATX+motherboard+DDR5"},
    {name:"TRX50 ATX (Threadripper)",tier:3, pr:800,  q:"TRX50+ATX+motherboard+Threadripper"},
    {name:"Supermicro Dual-GPU Server",tier:4,pr:600, q:"Supermicro+dual+GPU+server+motherboard"},
  ],
  coolers: [
    {name:"Tower Air Cooler",       tier:0, pr:40,  q:"tower+air+cooler+AM5"},
    {name:"240mm AIO Liquid",       tier:1, pr:90,  q:"240mm+AIO+liquid+cooler"},
    {name:"360mm AIO Liquid",       tier:2, pr:130, q:"360mm+AIO+liquid+cooler"},
  ],
  cases: [
    {name:"Mini-ITX Compact",      size:"itx",   q:"Mini+ITX+case+GPU+clearance"},
    {name:"Micro-ATX Mid-Tower",   size:"matx",  q:"Micro+ATX+mid+tower+case+airflow"},
    {name:"ATX Mid-Tower",         size:"atx",   q:"ATX+mid+tower+case+airflow"},
    {name:"ATX Full-Tower",        size:"atx-f", q:"ATX+full+tower+case+airflow"},
    {name:"EATX Full-Tower",       size:"eatx",  q:"EATX+full+tower+case+dual+GPU"},
    {name:"4U Rackmount Server",   size:"rack",  q:"4U+rackmount+server+case+GPU"},
  ]
};

function gpuTDP(name) {
  if (name.includes("H100")) return 700;
  if (name.includes("A100")) return 300;
  if (name.includes("A6000")) return 300;
  if (name.includes("MI300X")) return 750;
  if (name.includes("2x")) return 700;
  if (name.includes("7900 XTX")) return 355;
  if (name.includes("7900 XT")) return 315;
  if (name.includes("9070 XT")) return 250;
  if (name.includes("7800 XT")) return 263;
  if (name.includes("4090")) return 450;
  if (name.includes("5090")) return 475;
  if (name.includes("5080")) return 360;
  if (name.includes("4080")) return 320;
  if (name.includes("3090")) return 350;
  if (name.includes("3080")) return 320;
  if (name.includes("PRO 6000")) return 300;
  if (name.includes("L40S")) return 350;
  if (name.includes("5070 Ti")) return 300;
  if (name.includes("5070")) return 250;
  if (name.includes("4070 Ti")) return 285;
  if (name.includes("4070")) return 200;
  if (name.includes("4060 Ti")) return 165;
  if (name.includes("4060")) return 115;
  if (name.includes("3070")) return 220;
  if (name.includes("3060")) return 170;
  if (name.includes("Arc A770")) return 225;
  if (name.includes("Arc A750")) return 225;
  if (name.includes("Arc B580")) return 190;
  if (name.includes("DGX Spark")) return 200;
  return 200;
}

function pickBuild(vramNeeded, pb) {
  // GPU — cheapest that fits
  const isApple = (g) => g.type === "apple";
  const isUnified = (g) => g.type === "apple" || g.type === "nvidia-uni" || g.type === "amd-apu";
  const pcGpu = BUILDS.gpus.filter(g => !isUnified(g) && g.v >= vramNeeded).sort((a,b) => a.pr - b.pr)[0];
  const uniGpu = BUILDS.gpus.filter(g => isUnified(g) && g.v >= vramNeeded).sort((a,b) => a.pr - b.pr)[0];
  const gpu = pcGpu || uniGpu;
  if (!gpu) return null;

  if (isUnified(gpu)) {
    return { type:"apple", gpu, total: gpu.pr };
  }

  // RAM — at least 1.5x VRAM for headroom (OS + KV cache + apps), minimum 32GB
  const ramNeeded = Math.max(32, Math.ceil(vramNeeded * 1.5));
  const ram = BUILDS.ram.find(r => r.gb >= ramNeeded) || BUILDS.ram[BUILDS.ram.length-1];

  // CPU tier based on model size
  const cpuTier = pb <= 7 ? 0 : pb <= 14 ? 1 : pb <= 34 ? 2 : pb <= 72 ? 3 : 4;
  const cpu = BUILDS.cpus[Math.min(cpuTier, BUILDS.cpus.length-1)];

  // Storage — bigger models need more space for weights
  const stIdx = pb <= 14 ? 0 : pb <= 72 ? 1 : 2;
  const storage = BUILDS.storage[stIdx];

  // PSU — based on GPU power draw
  const gpuW = gpuTDP(gpu.name);
  const totalW = gpuW + 125 + 50; // gpu + cpu headroom + other
  const psu = BUILDS.psu.find(p => p.w >= totalW * 1.25) || BUILDS.psu[BUILDS.psu.length-1];

  // Case — based on GPU size and count
  const caseIdx = gpu.name.includes("2x") ? 4 : gpu.name.includes("A100") || gpu.name.includes("H100") || gpu.name.includes("L40S") || gpu.name.includes("MI300X") ? 5 : pb <= 7 ? 0 : pb <= 14 ? 1 : 2;
  const pcCase = BUILDS.cases[Math.min(caseIdx, BUILDS.cases.length-1)];

  // Motherboard — based on CPU and GPU needs
  const moboTier = gpu.name.includes("2x") ? 4 : cpuTier >= 4 ? 3 : cpuTier >= 2 ? 2 : cpuTier >= 1 ? 1 : 0;
  const mobo = BUILDS.mobos[Math.min(moboTier, BUILDS.mobos.length-1)];

  // Cooler — based on CPU tier and power draw
  const coolerTier = cpuTier >= 4 ? 2 : cpuTier >= 2 ? 1 : 0;
  const cooler = BUILDS.coolers[Math.min(coolerTier, BUILDS.coolers.length-1)];

  return { type:"pc", gpu, cpu, ram, storage, psu, pcCase, mobo, cooler };
}

function doAnalysis(m) {
  lastM = m;
  const out = document.getElementById("mpout");
  if (!out) return;

  const pb = m.pb || 1;
  // For MoE models, parse total params from p field for VRAM calc (all weights must be in memory)
  let totalPb = pb;
  if (m.p.includes("MoE")) {
    const bMatch = m.p.match(/([\d.]+)B/);
    const mMatch = m.p.match(/([\d.]+)M/);
    if (bMatch) totalPb = parseFloat(bMatch[1]);
    else if (mMatch) totalPb = parseFloat(mMatch[1]) / 1000;
  }
  const vfp16 = Math.round(totalPb * 2 * 10) / 10;
  const vq8   = Math.round(totalPb * 1.1 * 10) / 10;
  const vq4   = Math.round(totalPb * 0.6 * 10) / 10;
  const canOffload = totalPb <= 72;
  const skipQuant = NO_QUANT_CATS.has(m.c);

  const archMap = {
    general:"Transformer (dense)", code:"Transformer (code-tuned)", reason:"Transformer (reasoning-tuned)",
    vision:"Vision-Language Transformer", embed:"Embedding encoder", image:"Diffusion / DiT",
    video:"Video diffusion", audio:"Audio encoder/decoder", medical:"Transformer (medical-tuned)",
    finance:"Transformer (finance-tuned)", legal:"Transformer (legal-tuned)", threeD:"3D generation pipeline"
  };
  const arch = m.p.includes("MoE") ? "Mixture of Experts (MoE)" : (archMap[m.c] || "Transformer");

  // Performance tiers for each quant — bw in GB/s from manufacturer specs
  const tierGpus = [
    // NVIDIA consumer
    {name:"RTX 4060 8GB",       v:8,   type:"nvidia", bw:272},
    {name:"RTX 3060 12GB",      v:12,  type:"nvidia", bw:360},
    {name:"RTX 4070 12GB",      v:12,  type:"nvidia", bw:504},
    {name:"RTX 5070 12GB",      v:12,  type:"nvidia", bw:672},
    {name:"RTX 4060 Ti 16GB",   v:16,  type:"nvidia", bw:288},
    {name:"RTX 4070 Ti Super 16GB",v:16,type:"nvidia",bw:672},
    {name:"RTX 5080 16GB",      v:16,  type:"nvidia", bw:960},
    {name:"RX 7800 XT 16GB",    v:16,  type:"amd",    bw:624},
    {name:"RX 9070 XT 16GB",    v:16,  type:"amd",    bw:650},
    {name:"RX 7900 XT 20GB",    v:20,  type:"amd",    bw:800},
    {name:"RTX 3090 24GB",      v:24,  type:"nvidia", bw:936},
    {name:"RTX 4090 24GB",      v:24,  type:"nvidia", bw:1008},
    {name:"RX 7900 XTX 24GB",   v:24,  type:"amd",    bw:960},
    {name:"RTX 5090 32GB",      v:32,  type:"nvidia", bw:1792},
    // Professional / multi-GPU
    {name:"RTX A6000 48GB",     v:48,  type:"nvidia", bw:768},
    {name:"2x RTX 4090 48GB",   v:48,  type:"nvidia", bw:2016},
    {name:"NVIDIA H100 80GB",   v:80,  type:"nvidia", bw:3350},
    {name:"RTX PRO 6000 96GB",  v:96,  type:"nvidia", bw:1800},
    {name:"2x NVIDIA H100 160GB",v:160,type:"nvidia", bw:6700},
    {name:"AMD MI300X 192GB",   v:192, type:"amd",    bw:5300},
    // Intel
    {name:"Intel Arc A750 8GB", v:8,   type:"intel",  bw:512},
    {name:"Intel Arc B580 12GB",v:12,  type:"intel",  bw:456},
    {name:"Intel Arc A770 16GB",v:16,  type:"intel",  bw:560},
    // Unified memory
    {name:"Strix Halo 128GB",   v:128, type:"amd-apu",    bw:256},
    {name:"DGX Spark 128GB",    v:128, type:"nvidia-uni", bw:273},
    // Apple
    {name:"MacBook Air M4 16GB",v:16,  type:"apple",  bw:100},
    {name:"MacBook Pro M3 Pro 18GB",v:18,type:"apple", bw:150},
    {name:"MacBook Air M4 24GB",v:24,  type:"apple",  bw:100},
    {name:"MacBook Pro M4 Max 36GB",v:36,type:"apple", bw:546},
    {name:"MacBook Pro M4 Max 48GB",v:48,type:"apple", bw:546},
    {name:"Mac Studio M4 Max 128GB",v:128,type:"apple",bw:546},
    {name:"Mac Studio M4 Ultra 192GB",v:192,type:"apple",bw:819},
    {name:"Mac Pro Ultra 512GB",v:512, type:"apple",  bw:819},
  ];

  // TPS accounts for MoE overhead via totalPb — expert weights are scattered in memory
  function tiersFor(vramReq) {
    return tierGpus.map(g => {
      if (g.v < vramReq) return {gpu:g.name, tps:0};
      const tps = getTPS(g.bw, g.type, pb, true, totalPb);
      const qScale = vramReq === vq4 ? 1 : vramReq === vq8 ? 0.55 : 0.3;
      return {gpu:g.name, tps: Math.max(1, Math.round(tps * qScale))};
    });
  }

  const tiers_q4  = skipQuant ? [] : tiersFor(vq4);
  const tiers_q8  = skipQuant ? [] : tiersFor(vq8);
  const tiers_fp16 = tiersFor(vfp16);

  // Full builds for each quant
  const build_q4  = skipQuant ? null : pickBuild(vq4, totalPb);
  const build_q8  = skipQuant ? null : pickBuild(vq8, totalPb);
  const build_fp16 = pickBuild(vfp16, totalPb);

  // Verdict
  let verdict, tip;
  if (vq4 <= 8) {
    verdict = `${m.n} runs comfortably on most modern GPUs with 8GB+ VRAM.`;
    tip = "Q4_K_M gives the best speed-to-quality ratio. Step up to Q8 if you want higher fidelity and have the VRAM.";
  } else if (vq4 <= 16) {
    verdict = `${m.n} needs a 16GB+ GPU at Q4, or a 24GB GPU for Q8 quality.`;
    tip = "An RTX 4060 Ti 16GB handles Q4 well. For Q8, look at the RTX 3090/4090 (24GB).";
  } else if (vq4 <= 24) {
    verdict = `${m.n} requires an RTX 3090/4090 at Q4. Q8 or FP16 needs 48GB+ or multi-GPU.`;
    tip = "Apple Silicon with 48GB+ unified memory is a strong option for higher quant levels.";
  } else if (vq4 <= 48) {
    verdict = `${m.n} needs professional hardware. Multi-GPU or Apple Silicon recommended.`;
    tip = "Mac Studio with M4 Ultra (192GB) can run this at FP16. PC builds need dual GPUs.";
  } else {
    verdict = `${m.n} is datacenter-class. Plan for multi-GPU or 192GB+ unified memory.`;
    tip = "Consider distilled variants for more practical home builds.";
  }
  if (m.c === "image") { verdict = `${m.n} requires ${vfp16} GB VRAM at FP16. Image models must run at full precision — quantization degrades visual output.`; tip = "Use FP16/BF16 only. GGUF quantization (Q4/Q8) is not applicable to diffusion models."; }
  if (m.c === "video") { verdict = `${m.n} requires ${vfp16} GB VRAM at FP16. Video generation is extremely VRAM-hungry.`; tip = "Budget for the FP16 build. Diffusion video models don't support GGUF quantization."; }
  if (m.c === "threeD") { verdict = `${m.n} requires ${vfp16} GB VRAM at FP16. 3D models need full precision for quality output.`; tip = "Run at FP16 only. Quantization is not applicable to 3D generation pipelines."; }
  if (m.c === "audio") { verdict = `${m.n} requires ${vfp16} GB VRAM at FP16. Audio models are generally lightweight.`; tip = "Most audio models run well at FP16 even on modest hardware. Quantization support varies by model."; }
  if (m.c === "embed") { verdict = `${m.n} requires ${vfp16} GB VRAM at FP16. Embedding models are typically run at full precision.`; tip = "Embedding models are almost always used at FP16/FP32. Quantization can degrade retrieval accuracy."; }
  if (m.c === "medical") { verdict += " ⚠ Not FDA-approved."; tip = "Medical models are for research only. Do not use for clinical decisions without expert review. Not a substitute for professional medical advice."; }
  if (m.c === "finance") { verdict += " ⚠ Not financial advice."; tip = "Finance models are for analysis and research. Always verify outputs independently — do not use as sole basis for investment decisions."; }
  if (m.c === "legal") { verdict += " ⚠ Not legal advice."; tip = "Legal models are for research assistance only. Always verify outputs with a qualified attorney. Not a substitute for professional legal counsel."; }

  showResult(m, {
    params: m.p, arch,
    vram_q4: vq4, vram_q8: vq8, vram_fp16: vfp16,
    cpu_offload: canOffload,
    tiers_q4, tiers_q8, tiers_fp16,
    build_q4, build_q8, build_fp16,
    verdict, tip, skipQuant, totalPb
  });
}

window.activeQuant = "q4";


window.tierHTML = function(tiers) {
  const run = tiers.filter(t => t.tps > 0);
  if (!run.length) return `<div class="trow"><span class="tnone">Requires multi-GPU or datacenter hardware</span></div>`;
  return run.map(t => `<div class="trow"><span class="tgpu">${t.gpu}</span><span class="ttps">~${t.tps} t/s</span></div>`).join("");
}

window.renderQuant = function(r, m) {
  const q = window.activeQuant;
  const tiers = q === "q4" ? r.tiers_q4 : q === "q8" ? r.tiers_q8 : r.tiers_fp16;
  const build = q === "q4" ? r.build_q4 : q === "q8" ? r.build_q8 : r.build_fp16;
  const vram  = q === "q4" ? r.vram_q4  : q === "q8" ? r.vram_q8  : r.vram_fp16;
  const qLabel = q === "q4" ? "Q4_K_M" : q === "q8" ? "Q8_0" : "FP16";
  const qDesc  = q === "q4" ? "Smallest file size, fastest inference, minor quality loss vs full precision" : q === "q8" ? "Balanced — near-lossless quality with moderate VRAM usage" : "Full precision — maximum quality, requires the most VRAM";

  const perfEl = document.getElementById("perf-section");
  const buildEl = document.getElementById("build-section");
  if (!perfEl || !buildEl) return;

  const pb = window._lastM.pb || 1;
  const totalPb = parseTotalPb(window._lastM);
  const buyBtn = (query) => `<a class="buybtn" href="https://www.amazon.com/s?k=${query}&tag=${AFF}" target="_blank">Search on Amazon</a>`;
  const recTag = `<span style="font-size:10px;padding:1px 6px;border-radius:3px;background:var(--green-bg);color:var(--green-text);margin-left:6px">rec</span>`;
  const isUnifiedBuild = build && build.type === "apple";
  const unifiedTypes = new Set(["apple","nvidia-uni","amd-apu"]);

  // === Build all option lists ===
  // GPU options (only those with enough VRAM)
  const gpuOpts = isUnifiedBuild
    ? BUILDS.gpus.filter(g => unifiedTypes.has(g.type) && g.v >= vram).sort((a,b) => a.v - b.v)
    : BUILDS.gpus.filter(g => !unifiedTypes.has(g.type) && g.v >= vram).sort((a,b) => a.v - b.v);
  const recGpuName = build ? build.gpu.name : (gpuOpts[0]||{}).name;

  // Find TPS for a given GPU
  function tpsForGpu(gpuName) {
    const t = tiers.find(t => t.gpu === gpuName);
    if (t) return t.tps;
    const g = BUILDS.gpus.find(x => x.name === gpuName);
    if (g && g.v >= vram) return getTPS(g.bw, g.type, pb, true, totalPb);
    return 0;
  }

  const initTPS = tpsForGpu(recGpuName);
  const speedLabel = (tps) => tps >= 30 ? "Excellent — feels instant" : tps >= 15 ? "Good — comfortable for chat" : tps >= 5 ? "Usable — noticeable delay" : tps > 0 ? "Slow — patience required" : "Not feasible";

  // CPU options
  const recCpuTier = pb <= 7 ? 0 : pb <= 14 ? 1 : pb <= 34 ? 2 : pb <= 72 ? 3 : 4;
  const recCpuName = build && build.cpu ? build.cpu.name : BUILDS.cpus[recCpuTier].name;

  // RAM options (only those big enough)
  const minRam = Math.max(32, Math.ceil(vram * 1.5));
  const ramOpts = BUILDS.ram.filter(r => r.gb >= minRam);
  const recRamName = build && build.ram ? build.ram.name : (ramOpts[0]||{}).name;

  // Storage
  const recStIdx = pb <= 14 ? 0 : pb <= 72 ? 1 : 2;
  const recStName = build && build.storage ? build.storage.name : BUILDS.storage[recStIdx].name;

  // PSU
  const recGpuObj = build && !isUnifiedBuild ? build.gpu : null;
  const gpuW = recGpuObj ? gpuTDP(recGpuObj.name) : 200;
  const minPSUW = Math.ceil((gpuW + 175) * 1.25);
  const psuOpts = BUILDS.psu.filter(p => p.w >= minPSUW);
  const recPsuName = build && build.psu ? build.psu.name : (psuOpts[0]||{}).name;
  const recCaseName = build && build.pcCase ? build.pcCase.name : "ATX Mid-Tower";
  const recMoboName = build && build.mobo ? build.mobo.name : BUILDS.mobos[0].name;
  const recCoolerName = build && build.cooler ? build.cooler.name : BUILDS.coolers[0].name;

  // Helper: build a dropdown row with data attributes
  function partRow(label, opts, recName, nameKey, extraInfo, dataAttrs) {
    if (!opts.length) return `<div class="build-row"><span class="build-part">${label}</span><span class="tnone">No compatible options</span></div>`;
    const nameField = nameKey || "name";
    const select = `<select class="swap-select" onchange="window.updatePerf()" data-part="${label.toLowerCase()}">
      ${opts.map(o => {
        const n = o[nameField];
        const extra = extraInfo ? extraInfo(o) : "";
        const rec = n === recName ? " ★" : "";
        const attrs = dataAttrs ? dataAttrs(o) : "";
        return `<option value="${n}" data-q="${o.q}"${attrs} ${n===recName?"selected":""}>${n}${extra}${rec}</option>`;
      }).join("")}
    </select>`;
    const curOpt = opts.find(o => o[nameField] === recName) || opts[0];
    return `<div class="build-row"><span class="build-part">${label}</span>${select}<a class="buybtn" href="https://www.amazon.com/s?k=${curOpt.q}&tag=${AFF}" target="_blank">Search on Amazon</a></div>`;
  }

  let specCard;
  if (!build) {
    specCard = `<div class="build-card"><div class="build-row"><span class="tnone">No single-system build available — requires multi-node cluster</span></div></div>`;
  } else if (isUnifiedBuild) {
    specCard = `<div class="build-card">
      ${partRow("System", gpuOpts, recGpuName, "name", g => " (" + g.v + "GB)", g => ' data-v="'+g.v+'" data-bw="'+g.bw+'" data-tf="'+(g.tf||0)+'" data-type="'+(g.type||"apple")+'"')}
    </div>`;
  } else {
    specCard = `<div class="build-card">
      ${partRow("GPU", gpuOpts, recGpuName, "name", g => " (" + g.v + "GB)", g => ' data-v="'+g.v+'" data-bw="'+g.bw+'" data-tf="'+(g.tf||0)+'" data-type="'+(g.type||"nvidia")+'"')}
      ${partRow("CPU", BUILDS.cpus, recCpuName, "name", null, c => ' data-tier="'+c.tier+'"')}
      ${partRow("Mobo", BUILDS.mobos, recMoboName, "name", null, null)}
      ${partRow("RAM", ramOpts, recRamName, "name", r => " (" + r.gb + "GB)", r => ' data-gb="'+r.gb+'"')}
      ${partRow("Storage", BUILDS.storage, recStName, "name", null, s => ' data-tb="'+s.tb+'"')}
      ${partRow("Cooler", BUILDS.coolers, recCoolerName, "name", null, null)}
      ${partRow("PSU", psuOpts, recPsuName, "name", null, null)}
      ${partRow("Case", BUILDS.cases, recCaseName, "name", null, null)}
    </div>`;
  }

  perfEl.innerHTML = `
    <div class="slbl">Your Build · ${qLabel} · ${vram}GB VRAM needed
      <span class="help">?<span class="htt">A complete system to run ${m.n} at ${qLabel}. Parts marked with * are the recommended picks. Use the dropdowns to swap any part — the performance estimate and Amazon links update automatically.</span></span>
    </div>
    <div style="font-size:12px;color:var(--gray-mid);margin-bottom:8px">${qDesc}</div>
    ${specCard}
    <div class="slbl" style="margin-top:1.25rem">Estimated Performance
      <span class="help">?<span class="htt">These estimates update live as you change parts above. ★ in the dropdowns marks the recommended pick for this model.</span></span>
    </div>
    <div id="perf-panel" style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px">
      <div style="background:var(--black);border-radius:8px;padding:16px 14px;text-align:center">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--gray-light);margin-bottom:8px">Generation
          <span class="help" style="background:rgba(255,255,255,0.15);color:#ccc">?<span class="htt">How fast the model outputs text. Driven by GPU memory bandwidth. 30+ = instant, 10-30 = good, under 10 = slow.</span></span>
        </div>
        <div id="perf-tps" style="font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:700;color:var(--acid);line-height:1;margin-bottom:6px">~${initTPS} t/s</div>
        <div id="perf-tps-label" style="font-size:11px;color:#999;line-height:1.3">${speedLabel(initTPS)}</div>
      </div>
      <div style="background:var(--black);border-radius:8px;padding:16px 14px;text-align:center">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--gray-light);margin-bottom:8px">First Token
          <span class="help" style="background:rgba(255,255,255,0.15);color:#ccc">?<span class="htt">Time to first token — how long before the model starts responding. The GPU must process your entire prompt before generating output. Based on a typical ~500 token prompt.</span></span>
        </div>
        <div id="perf-prompt" style="font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:700;color:var(--acid);line-height:1;margin-bottom:6px"></div>
        <div id="perf-prompt-label" style="font-size:11px;color:#999;line-height:1.3"></div>
      </div>
      <div style="background:var(--black);border-radius:8px;padding:16px 14px;text-align:center">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--gray-light);margin-bottom:8px">Load Time
          <span class="help" style="background:rgba(255,255,255,0.15);color:#ccc">?<span class="htt">Time to load model from disk. Driven by SSD speed. Only happens once when you start the model.</span></span>
        </div>
        <div id="perf-load" style="font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:700;color:var(--acid);line-height:1;margin-bottom:6px"></div>
        <div id="perf-load-label" style="font-size:11px;color:#999;line-height:1.3"></div>
      </div>
      <div style="background:var(--black);border-radius:8px;padding:16px 14px;text-align:center">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--gray-light);margin-bottom:8px">Headroom
          <span class="help" style="background:rgba(255,255,255,0.15);color:#ccc">?<span class="htt">Free RAM after model is loaded. More = longer conversations and room to run other apps.</span></span>
        </div>
        <div id="perf-ram" style="font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:700;color:var(--acid);line-height:1;margin-bottom:6px"></div>
        <div id="perf-ram-label" style="font-size:11px;color:#999;line-height:1.3"></div>
      </div>
    </div>`;

  // Store vram for perf calc
  window._buildVram = vram;
  // Trigger initial perf calc
  window.updatePerf();

  buildEl.innerHTML = "";

  // Update tab active states
  document.querySelectorAll(".qtab").forEach(t => {
    t.className = "qtab" + (t.dataset.q === q ? " on-" + (q === "fp16" ? "fp" : q) : "");
  });
}

function showResult(m, r) {
  const cs = CAT_STYLE[m.c] || CAT_STYLE.general;
  const isMoE = m.p.includes("MoE");
  // For non-quantizable models, default to fp16
  window.activeQuant = r.skipQuant ? "fp16" : "q4";

  // Context length VRAM note for text-based models
  const ctxNote = !NO_QUANT_CATS.has(m.c) ? `<div class="apple-note" style="margin-top:10px">VRAM shown is for model weights only. KV cache adds ~0.5–2 GB per 4K context tokens depending on model architecture. Larger context windows (32K–128K) may need significantly more VRAM.</div>` : "";

  // Multi-GPU note
  const multiGpuNote = (r.vram_fp16 > 24 && !NO_QUANT_CATS.has(m.c)) ? `<div class="apple-note" style="margin-top:6px">Multi-GPU note: Consumer GPUs (RTX 4090, 5090) lack NVLink — multi-GPU runs over PCIe with ~20-40% overhead. For best multi-GPU scaling, use professional cards (A100, H100) with NVLink or Apple Silicon unified memory.</div>` : "";

  // MoE note
  const moeNote = isMoE ? `<div class="apple-note" style="margin-top:6px">MoE model: Only ${m.pb}B of ${r.totalPb || m.pb}B total parameters are active per token. All weights must fit in VRAM, but inference speed scales with active parameters.</div>` : "";

  // Quant tabs — show all 3 for LLMs, FP16-only for non-quantizable models
  let quantSection;
  if (r.skipQuant) {
    quantSection = `
      <div class="slbl">Precision
        <span class="help">?<span class="htt">This model type (${CATS[m.c]||m.c}) runs at FP16/BF16 full precision. GGUF quantization (Q4, Q8) is not applicable to ${m.c === "image" || m.c === "video" ? "diffusion" : m.c === "embed" ? "embedding" : m.c === "threeD" ? "3D generation" : "audio"} models.</span></span>
      </div>
      <div class="qtabs" style="grid-template-columns:1fr">
        <button class="qtab on-fp" data-q="fp16">
          FP16 / BF16
          <div class="qtab-vram">${r.vram_fp16} GB</div>
          <div class="qtab-sub">Full precision — required for this model type</div>
        </button>
      </div>`;
  } else {
    quantSection = `
      <div class="slbl">Select quantization level
        <span class="help">?<span class="htt">Quantization compresses the model to use less memory. Q4 uses ~4 bits per parameter (smallest, fastest, minor quality loss). Q8 uses ~8 bits (balanced). FP16 uses 16 bits (full quality, most VRAM). For most uses, Q4 or Q8 is recommended.</span></span>
      </div>
      <div class="qtabs">
        <button class="qtab on-q4" data-q="q4" onclick="window.activeQuant='q4';window.renderQuant(window._lastR,window._lastM)">
          Q4_K_M
          <div class="qtab-vram">${r.vram_q4} GB</div>
          <div class="qtab-sub">Fastest · smallest</div>
        </button>
        <button class="qtab" data-q="q8" onclick="window.activeQuant='q8';window.renderQuant(window._lastR,window._lastM)">
          Q8_0
          <div class="qtab-vram">${r.vram_q8} GB</div>
          <div class="qtab-sub">Balanced</div>
        </button>
        <button class="qtab" data-q="fp16" onclick="window.activeQuant='fp16';window.renderQuant(window._lastR,window._lastM)">
          FP16
          <div class="qtab-vram">${r.vram_fp16} GB</div>
          <div class="qtab-sub">Full quality</div>
        </button>
      </div>`;
  }

  document.getElementById("mpout").innerHTML = `
    <div class="rpanel">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
        <div style="min-width:0">
          <div class="r-id">${m.id}</div>
          <div class="r-name">${m.n}</div>
          <div class="r-sub">${r.arch || m.f} · ${r.params || m.p}</div>
        </div>
        <span style="font-size:10px;padding:3px 9px;border-radius:3px;background:${cs.bg};color:${cs.fg};flex-shrink:0;font-weight:500">${CATS[m.c]||m.c}</span>
      </div>
      <div style="font-size:12px;color:var(--gray-dark);line-height:1.6;margin-top:10px">${getDesc(m)}</div>
      ${moeNote}
      ${quantSection}

      <div id="perf-section"></div>
      <div id="build-section" class="build-section"></div>

      ${ctxNote}
      ${multiGpuNote}

      <div class="slbl">Overview</div>
      <div class="verd">
        <div class="verd-t">${r.verdict || ""}</div>
        ${r.tip ? `<div class="verd-tip">${r.tip}</div>` : ""}
      </div>

      <button class="cta-build" onclick="openBuildModal(window._lastM.n, window._lastM.p, window._lastR.verdict||'')">
        &#9889; We'll Build It For You — Click Here
        <span class="cta-sub">Don't want to deal with hardware? We'll source, build, optimize, and ship a custom AI machine ready to run your models out of the box.</span>
      </button>

      <button class="pdf-btn" onclick="downloadSpecPDF()">
        &#128196; Download Spec Sheet as PDF — No Email Required
      </button>

      <div style="text-align:center;margin-top:1.25rem">
        <div style="font-family:'IBM Plex Mono',monospace;font-size:13px;font-weight:600;letter-spacing:0.04em;margin-bottom:0.6rem">Share This Project</div>
        <div class="share-bar" style="justify-content:center">
          <a class="share-btn share-x" onclick="shareOn('x','${m.n.replace(/'/g,"\\'")}')" title="Share on X">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            <span>Post on X</span>
          </a>
          <a class="share-btn share-li" onclick="shareOn('linkedin','${m.n.replace(/'/g,"\\'")}')" title="Share on LinkedIn">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            <span>LinkedIn</span>
          </a>
          <a class="share-btn share-hn" onclick="shareOn('hn','${m.n.replace(/'/g,"\\'")}')" title="Submit to Hacker News">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M0 0v24h24V0H0zm12.8 13.3v5.1h-1.6v-5.1L7.5 5.6h1.8l2.7 5.5 2.7-5.5h1.8l-3.7 7.7z"/></svg>
            <span>Hacker News</span>
          </a>
          <a class="share-btn share-rd" onclick="shareOn('reddit','${m.n.replace(/'/g,"\\'")}')" title="Share on Reddit">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.884-7.003 4.884-3.874 0-7.004-2.19-7.004-4.884 0-.18.015-.36.043-.529A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 000-.463.327.327 0 00-.462 0c-.545.533-1.684.73-2.512.73-.828 0-1.953-.197-2.498-.73a.327.327 0 00-.219-.094z"/></svg>
            <span>Reddit</span>
          </a>
          <a class="share-btn share-email" onclick="shareOn('email','${m.n.replace(/'/g,"\\'")}')" title="Share via Email">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
            <span>Email</span>
          </a>
          <a class="share-btn share-copy" onclick="shareOn('copy','${m.n.replace(/'/g,"\\'")}')" title="Copy link">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            <span>Copy Link</span>
          </a>
        </div>
      </div>
    </div>
    <div class="foot">
      Estimates based on memory bandwidth modeling · actual performance varies by GPU architecture, driver, quantization, and context length ·
      amazon links support this project
    </div>`;

  // Store refs for tab switching
  window._lastR = r;
  window._lastM = m;
  renderQuant(r, m);
}

