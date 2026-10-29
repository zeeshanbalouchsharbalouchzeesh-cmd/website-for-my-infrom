import React, { useState } from 'react';
import { 
  User, 
  Sparkles, 
  Download, 
  ExternalLink, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle, 
  GraduationCap, 
  Compass, 
  X,
  Printer
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';

export const DigitalProfileSection: React.FC = () => {
  const [showCvModal, setShowCvModal] = useState(false);

  const learningGoals = [
    {
      goal: 'Autonomous LLM Agent Architectures',
      scope: 'Multi-agent orchestration, tool routing, memory state vectors',
      progress: 'In Progress (Active Exploration)',
    },
    {
      goal: 'Advanced Three.js & WebGPU Shaders',
      scope: 'Procedural mathematical geometries, custom vertex shaders, compute passes',
      progress: 'Ongoing Practice',
    },
    {
      goal: 'Algorithmic Systems in C++ & Python',
      scope: 'Low-latency data structures, standard template library, systems programming',
      progress: 'Daily Problem Solving',
    },
    {
      goal: 'Production Full-Stack AI Integration',
      scope: 'Deploying secure backend inference endpoints with rate-limiting & telemetry',
      progress: 'Architectural Blueprinting',
    },
  ];

  return (
    <section className="relative py-28 bg-[#050508] border-t border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Abstract 3D Cyber Frame Avatar */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl p-1 bg-gradient-to-tr from-violet-600 via-sky-400 to-white shadow-2xl shadow-violet-600/20 group">
              {/* Inner Avatar Box */}
              <div className="w-full h-full rounded-[22px] bg-[#090a12] border border-white/10 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                {/* Cyber grid & particle glow */}
                <div className="absolute inset-0 bg-grid-cyber opacity-40" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-600/15 rounded-full blur-2xl" />

                <div className="relative z-10">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-900/60 to-black border border-violet-500/40 flex items-center justify-center text-white mb-4 mx-auto shadow-inner shadow-violet-500/30 group-hover:scale-105 transition-transform duration-300">
                    <span className="font-syne font-black text-3xl text-chrome-gradient">ZH</span>
                  </div>

                  <h3 className="font-syne font-black text-xl text-white tracking-wide">
                    {PERSONAL_INFO.name}
                  </h3>
                  <p className="text-xs font-mono text-sky-400 mt-1">
                    AI Enthusiast &bull; Programmer
                  </p>

                  <div className="mt-4 flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                    <MapPin className="w-3 h-3 text-violet-400" />
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Micro-bar */}
            <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="px-4 py-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono transition-all hover:scale-105"
              >
                WhatsApp: {PERSONAL_INFO.phone}
              </a>
              <button
                onClick={() => {
                  setShowCvModal(true);
                  sound.playClick();
                }}
                className="px-4 py-2 rounded-xl bg-violet-950/50 hover:bg-violet-900/70 border border-violet-500/30 text-violet-300 text-xs font-mono transition-all flex items-center gap-1.5 hover:scale-105"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View &amp; Print CV</span>
              </button>
            </div>
          </div>

          {/* Right Column: Bio, Vision & Active Learning Goals */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/50 border border-violet-500/30 text-xs font-mono text-violet-300 mb-4">
              <User className="w-3.5 h-3.5 text-sky-400" />
              <span>DIGITAL DOSSIER &bull; CURRENT FOCUS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-syne text-white tracking-tight mb-4">
              Driven by the Intersection of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-300 to-white">
                Intelligence &amp; Software
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-6">
              {PERSONAL_INFO.bio}
            </p>

            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-8">
              {PERSONAL_INFO.learningVision}
            </p>

            {/* Active Learning Goals Matrix */}
            <div className="p-6 rounded-2xl bg-[#0b0c14]/90 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  ACTIVE TECHNICAL GOALS (2025–2026)
                </span>
                <span className="text-[10px] font-mono text-slate-500">HONEST PROGRESSION</span>
              </div>

              <div className="space-y-3">
                {learningGoals.map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold font-display text-white">
                        {item.goal}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">{item.scope}</p>
                    </div>

                    <span className="px-2.5 py-1 rounded-md bg-violet-950/60 border border-violet-500/30 text-[10px] font-mono text-violet-300 whitespace-nowrap self-start sm:self-auto">
                      {item.progress}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CV Modal Preview & Print */}
        {showCvModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative max-w-3xl w-full p-6 sm:p-10 rounded-3xl bg-[#0c0d18] border border-violet-500/40 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => {
                  setShowCvModal(false);
                  sound.playClick();
                }}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close CV preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-2xl font-bold font-syne text-white">
                    {PERSONAL_INFO.name} — Curriculum Vitae
                  </h3>
                  <p className="text-xs font-mono text-sky-400 mt-1">
                    AI Enthusiast &bull; Programmer &bull; Digital Creator &bull; Karachi, Pakistan
                  </p>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    Phone: {PERSONAL_INFO.phone} | Email: {PERSONAL_INFO.email}
                  </p>
                </div>

                <button
                  onClick={() => {
                    window.print();
                    sound.playClick();
                  }}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-mono flex items-center gap-2 self-start sm:self-auto"
                >
                  <Printer className="w-4 h-4" />
                  <span>PRINT / SAVE AS PDF</span>
                </button>
              </div>

              {/* CV Body Content */}
              <div className="space-y-6 text-slate-300 text-xs sm:text-sm font-light">
                <div>
                  <h4 className="text-sm font-mono font-bold uppercase text-violet-400 mb-2">
                    Executive Summary
                  </h4>
                  <p className="leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5">
                    Self-driven software developer and artificial intelligence enthusiast with strong foundations in C++, JavaScript, and Python. Passionate about engineering high-fidelity 3D spatial web environments with Three.js and experimenting with modern LLM prompt orchestration. Dedicated to continuous algorithmic problem solving and creating impactful real-world software.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-mono font-bold uppercase text-violet-400 mb-2">
                    Core Technical Competencies
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                      <div className="font-mono text-xs text-sky-400 mb-1">Programming Languages:</div>
                      <div className="text-xs">C++ (Pointers, OOP, STL), JavaScript (ES6+), Python (Scripting, Automation)</div>
                    </div>
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                      <div className="font-mono text-xs text-sky-400 mb-1">Web &amp; Spatial Graphics:</div>
                      <div className="text-xs">React, Three.js (PBR, WebGL), Tailwind CSS v4, HTML5/CSS3, Web Audio API</div>
                    </div>
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                      <div className="font-mono text-xs text-sky-400 mb-1">AI &amp; Machine Learning:</div>
                      <div className="text-xs">Prompt Engineering, LLM Agent Architectures, Generative Media Pipelines</div>
                    </div>
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                      <div className="font-mono text-xs text-sky-400 mb-1">Tooling &amp; Practices:</div>
                      <div className="text-xs">Git, GitHub, Vite, Linux Shell, Responsive Design, Clean Code</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-mono font-bold uppercase text-violet-400 mb-2">
                    Featured Portfolio Projects
                  </h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                      <div className="font-bold text-white text-xs">Interactive 3D Universe Portfolio (Completed)</div>
                      <div className="text-[11px] text-slate-400">Three.js, React, WebGL, RoomEnvironment, procedural Web Audio API</div>
                    </div>
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                      <div className="font-bold text-white text-xs">AI Chatbot Platform &amp; Prompt Architect (Concept Prototype)</div>
                      <div className="text-[11px] text-slate-400">Prompt orchestration, context window management, structured response design</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
