import React, { useState } from 'react';
import { 
  Sparkles, 
  Terminal, 
  Code2, 
  Cpu, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Lightbulb,
  Workflow
} from 'lucide-react';
import { PERSONAL_INFO, MILESTONES } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';

export const AboutSection: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

  const pillars = [
    {
      title: 'Artificial Intelligence',
      desc: 'Exploring foundational neural models, prompt orchestration, and intelligent software patterns that augment human thinking.',
      icon: Lightbulb,
      tag: 'Neural Thinking',
    },
    {
      title: 'Systems & Software',
      desc: 'Developing algorithmic problem-solving habits in C++ and Python, with a disciplined approach to structured computer science.',
      icon: Cpu,
      tag: 'Core Logic',
    },
    {
      title: 'Interactive 3D Web',
      desc: 'Crafting spatial browser environments using Three.js and React that turn static web pages into living digital installations.',
      icon: Workflow,
      tag: 'Spatial Tech',
    },
    {
      title: 'Practical Solutions',
      desc: 'Focused on solving everyday friction — building tools that automate repetitive tasks and empower creators and businesses.',
      icon: Terminal,
      tag: 'Real Impact',
    },
  ];

  return (
    <section id="about" className="relative py-28 bg-[#050508] border-t border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-600/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/50 border border-violet-500/30 text-xs font-mono text-violet-300 mb-4">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>ORIGIN &bull; PHILOSOPHY &bull; TRAJECTORY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-syne text-white tracking-tight mb-4">
            &ldquo;Curiosity Is Where{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-300 to-white">
              Everything Begins.
            </span>
            &rdquo;
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            I am an emerging technology developer based in Karachi, Pakistan. Rather than waiting for the future of
            computing to arrive, I spend my days writing code, experimenting with artificial intelligence models, and
            architecting interactive digital worlds that push the boundaries of what a web browser can do.
          </p>
        </div>

        {/* 4 Pillars of Curiosity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group p-6 rounded-2xl bg-[#0b0c14]/80 border border-white/10 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-950/30"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-900/30 border border-violet-500/30 flex items-center justify-center text-violet-300 mb-4 group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  {pillar.tag}
                </span>
                <h3 className="text-lg font-bold font-display text-white mt-1 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Learning Journey Timeline */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#080911]/90 border border-white/10 relative overflow-hidden backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-1">
                <BookOpen className="w-4 h-4" />
                <span>INTERACTIVE TIMELINE &bull; AUTHENTIC LEARNING RECORD</span>
              </div>
              <h3 className="text-2xl font-bold font-syne text-white">
                The Journey of Knowledge
              </h3>
            </div>
            <p className="text-xs font-mono text-slate-400 max-w-sm">
              Click on each phase below to inspect my active learning milestones, technologies explored, and key takeaways.
            </p>
          </div>

          {/* Phase Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-8">
            {MILESTONES.map((milestone, idx) => {
              const isSelected = selectedMilestone === idx;
              return (
                <button
                  key={milestone.phase}
                  onClick={() => {
                    setSelectedMilestone(idx);
                    sound.playClick();
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-violet-950/60 border-violet-500/60 shadow-lg shadow-violet-950/40 ring-1 ring-violet-500/50'
                      : 'bg-[#0f111e]/50 border-white/5 hover:border-white/20 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400">
                      {milestone.phase}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        milestone.status === 'completed'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : milestone.status === 'active'
                          ? 'bg-sky-950 text-sky-300 border border-sky-500/30'
                          : 'bg-slate-900 text-slate-400 border border-white/10'
                      }`}
                    >
                      {milestone.year}
                    </span>
                  </div>
                  <h4
                    className={`text-xs sm:text-sm font-bold font-display line-clamp-1 ${
                      isSelected ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {milestone.title}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Detailed Showcase */}
          {MILESTONES[selectedMilestone] && (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0f111f]/90 border border-violet-500/20 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    {MILESTONES[selectedMilestone].phase}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {MILESTONES[selectedMilestone].year}
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">
                  {MILESTONES[selectedMilestone].title}
                </h4>
                <p className="text-sm font-mono text-sky-400 mb-4">
                  {MILESTONES[selectedMilestone].subtitle}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                  {MILESTONES[selectedMilestone].description}
                </p>

                {/* Focus Areas Badges */}
                <div className="mb-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Key Competencies & Technologies:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {MILESTONES[selectedMilestone].focusAreas.map((area) => (
                      <span
                        key={area}
                        className="px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-slate-200"
                      >
                        &bull; {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reflection Card */}
              <div className="p-5 rounded-xl bg-black/50 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-violet-400 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>ENGINEER&apos;S REFLECTION</span>
                  </div>
                  <blockquote className="text-sm text-slate-300 italic font-light leading-relaxed border-l-2 border-violet-500 pl-3">
                    &ldquo;{MILESTONES[selectedMilestone].reflection}&rdquo;
                  </blockquote>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>STATUS: {MILESTONES[selectedMilestone].status.toUpperCase()}</span>
                  <span className="text-violet-400 flex items-center gap-1">
                    VERIFIED JOURNEY <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
