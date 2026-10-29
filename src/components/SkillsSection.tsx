import React, { useState } from 'react';
import { 
  Sparkles, 
  Terminal, 
  Layers, 
  Cpu, 
  FileCode2, 
  Bot, 
  Palette, 
  Layout, 
  Paintbrush, 
  Boxes, 
  Smartphone, 
  Image, 
  Film, 
  MousePointerClick, 
  Brain,
  Search,
  ExternalLink,
  X,
  CheckCircle,
  GraduationCap
} from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { SkillItem, SkillCategory, SkillLevel } from '../types';
import { sound } from '../utils/soundEffects';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  // Map icon names to Lucide icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return Cpu;
      case 'FileCode2': return FileCode2;
      case 'Terminal': return Terminal;
      case 'Sparkles': return Sparkles;
      case 'Brain': return Brain;
      case 'Bot': return Bot;
      case 'Palette': return Palette;
      case 'Layout': return Layout;
      case 'Paintbrush': return Paintbrush;
      case 'Boxes': return Boxes;
      case 'Smartphone': return Smartphone;
      case 'Image': return Image;
      case 'Film': return Film;
      case 'Layers': return Layers;
      case 'MousePointerClick': return MousePointerClick;
      default: return Terminal;
    }
  };

  const categories = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'programming', label: 'Programming' },
    { id: 'ai-ml', label: 'AI & Machine Learning' },
    { id: 'web-dev', label: 'Web Development' },
    { id: 'creative-tech', label: 'Creative Technology' },
  ];

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getLevelBadge = (level: SkillLevel) => {
    switch (level) {
      case 'Intermediate':
        return {
          bg: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
          dot: 'bg-emerald-400',
        };
      case 'Learning':
        return {
          bg: 'bg-sky-950/60 text-sky-300 border-sky-500/30',
          dot: 'bg-sky-400',
        };
      case 'Beginner':
        return {
          bg: 'bg-violet-950/60 text-violet-300 border-violet-500/30',
          dot: 'bg-violet-400',
        };
    }
  };

  return (
    <section id="skills" className="relative py-28 bg-[#050508] border-t border-white/5 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] rounded-full bg-cyan-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/50 border border-violet-500/30 text-xs font-mono text-violet-300 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>THE SKILLS UNIVERSE &bull; ACTIVE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-syne text-white tracking-tight">
              Craft &amp; Technical{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-300 to-white">
                Proficiencies
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-md">
            No manufactured 99% proficiency bars. Each discipline is labeled with my authentic skill stage:
            Beginner, Learning, or Intermediate.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 p-2 sm:p-3 rounded-2xl bg-[#0b0c14]/80 border border-white/10 backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  sound.playClick();
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  activeCategory === cat.id
                    ? 'bg-violet-600 text-white font-medium shadow-md shadow-violet-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => {
            const Icon = getIcon(skill.iconName);
            const badge = getLevelBadge(skill.level);

            return (
              <div
                key={skill.id}
                onClick={() => {
                  setSelectedSkill(skill);
                  sound.playClick();
                }}
                onMouseEnter={() => sound.playHover()}
                className="group relative p-5 rounded-2xl bg-[#0b0c14]/85 border border-white/10 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Level Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:scale-110"
                      style={{ color: skill.colorAccent }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${badge.bg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                      <span>{skill.level}</span>
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-base font-bold font-display text-white mb-1.5 group-hover:text-violet-300 transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-2 mb-4">
                    {skill.shortDesc}
                  </p>
                </div>

                {/* Footer preview tags */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{skill.topics.length} Key Topics</span>
                  <span className="text-sky-400 group-hover:underline flex items-center gap-1">
                    Inspect &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Skill Modal / Detail Inspector */}
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative max-w-xl w-full p-6 sm:p-8 rounded-3xl bg-[#0b0c14] border border-violet-500/30 shadow-2xl">
              <button
                onClick={() => {
                  setSelectedSkill(null);
                  sound.playClick();
                }}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close skill modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
                  style={{ color: selectedSkill.colorAccent }}
                >
                  {React.createElement(getIcon(selectedSkill.iconName), { className: 'w-6 h-6' })}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-syne text-white">
                    {selectedSkill.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono uppercase text-violet-400">
                      Category: {selectedSkill.category.replace('-', ' ')}
                    </span>
                    <span className="text-slate-600">&bull;</span>
                    <span className="text-xs font-mono text-sky-400">
                      Stage: {selectedSkill.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Full Explanation */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {selectedSkill.shortDesc}
              </div>

              {/* Current Learning Status */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 uppercase tracking-wide mb-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>Current Focus &amp; Practical Practice</span>
                </div>
                <p className="text-xs text-slate-300 font-light bg-[#141624] p-3 rounded-xl border border-white/5">
                  {selectedSkill.learningStatus}
                </p>
              </div>

              {/* Key Topics Mastered / Explored */}
              <div className="mb-4">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wide mb-2">
                  Key Topics &amp; Principles:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.topics.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Projects */}
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wide mb-2">
                  Associated Projects:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.relatedProjects.map((proj) => (
                    <span
                      key={proj}
                      className="px-3 py-1 rounded-lg bg-violet-950/40 border border-violet-500/30 text-xs font-mono text-violet-300"
                    >
                      &bull; {proj}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
