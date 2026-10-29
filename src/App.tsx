import React, { useState, useEffect } from 'react';
import { CinematicIntro } from './components/CinematicIntro';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AiLabSection } from './components/AiLabSection';
import { DigitalProfileSection } from './components/DigitalProfileSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(() => {
    // Check if session already entered
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('zh_portfolio_entered') === 'true';
    }
    return false;
  });

  const [activeSection, setActiveSection] = useState<string>('home');

  const handleEnterWorld = () => {
    setHasEntered(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('zh_portfolio_entered', 'true');
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !hasEntered) {
        handleEnterWorld();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasEntered]);

  // Section scroll spy using IntersectionObserver
  useEffect(() => {
    if (!hasEntered) return;

    const sections = ['home', 'about', 'skills', 'projects', 'ai-lab', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(sectionId);
              }
            });
          },
          { threshold: 0.3 }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [hasEntered]);

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 selection:bg-violet-600/40 selection:text-white relative">
      {/* Custom Sleek Desktop Cursor */}
      <CustomCursor />

      {/* Cinematic Intro Screen */}
      {!hasEntered ? (
        <CinematicIntro onEnter={handleEnterWorld} />
      ) : (
        <div className="relative animate-in fade-in duration-700">
          {/* Navigation Bar */}
          <Navbar activeSection={activeSection} />

          {/* Main Portfolio Sections */}
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <AiLabSection />
            <DigitalProfileSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </div>
  );
}
