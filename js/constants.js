// constants.js — App-wide constants
const AFF = "affiliate-20";

const VRAM_O = [0,2,4,6,8,10,12,16,18,20,24,32,36,40,48,64,80,96,128,160,192,256,320,512,640];
const RAM_O  = [4,8,12,16,24,32,48,64,96,128,256,512];

const BACKENDS = [
  {v:"llamacpp", l:"llama.cpp / Ollama",    vramMult:1.0,  tpsMult:1.0},
  {v:"lmstudio", l:"LM Studio",             vramMult:1.0,  tpsMult:1.0},
  {v:"kobold",   l:"KoboldCpp",             vramMult:1.0,  tpsMult:1.0},
  {v:"mlxlm",    l:"MLX LM (oMLX/vMLX)",    vramMult:1.0,  tpsMult:1.15},
  {v:"vllm",     l:"vLLM",                  vramMult:1.35, tpsMult:1.15},
  {v:"tgi",      l:"TGI (HuggingFace)",     vramMult:1.25, tpsMult:1.1},
  {v:"sglang",   l:"SGLang",                vramMult:1.3,  tpsMult:1.15},
];

const GPU_T  = [
  {v:"nvidia",l:"NVIDIA (CUDA)"},
  {v:"nvidia-uni",l:"NVIDIA DGX / Unified"},
  {v:"amd",   l:"AMD (ROCm)"},
  {v:"amd-apu",l:"AMD Strix Halo (Unified)"},
  {v:"intel", l:"Intel Arc (SYCL)"},
  {v:"apple", l:"Apple Silicon"},
  {v:"cpu",   l:"CPU only"}
];

const CATS = {all:"All",general:"General",code:"Code",reason:"Reasoning",vision:"Vision",medical:"Medical",finance:"Finance",legal:"Legal",embed:"Embedding",image:"Image Gen",video:"Video Gen",threeD:"3D Gen",audio:"Audio"};

const CAT_STYLE = {
  general: {bg:"#EFF6FF",fg:"#1D4ED8"},
  code:    {bg:"#ECFDF5",fg:"#047857"},
  reason:  {bg:"#FFFBEB",fg:"#B45309"},
  vision:  {bg:"#FEF2F2",fg:"#B91C1C"},
  embed:   {bg:"#F3F4F6",fg:"#374151"},
  medical: {bg:"#F0FDF4",fg:"#15803D"},
  finance: {bg:"#FFF7ED",fg:"#C2410C"},
  legal:   {bg:"#EFF6FF",fg:"#1E40AF"},
  image:   {bg:"#FAF5FF",fg:"#7C3AED"},
  video:   {bg:"#FFF1F2",fg:"#E11D48"},
  threeD:  {bg:"#ECFEFF",fg:"#0E7490"},
  audio:   {bg:"#F0FDFA",fg:"#0D9488"},
};
