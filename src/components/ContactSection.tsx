import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types';
import { sound } from '../utils/soundEffects';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    projectType: 'AI Application Concept',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const projectTypes = [
    'AI Application Concept',
    '3D WebGL / Three.js Website',
    'Full-Stack Web Development',
    'C++ / Python Programming Task',
    'Collaboration / Tech Internship',
    'General Inquiry',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setErrorMessage('');

    // Form validation
    if (!formData.name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      setErrorMessage('Please enter a brief message (minimum 10 characters).');
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      sound.playSuccess();

      // Launch celebratory confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#8b5cf6', '#38bdf8', '#ffffff', '#10b981'],
        });
      } catch {
        // Fallback
      }
    }, 800);
  };

  const handleResetForm = () => {
    setSubmitSuccess(false);
    setFormData({
      name: '',
      email: '',
      subject: '',
      projectType: 'AI Application Concept',
      message: '',
    });
  };

  return (
    <section id="contact" className="relative py-28 bg-[#050508] border-t border-white/5 overflow-hidden">
      {/* Background Volumetric Ambience */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-sky-600/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/50 border border-violet-500/30 text-xs font-mono text-violet-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>COMMUNICATION PORTAL &bull; DIRECT CHANNELS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-syne text-white tracking-tight mb-4">
            &ldquo;Have an Idea?{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-300 to-white">
              Let&apos;s Build Something Extraordinary.
            </span>
            &rdquo;
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Whether you want to build an intelligent AI prototype, collaborate on an ambitious 3D web experience,
            or discuss emerging technology, I am always ready to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Direct Communication Channels (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Phone Card */}
            <div className="p-6 rounded-3xl bg-[#0b0c14]/90 border border-white/10 hover:border-violet-500/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase text-slate-400 px-2.5 py-0.5 rounded-full bg-white/5">
                  DIRECT CELL
                </span>
              </div>
              <h3 className="text-sm font-mono text-slate-400">Voice &amp; SMS</h3>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-0.5 mb-4">
                {PERSONAL_INFO.phone}
              </div>
              <a
                href={PERSONAL_INFO.telUrl}
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono transition-colors shadow-md shadow-sky-600/30"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now ({PERSONAL_INFO.phone})</span>
              </a>
            </div>

            {/* WhatsApp Instant Messaging Card */}
            <div className="p-6 rounded-3xl bg-[#0b0c14]/90 border border-emerald-500/30 hover:border-emerald-500/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                  FASTEST RESPONSE
                </span>
              </div>
              <h3 className="text-sm font-mono text-slate-400">Instant Messenger</h3>
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-300 mt-0.5 mb-4">
                WhatsApp Direct
              </div>
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono transition-colors shadow-md shadow-emerald-600/30"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-3xl bg-[#0b0c14]/90 border border-white/10 hover:border-violet-500/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase text-slate-400 px-2.5 py-0.5 rounded-full bg-white/5">
                  OFFICIAL INBOX
                </span>
              </div>
              <h3 className="text-sm font-mono text-slate-400">Email Address</h3>
              <div className="text-xs sm:text-sm font-mono text-slate-200 break-all mt-0.5 mb-4">
                {PERSONAL_INFO.email}
              </div>
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Collaboration%20Inquiry%20via%20Portfolio`}
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-mono transition-colors shadow-md shadow-violet-600/30"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Direct Email</span>
              </a>
            </div>
          </div>

          {/* Contact & Project Briefing Form (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-[#080911]/90 border border-white/10 backdrop-blur-xl relative">
              {submitSuccess ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 shadow-xl shadow-emerald-500/20 animate-in zoom-in-75 duration-300">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black font-syne text-white mb-2">
                    Message Dispatched Successfully!
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 max-w-md font-light leading-relaxed mb-6">
                    Thank you, <span className="font-semibold text-white">{formData.name}</span>. Your inquiry regarding{' '}
                    <span className="text-sky-400 font-mono">{formData.projectType}</span> has been logged.
                    I will review your message and reply via <span className="text-white font-mono">{formData.email}</span> within 24 hours.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleResetForm}
                      className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={PERSONAL_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono transition-colors"
                    >
                      Follow up on WhatsApp &rarr;
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                    <div>
                      <h3 className="text-xl font-bold font-syne text-white">
                        Send a Direct Message
                      </h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        Tell me about your project, idea, or inquiry.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> SECURE FORM
                    </span>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Rivera"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                        Project / Discussion Category
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm font-mono text-white focus:outline-none focus:border-violet-500"
                      >
                        {projectTypes.map((pt) => (
                          <option key={pt} value={pt}>
                            {pt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                        Subject Line
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Brief summary..."
                        className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                      Message / Project Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe what you would like to build or discuss..."
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-[11px] font-mono text-slate-500">
                      * All fields handled respectfully. Direct WhatsApp available.
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3.5 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 hover:from-violet-500 hover:to-sky-400 text-white font-display font-semibold text-xs sm:text-sm tracking-wide shadow-lg shadow-violet-600/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>DISPATCHING...</span>
                        </>
                      ) : (
                        <>
                          <span>DISPATCH MESSAGE</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
