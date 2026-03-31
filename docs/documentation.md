# LLM Hardware — Developer Documentation

A zero-dependency, client-only SPA that tells you what hardware you need for 275+ local AI models. No build step, no framework, no backend.

## Project Structure

```
├── index.html          # Entry point — loads scripts in dependency order
├── css/style.css       # Dark mode stylesheet
└── js/
    ├── data.js         # 1. Model database (M array) + constants
    ├── core.js         # 2. Calculation engine (VRAM, TPS, bandwidth)
    ├── hardware.js     # 3. Hardware mode rendering + filtering
    ├── model.js        # 4. Model analysis + build recommendations
    ├── perf.js         # 5. Live performance estimation updates
    ├── pdf.js          # 6. Spec sheet PDF via print window
    ├── modal.js        # 7. Contact form modal
    ├── app.js          # 8. Init, mode switching, context selector, social sharing
    └── validation.js    # Test suite (run with `node js/validation.js`)
```

Scripts load in dependency order at the bottom of `index.html`. Each file adds functions to `window`.

## Data Structures

### Model Database (`M` array in `data.js`)

Every model is a plain object with 7 fields:

```js
{
  id:   "meta-llama/Llama-3.1-8B-Instruct",  // HuggingFace ID
  n:    "Llama 3.1 8B",                       // Display name
  f:    "Meta",                               // Family/creator
  p:    "8B",                                 // Param string ("8B", "47B MoE", "22M")
  pb:   8,                                    // Active params in billions (for TPS calc)
  vram: 4.8,                                  // Q4 VRAM need in GB (weights only)
  ram:  8,                                    // Min system RAM for CPU offload
  c:    "general"                             // Category
}
```

**Categories**: `general`, `code`, `reason`, `vision`, `embed`, `image`, `video`, `audio`, `threeD`, `medical`, `finance`, `legal`

**MoE models**: `pb` = active params (inference speed), `p` = total params (VRAM need). Example: Mixtral 8x7B has `pb: 12` (active) and `p: "47B MoE"` (total for VRAM).

### Hardware Data (`BUILDS` object in `model.js`)

Pre-defined components with pricing, Amazon search queries, and TFLOPS:

```js
BUILDS.gpus   // 50+ GPUs: {name, v(GB), type, bw(GB/s), tf(TFLOPS), pr($), q(search)}
BUILDS.cpus   // 5 CPUs: {name, tier(0-4), pr, q}
BUILDS.ram    // 5 kits: {name, gb, pr, q}
BUILDS.storage// 3 SSDs: {name, tb, pr, q}
BUILDS.psu    // 5 PSUs: {name, w, pr, q}
BUILDS.mobos  // 5 boards: {name, tier(0-4), pr, q}
BUILDS.coolers// 3 coolers: {name, tier(0-2), pr, q}
BUILDS.cases  // 6 cases: {name, size, q}
```

### Constants

```js
VRAM_O   // [0,2,4,6,8,10,12,16,18,20,24,32,36,40,48,64,80,96,128,...]
RAM_O    // [4,8,12,16,24,32,48,64,96,128,256,512]

BACKENDS // Inference backends with VRAM overhead and speed multipliers:
//   llamacpp: 1.0x VRAM, 1.0x TPS
//   vllm:     1.35x VRAM, 1.15x TPS (pre-allocates KV cache but batched)
//   tgi:      1.25x VRAM, 1.10x TPS
//   sglang:   1.30x VRAM, 1.15x TPS
//   mlxlm:    1.0x VRAM, 1.15x TPS (Apple Metal optimized)

GPU_T    // Hardware types: nvidia, nvidia-uni, amd, amd-apu, intel, apple, cpu

NO_QUANT_CATS // Set(["image","video","audio","embed","threeD"])
// These model types run at FP16 only — GGUF quantization doesn't apply
```

## The Calculation Engine

### Core Principle: Memory Bandwidth is the Bottleneck

LLM token generation is **memory-bandwidth bound**, not compute-bound. Each token requires reading all model weights through memory once. The formula:

```
TPS ≈ Bandwidth (GB/s) / (Params (B) × BytesPerParam × Overhead)
```

### Bytes Per Param by Quantization

| Quant | Bytes/Param | VRAM Multiplier | TPS Scale |
|-------|-------------|-----------------|-----------|
| Q4_K_M | 0.6 | 1.0x | 1.0x |
| Q8_0   | 1.1 | 1.83x | 0.55x |
| FP16   | 2.0 | 3.33x | 0.30x |

### Bandwidth Estimation (`estimateBandwidth` in `core.js`)

When the user picks a VRAM amount but not a specific GPU, bandwidth is estimated from VRAM size and hardware type:

```
Apple Silicon:  192GB→819, 64-128GB→546, 48GB→350, 36GB→546, 18-24GB→200, ≤16GB→100-120
NVIDIA discrete: 192GB→3000, 80GB→2000, 48GB→1000, 24GB→700, 16GB→500, 12GB→360, 8GB→300
AMD discrete:    192GB→5300, 48GB→1000, 24GB→500, else→200
Intel Arc:       24GB→560, 16GB→560, 12GB→456, 8GB→512
CPU only:        40 GB/s (DDR4/DDR5 average)
```

### TPS Calculation (`getTPS` in `core.js`)

**MoE Update**: MoE models now use only active params for TPS. All weights must fit in VRAM, but inference throughput scales with active params:

```js
function getTPS(vramOrBw, gpuType, pb, isBandwidth, totalPb) {
  const bwGBs = isBandwidth ? vramOrBw : estimateBandwidth(vramOrBw, gpuType);
  const bytesPerParam = 0.6;     // Q4 baseline
  const overhead = 1.15;         // KV cache, attention, etc.

  // MoE: only active params determine generation speed
  const effectivePb = pb;

  const rawTPS = bwGBs / (effectivePb * bytesPerParam * overhead);

  // Soft ceiling: small models can't saturate high-bandwidth GPUs
  const ceiling = bwGBs <= 300 ? 80 : bwGBs <= 600 ? 120 :
                  bwGBs <= 1100 ? 150 : bwGBs <= 2000 ? 200 : 300;

  return Math.min(ceiling, Math.max(1, Math.round(rawTPS)));
}
```

### KV Cache VRAM (`calcKvVram` in `core.js`)

Dynamic KV cache allocation based on context length. Formula:

```
KV_VRAM = (params_B / 8) * (context / 1000) * 0.012 GB
```

Example:
- 8B model at 4K context: 0.048 GB
- 8B model at 32K context: 0.384 GB
- 70B model at 128K context: ~13.8 GB

### Compatibility Check (`compat` in `core.js`)

The main function that answers "can this model run on this hardware?" Returns `{s: "yes"|"slow"|"no", tps: number}`.

**Decision tree:**

1. **Non-quantizable models** (image/video/audio/embed/3D): Simple fit check. VRAM need = `m.vram × backend.vramMult`. If VRAM fits → `"yes"`, else → `"no"`. No TPS calculated.

2. **Unified memory** (Apple Silicon, AMD APU, NVIDIA DGX): Single memory pool. If `vram >= need + kvVram` → `"yes"` with TPS. No CPU offload possible.

3. **Discrete GPU — fits in VRAM**: If `availableVram >= need && ram >= m.ram` → `"yes"` with full GPU TPS. `availableVram = vram - kvVram`.

4. **Discrete GPU — CPU offload**: If `vram + ram >= need + 4` (4GB OS overhead) → `"slow"` with **harmonic mean** bandwidth:
   ```
   offRatio = min(0.95, availableVram / need)     // Fraction of model in VRAM
   
   // Harmonic mean: devices process sequentially, not in parallel
   // B_eff = 1 / (r/B_gpu + (1-r)/B_cpu)
   effBw = 1 / (offR / gpuBw + (1 - offR) / cpuBw)
   
   TPS = effBw / (activePb × bytesPerParam × 1.15)
   ```

5. **Not enough total memory** → `"no"`

### Quantization Scaling

The `m.vram` field stores Q4 VRAM need. For other quants:
```
Q4:  baseNeed = m.vram × 1.0
Q8:  baseNeed = m.vram × (1.1/0.6) = m.vram × 1.83
FP16: baseNeed = m.vram × (2.0/0.6) = m.vram × 3.33
```

Then apply backend overhead: `need = baseNeed × backend.vramMult`

## Performance Estimation (`perf.js`)

Four metrics calculated live when the user swaps build components:

### 1. Generation Speed (TPS)
Reads selected GPU's `data-bw` and `data-type` attributes, calls `getTPS(bw, type, pb, true, totalPb) × qScale`.

### 2. Time to First Token (TTFT) — Compute-Bound
**Update**: Prefill is now compute-bound (not bandwidth-bound) on modern GPUs. Uses TFLOPS:

```js
// Compute-bound prefill: TFLOPS / (2 * params in billions)
const computeTPS = (tf * 1e12) / (2 * activePb * 1e9);
ttft = context / computeTPS;
```

For GPUs without TFLOPS data, falls back to bandwidth-based estimation.

### 3. Load Time (Storage)
```
readSpeed: 1TB SSD → 3500 MB/s, 2TB → 5000, 4TB → 7000
loadTime = (vram × 1024) / readSpeed
```

### 4. RAM Headroom
```
headroom = ramGB - vram - ceil(vram × 0.15) - 4 - kvVram
// model weights + 15% overhead + KV cache at current context + 4GB OS
```

## Context Length Selector

Global context length selector in the header (index.html). Changing it:

1. Updates `window.contextLength`
2. Triggers re-render of hardware mode
3. Recalculates KV cache VRAM overhead
4. Re-runs `compat()` with new context

Available options: 4K, 8K, 16K, 32K, 64K, 128K tokens.

## Unified vs Discrete Memory

The UI handles unified memory architectures differently:

- **Apple Silicon, AMD Strix Halo, NVIDIA DGX**: RAM input is disabled in hardware mode. User enters total unified memory as "VRAM". Info notes explain this.
- **Discrete GPUs**: Both VRAM and RAM inputs enabled. CPU offload is calculated when model doesn't fully fit in VRAM.

## Build Recommendations (`model.js`)

### `pickBuild(vramNeeded, pb)` — Cheapest GPU That Fits

Algorithm:
1. **GPU**: Find cheapest GPU (PC or unified) with enough VRAM
2. **RAM**: `max(32GB, ceil(vramNeeded × 1.5))` — 1.5× for headroom
3. **CPU tier**: Based on model size — ≤7B→tier0, ≤14B→tier1, ≤34B→tier2, ≤72B→tier3, >72B→tier4
4. **Storage**: ≤14B→1TB, ≤72B→2TB, >72B→4TB
5. **PSU**: `(gpuTDP + 175W) × 1.25` — GPU + CPU headroom + 25% safety margin
6. **Case**: Multi-GPU→rack/server, datacenter GPU→server, small model→ITX, medium→ATX
7. **Motherboard**: Matches CPU tier and GPU needs
8. **Cooler**: Based on CPU tier power draw

### Performance Tiers

For each quant level, TPS is calculated across 30+ reference GPUs. GPUs that don't have enough VRAM get `tps: 0`. This produces the "what GPU gives what speed" table.

### Verdict Generation

Rule-based text based on Q4 VRAM need:
- ≤8GB: "runs on most modern GPUs"
- ≤16GB: "needs 16GB+ GPU"
- ≤24GB: "needs RTX 3090/4090"
- ≤48GB: "needs professional hardware"
- >48GB: "datacenter-class"

Category-specific overrides for image/video/audio/embed/medical/finance/legal models add precision requirements and disclaimers.

## Rendering Flow

### Two Modes

**Hardware Mode** (`hardware.js`):
1. User selects VRAM, RAM, GPU type, backend, quant
2. `renderHardware()` runs `compat()` on all 275 models
3. Results filtered by category, status (yes/slow/no), search query
4. Sorted: yes first, then slow, then no; within each group by VRAM ascending
5. Rendered as compact cards — clicking a card switches to model mode

**Model Mode** (`model.js`):
1. User searches → autocomplete from `M` array (matches name, family, ID, params)
2. Selecting a model calls `doAnalysis(m)`:
   - Calculates VRAM for Q4, Q8, FP16 from total params
   - Generates performance tiers for each quant
   - Picks builds for each quant
   - Generates verdict + tip
3. `showResult()` renders the full report panel
4. `renderQuant()` renders the build spec with dropdowns and performance cards

### Live Part Swapping

Build component dropdowns have `data-*` attributes (`data-bw`, `data-tf`, `data-type`, `data-gb`, `data-tb`). When changed:
1. `onchange="window.updatePerf()"` fires
2. `updatePerf()` reads selected options' data attributes
3. Recalculates TPS, TTFT, load time, RAM headroom
4. Updates DOM elements directly (`perf-tps`, `perf-prompt`, `perf-load`, `perf-ram`)
5. Also updates Amazon search links with new part's `data-q` value

### Global State

```js
window._lastM        // Currently analyzed model object
window._lastR        // Analysis result (VRAM, tiers, builds, verdict)
window.activeQuant   // "q4" | "q8" | "fp16"
window._buildVram    // VRAM needed for current quant (for perf calc)
window._hwScrollY    // Scroll position saved when leaving hardware mode
window._cameFromHardware // Flag for scroll restoration
window.contextLength  // Global context length (default: 4096)
```

### PDF Generation (`pdf.js`)

Opens a new window with a print-optimized HTML document containing the model's build spec and performance numbers, then calls `window.print()`. Uses `@media print` CSS for A4 formatting.

## Validation Suite

Run tests with `node js/validation.js`:

- TPS benchmarks (Llama 3 8B, Mixtral 8x7B, Qwen 72B on various GPUs)
- VRAM fit checks
- CPU offload scenarios
- KV cache VRAM calculations
- Context length impact
- Apple Silicon compatibility
- Non-quantizable models (SDXL)
- Bandwidth estimation

18 tests with ±15-30% tolerance.

## Adding a New Model

Add one entry to the `M` array in `data.js`:

```js
{id:"org/model-name", n:"Display Name", f:"Family", p:"7B", pb:7, vram:4.2, ram:8, c:"general"}
```

- `pb`: Active params in billions (for MoE, the active count)
- `vram`: Q4 VRAM need in GB (calculated as `pb × 0.6`)
- `ram`: Minimum system RAM for CPU offload
- `c`: One of the 12 categories

Then add a description to the `DESC` map keyed by the `id`.

## Apple Silicon Profiles

The app now includes explicit Apple SoC profiles with known bandwidths (not estimated from VRAM size):

| SoC | Unified Memory | Bandwidth | TFLOPS |
|-----|----------------|-----------|--------|
| M3/M4 Air | 8-24GB | 100-120 GB/s | 0.5-0.6 |
| M3 Pro | 18-36GB | 150 GB/s | 4.0 |
| M4 Pro | 24-48GB | 273 GB/s | 6.0 |
| M3 Max | 36-48GB | 400 GB/s | 15.0 |
| M4 Max | 36-128GB | 546 GB/s | 18.0 |
| M4 Ultra | 192-512GB | 819 GB/s | 38.0 |

This decoupling ensures bandwidth doesn't scale linearly with RAM capacity — it stays tied to the chip tier.
