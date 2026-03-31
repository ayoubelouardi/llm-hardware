// perf.js — Live performance estimation updates
window.updatePerf = function() {
  // Update all Amazon links
  document.querySelectorAll(".swap-select").forEach(sel => {
    const opt = sel.options[sel.selectedIndex];
    if (!opt) return;
    const q = opt.dataset.q;
    if (!q) return;
    const link = sel.closest(".build-row").querySelector(".buybtn");
    if (link) link.href = "https://www.amazon.com/s?k=" + q + "&tag=" + AFF;
  });

  const m = window._lastM;
  const r = window._lastR;
  const activePb = m ? m.pb || 1 : 1;
  const totalPb = m ? parseTotalPb(m) : activePb;
  const vram = window._buildVram || 1;
  const qnt = window.activeQuant;
  const qScale = qnt === "q4" ? 1 : qnt === "q8" ? 0.55 : 0.3;

  // --- Generation Speed (GPU) ---
  const gpuSel = document.querySelector('[data-part="gpu"]') || document.querySelector('[data-part="system"]');
  let tps = 0;
  if (gpuSel) {
    const opt = gpuSel.options[gpuSel.selectedIndex];
    const bw = parseFloat(opt.dataset.bw) || 0;
    const type = opt.dataset.type || "nvidia";
    tps = Math.max(1, Math.round(getTPS(bw, type, activePb, true, totalPb) * qScale));
  }
  const tpsLabel = tps >= 30 ? "Excellent — feels instant" : tps >= 15 ? "Good — comfortable for chat" : tps >= 5 ? "Usable — noticeable delay" : tps > 0 ? "Slow — patience required" : "N/A";
  const tpsEl = document.getElementById("perf-tps");
  const tpsLblEl = document.getElementById("perf-tps-label");
  if (tpsEl) tpsEl.textContent = "~" + tps + " t/s";
  if (tpsLblEl) tpsLblEl.textContent = tpsLabel;

  // --- Time to First Token (GPU-bound prefill) ---
  // Prefill processes the full prompt before generating the first output token.
  // Bottleneck is reading all model weights through the GPU — same as generation
  // but multiplied by prompt length. For a typical ~500 token prompt:
  let ttft = 0;
  if (gpuSel) {
    const genTPS = tps / qScale; // raw generation TPS before quant scaling
    // Prefill throughput ≈ generation TPS * prefill speedup (batched reads are more efficient)
    // Typical prefill is 5-15x faster than generation for small prompts.
    // Use totalPb for sizing — MoE prefill touches all experts, not just active ones.
    const sizePb = totalPb || activePb;
    const prefillMult = sizePb <= 4 ? 15 : sizePb <= 14 ? 10 : sizePb <= 34 ? 7 : sizePb <= 72 ? 5 : 3;
    const prefillTPS = genTPS * prefillMult * qScale;
    const promptTokens = 500; // typical prompt length
    ttft = prefillTPS > 0 ? promptTokens / prefillTPS : 0;
  }
  const ttftLabel = ttft <= 0.5 ? "Instant" : ttft <= 1.5 ? "Fast — barely noticeable" : ttft <= 4 ? "Moderate — brief pause" : ttft > 0 ? "Slow — noticeable wait" : "N/A";
  const promptEl = document.getElementById("perf-prompt");
  const promptLblEl = document.getElementById("perf-prompt-label");
  if (promptEl) promptEl.textContent = ttft > 0 ? (ttft < 1 ? "<1s" : "~" + Math.round(ttft) + "s") : "—";
  if (promptLblEl) promptLblEl.textContent = ttftLabel;

  // --- Model Load Time (Storage) ---
  const storageSel = document.querySelector('[data-part="storage"]');
  let loadTime = 0;
  if (storageSel) {
    const opt = storageSel.options[storageSel.selectedIndex];
    const tb = parseFloat(opt.dataset.tb) || 1;
    // Read speed: 1TB ~3500 MB/s, 2TB ~5000, 4TB ~7000
    const readSpeed = tb <= 1 ? 3500 : tb <= 2 ? 5000 : 7000;
    const modelSizeGB = vram; // model file ≈ VRAM needed for this quant
    const modelSizeMB = modelSizeGB * 1024;
    loadTime = Math.max(1, Math.round(modelSizeMB / readSpeed));
  }
  const loadLabel = loadTime <= 3 ? "Nearly instant" : loadTime <= 10 ? "Quick — a few seconds" : loadTime <= 30 ? "Moderate — grab a coffee" : "Slow — takes a minute+";
  const loadEl = document.getElementById("perf-load");
  const loadLblEl = document.getElementById("perf-load-label");
  if (loadEl) loadEl.textContent = loadTime > 0 ? "~" + loadTime + "s" : "—";
  if (loadLblEl) loadLblEl.textContent = loadLabel;

  // --- RAM Headroom ---
  const ramSel = document.querySelector('[data-part="ram"]');
  let headroom = 0;
  if (ramSel) {
    const opt = ramSel.options[ramSel.selectedIndex];
    const gb = parseFloat(opt.dataset.gb) || 32;
    // Model footprint + ~4GB OS + ~15% overhead for KV cache, runtime buffers, context
    const overhead = Math.ceil(vram * 0.15) + 4;
    headroom = Math.max(0, gb - Math.ceil(vram) - overhead);
  }
  const ramLabel = headroom >= 32 ? "Plenty — multitask freely" : headroom >= 16 ? "Good — room for apps + context" : headroom >= 8 ? "Tight — close other apps" : headroom > 0 ? "Very tight — model only" : "Not enough RAM";
  const ramEl = document.getElementById("perf-ram");
  const ramLblEl = document.getElementById("perf-ram-label");
  if (ramEl) ramEl.textContent = headroom > 0 ? headroom + " GB" : "0 GB";
  if (ramLblEl) ramLblEl.textContent = ramLabel;
}
