// pdf.js — Spec sheet PDF via print window
window.downloadSpecPDF = function() {
  const m = window._lastM;
  const r = window._lastR;
  if (!m || !r) return;

  const q = window.activeQuant;
  const qLabel = q === "q4" ? "Q4_K_M" : q === "q8" ? "Q8_0" : "FP16";
  const vram  = q === "q4" ? r.vram_q4  : q === "q8" ? r.vram_q8  : r.vram_fp16;
  const desc = getDesc(m);

  function getSelected(part) {
    const sel = document.querySelector('[data-part="' + part + '"]');
    if (!sel) return null;
    const opt = sel.options[sel.selectedIndex];
    return opt ? opt.value : null;
  }

  const selGpu = getSelected("gpu") || "N/A";
  const selCpu = getSelected("cpu");
  const selMobo = getSelected("mobo");
  const selRam = getSelected("ram");
  const selStorage = getSelected("storage");
  const selCooler = getSelected("cooler");
  const selPsu = getSelected("psu");
  const selCase = getSelected("case");
  const isApple = !selCpu;

  const perfTPS = (document.getElementById("perf-tps") || {}).textContent || "—";
  const perfTPSLabel = (document.getElementById("perf-tps-label") || {}).textContent || "";
  const perfPrompt = (document.getElementById("perf-prompt") || {}).textContent || "—";
  const perfPromptLabel = (document.getElementById("perf-prompt-label") || {}).textContent || "";
  const perfLoad = (document.getElementById("perf-load") || {}).textContent || "—";
  const perfLoadLabel = (document.getElementById("perf-load-label") || {}).textContent || "";
  const perfRam = (document.getElementById("perf-ram") || {}).textContent || "—";
  const perfRamLabel = (document.getElementById("perf-ram-label") || {}).textContent || "";

  let buildRows;
  if (isApple) {
    buildRows = '<tr><td class="lbl">System</td><td>' + selGpu + '</td></tr>';
  } else {
    buildRows = [
      ["GPU", selGpu],
      ["CPU", selCpu],
      ["Motherboard", selMobo],
      ["RAM", selRam],
      ["Storage", selStorage],
      ["Cooler", selCooler],
      ["PSU", selPsu],
      ["Case", selCase]
    ].map(function(p) {
      return '<tr><td class="lbl">' + p[0] + '</td><td>' + (p[1] || "N/A") + '</td></tr>';
    }).join("");
  }

  var perfCards = [
    {label: "Generation", val: perfTPS, desc: perfTPSLabel},
    {label: "Prompt", val: perfPrompt, desc: perfPromptLabel},
    {label: "Load Time", val: perfLoad, desc: perfLoadLabel},
    {label: "Headroom", val: perfRam, desc: perfRamLabel}
  ].map(function(c) {
    return '<div class="pc"><div class="pc-lbl">' + c.label + '</div><div class="pc-val">' + c.val + '</div><div class="pc-desc">' + c.desc + '</div></div>';
  }).join("");

  var verdict = (r.verdict || "") + (r.tip ? " " + r.tip : "");

  var html = '<!DOCTYPE html><html><head><meta charset="UTF-8">' +
    '<title>' + m.n + ' — Build Spec Sheet</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=IBM+Plex+Mono:wght@0,400;0,500;0,600&display=swap" rel="stylesheet">' +
    '<style>' +
    '*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }' +
    'body { font-family:"IBM Plex Mono","Menlo",monospace; color:#131110; padding:48px 56px; max-width:800px; margin:0 auto; background:#fff; }' +
    '.header-bar { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:32px; }' +
    '.header-left { flex:1; min-width:0; }' +
    '.id { font-size:11px; color:#ABA39A; margin-bottom:6px; word-break:break-all; }' +
    'h1 { font-family:"Barlow Condensed",sans-serif; font-size:36px; font-weight:700; letter-spacing:-1px; line-height:1.1; margin-bottom:4px; }' +
    '.sub { font-size:12px; color:#7A7268; margin-bottom:10px; }' +
    '.badge { display:inline-block; background:#131110; color:#DEFF3E; font-size:11px; font-weight:600; padding:5px 14px; border-radius:4px; letter-spacing:0.06em; }' +
    '.desc { font-size:11px; color:#5A554E; line-height:1.7; margin-bottom:28px; }' +
    '.section { font-size:10px; text-transform:uppercase; letter-spacing:0.14em; color:#ABA39A; margin:28px 0 10px; font-weight:600; }' +
    'table { width:100%; border-collapse:collapse; }' +
    'td { padding:10px 14px; font-size:12px; border-bottom:1px solid #E8E4DD; color:#131110; font-weight:500; }' +
    'td.lbl { font-weight:600; font-size:10px; text-transform:uppercase; letter-spacing:0.1em; color:#ABA39A; width:100px; }' +
    '.perf { display:flex; gap:10px; margin:12px 0 24px; }' +
    '.pc { flex:1; background:#131110; border-radius:8px; padding:18px 12px; text-align:center; }' +
    '.pc-lbl { font-size:9px; text-transform:uppercase; letter-spacing:0.1em; color:#ABA39A; margin-bottom:10px; }' +
    '.pc-val { font-family:"Barlow Condensed",sans-serif; font-size:28px; font-weight:700; color:#DEFF3E; line-height:1; margin-bottom:6px; }' +
    '.pc-desc { font-size:9px; color:#888; line-height:1.4; }' +
    '.verdict { background:#F4F1EB; border:1px solid #E8E4DD; border-radius:6px; padding:14px 16px; font-size:12px; line-height:1.7; color:#47433E; margin-top:20px; }' +
    '.footer { margin-top:36px; padding-top:14px; border-top:1px solid #E8E4DD; font-size:9px; color:#ABA39A; display:flex; justify-content:space-between; letter-spacing:0.04em; }' +
    '@media print {' +
    '  body { padding:28px 36px; -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; }' +
    '  .pc { background:#131110 !important; -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; }' +
    '  .pc-val { color:#DEFF3E !important; }' +
    '  .badge { background:#131110 !important; color:#DEFF3E !important; -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; }' +
    '  @page { margin:1cm; size:A4 portrait; }' +
    '}' +
    '</style></head><body>' +
    '<div class="header-bar"><div class="header-left">' +
    '<div class="id">' + m.id + '</div>' +
    '<h1>' + m.n + '</h1>' +
    '<div class="sub">' + (r.arch || m.f) + ' &middot; ' + (r.params || m.p) + '</div>' +
    '</div><div class="badge">' + qLabel + ' &middot; ' + vram + 'GB VRAM</div></div>' +
    '<div class="desc">' + desc + '</div>' +
    '<div class="section">Recommended Build</div>' +
    '<table>' + buildRows + '</table>' +
    '<div class="section">Estimated Performance</div>' +
    '<div class="perf">' + perfCards + '</div>' +
    '<div class="section">Overview</div>' +
    '<div class="verdict">' + verdict + '</div>' +
    '<div class="footer"><span>LLM Hardware Requirements</span><span>' + new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}) + '</span></div>' +
    '</body></html>';

  var win = window.open("", "_blank");
  if (!win) {
    alert("Pop-up blocked — please allow pop-ups for this site and try again.");
    return;
  }
  win.document.write(html);
  win.document.close();

  // Wait for fonts to load before printing
  win.onload = function() {
    setTimeout(function() {
      win.print();
    }, 400);
  };
}
