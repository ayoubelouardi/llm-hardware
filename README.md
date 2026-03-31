# LLM Hardware

Find out exactly what hardware you need to run any local AI model. A self-contained web app covering 275+ models with full build specs, VRAM requirements, and performance estimates.

## Features

- **Two modes:**
  - *I have hardware* — Select your GPU/RAM and see what models you can run
  - *I have a model* — Search any model and get a recommended build
- **275+ models** across all categories: text, code, reasoning, vision, image generation, video generation, audio, embeddings, 3D, and domain-specific (medical, finance, legal)
- **Full build specs** with recommended GPU, CPU, RAM, storage, PSU, motherboard, cooler, and case
- **Live performance estimates** — generation speed, time to first token, load time, and RAM headroom
- **Quantization support** — Q4_K_M, Q8_0, and FP16 with per-quant build recommendations
- **Multi-backend** — llama.cpp/Ollama, LM Studio, KoboldCpp, MLX LM, vLLM, TGI, SGLang
- **Multi-platform** — NVIDIA (CUDA), AMD (ROCm), Intel Arc (SYCL), Apple Silicon, CPU-only
- **PDF export** — Generate a printable spec sheet for any model
- **Dark mode** UI
- **Zero dependencies** — Pure HTML/CSS/JS, no build step, runs locally or on any static host

## Quick Start

### Run locally

Open `index.html` in your browser, or serve it:

```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve .
```

### Deploy

Drop the files on any static hosting — Netlify, Vercel, GitHub Pages, Cloudflare Pages, or a plain web server. No backend required.

## Project Structure

```
├── index.html          # Main entry point
├── css/
│   └── style.css       # Dark mode styles
└── js/
    ├── data.js         # Model database (275+ models) and constants
    ├── core.js         # VRAM/TPS calculation engine
    ├── hardware.js     # Hardware mode rendering and filtering
    ├── model.js        # Model analysis, build recommendations, performance
    ├── perf.js         # Live performance estimation updates
    ├── pdf.js          # Spec sheet PDF generation (print window)
    ├── modal.js        # Contact form modal
    ├── app.js          # Initialization, mode switching, social sharing
    └── email.min.js    # EmailJS SDK (optional, for contact form)
```

## How It Works

The app models LLM inference as a **memory bandwidth-bound problem**:

```
TPS ≈ GPU Bandwidth (GB/s) / (Active Params × Bytes Per Param × Overhead)
```

- **Q4_K_M** uses ~0.6 bytes/param, **Q8_0** uses ~1.1 bytes/param, **FP16** uses 2 bytes/param
- MoE models use a blended effective parameter count (active + 80% of inactive weights)
- CPU offload is modeled as a weighted blend of GPU and RAM bandwidth
- Apple Silicon / unified memory systems are handled as a single memory pool

## Model Categories

| Category | Examples |
|----------|----------|
| General | Llama, Mistral, Qwen, Gemma, Phi, DeepSeek |
| Code | CodeLlama, Qwen Coder, StarCoder, Codestral |
| Reasoning | QwQ, DeepSeek R1, Sky-T1, GLM-Z1 |
| Vision | LLaVA, Qwen-VL, Pixtral, InternVL |
| Image Gen | FLUX, Stable Diffusion, Kandinsky, HiDream |
| Video Gen | CogVideo, Wan, HunyuanVideo, Mochi |
| Audio | Whisper, Bark, Fish Speech, Kokoro, Moshi |
| Embedding | bge, nomic, jina, Stella, E5 |
| 3D | TRELLIS, Hunyuan3D |
| Domain | Medical, Finance, Legal |

## License

MIT
