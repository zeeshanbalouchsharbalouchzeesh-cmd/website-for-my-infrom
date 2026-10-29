import React, { useState, useRef } from 'react';
import { 
  Bot, 
  Sparkles, 
  Cpu, 
  Terminal, 
  Copy, 
  Check, 
  Send, 
  Sliders, 
  Code2, 
  Layers, 
  RefreshCw, 
  FileCheck,
  Zap,
  Info,
  Maximize2
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

type LabTab = 'prompt-architect' | 'neural-chat' | 'visual-studio' | 'code-analyzer';

export const AiLabSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LabTab>('prompt-architect');
  const [copied, setCopied] = useState(false);

  // ----------------------------------------------------
  // 1. Prompt Architect State & Generator
  // ----------------------------------------------------
  const [promptRole, setPromptRole] = useState('Senior Systems Architect');
  const [promptObjective, setPromptObjective] = useState('Design a low-latency event-driven architecture');
  const [promptFormat, setPromptFormat] = useState('Strict JSON Schema');
  const [promptConstraint, setPromptConstraint] = useState('Zero hallucination, deterministic types, memory efficiency');
  const [promptTone, setPromptTone] = useState('Concise & Technical');

  const generatedSystemPrompt = `### SYSTEM DIRECTIVE: ${promptRole.toUpperCase()}
[ROLE & CONTEXT]
You operate strictly as a world-class ${promptRole}. 
Primary Objective: ${promptObjective}.

[OPERATIONAL CONSTRAINTS]
1. ${promptConstraint}.
2. Adhere to authoritative best practices; do not invent deprecated libraries.
3. Tone: ${promptTone}.

[OUTPUT SPECIFICATION]
Deliver response in format: ${promptFormat}.
Include rationale, computational complexity where applicable, and edge-case mitigations.

[BEGIN EXECUTION PROTOCOL]`;

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedSystemPrompt);
    setCopied(true);
    sound.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  // ----------------------------------------------------
  // 2. Simulated Neural Agent Prototype State
  // ----------------------------------------------------
  interface ChatMessage {
    sender: 'user' | 'agent';
    text: string;
    timestamp: string;
  }

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: 'agent',
      text: 'Greetings! I am Zeeshan’s Simulated Neural Agent Prototype (running locally in browser). How can I assist you with Zeeshan’s tech stack, learning roadmap, or project concepts today?',
      timestamp: '11:42 AM',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const predefinedQuestions = [
    'What is Zeeshan’s current learning roadmap?',
    'Why did Zeeshan choose Three.js for this portfolio?',
    'What is your approach to C++ and Python?',
    'How do I contact Zeeshan for a project?',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    sound.playClick();
    const userMsg: ChatMessage = {
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('roadmap') || lower.includes('learn')) {
        reply =
          'Zeeshan’s active 2025–2026 roadmap centers on mastering applied deep learning, autonomous LLM agent orchestration, advanced WebGL/Three.js shaders, and structured algorithmic problem-solving in C++ and Python.';
      } else if (lower.includes('three.js') || lower.includes('portfolio') || lower.includes('3d')) {
        reply =
          'Zeeshan chose Three.js because traditional 2D flat templates fail to capture the visceral feeling of the digital frontier. By building a custom PBR chrome core with RoomEnvironment lighting and procedural particles, he turned this portfolio into an exploratory world.';
      } else if (lower.includes('c++') || lower.includes('python')) {
        reply =
          'Zeeshan uses C++ for low-level memory awareness, pointers, and performance-critical algorithms, while leveraging Python for rapid prototyping, AI script automation, and data handling.';
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('collaborate')) {
        reply =
          'You can contact Zeeshan immediately! Direct phone: 032158495091, WhatsApp at +92 321 58495091, or email at Zeeshanbalouchsharbalouchzeesh@gmail.com.';
      } else {
        reply = `Fascinating inquiry regarding "${text}". As an interactive demonstration prototype, I can confirm Zeeshan is dedicated to exploring intelligent software, clean code, and creative computing. Feel free to connect directly via the Contact section below!`;
      }

      const agentMsg: ChatMessage = {
        sender: 'agent',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
      sound.playSuccess();
    }, 600);
  };

  // ----------------------------------------------------
  // 3. Visual Concept Studio State
  // ----------------------------------------------------
  const [visualAesthetic, setVisualAesthetic] = useState('Cyberpunk Obsidian');
  const [visualSubject, setVisualSubject] = useState('Floating Quantum Computer Core');
  const [visualLighting, setVisualLighting] = useState('Volumetric Rim & Cyan Caustics');
  const [visualLens, setVisualLens] = useState('85mm f/1.4 Anamorphic Bokeh');
  const [visualEngine, setVisualEngine] = useState('Octane Render 2026, 8K Ultra-Detailed');

  const generatedVisualPrompt = `Ultra-detailed cinematic rendering of a ${visualSubject}, ${visualAesthetic} aesthetic, ${visualLighting}, captured on ${visualLens}, hyper-realistic metallic chrome reflections, particle embers, depth of field, ${visualEngine} --ar 16:9 --style raw --v 6.1`;

  // ----------------------------------------------------
  // 4. Code Logic Analyzer State
  // ----------------------------------------------------
  const codePresets = {
    'cpp-binary-search': {
      lang: 'C++',
      name: 'Binary Search Implementation',
      code: `int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1; // Element not found
}`,
      complexity: 'Time: O(log N) | Space: O(1)',
      insight: 'Uses integer overflow guard `left + (right - left)/2`. Optimal deterministic divide-and-conquer.',
    },
    'py-memo-fib': {
      lang: 'Python',
      name: 'Memoized Dynamic Fibonacci',
      code: `def fib_memo(n: int, memo: dict = {}) -> int:
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]`,
      complexity: 'Time: O(N) | Space: O(N)',
      insight: 'Reduces naive exponential recursion O(2^N) down to linear O(N) via hash map memoization.',
    },
    'js-debounce': {
      lang: 'JavaScript',
      name: 'Event Debounce Utility',
      code: `function debounce(func, delay = 250) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}`,
      complexity: 'Time: O(1) invocation | Space: O(1) closure',
      insight: 'Crucial for high-frequency DOM/pointer events to prevent render starvation and GPU thrashing.',
    },
  };

  const [selectedCodeKey, setSelectedCodeKey] = useState<keyof typeof codePresets>('cpp-binary-search');

  return (
    <section id="ai-lab" className="relative py-28 bg-[#050508] border-t border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-sky-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/50 border border-violet-500/30 text-xs font-mono text-violet-300 mb-4">
              <Bot className="w-3.5 h-3.5 text-sky-400" />
              <span>THE AI LAB &bull; RESEARCH &amp; DEMOS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-syne text-white tracking-tight">
              Experiment With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-300 to-white">
                Intelligence
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/40 border border-sky-500/30 text-xs font-mono text-sky-300">
            <Info className="w-4 h-4 text-sky-400" />
            <span>Interactive browser-side engines &bull; Zero external API required</span>
          </div>
        </div>

        {/* Lab Navigation Switcher */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
          <button
            onClick={() => {
              setActiveTab('prompt-architect');
              sound.playClick();
            }}
            className={`p-3.5 rounded-2xl text-left border transition-all ${
              activeTab === 'prompt-architect'
                ? 'bg-violet-950/60 border-violet-500/60 shadow-lg shadow-violet-950/40 text-white'
                : 'bg-[#0b0c14] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-sky-400 mb-1">
              <Terminal className="w-4 h-4" />
              <span>Lab 01</span>
            </div>
            <div className="font-display font-bold text-sm">Prompt Architect</div>
            <div className="text-[11px] text-slate-500 font-light mt-0.5">System Instruction Engine</div>
          </button>

          <button
            onClick={() => {
              setActiveTab('neural-chat');
              sound.playClick();
            }}
            className={`p-3.5 rounded-2xl text-left border transition-all ${
              activeTab === 'neural-chat'
                ? 'bg-violet-950/60 border-violet-500/60 shadow-lg shadow-violet-950/40 text-white'
                : 'bg-[#0b0c14] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-violet-400 mb-1">
              <Bot className="w-4 h-4" />
              <span>Lab 02</span>
            </div>
            <div className="font-display font-bold text-sm">Neural Agent Demo</div>
            <div className="text-[11px] text-slate-500 font-light mt-0.5">Simulated Conversational AI</div>
          </button>

          <button
            onClick={() => {
              setActiveTab('visual-studio');
              sound.playClick();
            }}
            className={`p-3.5 rounded-2xl text-left border transition-all ${
              activeTab === 'visual-studio'
                ? 'bg-violet-950/60 border-violet-500/60 shadow-lg shadow-violet-950/40 text-white'
                : 'bg-[#0b0c14] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-pink-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Lab 03</span>
            </div>
            <div className="font-display font-bold text-sm">Visual Prompt Mixer</div>
            <div className="text-[11px] text-slate-500 font-light mt-0.5">Multimodal Aesthetic Lab</div>
          </button>

          <button
            onClick={() => {
              setActiveTab('code-analyzer');
              sound.playClick();
            }}
            className={`p-3.5 rounded-2xl text-left border transition-all ${
              activeTab === 'code-analyzer'
                ? 'bg-violet-950/60 border-violet-500/60 shadow-lg shadow-violet-950/40 text-white'
                : 'bg-[#0b0c14] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 mb-1">
              <Code2 className="w-4 h-4" />
              <span>Lab 04</span>
            </div>
            <div className="font-display font-bold text-sm">Code Logic Analyzer</div>
            <div className="text-[11px] text-slate-500 font-light mt-0.5">Big-O &amp; Static Complexity</div>
          </button>
        </div>

        {/* ==================================================== */}
        {/* LAB 1: PROMPT ARCHITECT */}
        {/* ==================================================== */}
        {activeTab === 'prompt-architect' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#080911]/90 border border-white/10 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-syne text-white">
                  Intelligent Prompt Architect
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Synthesize bulletproof system prompts with explicit operational parameters.
                </p>
              </div>
              <button
                onClick={copyPrompt}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-mono transition-all flex items-center gap-2 shadow-md shadow-violet-600/30"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'PROMPT COPIED!' : 'COPY SYSTEM PROMPT'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Parameter Controls */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                    AI Specialist Persona
                  </label>
                  <select
                    value={promptRole}
                    onChange={(e) => setPromptRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="Senior Systems Architect">Senior Systems Architect (Distributed &amp; Low-Latency)</option>
                    <option value="AI Safety & Red-Teaming Engineer">AI Safety &amp; Red-Teaming Engineer</option>
                    <option value="Three.js & Graphics Programmer">Three.js &amp; WebGL Graphics Programmer</option>
                    <option value="Algorithmic Code Mentor">Algorithmic Code Mentor (C++ &amp; Python)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                    Target Objective
                  </label>
                  <input
                    type="text"
                    value={promptObjective}
                    onChange={(e) => setPromptObjective(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-violet-500"
                    placeholder="Define what the AI must solve..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                      Output Format
                    </label>
                    <select
                      value={promptFormat}
                      onChange={(e) => setPromptFormat(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-violet-500"
                    >
                      <option value="Strict JSON Schema">Strict JSON Schema</option>
                      <option value="Clean Markdown with Headers">Clean Markdown with Headers</option>
                      <option value="Executable Production Code Only">Executable Production Code Only</option>
                      <option value="Step-by-Step Chain of Thought">Step-by-Step Chain of Thought</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                      Tone
                    </label>
                    <select
                      value={promptTone}
                      onChange={(e) => setPromptTone(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-violet-500"
                    >
                      <option value="Concise & Technical">Concise &amp; Technical</option>
                      <option value="Pedagogical & Encouraging">Pedagogical &amp; Encouraging</option>
                      <option value="Rigorous & Critical">Rigorous &amp; Critical</option>
                      <option value="Creative & Visionary">Creative &amp; Visionary</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                    Constraints &amp; Guardrails
                  </label>
                  <input
                    type="text"
                    value={promptConstraint}
                    onChange={(e) => setPromptConstraint(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              {/* Live Structured Output */}
              <div className="flex flex-col justify-between p-5 rounded-2xl bg-black/60 border border-violet-500/30">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                    <span className="flex items-center gap-1.5 text-sky-400">
                      <Terminal className="w-3.5 h-3.5" />
                      COMPILED SYSTEM DIRECTIVE
                    </span>
                    <span>~{Math.round(generatedSystemPrompt.length / 4)} TOKENS</span>
                  </div>
                  <pre className="text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap bg-[#050508] p-4 rounded-xl border border-white/10 overflow-x-auto max-h-[280px]">
                    {generatedSystemPrompt}
                  </pre>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>READY FOR GEMINI, OPENAI, ANTHROPIC SDKS</span>
                  <span className="text-emerald-400">STRUCTURE VERIFIED &check;</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* LAB 2: NEURAL AGENT DEMO */}
        {/* ==================================================== */}
        {activeTab === 'neural-chat' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#080911]/90 border border-white/10 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold font-syne text-white">
                    Neural Agent Prototype v1.0
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30 text-[10px] font-mono">
                    SIMULATED DEMO
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Ask questions about Zeeshan&apos;s journey, tech stack, and ambitions.
                </p>
              </div>

              <div className="text-[11px] font-mono text-slate-400">
                STATUS: <span className="text-emerald-400">ONLINE</span>
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-2 mb-4">
              {predefinedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-violet-950/50 border border-white/10 hover:border-violet-500/40 text-xs font-mono text-slate-300 hover:text-white transition-all text-left"
                >
                  &ldquo;{q}&rdquo;
                </button>
              ))}
            </div>

            {/* Chat Messages Container */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 mb-4 h-[320px] overflow-y-auto space-y-4">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-1 text-[10px] font-mono text-slate-500">
                    <span>{msg.sender === 'user' ? 'GUEST VISITOR' : 'ZEESHAN NEURAL AGENT'}</span>
                    <span>&bull;</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-violet-600 text-white rounded-tr-none'
                        : 'bg-[#141624] text-slate-200 border border-white/10 rounded-tl-none font-light'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                  <span>Agent is synthesizing response...</span>
                </div>
              )}
            </div>

            {/* Chat Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your question or choose a prompt above..."
                className="flex-1 px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-mono font-medium transition-colors flex items-center gap-1.5 shadow-md shadow-violet-600/30"
              >
                <span>SEND</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* ==================================================== */}
        {/* LAB 3: VISUAL PROMPT MIXER */}
        {/* ==================================================== */}
        {activeTab === 'visual-studio' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#080911]/90 border border-white/10 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-syne text-white">
                  Multimodal Visual Concept Mixer
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Calibrate photographic aesthetics, lighting rigs, and rendering specs for AI art pipelines.
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedVisualPrompt);
                  setCopied(true);
                  sound.playSuccess();
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-mono transition-all flex items-center gap-2 shadow-md"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'PROMPT COPIED!' : 'COPY IMAGE PROMPT'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sliders and selectors */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                    Core Subject
                  </label>
                  <input
                    type="text"
                    value={visualSubject}
                    onChange={(e) => setVisualSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                      Aesthetic Style
                    </label>
                    <select
                      value={visualAesthetic}
                      onChange={(e) => setVisualAesthetic(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-pink-500"
                    >
                      <option value="Cyberpunk Obsidian">Cyberpunk Obsidian</option>
                      <option value="Brutalist Chrome Minimalist">Brutalist Chrome Minimalist</option>
                      <option value="Holographic Quantum Blueprint">Holographic Quantum Blueprint</option>
                      <option value="Biomechanical Surrealism">Biomechanical Surrealism</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                      Lighting Rig
                    </label>
                    <select
                      value={visualLighting}
                      onChange={(e) => setVisualLighting(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-pink-500"
                    >
                      <option value="Volumetric Rim & Cyan Caustics">Volumetric Rim &amp; Cyan Caustics</option>
                      <option value="Studio Softbox with Metallic Glint">Studio Softbox with Metallic Glint</option>
                      <option value="Moody Chiaroscuro High Contrast">Moody Chiaroscuro High Contrast</option>
                      <option value="Bioluminescent Neon Glow">Bioluminescent Neon Glow</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                      Camera Optics
                    </label>
                    <select
                      value={visualLens}
                      onChange={(e) => setVisualLens(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-pink-500"
                    >
                      <option value="85mm f/1.4 Anamorphic Bokeh">85mm f/1.4 Anamorphic Bokeh</option>
                      <option value="24mm Wide-Angle Cinematic Vista">24mm Wide-Angle Cinematic Vista</option>
                      <option value="100mm Macro Telephoto Focus">100mm Macro Telephoto Focus</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                      Render Engine Spec
                    </label>
                    <select
                      value={visualEngine}
                      onChange={(e) => setVisualEngine(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-pink-500"
                    >
                      <option value="Octane Render 2026, 8K Ultra-Detailed">Octane Render 2026, 8K</option>
                      <option value="Unreal Engine 5.5 Lumen Raytracing">Unreal Engine 5.5 Lumen</option>
                      <option value="Redshift 3D Photorealistic Shaders">Redshift 3D Photorealistic</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="flex flex-col justify-between p-5 rounded-2xl bg-black/60 border border-pink-500/30">
                <div>
                  <div className="text-xs font-mono uppercase text-pink-400 mb-2">
                    GENERATED GENERATIVE PROMPT:
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#050508] border border-white/10 text-xs font-mono text-slate-200 leading-relaxed mb-4">
                    {generatedVisualPrompt}
                  </div>

                  {/* Procedural Visual Concept Canvas Simulation */}
                  <div className="relative h-36 rounded-xl overflow-hidden bg-gradient-to-br from-[#0c0d18] via-[#1a152e] to-[#070b16] border border-white/10 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-grid-cyber opacity-30" />
                    <div className="relative z-10 text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-300 mb-2 shadow-lg shadow-pink-500/30 animate-pulse">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-display font-bold text-white">
                        {visualSubject}
                      </div>
                      <div className="text-[10px] font-mono text-sky-400">
                        {visualAesthetic} &bull; {visualLens.split(' ')[0]}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-slate-500 flex justify-between">
                  <span>MIDJOURNEY / FLUX / GEMINI READY</span>
                  <span className="text-pink-400">OPTIMIZED</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* LAB 4: CODE LOGIC ANALYZER */}
        {/* ==================================================== */}
        {activeTab === 'code-analyzer' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#080911]/90 border border-white/10 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-syne text-white">
                  Code Logic &amp; Big-O Analyzer
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Inspect algorithmic efficiency, space-time trade-offs, and design patterns.
                </p>
              </div>

              {/* Preset Selector */}
              <div className="flex items-center gap-2">
                {(Object.keys(codePresets) as Array<keyof typeof codePresets>).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedCodeKey(key);
                      sound.playClick();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedCodeKey === key
                        ? 'bg-emerald-600 text-white font-medium shadow-md'
                        : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {codePresets[key].name.split(' ')[0]} ({codePresets[key].lang})
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Code Preview */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>LANGUAGE: {codePresets[selectedCodeKey].lang}</span>
                  <span className="text-emerald-400">DETERMINISTIC VERIFIED</span>
                </div>
                <pre className="p-4 rounded-2xl bg-black/60 border border-white/10 text-xs font-mono text-emerald-300 leading-relaxed overflow-x-auto">
                  {codePresets[selectedCodeKey].code}
                </pre>
              </div>

              {/* Analysis Report */}
              <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/30 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono uppercase text-emerald-400 mb-2 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span>ALGORITHMIC COMPLEXITY</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#141624] border border-white/5 font-mono text-xs text-white mb-4">
                    {codePresets[selectedCodeKey].complexity}
                  </div>

                  <div className="text-xs font-mono uppercase text-slate-400 mb-1.5">
                    ARCHITECTURAL INSIGHT:
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed bg-[#0b0c14] p-3 rounded-xl border border-white/5">
                    {codePresets[selectedCodeKey].insight}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 text-[11px] font-mono text-slate-500">
                  VERIFIED RUNTIME CHARACTERISTICS
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
