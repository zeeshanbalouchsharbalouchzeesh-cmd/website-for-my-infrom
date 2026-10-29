import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface CinematicIntroProps {
  onEnter: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onEnter }) => {
  const [isWarping, setIsWarping] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [textRevealed, setTextRevealed] = useState(false);

  useEffect(() => {
    // Check if user previously skipped or has reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Don't trap users with motion sensitivity
      setTextRevealed(true);
    } else {
      const timer = setTimeout(() => setTextRevealed(true), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleEnterWorld = () => {
    sound.playWarp();
    setIsWarping(true);
    setTimeout(() => {
      onEnter();
    }, 600);
  };

  const handleToggleSound = () => {
    const unmuted = sound.toggleMute();
    setIsMuted(!unmuted);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#050508] transition-all duration-700 ${
        isWarping ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Volumetric Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/15 blur-[140px] animate-pulse" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
        
        {/* Subtle Cyber Grid */}
        <div className="absolute inset-0 bg-grid-cyber opacity-30" />
      </div>

      {/* Top Bar for Skip and Audio Controls */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-violet-400" />
          <span>INITIALIZING DIGITAL UNIVERSE</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors"
            title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-sky-400" />}
            <span className="hidden sm:inline">{isMuted ? 'AUDIO OFF' : 'AUDIO ACTIVE'}</span>
          </button>

          <button
            onClick={onEnter}
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
          >
            SKIP INTRO [ESC]
          </button>
        </div>
      </div>

      {/* Center Cinematic Showcase */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Floating Futuristic Core Icon & Badge */}
        <div
          className={`transition-all duration-1000 transform ${
            textRevealed ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs sm:text-sm font-mono tracking-widest uppercase mb-6 shadow-lg shadow-violet-950/50">
            <Sparkles className="w-4 h-4 text-sky-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>AI Enthusiast &bull; Programmer &bull; Digital Creator</span>
          </div>
        </div>

        {/* Oversized Cinematic Typography Name */}
        <h1
          className={`text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-4 font-syne transition-all duration-1000 delay-150 transform ${
            textRevealed ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <span className="text-chrome-gradient drop-shadow-[0_10px_25px_rgba(255,255,255,0.15)]">
            ZEESHAN
          </span>{' '}
          <span className="text-violet-cyan-gradient drop-shadow-[0_10px_35px_rgba(139,92,246,0.3)]">
            HYDER
          </span>
        </h1>

        {/* Cinematic Main Headline */}
        <p
          className={`text-xl sm:text-2xl md:text-3xl font-medium text-slate-200 max-w-2xl font-display mb-3 transition-all duration-1000 delay-300 transform ${
            textRevealed ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          &ldquo;I Don&apos;t Just Imagine the Future.{' '}
          <span className="text-sky-300 font-semibold underline decoration-violet-500/60 underline-offset-8">
            I Build It.
          </span>
          &rdquo;
        </p>

        {/* Supporting Headline */}
        <p
          className={`text-sm sm:text-base text-slate-400 max-w-xl font-light mb-10 transition-all duration-1000 delay-450 transform ${
            textRevealed ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          Exploring artificial intelligence, engineering intelligent interactive experiences, and turning ambitious ideas into digital products.
        </p>

        {/* Glowing Interactive "ENTER MY WORLD" Button */}
        <div
          className={`transition-all duration-1000 delay-600 transform ${
            textRevealed ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <button
            onClick={handleEnterWorld}
            onMouseEnter={() => sound.playHover()}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-display font-semibold text-white tracking-wider text-sm sm:text-base transition-all duration-300 bg-gradient-to-r from-violet-600 via-purple-600 to-sky-500 hover:from-violet-500 hover:to-sky-400 shadow-[0_0_40px_rgba(139,92,246,0.45)] hover:shadow-[0_0_60px_rgba(56,189,248,0.65)] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <span>ENTER MY WORLD</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 rounded-full border border-white/30 pointer-events-none" />
          </button>
        </div>

        {/* Footnote specs */}
        <div
          className={`mt-14 flex items-center gap-6 text-xs font-mono text-slate-500 transition-all duration-1000 delay-700 ${
            textRevealed ? 'opacity-70' : 'opacity-0'
          }`}
        >
          <span>KARACHI, PK</span>
          <span>&bull;</span>
          <span>THREE.JS &bull; REACT &bull; AI LAB</span>
          <span>&bull;</span>
          <span>EST. 2024</span>
        </div>
      </div>
    </div>
  );
};
