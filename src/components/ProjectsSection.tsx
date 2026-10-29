import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  ExternalLink, 
  Github, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Lightbulb, 
  ArrowUpRight, 
  X, 
  Terminal, 
  Bot, 
  Compass,
  Cpu,
  MonitorPlay
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem, ProjectStatus } from '../types';
import { sound } from '../utils/soundEffects';

export const ProjectsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & Intelligence' },
    { id: 'web', label: 'Web & 3D' },
    { id: 'gaming', label: 'Gaming Sandbox' },
    { id: 'programming', label: 'Core Algorithms' },
  ];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (selectedFilter === 'all') return true;
    return project.category === selectedFilter;
  });

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'Completed':
        return {
          label: 'Completed',
          icon: CheckCircle2,
          color: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40',
        };
      case 'In Progress':
        return {
          label: 'In Progress',
          icon: Clock,
          color: 'bg-sky-950/70 text-sky-300 border-sky-500/40',
        };
      case 'Concept':
        return {
          label: 'Concept Architecture',
          icon: Lightbulb,
          color: 'bg-violet-950/70 text-violet-300 border-violet-500/40',
        };
    }
  };

  return (
    <section id="projects" className="relative py-28 bg-[#050508] border-t border-white/5 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-sky-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/50 border border-violet-500/30 text-xs font-mono text-violet-300 mb-4">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>THE PROJECT GALAXY &bull; INNOVATION ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-syne text-white tracking-tight">
              Curated Works &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-300 to-white">
                Architectures
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-md">
            Explore 6 active initiatives. Live experiments are separated clearly from architectural
            concepts and in-progress prototypes.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setSelectedFilter(filter.id);
                sound.playClick();
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                selectedFilter === filter.id
                  ? 'bg-violet-600 text-white font-medium shadow-md shadow-violet-600/30'
                  : 'bg-[#0b0c14] border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const statusBadge = getStatusBadge(project.status);
            const StatusIcon = statusBadge.icon;

            return (
              <div
                key={project.id}
                className="group relative rounded-3xl bg-[#0b0c14]/90 border border-white/10 hover:border-violet-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-violet-950/40"
              >
                <div>
                  {/* Top bar: Status badge & Category */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono border ${statusBadge.color}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      <span>{statusBadge.label}</span>
                    </span>

                    <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Title & Tagline */}
                  <h3 className="text-xl font-bold font-syne text-white mb-2 group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-sky-300/80 font-mono mb-4 line-clamp-2">
                    {project.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Technologies Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 text-[11px] font-mono text-slate-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setActiveProject(project);
                        sound.playClick();
                      }}
                      onMouseEnter={() => sound.playHover()}
                      className="px-4 py-2 rounded-xl bg-violet-950/40 hover:bg-violet-900/60 border border-violet-500/30 text-violet-300 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Dossier</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.playClick()}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                          title="View Source on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.status === 'Completed' && (
                        <a
                          href="#home"
                          onClick={() => sound.playClick()}
                          className="p-2 rounded-xl bg-sky-950/50 hover:bg-sky-900/70 border border-sky-500/30 text-sky-300 transition-colors"
                          title="Explore Live 3D Experience"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Dossier Modal */}
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative max-w-2xl w-full p-6 sm:p-8 rounded-3xl bg-[#0b0c14] border border-violet-500/40 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => {
                  setActiveProject(null);
                  sound.playClick();
                }}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Top Metadata */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-mono border ${
                    getStatusBadge(activeProject.status).color
                  }`}
                >
                  {activeProject.status}
                </span>
                <span className="text-xs font-mono text-slate-500 uppercase">
                  Category: {activeProject.category}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-syne text-white mb-2">
                {activeProject.title}
              </h3>
              <p className="text-sm font-mono text-sky-400 mb-6">{activeProject.tagline}</p>

              {/* Full Description */}
              <div className="p-4 rounded-2xl bg-black/50 border border-white/5 text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                {activeProject.description}
              </div>

              {/* Key Architectural Highlights */}
              <div className="mb-6">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-violet-400" />
                  <span>Architecture &amp; Core Highlights</span>
                </div>
                <div className="space-y-2">
                  {activeProject.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#141624] border border-white/5 text-xs text-slate-300 flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Blueprint Flow */}
              <div className="mb-6 p-4 rounded-xl bg-violet-950/20 border border-violet-500/20">
                <div className="text-[11px] font-mono text-violet-400 uppercase tracking-widest mb-1.5">
                  SYSTEM EXECUTION PIPELINE
                </div>
                <div className="text-xs font-mono text-slate-200">
                  {activeProject.conceptArchitecture}
                </div>
              </div>

              {/* Technologies List */}
              <div className="mb-8">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Technical Stack:
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <a
                  href="#contact"
                  onClick={() => {
                    setActiveProject(null);
                    sound.playClick();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-mono font-medium transition-colors"
                >
                  Discuss This Project With Zeeshan &rarr;
                </a>

                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Profile</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
