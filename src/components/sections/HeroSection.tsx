import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, UserCheck, Eye, Activity, Award, Radio } from 'lucide-react';
import { InteractiveVideoModal } from '../InteractiveVideoModal';
import { sounds } from '../AudioController';
import { BlurReveal } from '../BlurReveal';

export const HeroSection: React.FC = () => {
  const [hoveredContributor, setHoveredContributor] = useState<number | null>(null);

  const contributors = [
    { name: 'Dev Vashisht', role: 'VISION ANCHOR', icon: '★', bio: 'AI Architecture & System Conception' },
    { name: 'Rohit Jana', role: 'BYTE SMITH', icon: '★', bio: 'Computer Vision & Inference Pipeline' },
    { name: 'Manish', role: 'PIXEL ARCHITECT', icon: '★', bio: 'HUD Interface & Motion Telemetry' },
    { name: 'Ziyaullah Ahmed', role: 'INSIGHT ALCHEMIST', icon: '★', bio: 'Kinematic Models & Behavior Heuristics' },
  ];

  return (
    <section className="relative w-full bg-[#F5EFEB] text-[#12161A] p-4 sm:p-6 lg:p-7 flex flex-col justify-between overflow-hidden border-b-4 border-[#B81D13] shadow-2xl rounded-2xl">
      {/* Background Vintage Texture & Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#12161A_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Top Header & Manifesto (Full Width - Zero Overlap) */}
      <div className="relative z-10 space-y-2">
        <BlurReveal delay={0.05} yOffset={10}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-tactical font-bold tracking-widest text-[#B81D13] uppercase">
              <span className="w-2.5 h-2.5 bg-[#B81D13] rounded-sm"></span>
              SECTION 01 // SENTINEL KERNEL &amp; AUTONOMOUS SURVEILLANCE
            </div>

            <span className="text-xs font-tactical bg-[#EDE3D8] hover:bg-[#B81D13] hover:text-white transition-colors px-3 py-0.5 rounded-full border border-[#12161A]/15 font-bold cursor-default">
              TEAM BRAINBYTES // 2026
            </span>
          </div>
        </BlurReveal>

        <BlurReveal delay={0.12} yOffset={15}>
          {/* Main Display Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-[#B81D13] leading-[0.9] uppercase drop-shadow-sm select-none max-w-full">
            LIKE A PROTECTOR
          </h1>
        </BlurReveal>

        {/* Monospace Subheader */}
        <BlurReveal delay={0.18} yOffset={10}>
          <div className="flex items-center gap-3 text-xs sm:text-sm md:text-base font-tactical font-bold tracking-widest text-[#12161A] uppercase border-b-2 border-[#12161A] pb-1.5">
            <span className="text-[#B81D13]">■</span> WATCHING. UNDERSTANDING. RESPONDING.
          </div>
        </BlurReveal>

        {/* Description & Punchy Callout */}
        <BlurReveal delay={0.22} yOffset={15}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pt-0.5">
            <p className="text-sm sm:text-base font-body text-[#2B303A] max-w-3xl leading-relaxed">
              <strong className="text-[#B81D13] font-bold underline decoration-[#B81D13]/40">GAURDIA AI</strong> turns ordinary CCTV into an intelligent first responder — detecting people, analyzing movement, identifying incidents, and triggering real-time alerts.
            </p>
            <div className="font-heading text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-[#12161A] uppercase shrink-0">
              DON'T JUST RECORD. <span className="text-[#B81D13]">REPORT IT.</span>
            </div>
          </div>
        </BlurReveal>
      </div>

      {/* Main Interactive Grid: CCTV Feed (Left 8 Cols) + Sentinel & Contributors Stack (Right 4 Cols) */}
      <div className="relative z-10 mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left 8 Cols: Live CCTV Player Card */}
        <div className="lg:col-span-8">
          <BlurReveal delay={0.18} yOffset={20}>
            <div className="mb-1.5 flex items-center justify-between font-mono text-xs text-[#12161A]">
              <span className="font-bold flex items-center gap-1.5 font-tactical text-[11px]">
                <Radio className="w-3.5 h-3.5 text-[#B81D13] animate-pulse" />
                INTELLIGENT CCTV FEED // 01:24:17
              </span>
              <span className="text-[#B81D13] font-bold font-tactical text-[11px]">INTERACTIVE HUD SIMULATOR</span>
            </div>

            <motion.div
              whileHover={{ scale: 1.015, y: -3 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="rounded-2xl border-2 border-[#12161A]/20 hover:border-[#B81D13] hover:shadow-[0_20px_40px_-10px_rgba(184,29,19,0.35)] transition-all duration-300 overflow-hidden"
            >
              <InteractiveVideoModal isInline={true} />
            </motion.div>
          </BlurReveal>
        </div>

        {/* Right 4 Cols: Tactical Sentinel Card + Contributors Tree */}
        <div className="lg:col-span-4 space-y-3">
          {/* Repositioned Sentinel Profile Card */}
          <BlurReveal delay={0.22} yOffset={20}>
            <motion.div
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              onMouseEnter={() => sounds.playHover()}
              className="relative w-full rounded-2xl overflow-hidden bg-white hover:bg-[#B81D13] p-3.5 sm:p-4 text-[#12161A] hover:text-white shadow-md hover:shadow-[0_20px_35px_-10px_rgba(184,29,19,0.55)] flex flex-col justify-between group border-2 border-[#12161A]/15 hover:border-white/60 transition-all duration-300 cursor-pointer"
            >
              {/* Top Accent & Red Star */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-2xl text-[#B81D13] group-hover:text-white group-hover:scale-125 transition-all duration-300">★</span>
                <span className="font-mono text-[9px] uppercase tracking-widest bg-[#EDE3D8] text-[#12161A] group-hover:bg-black/30 group-hover:text-white transition-colors px-2 py-0.5 rounded-full font-bold border border-[#12161A]/10 group-hover:border-transparent">
                  SEC_LEVEL // 01
                </span>
              </div>

              {/* Cyborg Profile Title */}
              <div className="my-1.5 text-center space-y-0.5">
                <div className="font-display text-2xl sm:text-3xl text-[#12161A] group-hover:text-white tracking-widest uppercase drop-shadow-sm group-hover:tracking-wider transition-all duration-300">
                  GAURDIA // AI
                </div>
                <div className="font-mono text-[11px] text-[#B81D13] group-hover:text-white tracking-wider font-bold transition-colors">
                  AUTONOMOUS GUARDIAN SENTINEL
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono border-t border-[#12161A]/15 group-hover:border-white/20 pt-1.5 text-[#4A5568] group-hover:text-white/90 transition-colors">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  SYSTEM: ARMED
                </span>
                <span className="font-semibold">30 FPS INFERENCE</span>
              </div>
            </motion.div>
          </BlurReveal>

          {/* Contributors Card Box */}
          <BlurReveal delay={0.25} yOffset={20}>
            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="bg-[#EDE3D8] hover:bg-[#F2EAE0] p-3.5 sm:p-4 rounded-2xl border-2 border-[#12161A] hover:border-[#B81D13] shadow-lg hover:shadow-[0_20px_35px_-10px_rgba(184,29,19,0.25)] transition-all duration-300"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-[#12161A]">
                <h3 className="font-display text-lg sm:text-xl tracking-wider text-[#12161A] uppercase">
                  CONTRIBUTORS
                </h3>
                <span className="w-2 h-2 rounded-full bg-[#B81D13] animate-ping"></span>
              </div>

              <div className="space-y-1.5">
                {contributors.map((c, idx) => {
                  const isHovered = hoveredContributor === idx;
                  const isDull = hoveredContributor !== null && !isHovered;

                  return (
                    <motion.div
                      key={c.name}
                      whileHover={{ scale: 1.03, x: 3, y: -1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      onMouseEnter={() => {
                        sounds.playHover();
                        setHoveredContributor(idx);
                      }}
                      onMouseLeave={() => setHoveredContributor(null)}
                      className={`group flex items-start gap-2 p-1.5 sm:p-2 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isHovered
                          ? 'bg-[#B81D13] text-white border-white/60 shadow-[0_10px_20px_-5px_rgba(184,29,19,0.55)]'
                          : isDull
                          ? 'bg-white/60 text-[#12161A] border-[#12161A]/10 opacity-40 scale-[0.98]'
                          : 'bg-white hover:bg-[#B81D13] text-[#12161A] border-[#12161A]/15 shadow-sm'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 shadow-sm transition-all ${
                          isHovered
                            ? 'bg-white text-[#B81D13] scale-110'
                            : 'bg-[#B81D13] group-hover:bg-white text-white group-hover:text-[#B81D13]'
                        }`}
                      >
                        ★
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-heading font-bold text-[11px] flex items-center justify-between transition-colors">
                          <span className={isHovered ? 'text-white' : 'text-[#12161A] group-hover:text-white'}>
                            {c.name}
                          </span>
                          <span
                            className={`text-[8px] font-tactical font-bold tracking-wider px-1 py-0.5 rounded transition-colors ${
                              isHovered
                                ? 'text-white bg-black/30'
                                : 'text-[#B81D13] bg-red-100/70 group-hover:bg-black/30 group-hover:text-white'
                            }`}
                          >
                            {c.role}
                          </span>
                        </div>
                        <p
                          className={`text-[10px] font-body mt-0.2 truncate transition-colors ${
                            isHovered ? 'text-white/90' : 'text-[#4A5568] group-hover:text-white/90'
                          }`}
                        >
                          {c.bio}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer note */}
              <div className="mt-2 pt-1.5 border-t border-[#12161A]/15 text-[9px] font-mono text-[#4A5568] flex justify-between items-center">
                <span>TEAM BRAINBYTES</span>
                <span className="text-[#B81D13] font-bold">2026 EDITION</span>
              </div>
            </motion.div>
          </BlurReveal>
        </div>
      </div>

      {/* Bottom Hazard Stripe Footer */}
      <BlurReveal delay={0.28} yOffset={10}>
        <div className="relative z-10 mt-5 pt-3 border-t-2 border-[#12161A] flex items-center justify-between flex-wrap gap-4 text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <div className="w-20 h-3 bg-[repeating-linear-gradient(45deg,#B81D13,#B81D13_8px,#F5EFEB_8px,#F5EFEB_16px)] border border-[#B81D13]"></div>
            <span className="font-bold text-[#12161A]">GAURDIA AI // SENTINEL KERNEL</span>
          </div>

          <div className="text-center text-xs font-bold text-[#B81D13]">
            ★
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-600">SMARTER SURVEILLANCE. SAFER TOMORROW.</span>
            <div className="w-20 h-3 bg-[repeating-linear-gradient(45deg,#B81D13,#B81D13_8px,#F5EFEB_8px,#F5EFEB_16px)] border border-[#B81D13]"></div>
          </div>
        </div>
      </BlurReveal>
    </section>
  );
};
