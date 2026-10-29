import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, MessageSquare, Phone, Sparkles, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'AI Lab', href: '#ai-lab', badge: 'Interactive' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSoundToggle = () => {
    const unmuted = sound.toggleMute();
    setIsMuted(!unmuted);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#050508]/85 backdrop-blur-md border-b border-white/10 shadow-xl shadow-black/50'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-700 to-sky-500 p-[1px] shadow-lg shadow-violet-600/30 group-hover:shadow-violet-500/50 transition-all duration-300">
            <div className="w-full h-full bg-[#07080f] rounded-[11px] flex items-center justify-center">
              <span className="font-syne font-black text-sm text-chrome-gradient">ZH</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-syne font-bold text-base tracking-wide text-white group-hover:text-violet-300 transition-colors">
              ZEESHAN HYDER
            </span>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5">
              AI &bull; DEV &bull; 3D
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-[#0b0c14]/80 border border-white/10 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all ${
                  isActive
                    ? 'text-white font-semibold bg-white/10 shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.2 text-[9px] font-sans font-medium rounded-full bg-violet-500/30 text-violet-300 border border-violet-500/30">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a855f7]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls: Audio + Quick WhatsApp / Contact */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
            title={isMuted ? 'Enable Interface Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
          </button>

          {/* Quick WhatsApp Pill */}
          <a
            href={PERSONAL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 text-xs font-mono transition-all hover:scale-105 active:scale-95"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          {/* Contact Button */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-medium tracking-wide shadow-md shadow-violet-600/30 transition-all hover:shadow-violet-600/50"
          >
            Let&apos;s Build
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-300"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-[#080911]/95 border-b border-white/10 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-mono transition-colors ${
                  activeSection === link.href.replace('#', '')
                    ? 'bg-violet-600/20 text-white font-semibold border border-violet-500/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-[10px] rounded-full bg-violet-500/30 text-violet-300">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: {PERSONAL_INFO.phone}</span>
              </a>
              <a
                href={PERSONAL_INFO.telUrl}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-sky-950/40 border border-sky-500/30 text-sky-300 text-xs font-mono"
              >
                <Phone className="w-4 h-4" />
                <span>Call {PERSONAL_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
