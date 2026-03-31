// data.js — Model database, descriptions, and constants
const AFF = "affiliate-20";

// ===== MODEL DESCRIPTIONS =====
const DESC = {
  // Llama
  "meta-llama/Llama-3.2-1B-Instruct":"Compact multilingual model for edge devices and on-device AI. Great for simple tasks with minimal resources.",
  "meta-llama/Llama-3.2-3B-Instruct":"Small but capable general-purpose model. Strong at summarization, instruction following, and basic reasoning.",
  "meta-llama/Llama-3.2-11B-Vision-Instruct":"Multimodal model that understands both text and images. Can describe photos, read documents, and answer visual questions.",
  "meta-llama/Llama-3.2-90B-Vision-Instruct":"Large multimodal model with strong vision and language capabilities. Handles complex visual reasoning tasks.",
  "meta-llama/Llama-3.1-8B-Instruct":"Versatile 8B model with 128K context. Strong at chat, coding, and general knowledge tasks.",
  "meta-llama/Llama-3.1-70B-Instruct":"High-performance open model rivaling GPT-4 class systems. Excellent at reasoning, coding, and multilingual tasks.",
  "meta-llama/Llama-3.1-405B-Instruct":"The largest open-weight model available. State-of-the-art performance across virtually all benchmarks.",
  "meta-llama/Llama-3.3-70B-Instruct":"Latest Llama 3 series with improved instruction following and reduced hallucinations over 3.1.",
  "meta-llama/Llama-4-Scout-17B-16E-Instruct":"Llama 4 MoE model with 16 experts. 10M token context window. Strong multimodal and multilingual capabilities.",
  "meta-llama/Llama-4-Maverick-17B-128E-Instruct":"Llama 4 flagship with 128 experts. Top-tier MoE performance for research and production workloads.",

  // CodeLlama
  "codellama/CodeLlama-7b-Instruct-hf":"Code-specialized Llama fine-tune. Supports code generation, completion, and debugging across many languages.",
  "codellama/CodeLlama-13b-Instruct-hf":"Mid-size code model with stronger reasoning than 7B. Good for complex code generation tasks.",
  "codellama/CodeLlama-34b-Instruct-hf":"Large code model excelling at code review, refactoring, and multi-file understanding.",
  "codellama/CodeLlama-70b-Instruct-hf":"The most capable CodeLlama. Near-GPT-4 level code generation with strong debugging skills.",

  // Mistral
  "mistralai/Mistral-7B-Instruct-v0.3":"Punches well above its weight class. One of the best 7B models for general chat and reasoning.",
  "mistralai/Mistral-Nemo-Instruct-2407":"12B model built with NVIDIA. 128K context with strong multilingual and coding performance.",
  "mistralai/Mistral-Small-Instruct-2409":"Mistral's optimized 22B model. Great balance of speed and capability for production use.",
  "mistralai/Mixtral-8x7B-Instruct-v0.1":"Sparse MoE model — only activates 12B params per token. Fast inference with 47B-level quality.",
  "mistralai/Mixtral-8x22B-Instruct-v0.1":"Large MoE with 39B active params. One of the strongest open MoE models for complex tasks.",
  "mistralai/Codestral-22B-v0.1":"Mistral's dedicated code model. Trained on 80+ languages with fill-in-the-middle support.",
  "mistralai/Pixtral-12B-2409":"Mistral's vision-language model. Understands images natively with strong text capabilities.",
  "mistralai/Mistral-Large-Instruct-2407":"Mistral's flagship 123B dense model. Top-tier reasoning and multilingual performance.",
  "mistralai/Mistral-Small-3.1-24B-Instruct-2503":"Latest Mistral Small with vision support. Fast, capable, and efficient for multimodal tasks.",
  "mistralai/Mistral-Small-4-119B-2603":"Mistral Small 4 — 119B MoE with only 6.5B active params. Multimodal, reasoning modes, 256K context. 3x faster than Small 3.",
  "mistralai/Pixtral-Large-Instruct-2411":"Large multimodal Mistral model. Strong at document understanding and visual reasoning.",
  "mistralai/Codestral-Mamba-7B-v0.1":"Code model using Mamba architecture instead of Transformer. Efficient for long code contexts.",
  "mistralai/Devstral-Small-2505":"Mistral's developer-focused model. Optimized for agentic coding tasks and tool use.",

  // Qwen 3
  "Qwen/Qwen3-0.6B":"Tiny but surprisingly capable. Runs on almost anything including phones and Raspberry Pi.",
  "Qwen/Qwen3-1.7B":"Compact model great for edge deployment. Supports both thinking and non-thinking modes.",
  "Qwen/Qwen3-4B":"Sweet spot for lightweight local AI. Strong multilingual support across 100+ languages.",
  "Qwen/Qwen3-8B":"Excellent general-purpose model. Competitive with much larger models on reasoning benchmarks.",
  "Qwen/Qwen3-14B":"Strong mid-range model for coding, math, and creative writing. Great performance per VRAM dollar.",
  "Qwen/Qwen3-30B-A3B":"MoE model activating only 3B params per token. Huge model quality at tiny inference cost.",
  "Qwen/Qwen3-32B":"One of the best open 32B models. Excellent at complex reasoning and long-form generation.",
  "Qwen/Qwen3-235B-A22B":"Massive MoE flagship. 22B active params deliver frontier-level performance on reasoning and code.",

  // Qwen 3.5
  "Qwen/Qwen3.5-0.8B":"Qwen 3.5 tiny model with native multimodal support. Hybrid GatedDeltaNet + attention architecture. 262K context.",
  "Qwen/Qwen3.5-2B":"Compact Qwen 3.5 with multimodal capabilities. Efficient for edge and mobile deployment. 262K context.",
  "Qwen/Qwen3.5-4B":"Small but powerful multimodal model. Supports text, image, and video input natively. 262K context.",
  "Qwen/Qwen3.5-9B":"Mid-range Qwen 3.5 with strong reasoning and multimodal understanding. 262K context, extendable to 1M.",
  "Qwen/Qwen3.5-27B":"Large dense Qwen 3.5. Excellent at coding, reasoning, and visual tasks. 262K context, extendable to 1M.",
  "Qwen/Qwen3.5-35B-A3B":"MoE model with 256 experts, only 3B active per token. Massive quality at tiny inference cost. 262K context.",
  "Qwen/Qwen3.5-122B-A10B":"Large MoE with 10B active params. Hybrid GatedDeltaNet + sparse MoE. Supports 201 languages. 262K context.",
  "Qwen/Qwen3.5-397B-A17B":"Qwen 3.5 flagship. 512 experts, 17B active. Frontier-level multimodal reasoning across text, image, and video.",

  // Qwen 2.5
  "Qwen/Qwen2.5-0.5B-Instruct":"Ultra-lightweight model for constrained environments. Basic chat and simple tasks.",
  "Qwen/Qwen2.5-1.5B-Instruct":"Small but effective for basic instruction following and text generation.",
  "Qwen/Qwen2.5-3B-Instruct":"Good entry-level model for local AI. Handles summarization and Q&A well.",
  "Qwen/Qwen2.5-7B-Instruct":"Solid all-rounder. Strong at coding, math, and multilingual tasks for its size.",
  "Qwen/Qwen2.5-14B-Instruct":"Excellent mid-range model. Competitive with Llama 3.1 70B on several benchmarks.",
  "Qwen/Qwen2.5-32B-Instruct":"High-capability model for demanding tasks. Strong reasoning and long-context understanding.",
  "Qwen/Qwen2.5-72B-Instruct":"Qwen's large flagship. Top-tier open model for complex reasoning, coding, and analysis.",
  "Qwen/Qwen3-Coder-30B-A3B-Instruct":"30B MoE code model with only 3B active params. Fast agentic coding with tool use. 262K context.",
  "Qwen/Qwen3-Coder-480B-A35B-Instruct":"480B MoE flagship coder. 35B active params, 160 experts. Rivals Claude Sonnet on coding. 262K context, extendable to 1M.",
  "Qwen/Qwen3-Coder-Next":"80B dense code model. Strong repo-scale code understanding and agentic workflows.",
  "Qwen/Qwen2.5-Coder-0.5B-Instruct":"Tiny code assistant for autocomplete and simple generation. Runs anywhere.",
  "Qwen/Qwen2.5-Coder-1.5B-Instruct":"Lightweight code model. Good for real-time code completion in IDEs.",
  "Qwen/Qwen2.5-Coder-3B-Instruct":"Capable small code model. Handles multi-file edits and debugging.",
  "Qwen/Qwen2.5-Coder-7B-Instruct":"Strong code model supporting 90+ languages. Great for local Copilot replacement.",
  "Qwen/Qwen2.5-Coder-14B-Instruct":"Powerful code model rivaling GPT-4 on coding benchmarks. Excellent for complex refactoring.",
  "Qwen/Qwen2.5-Coder-32B-Instruct":"One of the best open code models. Near-frontier performance on code generation and review.",
  "Qwen/QwQ-32B":"Qwen's reasoning specialist. Uses chain-of-thought to solve math, logic, and science problems.",

  // Qwen VL
  "Qwen/Qwen2-VL-7B-Instruct":"Vision-language model understanding images, charts, and documents. Good for OCR and visual Q&A.",
  "Qwen/Qwen2-VL-72B-Instruct":"Large vision-language model with state-of-the-art visual understanding capabilities.",
  "Qwen/Qwen2.5-VL-3B-Instruct":"Compact multimodal model. Understands images and video with minimal hardware.",
  "Qwen/Qwen2.5-VL-7B-Instruct":"Updated vision-language model with improved document and chart understanding.",
  "Qwen/Qwen2.5-VL-32B-Instruct":"Strong multimodal model for detailed image analysis and visual reasoning.",
  "Qwen/Qwen2.5-VL-72B-Instruct":"Flagship Qwen vision model. Excellent at complex visual tasks and long video understanding.",
  "Qwen/Qwen2-Audio-7B-Instruct":"Understands speech and audio. Can transcribe, translate, and answer questions about audio content.",
  "Qwen/Qwen2.5-Omni-7B":"Multimodal model handling text, images, audio, and video in a single model.",
  "Qwen/Qwen-Image-2512":"Top-ranked open-source text-to-image model. Enhanced human realism, natural detail, and text rendering.",
  "Qwen/Qwen-Image-Edit-2511":"Image editing model with character consistency, multi-person editing, built-in LoRA, and industrial design support.",

  // DeepSeek
  "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B":"Distilled reasoning model. Brings R1's chain-of-thought ability to a tiny package.",
  "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B":"7B reasoning model distilled from DeepSeek R1. Strong math and logic performance.",
  "deepseek-ai/DeepSeek-R1-Distill-Llama-8B":"R1 reasoning distilled into Llama 8B. Good balance of speed and reasoning quality.",
  "deepseek-ai/DeepSeek-R1-Distill-Qwen-14B":"14B reasoning specialist. Excellent at step-by-step problem solving and analysis.",
  "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B":"Powerful reasoning model. Approaches full R1 quality on math and coding tasks.",
  "deepseek-ai/DeepSeek-R1-Distill-Llama-70B":"Large reasoning model with near-frontier performance on complex problem solving.",
  "deepseek-ai/DeepSeek-R1":"Full DeepSeek R1 with 671B MoE. One of the strongest reasoning models ever released as open-weight.",
  "deepseek-ai/DeepSeek-V3":"DeepSeek's flagship general model. 671B MoE with strong performance across all tasks.",
  "deepseek-ai/DeepSeek-Coder-V2-Lite-Instruct":"Lightweight MoE code model. Only 2.4B active params but strong coding performance.",
  "deepseek-ai/DeepSeek-Coder-V2-Instruct":"Large MoE code model. Exceptional at code generation, debugging, and repository-level tasks.",
  "deepseek-ai/DeepSeek-V2.5":"Unified chat and code model. Combines V2's capabilities with improved instruction following.",

  // Google Gemma
  "google/gemma-3-1b-it":"Google's tiny open model. Efficient and well-trained for basic tasks on minimal hardware.",
  "google/gemma-3-4b-it":"Compact multimodal model with vision support. Strong efficiency for its size class.",
  "google/gemma-3-12b-it":"Mid-range Gemma with vision. Excellent quality-to-size ratio from Google's training infrastructure.",
  "google/gemma-3-27b-it":"Gemma's largest model. Strong multimodal capabilities competitive with much bigger models.",
  "google/gemma-2-9b-it":"Previous-gen 9B model. Still very competitive for general chat and instruction following.",
  "google/gemma-2-27b-it":"Previous-gen large Gemma. Reliable for production workloads requiring good general performance.",
  "google/gemma-3n-e4b-it":"Gemma optimized for on-device deployment. Designed for mobile and edge inference.",

  // Microsoft Phi
  "microsoft/phi-4":"Microsoft's 14B model punching way above its weight. Excellent at reasoning, math, and coding.",
  "microsoft/Phi-4-mini-instruct":"Compact 3.8B model with surprisingly strong capabilities. Great for resource-constrained setups.",
  "microsoft/Phi-3.5-mini-instruct":"Previous-gen small Phi. Still excellent for lightweight local deployment.",
  "microsoft/Orca-2-7b":"Trained to use multiple reasoning strategies. Good at step-by-step analysis and explanation.",
  "microsoft/Phi-4-reasoning-plus":"Phi-4 fine-tuned specifically for complex reasoning tasks. Strong on math and logic puzzles.",
  "microsoft/Phi-4-multimodal-instruct":"Phi-4 with vision and speech input. Compact multimodal AI for edge devices.",
  "microsoft/Phi-3-medium-4k-instruct":"14B Phi-3 model. Strong general performance in a mid-range package.",
  "microsoft/Phi-3-vision-128k-instruct":"Vision-enabled Phi-3. Can understand images with a 128K context window.",

  // Cohere
  "CohereForAI/c4ai-command-r-v01":"Built for RAG and tool use. Excellent at grounded generation with source citations.",
  "CohereForAI/c4ai-command-r-plus-08-2024":"Cohere's large model. Top-tier for enterprise RAG, search, and agentic workflows.",
  "CohereForAI/c4ai-command-a-03-2025":"Latest Cohere MoE model. Strong at multilingual tasks with 23 language support.",

  // GLM / Zhipu
  "zai-org/GLM-5":"Frontier 744B MoE with 40B active params. DeepSeek Sparse Attention. Top-tier reasoning, coding, and agentic capabilities.",
  "THUDM/glm-4-9b-chat":"Chinese-English bilingual model with strong general capabilities. 1M token context support.",
  "THUDM/glm-4v-9b":"GLM with vision support. Understands Chinese and English text in images.",
  "THUDM/GLM-Z1-9B-0414":"GLM reasoning model using deep thinking. Strong at math, logic, and code.",
  "THUDM/GLM-Z1-32B-0414":"Large GLM reasoning model. Competitive with frontier reasoning models on complex tasks.",
  "THUDM/codegeex-4-all-9b":"Zhipu's code model. Multi-language code generation with IDE integration support.",
  "THUDM/GLM-4-9B-Chat-1M":"GLM-4 with 1 million token context window. Ideal for processing very long documents.",

  // Kimi / Moonshot
  "moonshotai/Kimi-K2.5":"Frontier 1T MoE model with 32B active params. 384 experts, 256K context. Excels at reasoning, coding, and multimodal tasks.",
  "moonshotai/Kimi-VL-A3B-Instruct":"Lightweight MoE vision-language model. Only 2.8B active params with strong visual understanding.",
  "moonshotai/Kimi-VL-A3B-Thinking":"Kimi VL with extended reasoning. Chain-of-thought over visual and text inputs.",

  // InternLM
  "internlm/internlm2_5-7b-chat":"Strong Chinese-English model from Shanghai AI Lab. Good at math, code, and chat.",
  "internlm/internlm2_5-20b-chat":"Larger InternLM with improved reasoning and knowledge capabilities.",
  "internlm/internlm3-8b-instruct":"Latest InternLM generation. Improved instruction following and reduced hallucinations.",

  // InternVL
  "OpenGVLab/InternVL2-2B":"Tiny vision-language model. Basic image understanding on minimal hardware.",
  "OpenGVLab/InternVL2-8B":"Capable vision model. Strong at OCR, chart reading, and visual Q&A.",
  "OpenGVLab/InternVL2-26B":"Large vision model with detailed image understanding and multi-image reasoning.",
  "OpenGVLab/InternVL2-40B":"High-performance multimodal model competitive with proprietary vision APIs.",
  "OpenGVLab/InternVL3-8B":"Latest InternVL with improved visual reasoning and document understanding.",
  "OpenGVLab/InternVL3-14B":"Strong mid-size vision model. Excellent at detailed image analysis.",

  // NVIDIA
  "nvidia/Llama-3_1-Nemotron-Ultra-253B-v1-FP8":"253B dense model derived from Llama 405B via NAS. Strong reasoning, code, and math. Configurable thinking mode. 128K context.",
  "nvidia/Nemotron-Cascade-2-30B-A3B":"30B MoE with only 3B active params. IMO 2025 gold medal. IOI 2025 gold. Exceptional math and competitive programming. Built on Nano 30B.",
  "nvidia/NVIDIA-Nemotron-3-Nano-4B-Instruct":"Tiny 4B model for edge and mobile. Fast inference on modest hardware.",
  "nvidia/NVIDIA-Nemotron-Nano-9B-v2":"9B general model. Strong instruction following for its size.",
  "nvidia/NVIDIA-Nemotron-Nano-12B-v2-BF16":"12B model with optional vision support. Good balance of speed and capability.",
  "nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-Instruct":"30B MoE base with 3B active params. Efficient inference with large model quality.",
  "nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-BF16":"120B LatentMoE with 12B active. Hybrid Mamba-2 + MoE + Attention. 1M context. Strong agentic, coding, and reasoning.",
  "nvidia/Llama-3.1-Nemotron-70B-Instruct-HF":"NVIDIA-optimized Llama 3.1. Improved helpfulness and accuracy via RLHF.",

  // IBM
  "ibm-granite/granite-3.1-2b-instruct":"IBM's enterprise-focused small model. Designed for business document processing.",
  "ibm-granite/granite-3.1-8b-instruct":"IBM's mid-size enterprise model. Strong at structured data and business tasks.",

  // BigCode
  "bigcode/starcoder2-3b":"Open-source code model trained on The Stack v2. Supports 600+ languages.",
  "bigcode/starcoder2-7b":"Mid-size StarCoder. Good for code completion and generation across many languages.",
  "bigcode/starcoder2-15b":"Largest StarCoder2. Strong code generation competitive with much larger models.",

  // Embedding models
  "sentence-transformers/all-MiniLM-L6-v2":"Fast, lightweight embedding model. Industry standard for semantic search and similarity.",
  "sentence-transformers/all-MiniLM-L12-v2":"Slightly larger MiniLM with better accuracy. Good speed-quality tradeoff for embeddings.",
  "BAAI/bge-small-en-v1.5":"Small but accurate English embedding model from Beijing Academy of AI.",
  "BAAI/bge-base-en-v1.5":"Base-size BGE embedding. Strong retrieval performance for its size.",
  "BAAI/bge-large-en-v1.5":"Large BGE embedding. Top-tier retrieval accuracy among sub-1B models.",
  "BAAI/bge-m3":"Multilingual embedding model supporting 100+ languages. Handles up to 8K tokens.",
  "nomic-ai/nomic-embed-text-v1.5":"Open-source embedding with 8K context. Strong at long document retrieval.",
  "mixedbread-ai/mxbai-embed-large-v1":"High-quality embeddings competitive with OpenAI's text-embedding-3-small.",
  "Alibaba-NLP/gte-Qwen2-1.5B-instruct":"Qwen-based embedding model. Excellent multilingual retrieval performance.",
  "Alibaba-NLP/gte-Qwen2-7B-instruct":"Large embedding model with state-of-the-art retrieval on MTEB benchmarks.",
  "jinaai/jina-embeddings-v3":"Jina's latest embeddings. Strong at code, multilingual, and long-context retrieval.",
  "Snowflake/snowflake-arctic-embed-m-v2.0":"Snowflake's mid-size embedding. Optimized for enterprise search and RAG.",
  "Snowflake/snowflake-arctic-embed-l-v2.0":"Large Snowflake embedding. Top retrieval accuracy for its size.",
  "intfloat/e5-mistral-7b-instruct":"7B embedding model based on Mistral. Very high accuracy at the cost of more compute.",
  "dunzhang/stella_en_1.5B_v5":"Efficient English embedding model. Strong performance on retrieval benchmarks.",

  // Vision models
  "vikhyatk/moondream2":"Ultra-compact vision model. Runs on edge devices, answers questions about images.",
  "llava-hf/llava-1.5-7b-hf":"Pioneering open vision-language model. Connects a vision encoder to Llama for image chat.",
  "llava-hf/llava-1.5-13b-hf":"Larger LLaVA with improved visual understanding and more detailed responses.",
  "openbmb/MiniCPM-V-2_6":"Efficient multimodal model from Tsinghua. Strong OCR and document understanding.",

  // Reasoning
  "NovaSky-Berkeley/Sky-T1-32B-Preview":"Berkeley's reasoning model. Trained with process reward models for better step-by-step logic.",
  "AIDC-AI/Marco-o1":"Open reasoning model focused on math and chain-of-thought problem solving.",
  "AIDC-AI/Marco-o1-CoT":"Marco-o1 with explicit chain-of-thought. Shows reasoning steps for transparency.",
  "Skywork/Skywork-o1-Open-Llama-3.1-8B":"Open reasoning model based on Llama 3.1. Good at math and logic puzzles.",

  // Community
  "teknium/OpenHermes-2.5-Mistral-7B":"Community fine-tune known for excellent instruction following. One of the most popular 7B models.",
  "HuggingFaceTB/SmolLM2-1.7B-Instruct":"HuggingFace's small language model. Designed for on-device and embedded AI.",
  "HuggingFaceTB/SmolLM2-135M-Instruct":"Ultra-tiny model for the most constrained devices. Basic text capabilities.",
  "HuggingFaceTB/SmolLM2-360M-Instruct":"Very small model that still handles simple instructions and text generation.",
  "tiiuae/falcon-40b-instruct":"TII's large open model. Trained on massive web data with strong general knowledge.",
  "databricks/dbrx-instruct":"Databricks' MoE model. 36B active params with strong code and general performance.",
  "NousResearch/Hermes-3-Llama-3.1-8B":"Nous Research fine-tune with excellent function calling and structured output.",
  "NousResearch/Hermes-3-Llama-3.1-70B":"Large Hermes model. Top-tier for agentic tasks, tool use, and structured generation.",
  "01-ai/Yi-1.5-9B-Chat":"Chinese AI startup's mid-size model. Strong bilingual (Chinese/English) capabilities.",
  "01-ai/Yi-1.5-34B-Chat":"Yi's large model. Competitive bilingual performance with strong reasoning.",
  "01-ai/Yi-34B-Chat":"Original Yi 34B. Still a strong bilingual model for Chinese/English tasks.",
  "upstage/SOLAR-10.7B-Instruct-v1.0":"Depth-upscaled Llama model. Unique architecture that punches above its size class.",
  "allenai/OLMo-2-1124-7B-Instruct":"Fully open model from AI2 — open data, code, weights, and training details.",
  "allenai/OLMo-2-1124-13B-Instruct":"Larger OLMo with improved performance. Fully transparent and reproducible.",
  "TinyLlama/TinyLlama-1.1B-Chat-v1.0":"Trained on 3T tokens despite being 1.1B. Surprisingly capable for its tiny size.",
  "stabilityai/stablelm-2-1_6b-chat":"Stability AI's compact model. Efficient and well-suited for basic local AI tasks.",
  "stabilityai/stablelm-2-12b-chat":"Mid-size StableLM. Good general performance in a resource-friendly package.",
  "HuggingFaceH4/zephyr-7b-beta":"DPO-aligned Mistral fine-tune. Known for helpful, harmless responses.",
  "cognitivecomputations/dolphin-2.9.3-llama-3.1-8B":"Uncensored Llama fine-tune. Follows all instructions without refusals.",
  "WizardLMTeam/WizardLM-2-8x22B":"Microsoft-backed fine-tune of Mixtral. Strong complex instruction following.",
  "Intel/neural-chat-7b-v3-3":"Intel-optimized chat model. Fine-tuned for helpful conversation with good latency.",
  "Nexusflow/Starling-LM-7B-beta":"RLAIF-trained model that ranks high on chat benchmarks despite being only 7B.",
  "Salesforce/xLAM-7b-r":"Salesforce's function-calling specialist. Built for AI agent and tool use tasks.",

  // AI21
  "ai21labs/AI21-Jamba-1.5-Mini":"Hybrid Mamba-Transformer architecture. 256K context with very efficient inference.",
  "ai21labs/AI21-Jamba-1.5-Large":"Large Jamba model. Massive context with fast inference thanks to Mamba layers.",

  // RWKV
  "RWKV/v6-Finch-1B6-HF":"Linear attention model — runs like an RNN. Constant memory usage regardless of context length.",
  "RWKV/v6-Finch-3B-HF":"RWKV-6 with improved training. Efficient inference with no quadratic attention overhead.",
  "RWKV/v6-Finch-7B-HF":"Mid-size RWKV. Great for long-context tasks where Transformer VRAM usage would explode.",
  "RWKV/v6-Finch-14B-HF":"Largest RWKV-6. Competitive quality with Transformers at a fraction of the inference cost.",

  // ===== IMAGE GENERATION =====
  "stabilityai/stable-diffusion-xl-base-1.0":"Industry standard for image generation. Produces high-quality 1024x1024 images with huge community support.",
  "stabilityai/stable-diffusion-3-medium-diffusers":"SD3 with MMDiT architecture. Better text rendering and composition than SDXL.",
  "stabilityai/stable-diffusion-3.5-medium":"Updated SD3 with improved quality and faster generation. Good speed-quality balance.",
  "stabilityai/stable-diffusion-3.5-large":"High-quality SD3.5. Better coherence and detail than medium at the cost of more VRAM.",
  "stabilityai/stable-diffusion-3.5-large-turbo":"Distilled SD3.5 Large for faster generation. Near-equal quality in fewer steps.",
  "black-forest-labs/FLUX.1-dev":"State-of-the-art image generation from Black Forest Labs. Exceptional quality and prompt adherence.",
  "black-forest-labs/FLUX.1-schnell":"Fast version of FLUX.1. Generates in 1-4 steps with impressive quality for the speed.",
  "black-forest-labs/FLUX.1-Fill-dev":"FLUX.1 for inpainting and outpainting. Seamlessly edits parts of existing images.",
  "black-forest-labs/FLUX.1-Redux-dev":"FLUX.1 for image variations. Generates similar images based on a reference input.",
  "Kwai-Kolors/Kolors":"Kuaishou's image model. Strong at photorealistic images and Chinese text understanding.",
  "PixArt-alpha/PixArt-XL-2-1024-MS":"Efficient DiT-based image generator. High quality at a fraction of SDXL's compute cost.",
  "PixArt-alpha/PixArt-Sigma-XL-2-1024-MS":"Updated PixArt with improved quality and 4K resolution support.",
  "playgroundai/playground-v2.5-1024px-aesthetic":"Optimized for aesthetic quality. Produces visually striking images with strong composition.",
  "Tencent-Hunyuan/HunyuanDiT-v1.2-Diffusers":"Tencent's bilingual image model. Understands prompts in both English and Chinese.",
  "OnomaAIResearch/Illustrious-xl-early-release-v0":"Anime and illustration specialist SDXL model. Excels at character art and stylized imagery.",
  "kandinsky-community/kandinsky-3":"Sber's image model. Strong artistic style with good prompt understanding.",
  "dataautogpt3/FLUX-AestheticAnime":"FLUX fine-tuned for anime art. High-quality anime and illustration generation.",
  "Shakker-Labs/FLUX.1-dev-ControlNet-Union-Pro":"FLUX with ControlNet support. Generate images guided by depth maps, edges, or poses.",
  "InstantX/FLUX.1-dev-IP-Adapter":"FLUX with IP-Adapter. Generate images matching the style or content of a reference image.",
  "ByteDance/SDXL-Lightning":"ByteDance's distilled SDXL. Generates quality images in just 1-4 steps.",
  "latent-consistency/lcm-sdxl":"Latent Consistency Model for SDXL. Near-instant image generation in 2-4 steps.",
  "SG161222/RealVisXL_V4.0":"Photorealistic SDXL fine-tune. Excels at generating realistic photos and portraits.",
  "Lykon/dreamshaper-xl-v2-turbo":"Versatile SDXL fine-tune. Great at both realistic and artistic styles with fast generation.",
  "RunDiffusion/Juggernaut-XL-v9":"Popular SDXL fine-tune known for exceptional photorealism and detail.",
  "stabilityai/sdxl-turbo":"Official SDXL distillation. Real-time image generation in a single step.",
  "stabilityai/stable-cascade":"Two-stage image model working in a highly compressed latent space. Very VRAM efficient.",

  // ===== VIDEO GENERATION =====
  "THUDM/CogVideoX-2b":"Compact text-to-video model. Generates short video clips from text descriptions.",
  "THUDM/CogVideoX-5b":"Larger CogVideo with improved motion and consistency in generated videos.",
  "THUDM/CogVideoX1.5-5B":"Updated CogVideo with longer generation and better temporal coherence.",
  "Wan-AI/Wan2.1-T2V-1.3B":"Alibaba's compact text-to-video model. Generates video from text on modest hardware.",
  "Wan-AI/Wan2.1-T2V-14B":"Large Wan model producing high-quality videos with complex motion and scene changes.",
  "Wan-AI/Wan2.1-I2V-14B-480P":"Image-to-video model. Animates still images into 480p video clips.",
  "Wan-AI/Wan2.1-I2V-14B-720P":"Higher resolution image-to-video. Produces 720p animated videos from reference images.",
  "tencent/HunyuanVideo":"Tencent's large video model. High-quality generation with strong motion and scene understanding.",
  "genmo/mochi-1-preview":"Genmo's video generation model. Known for realistic motion and physical consistency.",
  "Lightricks/LTX-Video":"Fast video generation model. Produces short clips efficiently with good visual quality.",
  "Lightricks/LTX-2":"19B DiT audio-video foundation model. Generates synchronized video and audio in one model. Text/image/audio to video.",
  "Lightricks/LTX-2.3":"21B upgrade to LTX-2. Improved audio-visual quality and prompt adherence. Supports 4-20 step generation.",
  "stabilityai/stable-video-diffusion-img2vid-xt-1-1":"Stability's image-to-video model. Animates images into short video sequences.",
  "rhymes-ai/Allegro":"Text-to-video model with strong prompt adherence and motion quality.",
  "Doubiiu/ToonCrafter":"Generates animated sequences between keyframes. Great for cartoon and animation workflows.",
  "guoyww/AnimateDiff":"Motion module that adds animation to any Stable Diffusion image model.",
  "hpcai-tech/Open-Sora":"Open-source Sora-like video generation. Community-driven text-to-video model.",
  "Pyramid-Flow/pyramid-flow-miniflux":"Efficient video generation using pyramidal flow matching. Fast inference.",

  // ===== AUDIO =====
  "openai/whisper-large-v3":"Best open speech-to-text model. Supports 99 languages with near-human accuracy.",
  "openai/whisper-large-v3-turbo":"Faster Whisper with slightly reduced accuracy. Great for real-time transcription.",
  "openai/whisper-medium":"Mid-size Whisper. Good accuracy-speed balance for most transcription needs.",
  "openai/whisper-small":"Lightweight Whisper for faster-than-realtime transcription on modest hardware.",
  "openai/whisper-base":"Minimal Whisper model. Basic transcription for very constrained environments.",
  "suno/bark":"Text-to-speech with voice cloning, music, and sound effects. Very expressive and natural.",
  "coqui/XTTS-v2":"Multi-language TTS with voice cloning from a 6-second sample. 17 languages supported.",
  "fishaudio/fish-speech-1.5":"Fast TTS with voice cloning. Low latency suitable for real-time applications.",
  "fishaudio/s2-pro":"5B Dual-AR TTS model. 80+ languages, inline prosody/emotion control with 15K+ tags. Sub-100ms time-to-first-audio.",
  "nari-labs/Dia-1.6B":"Dialogue TTS that generates natural conversations with multiple speakers and emotions.",
  "parler-tts/parler-tts-large-v1":"Describe the voice you want in text and it generates speech matching that description.",
  "OuteAI/OuteTTS-0.3-1B":"Lightweight TTS model. Fast speech generation with decent quality on minimal resources.",
  "facebook/musicgen-medium":"Meta's music generation model. Creates music from text descriptions or melodies.",
  "facebook/musicgen-large":"Larger MusicGen with higher quality and more complex musical compositions.",
  "stabilityai/stable-audio-open-1.0":"Stability's audio generation. Creates music and sound effects from text prompts.",

  // New models
  "xai-org/grok-1":"xAI's first open-weight model. 314B MoE (86B active params). Raw base weights — no instruction tuning. A beast to run locally.",
  "LGAI-EXAONE/EXAONE-4.0-32B":"LG AI Research's flagship open model. Strong multilingual performance especially in Korean and English.",
  "LGAI-EXAONE/EXAONE-Deep-32B":"EXAONE fine-tuned for deep reasoning. Competitive with much larger models on math and logic.",
  "LGAI-EXAONE/EXAONE-Deep-2.4B":"Compact reasoning model from LG AI. Surprisingly strong reasoning for its tiny size.",
  "MiniMaxAI/MiniMax-M2.1":"229B dense model. Excels at coding, tool use, and agentic tasks. Outperforms Claude Sonnet 4.5 in multilingual coding.",
  "MiniMaxAI/MiniMax-M2.5":"229B upgrade to M2.1. 80% on SWE-Bench Verified. Full-stack coding, agentic tool use, and office automation. 37% faster than M2.1.",
  "baichuan-inc/Baichuan4-Turbo":"Major Chinese LLM optimized for domain-specific tasks — medical, legal, finance. Strong bilingual capabilities.",
  "CohereLabs/aya-23-35B":"Leading open multilingual model supporting 23 languages. Built for non-English AI use cases.",
  "CohereLabs/aya-23-8B":"Compact multilingual model. Good quality across 23 languages on modest hardware.",
  "moonshotai/Kimi-Dev-72B":"Moonshot's coding and agentic model. Built for software development workflows and tool use.",
  "infly/OpenCoder-8B-Instruct":"Fully open code model — open data, training, and weights. Transparent and reproducible.",
  "allenai/Molmo-72B-0924":"AI2's large vision-language model. Fully open with state-of-the-art visual understanding.",
  "allenai/Molmo-7B-D-0924":"Mid-size Molmo. Strong image understanding with fully open weights and training data.",
  "allenai/Molmo-1B-D-0924":"Tiny Molmo for edge devices. Basic vision-language capabilities at minimal cost.",
  "llava-hf/llava-onevision-qwen2-72b-ov-hf":"Unified vision model handling images, multi-image, and video. Top-tier open VLM.",
  "llava-hf/llava-onevision-qwen2-7b-ov-hf":"Compact LLaVA OneVision. Strong multimodal understanding on consumer hardware.",
  "HuggingFaceTB/SmolVLM-2.2B-Instruct":"Tiny vision-language model from HuggingFace. Runs on phones and edge devices.",
  "HuggingFaceM4/Idefics3-8B-Llama3":"HuggingFace's open VLM. Strong document understanding and visual Q&A.",
  "google/medgemma-4b-it":"Google's medical AI model. Understands medical images and clinical text. For research use.",
  "google/medgemma-27b-text-it":"Large medical text model from Google. Strong at clinical reasoning and medical Q&A.",
  "BioMistral/BioMistral-7B":"Mistral fine-tuned on biomedical literature. Good for medical and life science tasks.",
  "aaditya/Llama3-OpenBioLLM-70B":"Large biomedical model. Fine-tuned on medical datasets for clinical and research use.",
  "epfl-llm/meditron-70b":"EPFL's medical LLM trained on clinical guidelines and medical literature. Research-grade.",
  "black-forest-labs/FLUX.1-Kontext-dev":"FLUX for image editing. Edit specific parts of images with text instructions.",
  "HiDream-ai/HiDream-I1-Full":"New image generator rivaling FLUX. Strong prompt adherence and photorealism.",
  "HiDream-ai/HiDream-I1-Dev":"HiDream developer variant. Same quality with faster iteration.",
  "Alpha-VLLM/Lumina-Image-2.0":"Efficient DiT image generator. High quality at very low compute cost.",
  "Wan-AI/Wan2.2-T2V-5B":"Updated Wan text-to-video. Improved motion quality and longer generation.",
  "lllyasviel/FramePack":"Viral video generation tool. Generates video from images with minimal VRAM via frame packing.",
  "microsoft/TRELLIS-2-4B":"Microsoft's 3D generation model. Creates 3D assets from text or images.",
  "tencent/Hunyuan3D-2":"Tencent's 3D model generation. Creates textured 3D meshes from images.",
  "hexgrad/Kokoro-82M":"Ultra-lightweight TTS. Natural-sounding speech from a tiny 82M parameter model.",
  "sesame/csm-1b":"Conversational speech model. Generates natural dialogue with emotional expression.",
  "resemble-ai/chatterbox-turbo":"Fast TTS with voice cloning from a 15-second sample. Zero-shot voice synthesis.",
  "canopylabs/orpheus-3b-0.1-ft":"Expressive TTS model. Generates speech with laughter, emotion, and natural prosody.",
  "SWivid/F5-TTS":"Fast voice cloning TTS. Clone any voice from a short sample with high fidelity.",
  "SparkAudio/Spark-TTS-0.5B":"Lightweight voice cloning TTS. Fast inference suitable for real-time applications.",
  "FunAudioLLM/CosyVoice2-0.5B":"Alibaba's voice cloning TTS. Supports multiple languages with natural prosody.",
  "ChatTTS/ChatTTS":"Conversational TTS optimized for dialogue. Generates natural-sounding chat responses.",
  "kyutai/moshi-7b":"First real-time full-duplex speech-to-speech model. Talk to it like a phone call.",
  "nvidia/parakeet-tdt-0.6b-v2":"NVIDIA's speech recognition model. Beats Whisper on several ASR benchmarks.",
  "nvidia/canary-qwen-2.5b":"NVIDIA's multilingual ASR. Strong transcription across multiple languages.",
  "ace-step/ACE-Step-v1.5":"Music generation model. Creates full songs from text descriptions of genre, mood, and style.",
  "m-a-p/YuE-s1-7B-anneal-en-cot":"Lyrics-to-song model. Generates complete songs with vocals from lyrics input.",
  "nomic-ai/modernbert-embed-base":"Modern BERT architecture for embeddings. Fast and efficient for search and RAG.",
  "nomic-ai/nomic-embed-text-v2-moe":"MoE embedding model. High accuracy with efficient inference via sparse activation.",
  "johnsnowlabs/JSL-MedLlama-3-8B-v2.0":"Medical LLM from John Snow Labs. Fine-tuned for clinical NLP, diagnosis support, and medical Q&A.",
  "AdaptLLM/medicine-chat":"Llama adapted for medical conversations. Trained on medical literature for healthcare Q&A.",
  "TheFinAI/finma-7b-full":"Finance-specialized LLM. Trained on financial datasets for analysis, sentiment, and report generation.",
  "AdaptLLM/finance-chat":"Llama adapted for finance. Trained on financial news, SEC filings, and market analysis.",
  "ai4finance/FinGPT-Llama2-7B":"Open-source financial LLM. Built for stock analysis, sentiment detection, and financial reasoning.",
  "SALT-NLP/InvestLM_65B":"Large investment-focused model. Trained for portfolio analysis, market reasoning, and financial advice.",
  "equall/Saul-7B-Instruct-v1":"Legal domain LLM. Fine-tuned on legal texts for contract analysis, case research, and legal Q&A.",
};

// Fallback description generator for models not in the lookup
function getDesc(m) {
  if (DESC[m.id]) return DESC[m.id];
  const catDescs = {
    general: "General-purpose language model for chat, reasoning, and text generation.",
    code: "Code-specialized model for generation, completion, and debugging.",
    reason: "Reasoning-focused model optimized for math, logic, and step-by-step problem solving.",
    vision: "Vision-language model that understands both images and text.",
    medical: "Medical/biomedical model for clinical reasoning, diagnosis support, and healthcare Q&A. Not FDA-approved — for research use only.",
    finance: "Finance-specialized model for market analysis, financial reasoning, and report generation. Not financial advice.",
    legal: "Legal domain model for contract analysis, case research, and legal Q&A. Not a substitute for professional legal counsel.",
    embed: "Embedding model for semantic search, retrieval, and similarity matching.",
    image: "Image generation model for creating visuals from text prompts.",
    video: "Video generation model for creating video clips from text or images.",
    threeD: "3D generation model for creating 3D assets, meshes, and objects from text or images.",
    audio: "Audio model for speech, music, or sound processing and generation.",
  };
  return `${m.f} ${m.p} parameter ${catDescs[m.c] || catDescs.general}`;
}

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

  // ===== OpenAI GPT-OSS =====

  // ===== DeepSeek (additional) =====

  // ===== Qwen (additional) =====

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

