import React from 'react';
import { ArrowUp, Heart, Terminal, Sparkles, MessageSquare, Phone, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#030305] border-t border-white/10 pt-16 pb-12 overflow-hidden text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/5">
          {/* Brand Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-sky-500 p-[1px]">
                <div className="w-full h-full bg-[#07080f] rounded-[11px] flex items-center justify-center">
                  <span className="font-syne font-black text-xs text-chrome-gradient">ZH</span>
                </div>
              </div>
              <span className="font-syne font-black text-lg text-white tracking-wider">
                ZEESHAN HYDER
              </span>
            </div>

            <p className="text-xs sm:text-sm font-light text-slate-400 max-w-sm leading-relaxed">
              &ldquo;I Don&apos;t Just Imagine the Future. I Build It.&rdquo; Crafting high-fidelity 3D spatial web
              experiences, investigating AI algorithms, and turning ambitious concepts into functional software.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-slate-500">
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
                LOC: KARACHI, PK
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
                ENGINE: THREE.JS + REACT
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-emerald-400">
                &bull; OPEN TO TECH ROLES
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {['Home', 'About', 'Skills', 'Projects', 'AI Lab', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    onClick={() => sound.playClick()}
                    className="hover:text-violet-300 transition-colors"
                  >
                    &rarr; {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Communication Channels */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-3">
              Direct Channels
            </h4>
            <div className="space-y-2.5 text-xs font-mono">
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: {PERSONAL_INFO.phone}</span>
              </a>

              <a
                href={PERSONAL_INFO.telUrl}
                onClick={() => sound.playClick()}
                className="flex items-center gap-2 hover:text-sky-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>Direct: {PERSONAL_INFO.phone}</span>
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                onClick={() => sound.playClick()}
                className="flex items-center gap-2 hover:text-violet-300 transition-colors truncate"
              >
                <Mail className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                <span className="truncate">{PERSONAL_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Zeeshan Hyder. Built with pride, precision, and Three.js.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-violet-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
