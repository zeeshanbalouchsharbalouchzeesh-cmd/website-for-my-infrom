import React from 'react';
import { ArrowDown, Sparkles, Terminal, Bot, Layers, ArrowUpRight, MessageSquare, Phone } from 'lucide-react';
import { HeroScene } from './3d/HeroScene';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    sound.playClick();
    const elem = document.querySelector(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden">
      {/* 3D Interactive Three.js Background / Core Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <HeroScene />
      </div>

      {/* Hero Foreground Content Overlays (Layered with pointer-events-none on outer wrappers so 3D controls remain accessible) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center pointer-events-none">
        <div className="max-w-3xl pointer-events-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b0c14]/80 border border-violet-500/30 text-xs font-mono text-violet-300 mb-6 backdrop-blur-md shadow-lg shadow-black/40">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>AVAILABLE FOR TECH COLLABORATIONS &bull; 2026</span>
          </div>

          {/* Cinematic Name */}
          <h2 className="text-sm sm:text-base font-mono text-slate-400 uppercase tracking-widest mb-2">
            HELLO, WORLD. THIS IS
          </h2>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-syne tracking-tight leading-[1.08] mb-6">
            <span className="text-chrome-gradient">ZEESHAN</span>{' '}
            <span className="text-cyber-gradient">HYDER</span>
          </h1>

          {/* Main Master Headline */}
          <p className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-slate-100 leading-snug mb-4">
            &ldquo;I Don&apos;t Just Imagine the Future.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-300 to-white font-bold">
              I Build It.
            </span>
            &rdquo;
          </p>

          {/* Supporting Headline */}
          <p className="text-base sm:text-lg text-slate-300/90 font-light max-w-2xl leading-relaxed mb-8">
            {PERSONAL_INFO.subHeadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
            <button
              onClick={() => scrollTo('#projects')}
              onMouseEnter={() => sound.playHover()}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 hover:from-violet-500 hover:to-sky-400 text-white font-display font-semibold text-sm tracking-wide shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={() => scrollTo('#ai-lab')}
              onMouseEnter={() => sound.playHover()}
              className="px-6 py-3.5 rounded-full bg-[#0b0c14]/90 hover:bg-[#141624] border border-white/15 text-slate-200 hover:text-white font-display font-medium text-sm tracking-wide transition-all hover:scale-105 active:scale-95 flex items-center gap-2 backdrop-blur-md shadow-md"
            >
              <Bot className="w-4 h-4 text-sky-400" />
              <span>Experiment in AI Lab</span>
            </button>

            <a
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="px-4 py-3.5 rounded-full bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs tracking-wide transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          {/* Quick Metrics / Philosophy Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl pt-2">
            <div className="p-3 rounded-xl bg-[#0b0c14]/60 border border-white/5 backdrop-blur-sm">
              <div className="text-xs font-mono text-slate-400">CORE FOCUS</div>
              <div className="text-sm font-display font-bold text-slate-200 mt-0.5">Applied AI & ML</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0b0c14]/60 border border-white/5 backdrop-blur-sm">
              <div className="text-xs font-mono text-slate-400">SYSTEM CODE</div>
              <div className="text-sm font-display font-bold text-slate-200 mt-0.5">C++ & Python</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0b0c14]/60 border border-white/5 backdrop-blur-sm">
              <div className="text-xs font-mono text-slate-400">EXPERIENCE</div>
              <div className="text-sm font-display font-bold text-slate-200 mt-0.5">Three.js & React</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0b0c14]/60 border border-white/5 backdrop-blur-sm">
              <div className="text-xs font-mono text-slate-400">PHONE DIRECT</div>
              <div className="text-sm font-mono font-bold text-sky-300 mt-0.5">{PERSONAL_INFO.phone}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Hint */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between text-xs font-mono text-slate-500 pointer-events-none">
        <div className="hidden sm:flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-violet-400" />
          <span>DRAG TO ROTATE 3D CORE &bull; SCROLL TO EXPLORE</span>
        </div>

        <button
          onClick={() => scrollTo('#about')}
          className="pointer-events-auto flex items-center gap-2 text-slate-400 hover:text-white transition-colors focus:outline-none"
        >
          <span>EXPLORE JOURNEY</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-sky-400" />
        </button>
      </div>
    </section>
  );
};
