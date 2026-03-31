// hardware.js — Hardware mode rendering and filtering
let HS = {vram:12, ram:32, gpuType:"nvidia", cat:"all", status:"all", q:"", quant:"q4", backend:"llamacpp"};

function renderHardware() {
  const results = M.map(m => ({...m, r: compat(m, HS.vram, HS.ram, HS.gpuType, HS.quant, HS.backend)}));
  const counts = {
    yes:  results.filter(x => x.r.s==="yes").length,
    slow: results.filter(x => x.r.s==="slow").length,
    no:   results.filter(x => x.r.s==="no").length,
  };
  let f = results;
  if (HS.cat !== "all")   f = f.filter(x => x.c === HS.cat);
  if (HS.status !== "all") f = f.filter(x => x.r.s === HS.status);
  if (HS.q.trim())        { const _q=HS.q.toLowerCase(); f = f.filter(x => x.n.toLowerCase().includes(_q) || x.f.toLowerCase().includes(_q) || x.id.toLowerCase().includes(_q) || (CATS[x.c]||"").toLowerCase().includes(_q) || x.c.toLowerCase().includes(_q)); }
  f = [...f].sort((a,b) => {const o={yes:0,slow:1,no:2}; return o[a.r.s]-o[b.r.s] || a.vram-b.vram;});

  const vramIsCustom = HS._customVram || false;
  const ramIsCustom = HS._customRam || false;
  const VS = VRAM_O.map(v => `<option value="${v}"${!vramIsCustom&&v===HS.vram?" selected":""}>${v===0?"None (CPU only)":v+" GB"}</option>`).join("") + `<option value="custom"${vramIsCustom?" selected":""}>Custom...</option>`;
  const RS = RAM_O.map(v => `<option value="${v}"${!ramIsCustom&&v===HS.ram?" selected":""}>${v} GB</option>`).join("") + `<option value="custom"${ramIsCustom?" selected":""}>Custom...</option>`;
  const GS = GPU_T.map(g => `<option value="${g.v}"${g.v===HS.gpuType?" selected":""}>${g.l}</option>`).join("");
  const BS = BACKENDS.map(b => `<option value="${b.v}"${b.v===HS.backend?" selected":""}>${b.l}</option>`).join("");

  const be = getBackend(HS.backend);
  let beNote = "";
  if (be.vramMult > 1) beNote = `<div class="apple-note">${be.l}: uses ~${Math.round((be.vramMult-1)*100)}% more VRAM than llama.cpp due to KV cache pre-allocation and serving overhead. Throughput may be higher for batched requests.</div>`;
  if (HS.backend === "mlxlm" && HS.gpuType !== "apple" && HS.gpuType !== "amd-apu") beNote = `<div class="apple-note">MLX LM is Apple Silicon only. Select Apple Silicon as your hardware type to use this backend.</div>`;
  if (HS.backend === "mlxlm" && (HS.gpuType === "apple" || HS.gpuType === "amd-apu")) beNote = `<div class="apple-note" style="background:var(--green-bg);color:var(--green-text);border-color:var(--green-border)">MLX LM: native Apple Metal inference — ~10-20% faster than llama.cpp/Ollama on Apple Silicon. Use MLX-format models from mlx-community on HuggingFace.</div>`;

  const STAT = [
    {k:"yes",  cls:"g", label:"run on GPU", tip:"Model fits entirely in your GPU VRAM. Full speed inference."},
    {k:"slow", cls:"a", label:"CPU offloaded", tip:"Model doesn't fully fit in VRAM. Parts run on CPU/RAM instead, which is much slower but still works."},
    {k:"no",   cls:"r", label:"won't run", tip:"Not enough combined GPU VRAM + system RAM to load this model."},
  ].map(({k,cls,label,tip}) => `
    <div class="sc ${cls}${HS.status!=="all"&&HS.status!==k?" dim":""}" title="${tip}" onclick="hset('status','${HS.status===k?"all":k}')">
      <div class="n">${counts[k]}</div>
      <div class="l">${label}</div>
    </div>`).join("");

  const CP = Object.entries(CATS).map(([k,v]) =>
    `<button class="fpill${HS.cat===k?" on":""}" onclick="hset('cat','${k}')">${v}</button>`
  ).join("");

  const CARDS = f.map(m => {
    const isNQ = NO_QUANT_CATS.has(m.c);
    const sp = m.r.s === "no"
      ? `<span class="stxt no">no fit</span>`
      : isNQ
        ? `<span class="stxt ${m.r.s}">fits</span>`
        : `<span class="stxt ${m.r.s}">~${m.r.tps} t/s</span>`;
    return `
      <div class="mcard ${m.r.s}" title="${getDesc(m).replace(/"/g,'&quot;')}" onclick="switchToModel(${M.findIndex(x=>x.id===m.id)})">
        <div class="cn">${m.n}</div>
        <div class="cmeta">
          <span class="tag">${m.p}</span>
          ${catBadge(m.c)}
          ${sp}
        </div>
      </div>`;
  }).join("");

  document.getElementById("hpanel").innerHTML = `
    <div style="font-size:12px;color:var(--gray-mid);margin-bottom:8px">Select your specs below to see what you can run</div>
    <div class="specs-panel" style="grid-template-columns:1fr 1fr 1fr 1fr">
      <div class="sf">
        <label>GPU VRAM</label>
        ${vramIsCustom
          ? `<input class="si" type="number" min="1" max="9999" value="${HS.vram}" onchange="HS._customVram=true;hset('vram',Number(this.value))" style="padding:7px 9px;font-size:13px" placeholder="Enter GB">`
          : `<select onchange="if(this.value==='custom'){HS._customVram=true;renderHardware()}else{HS._customVram=false;hset('vram',Number(this.value))}">${VS}</select>`}
      </div>
      <div class="sf"${HS.gpuType==="apple"||HS.gpuType==="amd-apu"||HS.gpuType==="nvidia-uni"?' style="opacity:0.3;pointer-events:none"':""}>
        <label>System RAM${HS.gpuType==="apple"||HS.gpuType==="amd-apu"||HS.gpuType==="nvidia-uni"?" (n/a)":""}</label>
        ${ramIsCustom
          ? `<input class="si" type="number" min="1" max="9999" value="${HS.ram}" onchange="HS._customRam=true;hset('ram',Number(this.value))" style="padding:7px 9px;font-size:13px" placeholder="Enter GB">`
          : `<select onchange="if(this.value==='custom'){HS._customRam=true;renderHardware()}else{HS._customRam=false;hset('ram',Number(this.value))}">${RS}</select>`}
      </div>
      <div class="sf">
        <label>Hardware</label>
        <select onchange="hset('gpuType',this.value)">${GS}</select>
      </div>
      <div class="sf">
        <label>Inference</label>
        <select onchange="hset('backend',this.value)">${BS}</select>
      </div>
    </div>
    ${HS.gpuType==="apple" ? `<div class="apple-note">Apple Silicon: enter total unified memory as VRAM. System RAM ignored.</div>` : ""}
    ${HS.gpuType==="nvidia-uni" ? `<div class="apple-note">NVIDIA DGX Spark, GB10, Grace Hopper: enter total unified memory as VRAM. System RAM ignored — memory is shared like Apple Silicon.</div>` : ""}
    ${HS.gpuType==="amd-apu" ? `<div class="apple-note">AMD Strix Halo / Strix Point with unified memory: enter total unified memory as VRAM. System RAM ignored. For regular AMD APUs (Ryzen with iGPU), select "CPU only" instead.</div>` : ""}
    ${HS.gpuType==="intel" ? `<div class="apple-note">Intel Arc: uses SYCL/oneAPI via llama.cpp and Ollama. Driver and software support is maturing — expect ~10-20% slower than equivalent NVIDIA VRAM class.</div>` : ""}
    ${beNote}
    <div class="frow" style="margin-bottom:10px">
      <button class="fpill${HS.quant==="q4"?" on":""}" onclick="hset('quant','q4')">Q4 (smallest)</button>
      <button class="fpill${HS.quant==="q8"?" on":""}" onclick="hset('quant','q8')">Q8 (balanced)</button>
      <button class="fpill${HS.quant==="fp16"?" on":""}" onclick="hset('quant','fp16')">FP16 (full)</button>
    </div>
    <div class="stat-row">${STAT}</div>
    <div class="frow">
      ${CP}
    </div>
    <input class="si" type="text" id="hq" placeholder="Filter models..." value="${HS.q}" oninput="hFilterQ(this.value)" style="margin-top:10px">
    <div class="count-lbl" id="hcount" style="margin-top:8px">${f.length} of ${M.length} models at ${HS.quant==="q4"?"Q4_K_M":HS.quant==="q8"?"Q8_0":"FP16"} · click any for full spec report</div>
    <div class="mgrid" id="hgrid">${CARDS}</div>
  `;
}

window.hset = function(k, v) { HS[k] = v; renderHardware(); }

window.hFilterQ = function(v) {
  HS.q = v;
  // Only re-render the cards and count, not the whole panel (preserves input focus)
  const results = M.map(m => ({...m, r: compat(m, HS.vram, HS.ram, HS.gpuType, HS.quant, HS.backend)}));
  let f = results;
  if (HS.cat !== "all")    f = f.filter(x => x.c === HS.cat);
  if (HS.status !== "all") f = f.filter(x => x.r.s === HS.status);
  if (v.trim())            { const _q=v.toLowerCase(); f = f.filter(x => x.n.toLowerCase().includes(_q) || x.f.toLowerCase().includes(_q) || x.id.toLowerCase().includes(_q) || (CATS[x.c]||"").toLowerCase().includes(_q) || x.c.toLowerCase().includes(_q)); }
  f = [...f].sort((a,b) => {const o={yes:0,slow:1,no:2}; return o[a.r.s]-o[b.r.s] || a.vram-b.vram;});

  const CARDS = f.map(m => {
    const isNQ = NO_QUANT_CATS.has(m.c);
    const sp = m.r.s === "no"
      ? `<span class="stxt no">no fit</span>`
      : isNQ
        ? `<span class="stxt ${m.r.s}">fits</span>`
        : `<span class="stxt ${m.r.s}">~${m.r.tps} t/s</span>`;
    return `
      <div class="mcard ${m.r.s}" title="${getDesc(m).replace(/"/g,'&quot;')}" onclick="switchToModel(${M.findIndex(x=>x.id===m.id)})">
        <div class="cn">${m.n}</div>
        <div class="cmeta">
          <span class="tag">${m.p}</span>
          ${catBadge(m.c)}
          ${sp}
        </div>
      </div>`;
  }).join("");

  const qLbl = HS.quant==="q4"?"Q4_K_M":HS.quant==="q8"?"Q8_0":"FP16";
  document.getElementById("hcount").textContent = f.length + " of " + M.length + " models at " + qLbl + " · click any for full spec report";
  document.getElementById("hgrid").innerHTML = CARDS;
}

window.switchToModel = function(i) {
  window._cameFromHardware = true;
  window._hwScrollY = window.scrollY;
  window.scrollTo(0, 0);
  switchMode(1);
  doAnalysis(M[i]);
  requestAnimationFrame(() => window.scrollTo(0, 0));
}
