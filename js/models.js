// models.js — Model database (M array)
const M = [
  {id:"meta-llama/Llama-3.2-1B-Instruct",          n:"Llama 3.2 1B",            f:"Meta",        p:"1B",       pb:1,    vram:0.6, ram:2,  c:"general"},
  {id:"meta-llama/Llama-3.2-3B-Instruct",          n:"Llama 3.2 3B",            f:"Meta",        p:"3B",       pb:3,    vram:1.8, ram:4,  c:"general"},
  {id:"meta-llama/Llama-3.2-11B-Vision-Instruct",  n:"Llama 3.2 Vision 11B",    f:"Meta",        p:"11B",      pb:11,   vram:6.6, ram:12, c:"vision"},
  {id:"meta-llama/Llama-3.2-90B-Vision-Instruct",  n:"Llama 3.2 Vision 90B",    f:"Meta",        p:"90B",      pb:90,   vram:54,  ram:64, c:"vision"},
  {id:"meta-llama/Llama-3.1-8B-Instruct",          n:"Llama 3.1 8B",            f:"Meta",        p:"8B",       pb:8,    vram:4.8, ram:8,  c:"general"},
  {id:"meta-llama/Llama-3.1-70B-Instruct",         n:"Llama 3.1 70B",           f:"Meta",        p:"70B",      pb:70,   vram:42,  ram:48, c:"general"},
  {id:"meta-llama/Llama-3.1-405B-Instruct",        n:"Llama 3.1 405B",          f:"Meta",        p:"405B",     pb:405,  vram:243, ram:256,c:"general"},
  {id:"meta-llama/Llama-3.3-70B-Instruct",         n:"Llama 3.3 70B",           f:"Meta",        p:"70B",      pb:70,   vram:42,  ram:48, c:"general"},
  {id:"codellama/CodeLlama-7b-Instruct-hf",        n:"CodeLlama 7B",            f:"Meta",        p:"7B",       pb:7,    vram:4.2, ram:8,  c:"code"},
  {id:"codellama/CodeLlama-13b-Instruct-hf",       n:"CodeLlama 13B",           f:"Meta",        p:"13B",      pb:13,   vram:7.8, ram:16, c:"code"},
  {id:"codellama/CodeLlama-34b-Instruct-hf",       n:"CodeLlama 34B",           f:"Meta",        p:"34B",      pb:34,   vram:20.4,  ram:32, c:"code"},
  {id:"codellama/CodeLlama-70b-Instruct-hf",       n:"CodeLlama 70B",           f:"Meta",        p:"70B",      pb:70,   vram:42,  ram:48, c:"code"},
  {id:"mistralai/Mistral-7B-Instruct-v0.3",        n:"Mistral 7B v0.3",         f:"Mistral",     p:"7B",       pb:7,    vram:4.2, ram:8,  c:"general"},
  {id:"mistralai/Mistral-Nemo-Instruct-2407",      n:"Mistral Nemo 12B",        f:"Mistral",     p:"12B",      pb:12,   vram:7.2, ram:12, c:"general"},
  {id:"mistralai/Mistral-Small-Instruct-2409",     n:"Mistral Small 22B",       f:"Mistral",     p:"22B",      pb:22,   vram:13.2,  ram:16, c:"general"},
  {id:"mistralai/Mixtral-8x7B-Instruct-v0.1",     n:"Mixtral 8x7B",            f:"Mistral",     p:"47B MoE",  pb:12,   vram:28.2,  ram:32, c:"general"},
  {id:"mistralai/Mixtral-8x22B-Instruct-v0.1",    n:"Mixtral 8x22B",           f:"Mistral",     p:"141B MoE", pb:39,   vram:84.6,  ram:96, c:"general"},
  {id:"mistralai/Codestral-22B-v0.1",             n:"Codestral 22B",           f:"Mistral",     p:"22B",      pb:22,   vram:13.2,  ram:16, c:"code"},
  {id:"mistralai/Pixtral-12B-2409",               n:"Pixtral 12B",             f:"Mistral",     p:"12B",      pb:12,   vram:7.2, ram:16, c:"vision"},
  {id:"Qwen/Qwen2.5-0.5B-Instruct",               n:"Qwen 2.5 0.5B",           f:"Qwen",        p:"0.5B",     pb:.5,   vram:0.3,  ram:2,  c:"general"},
  {id:"Qwen/Qwen2.5-1.5B-Instruct",               n:"Qwen 2.5 1.5B",           f:"Qwen",        p:"1.5B",     pb:1.5,  vram:0.9, ram:3,  c:"general"},
  {id:"Qwen/Qwen2.5-3B-Instruct",                 n:"Qwen 2.5 3B",             f:"Qwen",        p:"3B",       pb:3,    vram:1.8, ram:4,  c:"general"},
  {id:"Qwen/Qwen2.5-7B-Instruct",                 n:"Qwen 2.5 7B",             f:"Qwen",        p:"7B",       pb:7,    vram:4.2, ram:8,  c:"general"},
  {id:"Qwen/Qwen2.5-14B-Instruct",                n:"Qwen 2.5 14B",            f:"Qwen",        p:"14B",      pb:14,   vram:8.4, ram:16, c:"general"},
  {id:"Qwen/Qwen2.5-32B-Instruct",                n:"Qwen 2.5 32B",            f:"Qwen",        p:"32B",      pb:32,   vram:19.2,  ram:32, c:"general"},
  {id:"Qwen/Qwen2.5-72B-Instruct",                n:"Qwen 2.5 72B",            f:"Qwen",        p:"72B",      pb:72,   vram:43.2,  ram:64, c:"general"},
  {id:"Qwen/Qwen3-Coder-30B-A3B-Instruct",         n:"Qwen 3 Coder 30B MoE",    f:"Qwen",        p:"30B MoE",  pb:3,    vram:18,  ram:24, c:"code"},
  {id:"Qwen/Qwen3-Coder-480B-A35B-Instruct",      n:"Qwen 3 Coder 480B MoE",   f:"Qwen",        p:"480B MoE", pb:35,   vram:288, ram:320, c:"code"},
  {id:"Qwen/Qwen3-Coder-Next",                    n:"Qwen 3 Coder Next 80B",   f:"Qwen",        p:"80B",      pb:80,   vram:48,  ram:64, c:"code"},
  {id:"Qwen/Qwen2.5-Coder-0.5B-Instruct",         n:"Qwen 2.5 Coder 0.5B",     f:"Qwen",        p:"0.5B",     pb:.5,   vram:0.3,  ram:2,  c:"code"},
  {id:"Qwen/Qwen2.5-Coder-1.5B-Instruct",         n:"Qwen 2.5 Coder 1.5B",     f:"Qwen",        p:"1.5B",     pb:1.5,  vram:0.9, ram:3,  c:"code"},
  {id:"Qwen/Qwen2.5-Coder-3B-Instruct",           n:"Qwen 2.5 Coder 3B",       f:"Qwen",        p:"3B",       pb:3,    vram:1.8, ram:4,  c:"code"},
  {id:"Qwen/Qwen2.5-Coder-7B-Instruct",           n:"Qwen 2.5 Coder 7B",       f:"Qwen",        p:"7B",       pb:7,    vram:4.2, ram:8,  c:"code"},
  {id:"Qwen/Qwen2.5-Coder-14B-Instruct",          n:"Qwen 2.5 Coder 14B",      f:"Qwen",        p:"14B",      pb:14,   vram:8.4, ram:16, c:"code"},
  {id:"Qwen/Qwen2.5-Coder-32B-Instruct",          n:"Qwen 2.5 Coder 32B",      f:"Qwen",        p:"32B",      pb:32,   vram:19.2,  ram:32, c:"code"},
  {id:"Qwen/QwQ-32B",                              n:"QwQ 32B",                 f:"Qwen",        p:"32B",      pb:32,   vram:19.2,  ram:32, c:"reason"},
  {id:"Qwen/Qwen2-VL-7B-Instruct",                n:"Qwen2-VL 7B",             f:"Qwen",        p:"7B",       pb:7,    vram:4.2, ram:8,  c:"vision"},
  {id:"Qwen/Qwen2-VL-72B-Instruct",               n:"Qwen2-VL 72B",            f:"Qwen",        p:"72B",      pb:72,   vram:43.2,  ram:64, c:"vision"},
  {id:"deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",n:"DeepSeek R1 1.5B",        f:"DeepSeek",    p:"1.5B",     pb:1.5,  vram:0.9, ram:3,  c:"reason"},
  {id:"deepseek-ai/DeepSeek-R1-Distill-Qwen-7B",  n:"DeepSeek R1 7B",          f:"DeepSeek",    p:"7B",       pb:7,    vram:4.2, ram:8,  c:"reason"},
  {id:"deepseek-ai/DeepSeek-R1-Distill-Llama-8B", n:"DeepSeek R1 Llama 8B",    f:"DeepSeek",    p:"8B",       pb:8,    vram:4.8, ram:8,  c:"reason"},
  {id:"deepseek-ai/DeepSeek-R1-Distill-Qwen-14B", n:"DeepSeek R1 14B",         f:"DeepSeek",    p:"14B",      pb:14,   vram:8.4, ram:16, c:"reason"},
  {id:"deepseek-ai/DeepSeek-R1-Distill-Qwen-32B", n:"DeepSeek R1 32B",         f:"DeepSeek",    p:"32B",      pb:32,   vram:19.2,  ram:24, c:"reason"},
  {id:"deepseek-ai/DeepSeek-R1-Distill-Llama-70B",n:"DeepSeek R1 70B",         f:"DeepSeek",    p:"70B",      pb:70,   vram:42,  ram:64, c:"reason"},
  {id:"deepseek-ai/DeepSeek-R1",                  n:"DeepSeek R1 671B",         f:"DeepSeek",    p:"671B MoE", pb:37,   vram:402.6, ram:512,c:"reason"},
  {id:"deepseek-ai/DeepSeek-V3",                  n:"DeepSeek V3",              f:"DeepSeek",    p:"671B MoE", pb:37,   vram:402.6, ram:512,c:"general"},
  {id:"deepseek-ai/DeepSeek-Coder-V2-Lite-Instruct",n:"DeepSeek Coder V2 Lite",f:"DeepSeek",    p:"16B MoE",  pb:2.4,  vram:9.6, ram:16, c:"code"},
  {id:"google/gemma-3-1b-it",                     n:"Gemma 3 1B",              f:"Google",      p:"1B",       pb:1,    vram:0.6,  ram:2,  c:"general"},
  {id:"google/gemma-3-4b-it",                     n:"Gemma 3 4B",              f:"Google",      p:"4B",       pb:4,    vram:2.4, ram:6,  c:"vision"},
  {id:"google/gemma-3-12b-it",                    n:"Gemma 3 12B",             f:"Google",      p:"12B",      pb:12,   vram:7.2, ram:16, c:"vision"},
  {id:"google/gemma-3-27b-it",                    n:"Gemma 3 27B",             f:"Google",      p:"27B",      pb:27,   vram:16.2,  ram:24, c:"vision"},
  {id:"google/gemma-2-9b-it",                     n:"Gemma 2 9B",              f:"Google",      p:"9B",       pb:9,    vram:5.4, ram:12, c:"general"},
  {id:"google/gemma-2-27b-it",                    n:"Gemma 2 27B",             f:"Google",      p:"27B",      pb:27,   vram:16.2,  ram:24, c:"general"},
  {id:"microsoft/phi-4",                          n:"Phi-4 14B",               f:"Microsoft",   p:"14B",      pb:14,   vram:8.4, ram:16, c:"general"},
  {id:"microsoft/Phi-4-mini-instruct",            n:"Phi-4 Mini 3.8B",         f:"Microsoft",   p:"3.8B",     pb:3.8,  vram:2.3, ram:6,  c:"general"},
  {id:"microsoft/Phi-3.5-mini-instruct",          n:"Phi-3.5 Mini 3.8B",       f:"Microsoft",   p:"3.8B",     pb:3.8,  vram:2.3, ram:6,  c:"general"},
  {id:"microsoft/Orca-2-7b",                      n:"Orca 2 7B",               f:"Microsoft",   p:"7B",       pb:7,    vram:4.2, ram:8,  c:"general"},
  {id:"CohereForAI/c4ai-command-r-v01",           n:"Command R 35B",           f:"Cohere",      p:"35B",      pb:35,   vram:21,  ram:32, c:"general"},
  {id:"CohereForAI/c4ai-command-r-plus-08-2024",  n:"Command R+ 104B",         f:"Cohere",      p:"104B",     pb:104,  vram:62.4,  ram:64, c:"general"},
  {id:"nvidia/NVIDIA-Nemotron-3-Nano-4B-Instruct", n:"Nemotron Nano 4B",        f:"NVIDIA",      p:"4B",       pb:4,    vram:2.4, ram:4,  c:"general"},
  {id:"nvidia/NVIDIA-Nemotron-Nano-9B-v2",        n:"Nemotron Nano 9B",        f:"NVIDIA",      p:"9B",       pb:9,    vram:5.4, ram:12, c:"general"},
  {id:"nvidia/NVIDIA-Nemotron-Nano-12B-v2-BF16",  n:"Nemotron Nano 12B",       f:"NVIDIA",      p:"12B",      pb:12,   vram:7.2, ram:16, c:"vision"},
  {id:"nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-Instruct",n:"Nemotron Nano 30B MoE",f:"NVIDIA",    p:"30B MoE",  pb:3,    vram:18,  ram:24, c:"general"},
  {id:"nvidia/Nemotron-Cascade-2-30B-A3B",         n:"Nemotron Cascade 2 30B MoE",f:"NVIDIA",    p:"30B MoE",  pb:3,    vram:18,  ram:24, c:"reason"},
  {id:"nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-BF16",n:"Nemotron 3 Super 120B MoE",f:"NVIDIA",  p:"120B MoE", pb:12,   vram:72,  ram:96, c:"general"},
  {id:"nvidia/Llama-3_1-Nemotron-Ultra-253B-v1-FP8",n:"Nemotron Ultra 253B",  f:"NVIDIA",      p:"253B",     pb:253,  vram:152, ram:192, c:"reason"},
  {id:"nvidia/Llama-3.1-Nemotron-70B-Instruct-HF",n:"Nemotron 70B",            f:"NVIDIA",      p:"70B",      pb:70,   vram:42,  ram:48, c:"general"},
  {id:"ibm-granite/granite-3.1-2b-instruct",      n:"Granite 3.1 2B",          f:"IBM",         p:"2B",       pb:2,    vram:1.2, ram:4,  c:"general"},
  {id:"ibm-granite/granite-3.1-8b-instruct",      n:"Granite 3.1 8B",          f:"IBM",         p:"8B",       pb:8,    vram:4.8, ram:8,  c:"general"},
  {id:"bigcode/starcoder2-3b",                     n:"StarCoder2 3B",           f:"BigCode",     p:"3B",       pb:3,    vram:1.8, ram:4,  c:"code"},
  {id:"bigcode/starcoder2-7b",                     n:"StarCoder2 7B",           f:"BigCode",     p:"7B",       pb:7,    vram:4.2, ram:8,  c:"code"},
  {id:"bigcode/starcoder2-15b",                    n:"StarCoder2 15B",          f:"BigCode",     p:"15B",      pb:15,   vram:9.0, ram:16, c:"code"},
  {id:"sentence-transformers/all-MiniLM-L6-v2",   n:"all-MiniLM-L6-v2",        f:"ST",          p:"22M",      pb:.022, vram:.15, ram:1,  c:"embed"},
  {id:"sentence-transformers/all-MiniLM-L12-v2",  n:"all-MiniLM-L12-v2",       f:"ST",          p:"33M",      pb:.033, vram:.2,  ram:1,  c:"embed"},
  {id:"BAAI/bge-small-en-v1.5",                   n:"BGE Small EN v1.5",        f:"BAAI",        p:"33M",      pb:.033, vram:.2,  ram:1,  c:"embed"},
  {id:"BAAI/bge-base-en-v1.5",                    n:"BGE Base EN v1.5",         f:"BAAI",        p:"109M",     pb:.109, vram:.3,  ram:2,  c:"embed"},
  {id:"BAAI/bge-large-en-v1.5",                   n:"BGE Large EN v1.5",        f:"BAAI",        p:"335M",     pb:.335, vram:0.7,  ram:2,  c:"embed"},
  {id:"BAAI/bge-m3",                              n:"BGE-M3",                  f:"BAAI",        p:"570M",     pb:.57,  vram:1.1,  ram:3,  c:"embed"},
  {id:"nomic-ai/nomic-embed-text-v1.5",           n:"Nomic Embed Text v1.5",   f:"Nomic",       p:"137M",     pb:.137, vram:.4,  ram:2,  c:"embed"},
  {id:"mixedbread-ai/mxbai-embed-large-v1",       n:"mxbai-embed-large v1",    f:"Mixedbread",  p:"335M",     pb:.335, vram:0.7,  ram:2,  c:"embed"},
  {id:"vikhyatk/moondream2",                      n:"Moondream 2",             f:"Moondream",   p:"1.8B",     pb:1.8,  vram:1.1, ram:4,  c:"vision"},
  {id:"llava-hf/llava-1.5-7b-hf",                n:"LLaVA 1.5 7B",            f:"LLaVA",       p:"7B",       pb:7,    vram:4.2, ram:8,  c:"vision"},
  {id:"llava-hf/llava-1.5-13b-hf",               n:"LLaVA 1.5 13B",           f:"LLaVA",       p:"13B",      pb:13,   vram:7.8, ram:16, c:"vision"},
  {id:"OpenGVLab/InternVL2-8B",                   n:"InternVL2 8B",            f:"InternVL",    p:"8B",       pb:8,    vram:4.8, ram:10, c:"vision"},
  {id:"openbmb/MiniCPM-V-2_6",                   n:"MiniCPM-V 2.6",           f:"OpenBMB",     p:"8B",       pb:8,    vram:4.8, ram:10, c:"vision"},
  {id:"NovaSky-Berkeley/Sky-T1-32B-Preview",      n:"Sky-T1 32B",              f:"NovaSky",     p:"32B",      pb:32,   vram:19.2,  ram:32, c:"reason"},
  {id:"AIDC-AI/Marco-o1",                         n:"Marco-o1 7B",             f:"AIDC",        p:"7B",       pb:7,    vram:4.2, ram:8,  c:"reason"},
  {id:"teknium/OpenHermes-2.5-Mistral-7B",        n:"OpenHermes 2.5 7B",       f:"Community",   p:"7B",       pb:7,    vram:4.2, ram:8,  c:"general"},
  {id:"HuggingFaceTB/SmolLM2-1.7B-Instruct",     n:"SmolLM2 1.7B",            f:"HuggingFace", p:"1.7B",     pb:1.7,  vram:1.0, ram:3,  c:"general"},
  {id:"tiiuae/falcon-40b-instruct",               n:"Falcon 40B",              f:"TII",         p:"40B",      pb:40,   vram:24,  ram:40, c:"general"},
  {id:"databricks/dbrx-instruct",                 n:"DBRX 132B",               f:"Databricks",  p:"132B MoE", pb:36,   vram:79.2,  ram:96, c:"general"},
  {id:"NousResearch/Hermes-3-Llama-3.1-8B",       n:"Hermes 3 8B",             f:"Nous",        p:"8B",       pb:8,    vram:4.8, ram:8,  c:"general"},
  {id:"NousResearch/Hermes-3-Llama-3.1-70B",      n:"Hermes 3 70B",            f:"Nous",        p:"70B",      pb:70,   vram:42,  ram:48, c:"general"},
  {id:"01-ai/Yi-1.5-9B-Chat",                     n:"Yi 1.5 9B",               f:"01.AI",       p:"9B",       pb:9,    vram:5.4, ram:10, c:"general"},
  {id:"01-ai/Yi-1.5-34B-Chat",                    n:"Yi 1.5 34B",              f:"01.AI",       p:"34B",      pb:34,   vram:20.4,  ram:32, c:"general"},
  {id:"upstage/SOLAR-10.7B-Instruct-v1.0",        n:"SOLAR 10.7B",             f:"Upstage",     p:"10.7B",    pb:10.7, vram:6.4, ram:12, c:"general"},
  {id:"allenai/OLMo-2-1124-7B-Instruct",          n:"OLMo 2 7B",               f:"AllenAI",     p:"7B",       pb:7,    vram:4.2, ram:8,  c:"general"},
  {id:"allenai/OLMo-2-1124-13B-Instruct",         n:"OLMo 2 13B",              f:"AllenAI",     p:"13B",      pb:13,   vram:7.8, ram:16, c:"general"},

  // ===== Qwen 3 =====
  {id:"Qwen/Qwen3-0.6B",                          n:"Qwen 3 0.6B",             f:"Qwen",        p:"0.6B",     pb:.6,   vram:0.4,  ram:2,  c:"general"},
  {id:"Qwen/Qwen3-1.7B",                          n:"Qwen 3 1.7B",             f:"Qwen",        p:"1.7B",     pb:1.7,  vram:1.0, ram:3,  c:"general"},
  {id:"Qwen/Qwen3-4B",                            n:"Qwen 3 4B",               f:"Qwen",        p:"4B",       pb:4,    vram:2.4, ram:6,  c:"general"},
  {id:"Qwen/Qwen3-8B",                            n:"Qwen 3 8B",               f:"Qwen",        p:"8B",       pb:8,    vram:4.8, ram:8,  c:"general"},
  {id:"Qwen/Qwen3-14B",                           n:"Qwen 3 14B",              f:"Qwen",        p:"14B",      pb:14,   vram:8.4, ram:16, c:"general"},
  {id:"Qwen/Qwen3-30B-A3B",                       n:"Qwen 3 30B MoE",          f:"Qwen",        p:"30B MoE",  pb:3,    vram:18,  ram:24, c:"general"},
  {id:"Qwen/Qwen3-32B",                           n:"Qwen 3 32B",              f:"Qwen",        p:"32B",      pb:32,   vram:19.2,  ram:32, c:"general"},
  {id:"Qwen/Qwen3-235B-A22B",                     n:"Qwen 3 235B MoE",         f:"Qwen",        p:"235B MoE", pb:22,   vram:141, ram:192,c:"general"},

  // ===== Qwen 3.5 =====
  {id:"Qwen/Qwen3.5-0.8B",                        n:"Qwen 3.5 0.8B",           f:"Qwen",        p:"0.9B",     pb:.9,   vram:0.5, ram:2,  c:"vision"},
  {id:"Qwen/Qwen3.5-2B",                          n:"Qwen 3.5 2B",             f:"Qwen",        p:"2B",       pb:2,    vram:1.2, ram:4,  c:"vision"},
  {id:"Qwen/Qwen3.5-4B",                          n:"Qwen 3.5 4B",             f:"Qwen",        p:"5B",       pb:5,    vram:3.0, ram:6,  c:"vision"},
  {id:"Qwen/Qwen3.5-9B",                          n:"Qwen 3.5 9B",             f:"Qwen",        p:"10B",      pb:10,   vram:6.0, ram:12, c:"vision"},
  {id:"Qwen/Qwen3.5-27B",                         n:"Qwen 3.5 27B",            f:"Qwen",        p:"28B",      pb:28,   vram:16.8,ram:24, c:"vision"},
  {id:"Qwen/Qwen3.5-35B-A3B",                     n:"Qwen 3.5 35B MoE",        f:"Qwen",        p:"35B MoE",  pb:3,    vram:21,  ram:32, c:"vision"},
  {id:"Qwen/Qwen3.5-122B-A10B",                   n:"Qwen 3.5 122B MoE",       f:"Qwen",        p:"122B MoE", pb:10,   vram:73.2,ram:96, c:"vision"},
  {id:"Qwen/Qwen3.5-397B-A17B",                   n:"Qwen 3.5 397B MoE",       f:"Qwen",        p:"397B MoE", pb:17,   vram:238.2,ram:300,c:"vision"},

  // ===== Qwen 2.5 VL =====
  {id:"Qwen/Qwen2.5-VL-3B-Instruct",              n:"Qwen 2.5 VL 3B",          f:"Qwen",        p:"3B",       pb:3,    vram:1.8, ram:6,  c:"vision"},
  {id:"Qwen/Qwen2.5-VL-7B-Instruct",              n:"Qwen 2.5 VL 7B",          f:"Qwen",        p:"7B",       pb:7,    vram:4.2, ram:10, c:"vision"},
  {id:"Qwen/Qwen2.5-VL-32B-Instruct",             n:"Qwen 2.5 VL 32B",         f:"Qwen",        p:"32B",      pb:32,   vram:19.2,  ram:32, c:"vision"},
  {id:"Qwen/Qwen2.5-VL-72B-Instruct",             n:"Qwen 2.5 VL 72B",         f:"Qwen",        p:"72B",      pb:72,   vram:43.2,  ram:64, c:"vision"},

  // ===== Kimi (Moonshot) =====
  {id:"moonshotai/Kimi-K2.5",                      n:"Kimi K2.5 1T MoE",        f:"Moonshot",    p:"1T MoE",   pb:32,   vram:600, ram:640, c:"general"},
  {id:"moonshotai/Kimi-VL-A3B-Instruct",           n:"Kimi VL A3B",             f:"Moonshot",    p:"8B MoE",   pb:2.8,  vram:4.8, ram:6,  c:"vision"},
  {id:"moonshotai/Kimi-VL-A3B-Thinking",           n:"Kimi VL A3B Thinking",    f:"Moonshot",    p:"8B MoE",   pb:2.8,  vram:4.8, ram:6,  c:"reason"},

  // ===== GLM (Zhipu/THUDM) =====
  {id:"zai-org/GLM-5",                             n:"GLM-5 744B MoE",          f:"Zhipu",       p:"744B MoE", pb:40,   vram:446, ram:480, c:"general"},
  {id:"THUDM/glm-4-9b-chat",                      n:"GLM-4 9B Chat",           f:"Zhipu",       p:"9B",       pb:9,    vram:5.4, ram:12, c:"general"},
  {id:"THUDM/glm-4v-9b",                          n:"GLM-4V 9B",               f:"Zhipu",       p:"9B",       pb:9,    vram:5.4, ram:12, c:"vision"},
  {id:"THUDM/GLM-Z1-9B-0414",                     n:"GLM-Z1 9B",               f:"Zhipu",       p:"9B",       pb:9,    vram:5.4, ram:12, c:"reason"},
  {id:"THUDM/GLM-Z1-32B-0414",                    n:"GLM-Z1 32B",              f:"Zhipu",       p:"32B",      pb:32,   vram:19.2,  ram:32, c:"reason"},
  {id:"THUDM/codegeex-4-all-9b",                  n:"CodeGeeX4 9B",            f:"Zhipu",       p:"9B",       pb:9,    vram:5.4, ram:12, c:"code"},
  {id:"THUDM/GLM-4-9B-Chat-1M",                   n:"GLM-4 9B 1M",             f:"Zhipu",       p:"9B",       pb:9,    vram:5.4, ram:12, c:"general"},

  // ===== Llama 4 =====
  {id:"meta-llama/Llama-4-Scout-17B-16E-Instruct", n:"Llama 4 Scout",          f:"Meta",        p:"109B MoE", pb:17,   vram:65.4,  ram:96, c:"general"},
  {id:"meta-llama/Llama-4-Maverick-17B-128E-Instruct",n:"Llama 4 Maverick",    f:"Meta",        p:"402B MoE", pb:17,   vram:241.2, ram:300,c:"general"},

  // ===== InternLM =====
  {id:"internlm/internlm2_5-7b-chat",             n:"InternLM 2.5 7B",         f:"InternLM",    p:"7B",       pb:7,    vram:4.2, ram:8,  c:"general"},
  {id:"internlm/internlm2_5-20b-chat",            n:"InternLM 2.5 20B",        f:"InternLM",    p:"20B",      pb:20,   vram:12,  ram:24, c:"general"},
  {id:"internlm/internlm3-8b-instruct",           n:"InternLM 3 8B",           f:"InternLM",    p:"8B",       pb:8,    vram:4.8, ram:8,  c:"general"},

  // ===== InternVL (additional) =====
  {id:"OpenGVLab/InternVL2-2B",                   n:"InternVL2 2B",            f:"InternVL",    p:"2B",       pb:2,    vram:1.2, ram:4,  c:"vision"},
  {id:"OpenGVLab/InternVL2-26B",                  n:"InternVL2 26B",           f:"InternVL",    p:"26B",      pb:26,   vram:15.6,  ram:24, c:"vision"},
  {id:"OpenGVLab/InternVL2-40B",                  n:"InternVL2 40B",           f:"InternVL",    p:"40B",      pb:40,   vram:24,  ram:40, c:"vision"},
  {id:"OpenGVLab/InternVL3-8B",                   n:"InternVL3 8B",            f:"InternVL",    p:"8B",       pb:8,    vram:4.8, ram:10, c:"vision"},
  {id:"OpenGVLab/InternVL3-14B",                  n:"InternVL3 14B",           f:"InternVL",    p:"14B",      pb:14,   vram:8.4, ram:16, c:"vision"},

  // ===== Mistral (additional) =====
  {id:"mistralai/Mistral-Large-Instruct-2407",    n:"Mistral Large 123B",      f:"Mistral",     p:"123B",     pb:123,  vram:73.8,  ram:96, c:"general"},
  {id:"mistralai/Mistral-Small-3.1-24B-Instruct-2503",n:"Mistral Small 3.1 24B",f:"Mistral",    p:"24B",      pb:24,   vram:14.4,  ram:24, c:"vision"},
  {id:"mistralai/Mistral-Small-4-119B-2603",      n:"Mistral Small 4 119B MoE",f:"Mistral",    p:"119B MoE", pb:6.5,  vram:71,    ram:96, c:"general"},
  {id:"mistralai/Pixtral-Large-Instruct-2411",    n:"Pixtral Large 124B",      f:"Mistral",     p:"124B",     pb:124,  vram:74.4,  ram:96, c:"vision"},
  {id:"mistralai/Codestral-Mamba-7B-v0.1",        n:"Codestral Mamba 7B",      f:"Mistral",     p:"7B",       pb:7,    vram:4.2, ram:8,  c:"code"},
  {id:"mistralai/Devstral-Small-2505",            n:"Devstral Small 24B",      f:"Mistral",     p:"24B",      pb:24,   vram:14.4,  ram:24, c:"code"},

  // ===== Cohere (additional) =====
  {id:"CohereForAI/c4ai-command-a-03-2025",       n:"Command A 111B",          f:"Cohere",      p:"111B MoE", pb:27,   vram:66.6,  ram:80, c:"general"},

  // ===== Microsoft (additional) =====
  {id:"microsoft/Phi-4-reasoning-plus",            n:"Phi-4 Reasoning Plus 14B",f:"Microsoft",   p:"14B",      pb:14,   vram:8.4, ram:16, c:"reason"},
  {id:"microsoft/Phi-4-multimodal-instruct",       n:"Phi-4 Multimodal 5.6B",   f:"Microsoft",   p:"5.6B",     pb:5.6,  vram:3.4, ram:8,  c:"vision"},
  {id:"microsoft/Phi-3-medium-4k-instruct",        n:"Phi-3 Medium 14B",        f:"Microsoft",   p:"14B",      pb:14,   vram:8.4, ram:16, c:"general"},
  {id:"microsoft/Phi-3-vision-128k-instruct",      n:"Phi-3 Vision 4.2B",       f:"Microsoft",   p:"4.2B",     pb:4.2,  vram:2.5, ram:6,  c:"vision"},

  // ===== AI21 Jamba =====
  {id:"ai21labs/AI21-Jamba-1.5-Mini",              n:"Jamba 1.5 Mini 12B",      f:"AI21",        p:"52B MoE",  pb:12,   vram:31.2,  ram:40, c:"general"},
  {id:"ai21labs/AI21-Jamba-1.5-Large",             n:"Jamba 1.5 Large 94B",     f:"AI21",        p:"398B MoE", pb:94,   vram:238.8, ram:256,c:"general"},

  // ===== Gemma (additional) =====
  {id:"google/gemma-3n-e4b-it",                   n:"Gemma 3n E4B",            f:"Google",      p:"4B",       pb:4,    vram:2.4, ram:6,  c:"general"},

  // ===== RWKV =====
  {id:"RWKV/v6-Finch-1B6-HF",                     n:"RWKV-6 1.6B",             f:"RWKV",        p:"1.6B",     pb:1.6,  vram:1.0, ram:3,  c:"general"},
  {id:"RWKV/v6-Finch-3B-HF",                      n:"RWKV-6 3B",               f:"RWKV",        p:"3B",       pb:3,    vram:1.8, ram:4,  c:"general"},
  {id:"RWKV/v6-Finch-7B-HF",                      n:"RWKV-6 7B",               f:"RWKV",        p:"7B",       pb:7,    vram:4.2, ram:8,  c:"general"},
  {id:"RWKV/v6-Finch-14B-HF",                     n:"RWKV-6 14B",              f:"RWKV",        p:"14B",      pb:14,   vram:8.4, ram:16, c:"general"},

  // ===== Community / Fine-tunes =====
  {id:"TinyLlama/TinyLlama-1.1B-Chat-v1.0",       n:"TinyLlama 1.1B",          f:"Community",   p:"1.1B",     pb:1.1,  vram:0.7, ram:2,  c:"general"},
  {id:"stabilityai/stablelm-2-1_6b-chat",         n:"StableLM 2 1.6B",         f:"Stability",   p:"1.6B",     pb:1.6,  vram:1.0, ram:3,  c:"general"},
  {id:"stabilityai/stablelm-2-12b-chat",          n:"StableLM 2 12B",          f:"Stability",   p:"12B",      pb:12,   vram:7.2, ram:12, c:"general"},
  {id:"HuggingFaceH4/zephyr-7b-beta",             n:"Zephyr 7B",               f:"HuggingFace", p:"7B",       pb:7,    vram:4.2, ram:8,  c:"general"},
  {id:"cognitivecomputations/dolphin-2.9.3-llama-3.1-8B",n:"Dolphin 2.9 8B",   f:"Community",   p:"8B",       pb:8,    vram:4.8, ram:8,  c:"general"},
  {id:"WizardLMTeam/WizardLM-2-8x22B",            n:"WizardLM 2 8x22B",        f:"Microsoft",   p:"141B MoE", pb:39,   vram:84.6,  ram:96, c:"general"},
  {id:"Intel/neural-chat-7b-v3-3",                n:"Neural Chat 7B",          f:"Intel",       p:"7B",       pb:7,    vram:4.2, ram:8,  c:"general"},
  {id:"Nexusflow/Starling-LM-7B-beta",            n:"Starling LM 7B",          f:"Nexusflow",   p:"7B",       pb:7,    vram:4.2, ram:8,  c:"general"},
  {id:"HuggingFaceTB/SmolLM2-135M-Instruct",      n:"SmolLM2 135M",            f:"HuggingFace", p:"135M",     pb:.135, vram:.15, ram:1,  c:"general"},
  {id:"HuggingFaceTB/SmolLM2-360M-Instruct",      n:"SmolLM2 360M",            f:"HuggingFace", p:"360M",     pb:.36,  vram:0.2,  ram:1,  c:"general"},
  {id:"Salesforce/xLAM-7b-r",                     n:"xLAM 7B",                 f:"Salesforce",  p:"7B",       pb:7,    vram:4.2, ram:8,  c:"general"},
  {id:"01-ai/Yi-34B-Chat",                        n:"Yi 34B Chat",             f:"01.AI",       p:"34B",      pb:34,   vram:20.4,  ram:32, c:"general"},
  {id:"Qwen/Qwen2-Audio-7B-Instruct",             n:"Qwen2 Audio 7B",          f:"Qwen",        p:"7B",       pb:7,    vram:14.0, ram:24, c:"audio"},
  {id:"Qwen/Qwen2.5-Omni-7B",                     n:"Qwen 2.5 Omni 7B",        f:"Qwen",        p:"7B",       pb:7,    vram:4.2, ram:10, c:"vision"},

  // ===== Additional Code Models =====
  {id:"deepseek-ai/DeepSeek-Coder-V2-Instruct",   n:"DeepSeek Coder V2",       f:"DeepSeek",    p:"236B MoE", pb:21,   vram:141.6, ram:192,c:"code"},
  {id:"deepseek-ai/DeepSeek-V2.5",                n:"DeepSeek V2.5",           f:"DeepSeek",    p:"236B MoE", pb:21,   vram:141.6, ram:192,c:"general"},

  // ===== Additional Reasoning =====
  {id:"AIDC-AI/Marco-o1-CoT",                     n:"Marco-o1 CoT 7B",         f:"AIDC",        p:"7B",       pb:7,    vram:4.2, ram:8,  c:"reason"},
  {id:"Skywork/Skywork-o1-Open-Llama-3.1-8B",     n:"Skywork-o1 8B",           f:"Skywork",     p:"8B",       pb:8,    vram:4.8, ram:8,  c:"reason"},

  // ===== Additional Embedding =====
  {id:"Alibaba-NLP/gte-Qwen2-1.5B-instruct",     n:"GTE Qwen2 1.5B",          f:"Alibaba",     p:"1.5B",     pb:1.5,  vram:3.0, ram:3,  c:"embed"},
  {id:"Alibaba-NLP/gte-Qwen2-7B-instruct",       n:"GTE Qwen2 7B",            f:"Alibaba",     p:"7B",       pb:7,    vram:14.0, ram:24, c:"embed"},
  {id:"jinaai/jina-embeddings-v3",                n:"Jina Embeddings v3",      f:"Jina AI",     p:"570M",     pb:.57,  vram:1.1,  ram:3,  c:"embed"},
  {id:"Snowflake/snowflake-arctic-embed-m-v2.0",  n:"Arctic Embed M v2",       f:"Snowflake",   p:"305M",     pb:.305, vram:0.6,  ram:2,  c:"embed"},
  {id:"Snowflake/snowflake-arctic-embed-l-v2.0",  n:"Arctic Embed L v2",       f:"Snowflake",   p:"568M",     pb:.568, vram:1.1,  ram:3,  c:"embed"},
  {id:"intfloat/e5-mistral-7b-instruct",          n:"E5 Mistral 7B",           f:"intfloat",    p:"7B",       pb:7,    vram:14.0, ram:24, c:"embed"},
  {id:"dunzhang/stella_en_1.5B_v5",               n:"Stella EN 1.5B v5",       f:"dunzhang",    p:"1.5B",     pb:1.5,  vram:3.0, ram:3,  c:"embed"},

  // ===== IMAGE GENERATION =====
  {id:"stabilityai/stable-diffusion-xl-base-1.0", n:"Stable Diffusion XL",     f:"Stability",   p:"3.5B",     pb:3.5,  vram:8,   ram:12, c:"image"},
  {id:"stabilityai/stable-diffusion-3-medium-diffusers",n:"Stable Diffusion 3 Medium",f:"Stability",p:"2B",   pb:2,    vram:6,   ram:10, c:"image"},
  {id:"stabilityai/stable-diffusion-3.5-medium",  n:"SD 3.5 Medium",           f:"Stability",   p:"2.5B",     pb:2.5,  vram:6,   ram:10, c:"image"},
  {id:"stabilityai/stable-diffusion-3.5-large",   n:"SD 3.5 Large",            f:"Stability",   p:"8B",       pb:8,    vram:16,  ram:16, c:"image"},
  {id:"stabilityai/stable-diffusion-3.5-large-turbo",n:"SD 3.5 Large Turbo",   f:"Stability",   p:"8B",       pb:8,    vram:16,  ram:16, c:"image"},
  {id:"black-forest-labs/FLUX.1-dev",              n:"FLUX.1 Dev",              f:"Black Forest",p:"12B",      pb:12,   vram:24,  ram:24, c:"image"},
  {id:"black-forest-labs/FLUX.1-schnell",          n:"FLUX.1 Schnell",          f:"Black Forest",p:"12B",      pb:12,   vram:24,  ram:24, c:"image"},
  {id:"black-forest-labs/FLUX.1-Fill-dev",         n:"FLUX.1 Fill (Inpaint)",   f:"Black Forest",p:"12B",      pb:12,   vram:24,  ram:24, c:"image"},
  {id:"black-forest-labs/FLUX.1-Redux-dev",        n:"FLUX.1 Redux (Variation)",f:"Black Forest",p:"12B",      pb:12,   vram:24,  ram:24, c:"image"},
  {id:"Kwai-Kolors/Kolors",                       n:"Kolors",                  f:"Kuaishou",    p:"2.6B",     pb:2.6,  vram:8,   ram:12, c:"image"},
  {id:"PixArt-alpha/PixArt-XL-2-1024-MS",         n:"PixArt-\u03B1 XL",       f:"PixArt",      p:"600M",     pb:.6,   vram:4,   ram:8,  c:"image"},
  {id:"PixArt-alpha/PixArt-Sigma-XL-2-1024-MS",   n:"PixArt-\u03A3 XL",       f:"PixArt",      p:"600M",     pb:.6,   vram:4,   ram:8,  c:"image"},
  {id:"playgroundai/playground-v2.5-1024px-aesthetic",n:"Playground v2.5",      f:"Playground",  p:"2.6B",     pb:2.6,  vram:8,   ram:12, c:"image"},
  {id:"Tencent-Hunyuan/HunyuanDiT-v1.2-Diffusers",n:"HunyuanDiT 1.2",        f:"Tencent",     p:"1.5B",     pb:1.5,  vram:6,   ram:10, c:"image"},
  {id:"OnomaAIResearch/Illustrious-xl-early-release-v0",n:"Illustrious XL",    f:"Onoma",       p:"3.5B",     pb:3.5,  vram:8,   ram:12, c:"image"},
  {id:"kandinsky-community/kandinsky-3",           n:"Kandinsky 3",             f:"Sber",        p:"12B",      pb:12,   vram:24,  ram:24, c:"image"},
  {id:"dataautogpt3/FLUX-AestheticAnime",          n:"FLUX Aesthetic Anime",    f:"Community",   p:"12B",      pb:12,   vram:24,  ram:24, c:"image"},
  {id:"Shakker-Labs/FLUX.1-dev-ControlNet-Union-Pro",n:"FLUX ControlNet Union",f:"Shakker",     p:"12B",      pb:12,   vram:24,  ram:28, c:"image"},
  {id:"InstantX/FLUX.1-dev-IP-Adapter",           n:"FLUX IP-Adapter",         f:"InstantX",    p:"12B",      pb:12,   vram:24,  ram:28, c:"image"},
  {id:"ByteDance/SDXL-Lightning",                  n:"SDXL Lightning",          f:"ByteDance",   p:"3.5B",     pb:3.5,  vram:8,   ram:12, c:"image"},
  {id:"latent-consistency/lcm-sdxl",               n:"LCM SDXL",               f:"Community",   p:"3.5B",     pb:3.5,  vram:8,   ram:12, c:"image"},
  {id:"Qwen/Qwen-Image-2512",                    n:"Qwen Image",              f:"Qwen",        p:"3B",       pb:3,    vram:6,   ram:10, c:"image"},
  {id:"Qwen/Qwen-Image-Edit-2511",               n:"Qwen Image Edit",         f:"Qwen",        p:"3B",       pb:3,    vram:6,   ram:10, c:"image"},
  {id:"SG161222/RealVisXL_V4.0",                   n:"RealVis XL V4",           f:"Community",   p:"3.5B",     pb:3.5,  vram:8,   ram:12, c:"image"},
  {id:"Lykon/dreamshaper-xl-v2-turbo",             n:"DreamShaper XL v2",       f:"Community",   p:"3.5B",     pb:3.5,  vram:8,   ram:12, c:"image"},
  {id:"RunDiffusion/Juggernaut-XL-v9",             n:"Juggernaut XL v9",        f:"RunDiffusion",p:"3.5B",     pb:3.5,  vram:8,   ram:12, c:"image"},
  {id:"stabilityai/sdxl-turbo",                    n:"SDXL Turbo",              f:"Stability",   p:"3.5B",     pb:3.5,  vram:8,   ram:12, c:"image"},
  {id:"stabilityai/stable-cascade",                n:"Stable Cascade",          f:"Stability",   p:"5.1B",     pb:5.1,  vram:10.2,  ram:16, c:"image"},

  // ===== VIDEO GENERATION =====
  {id:"THUDM/CogVideoX-2b",                       n:"CogVideoX 2B",            f:"Zhipu",       p:"2B",       pb:2,    vram:8,   ram:16, c:"video"},
  {id:"THUDM/CogVideoX-5b",                       n:"CogVideoX 5B",            f:"Zhipu",       p:"5B",       pb:5,    vram:16,  ram:24, c:"video"},
  {id:"THUDM/CogVideoX1.5-5B",                    n:"CogVideoX 1.5 5B",        f:"Zhipu",       p:"5B",       pb:5,    vram:16,  ram:24, c:"video"},
  {id:"Wan-AI/Wan2.1-T2V-1.3B",                   n:"Wan 2.1 T2V 1.3B",        f:"Alibaba",     p:"1.3B",     pb:1.3,  vram:6,   ram:12, c:"video"},
  {id:"Wan-AI/Wan2.1-T2V-14B",                    n:"Wan 2.1 T2V 14B",         f:"Alibaba",     p:"14B",      pb:14,   vram:28,  ram:40, c:"video"},
  {id:"Wan-AI/Wan2.1-I2V-14B-480P",               n:"Wan 2.1 I2V 14B 480p",    f:"Alibaba",     p:"14B",      pb:14,   vram:28,  ram:40, c:"video"},
  {id:"Wan-AI/Wan2.1-I2V-14B-720P",               n:"Wan 2.1 I2V 14B 720p",    f:"Alibaba",     p:"14B",      pb:14,   vram:30,  ram:48, c:"video"},
  {id:"tencent/HunyuanVideo",                     n:"HunyuanVideo",            f:"Tencent",     p:"13B",      pb:13,   vram:40,  ram:60, c:"video"},
  {id:"genmo/mochi-1-preview",                    n:"Mochi 1 Preview",         f:"Genmo",       p:"10B",      pb:10,   vram:24,  ram:40, c:"video"},
  {id:"Lightricks/LTX-Video",                     n:"LTX Video",               f:"Lightricks",  p:"2B",       pb:2,    vram:8,   ram:16, c:"video"},
  {id:"Lightricks/LTX-2",                        n:"LTX-2 19B",               f:"Lightricks",  p:"19B",      pb:19,   vram:38,  ram:48, c:"video"},
  {id:"Lightricks/LTX-2.3",                      n:"LTX-2.3 21B",             f:"Lightricks",  p:"21B",      pb:21,   vram:42,  ram:48, c:"video"},
  {id:"stabilityai/stable-video-diffusion-img2vid-xt-1-1",n:"Stable Video Diffusion",f:"Stability",p:"1.5B",  pb:1.5,  vram:6,   ram:10, c:"video"},
  {id:"rhymes-ai/Allegro",                        n:"Allegro",                 f:"Rhymes AI",   p:"2.8B",     pb:2.8,  vram:10,  ram:16, c:"video"},
  {id:"Doubiiu/ToonCrafter",                      n:"ToonCrafter",             f:"Community",   p:"1.5B",     pb:1.5,  vram:6,   ram:10, c:"video"},
  {id:"guoyww/AnimateDiff",                       n:"AnimateDiff",             f:"Community",   p:"1.5B",     pb:1.5,  vram:6,   ram:10, c:"video"},
  {id:"hpcai-tech/Open-Sora",                     n:"Open-Sora 1.2",          f:"HPC-AI",      p:"1.1B",     pb:1.1,  vram:8,   ram:12, c:"video"},
  {id:"Pyramid-Flow/pyramid-flow-miniflux",        n:"Pyramid Flow MiniFlux",   f:"Community",   p:"1B",       pb:1,    vram:6,   ram:10, c:"video"},

  // ===== AUDIO (STT / TTS / Generation) =====
  {id:"openai/whisper-large-v3",                   n:"Whisper Large v3",        f:"OpenAI",      p:"1.6B",     pb:1.6,  vram:3.2,   ram:6,  c:"audio"},
  {id:"openai/whisper-large-v3-turbo",             n:"Whisper Large v3 Turbo",  f:"OpenAI",      p:"809M",     pb:.81,  vram:2,   ram:4,  c:"audio"},
  {id:"openai/whisper-medium",                     n:"Whisper Medium",          f:"OpenAI",      p:"769M",     pb:.77,  vram:2,   ram:4,  c:"audio"},
  {id:"openai/whisper-small",                      n:"Whisper Small",           f:"OpenAI",      p:"244M",     pb:.244, vram:1,   ram:2,  c:"audio"},
  {id:"openai/whisper-base",                       n:"Whisper Base",            f:"OpenAI",      p:"74M",      pb:.074, vram:.5,  ram:1,  c:"audio"},
  {id:"suno/bark",                                 n:"Bark TTS",                f:"Suno",        p:"1B",       pb:1,    vram:4,   ram:8,  c:"audio"},
  {id:"coqui/XTTS-v2",                            n:"XTTS v2",                 f:"Coqui",       p:"450M",     pb:.45,  vram:2,   ram:4,  c:"audio"},
  {id:"fishaudio/fish-speech-1.5",                 n:"Fish Speech 1.5",         f:"Fish Audio",  p:"500M",     pb:.5,   vram:2,   ram:4,  c:"audio"},
  {id:"fishaudio/s2-pro",                         n:"Fish Audio S2 Pro",       f:"Fish Audio",  p:"5B",       pb:5,    vram:10,  ram:16, c:"audio"},
  {id:"nari-labs/Dia-1.6B",                        n:"Dia 1.6B TTS",            f:"Nari Labs",   p:"1.6B",     pb:1.6,  vram:3.2,   ram:6,  c:"audio"},
  {id:"parler-tts/parler-tts-large-v1",            n:"Parler TTS Large",        f:"Parler",      p:"2.3B",     pb:2.3,  vram:4.6,   ram:8,  c:"audio"},
  {id:"OuteAI/OuteTTS-0.3-1B",                    n:"OuteTTS 0.3 1B",          f:"Oute AI",     p:"1B",       pb:1,    vram:2,   ram:4,  c:"audio"},
  {id:"facebook/musicgen-medium",                  n:"MusicGen Medium",         f:"Meta",        p:"1.5B",     pb:1.5,  vram:3,   ram:6,  c:"audio"},
  {id:"facebook/musicgen-large",                   n:"MusicGen Large",          f:"Meta",        p:"3.3B",     pb:3.3,  vram:6.6,   ram:10, c:"audio"},
  {id:"stabilityai/stable-audio-open-1.0",         n:"Stable Audio Open",       f:"Stability",   p:"1.2B",     pb:1.2,  vram:3,   ram:6,  c:"audio"},

  // ===== xAI Grok =====
  {id:"xai-org/grok-1",                           n:"Grok-1 314B",             f:"xAI",         p:"314B MoE", pb:86,   vram:188.4, ram:256,c:"general"},

  // ===== EXAONE (LG AI Research) =====
  {id:"LGAI-EXAONE/EXAONE-4.0-32B",               n:"EXAONE 4.0 32B",          f:"LG AI",       p:"32B",      pb:32,   vram:19.2,  ram:32, c:"general"},
  {id:"LGAI-EXAONE/EXAONE-Deep-32B",               n:"EXAONE Deep 32B",         f:"LG AI",       p:"32B",      pb:32,   vram:19.2,  ram:32, c:"reason"},
  {id:"LGAI-EXAONE/EXAONE-Deep-2.4B",              n:"EXAONE Deep 2.4B",        f:"LG AI",       p:"2.4B",     pb:2.4,  vram:1.4, ram:4,  c:"reason"},

  // ===== MiniMax =====
  {id:"MiniMaxAI/MiniMax-M2.1",                    n:"MiniMax M2.1 229B",       f:"MiniMax",     p:"229B",     pb:229,  vram:137, ram:160, c:"code"},
  {id:"MiniMaxAI/MiniMax-M2.5",                    n:"MiniMax M2.5 229B",       f:"MiniMax",     p:"229B",     pb:229,  vram:137, ram:160, c:"code"},

  // ===== Baichuan =====
  {id:"baichuan-inc/Baichuan4-Turbo",              n:"Baichuan 4 Turbo",        f:"Baichuan",    p:"70B",      pb:70,   vram:42,  ram:64, c:"general"},

  // ===== Cohere Aya =====
  {id:"CohereLabs/aya-23-35B",                     n:"Aya 23 35B",              f:"Cohere",      p:"35B",      pb:35,   vram:21,  ram:32, c:"general"},
  {id:"CohereLabs/aya-23-8B",                      n:"Aya 23 8B",               f:"Cohere",      p:"8B",       pb:8,    vram:4.8, ram:8,  c:"general"},

  // ===== Moonshot (additional) =====
  {id:"moonshotai/Kimi-Dev-72B",                   n:"Kimi Dev 72B",            f:"Moonshot",    p:"72B",      pb:72,   vram:43.2,  ram:64, c:"code"},

  // ===== OpenCoder =====
  {id:"infly/OpenCoder-8B-Instruct",               n:"OpenCoder 8B",            f:"OpenCoder",   p:"8B",       pb:8,    vram:4.8, ram:8,  c:"code"},

  // ===== Molmo (AllenAI) =====
  {id:"allenai/Molmo-72B-0924",                    n:"Molmo 72B",               f:"AllenAI",     p:"72B",      pb:72,   vram:43.2,  ram:64, c:"vision"},
  {id:"allenai/Molmo-7B-D-0924",                   n:"Molmo 7B",                f:"AllenAI",     p:"7B",       pb:7,    vram:4.2, ram:10, c:"vision"},
  {id:"allenai/Molmo-1B-D-0924",                   n:"Molmo 1B",                f:"AllenAI",     p:"1B",       pb:1,    vram:0.6, ram:3,  c:"vision"},

  // ===== LLaVA OneVision =====
  {id:"llava-hf/llava-onevision-qwen2-72b-ov-hf",  n:"LLaVA-OneVision 72B",    f:"LLaVA",       p:"72B",      pb:72,   vram:43.2,  ram:64, c:"vision"},
  {id:"llava-hf/llava-onevision-qwen2-7b-ov-hf",   n:"LLaVA-OneVision 7B",     f:"LLaVA",       p:"7B",       pb:7,    vram:4.2, ram:10, c:"vision"},

  // ===== SmolVLM / IDEFICS =====
  {id:"HuggingFaceTB/SmolVLM-2.2B-Instruct",       n:"SmolVLM 2.2B",           f:"HuggingFace", p:"2.2B",     pb:2.2,  vram:1.3, ram:4,  c:"vision"},
  {id:"HuggingFaceM4/Idefics3-8B-Llama3",          n:"IDEFICS 3 8B",            f:"HuggingFace", p:"8B",       pb:8,    vram:4.8, ram:10, c:"vision"},

  // ===== Medical / Science =====
  {id:"google/medgemma-4b-it",                     n:"MedGemma 4B",             f:"Google",      p:"4B",       pb:4,    vram:2.4, ram:6,  c:"medical"},
  {id:"google/medgemma-27b-text-it",               n:"MedGemma 27B",            f:"Google",      p:"27B",      pb:27,   vram:16.2,  ram:24, c:"medical"},
  {id:"BioMistral/BioMistral-7B",                  n:"BioMistral 7B",           f:"BioMistral",  p:"7B",       pb:7,    vram:4.2, ram:8,  c:"medical"},
  {id:"aaditya/Llama3-OpenBioLLM-70B",             n:"OpenBioLLM 70B",          f:"Community",   p:"70B",      pb:70,   vram:42,  ram:64, c:"medical"},
  {id:"epfl-llm/meditron-70b",                     n:"Meditron 70B",            f:"EPFL",        p:"70B",      pb:70,   vram:42,  ram:64, c:"medical"},
  {id:"johnsnowlabs/JSL-MedLlama-3-8B-v2.0",      n:"MedLlama 3 8B",           f:"John Snow",   p:"8B",       pb:8,    vram:4.8, ram:8,  c:"medical"},
  {id:"AdaptLLM/medicine-chat",                    n:"Medicine Chat 7B",         f:"AdaptLLM",    p:"7B",       pb:7,    vram:4.2, ram:8,  c:"medical"},

  // ===== Finance =====
  {id:"TheFinAI/finma-7b-full",                    n:"FinMA 7B",                f:"FinAI",       p:"7B",       pb:7,    vram:4.2, ram:8,  c:"finance"},
  {id:"AdaptLLM/finance-chat",                     n:"Finance Chat 7B",         f:"AdaptLLM",    p:"7B",       pb:7,    vram:4.2, ram:8,  c:"finance"},
  {id:"ai4finance/FinGPT-Llama2-7B",               n:"FinGPT 7B",               f:"AI4Finance",  p:"7B",       pb:7,    vram:4.2, ram:8,  c:"finance"},
  {id:"SALT-NLP/InvestLM_65B",                     n:"InvestLM 65B",            f:"SALT-NLP",    p:"65B",      pb:65,   vram:39,  ram:48, c:"finance"},

  // ===== Legal =====
  {id:"equall/Saul-7B-Instruct-v1",                n:"Saul 7B (Legal)",         f:"Equall",      p:"7B",       pb:7,    vram:4.2, ram:8,  c:"legal"},

  // ===== Image Generation (additional) =====
  {id:"black-forest-labs/FLUX.1-Kontext-dev",       n:"FLUX.1 Kontext",         f:"Black Forest",p:"12B",      pb:12,   vram:24,  ram:24, c:"image"},
  {id:"HiDream-ai/HiDream-I1-Full",                n:"HiDream I1 Full",        f:"HiDream",     p:"17B",      pb:17,   vram:34,  ram:48, c:"image"},
  {id:"HiDream-ai/HiDream-I1-Dev",                 n:"HiDream I1 Dev",         f:"HiDream",     p:"17B",      pb:17,   vram:34,  ram:48, c:"image"},
  {id:"Alpha-VLLM/Lumina-Image-2.0",               n:"Lumina Image 2.0",       f:"Lumina",      p:"2B",       pb:2,    vram:6,   ram:10, c:"image"},

  // ===== Video Generation (additional) =====
  {id:"Wan-AI/Wan2.2-T2V-5B",                      n:"Wan 2.2 T2V 5B",         f:"Alibaba",     p:"5B",       pb:5,    vram:12,  ram:20, c:"video"},
  {id:"lllyasviel/FramePack",                      n:"FramePack",              f:"FramePack",   p:"130M",     pb:.13,  vram:6,   ram:10, c:"video"},

  // ===== 3D Generation =====
  {id:"microsoft/TRELLIS-2-4B",                    n:"TRELLIS.2 4B",           f:"Microsoft",   p:"4B",       pb:4,    vram:12,  ram:16, c:"threeD"},
  {id:"tencent/Hunyuan3D-2",                       n:"Hunyuan3D 2.0",          f:"Tencent",     p:"Multi",    pb:4,    vram:16,  ram:24, c:"threeD"},

  // ===== TTS / Voice =====
  {id:"hexgrad/Kokoro-82M",                        n:"Kokoro 82M",             f:"Kokoro",      p:"82M",      pb:.082, vram:.5,  ram:1,  c:"audio"},
  {id:"sesame/csm-1b",                             n:"Sesame CSM 1B",          f:"Sesame",      p:"1B",       pb:1,    vram:2,   ram:4,  c:"audio"},
  {id:"resemble-ai/chatterbox-turbo",              n:"Chatterbox Turbo",       f:"Resemble",    p:"350M",     pb:.35,  vram:1,   ram:2,  c:"audio"},
  {id:"canopylabs/orpheus-3b-0.1-ft",              n:"Orpheus TTS 3B",         f:"Orpheus",     p:"3B",       pb:3,    vram:6,   ram:6,  c:"audio"},
  {id:"SWivid/F5-TTS",                             n:"F5-TTS",                 f:"F5-TTS",      p:"330M",     pb:.33,  vram:2,   ram:4,  c:"audio"},
  {id:"SparkAudio/Spark-TTS-0.5B",                 n:"Spark TTS 0.5B",         f:"Spark",       p:"0.5B",     pb:.5,   vram:1,   ram:2,  c:"audio"},
  {id:"FunAudioLLM/CosyVoice2-0.5B",              n:"CosyVoice2 0.5B",        f:"Alibaba",     p:"0.5B",     pb:.5,   vram:2,   ram:4,  c:"audio"},
  {id:"ChatTTS/ChatTTS",                           n:"ChatTTS",                f:"ChatTTS",     p:"400M",     pb:.4,   vram:2,   ram:4,  c:"audio"},
  {id:"kyutai/moshi-7b",                           n:"Moshi 7B",               f:"Kyutai",      p:"7B",       pb:7,    vram:14,   ram:24, c:"audio"},

  // ===== ASR (Speech-to-Text) =====
  {id:"nvidia/parakeet-tdt-0.6b-v2",               n:"Parakeet TDT 0.6B",      f:"NVIDIA",      p:"600M",     pb:.6,   vram:2,   ram:4,  c:"audio"},
  {id:"nvidia/canary-qwen-2.5b",                   n:"Canary Qwen 2.5B",       f:"NVIDIA",      p:"2.5B",     pb:2.5,  vram:5,   ram:6,  c:"audio"},

  // ===== Music Generation (additional) =====
  {id:"ace-step/ACE-Step-v1.5",                    n:"ACE-Step 1.5",           f:"ACE-Step",    p:"1B",       pb:1,    vram:4,   ram:8,  c:"audio"},
  {id:"m-a-p/YuE-s1-7B-anneal-en-cot",            n:"YuE 7B",                 f:"YuE",         p:"7B",       pb:7,    vram:14,   ram:24, c:"audio"},

  // ===== Embedding (additional) =====
  {id:"nomic-ai/modernbert-embed-base",            n:"ModernBERT Embed",       f:"Nomic",       p:"149M",     pb:.149, vram:.3,  ram:1,  c:"embed"},
  {id:"nomic-ai/nomic-embed-text-v2-moe",          n:"Nomic Embed V2 MoE",     f:"Nomic",       p:"475M MoE", pb:.305, vram:1.0, ram:2,  c:"embed"},
];

document.getElementById("mcount").textContent = M.length + " models indexed — text, code, image, video, audio, 3D, embeddings & more";
