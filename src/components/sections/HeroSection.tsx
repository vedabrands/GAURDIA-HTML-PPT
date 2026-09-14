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
    { name: 'Ziyullah Ahmed', role: 'INSIGHT ALCHEMIST', icon: '★', bio: 'Kinematic Models & Behavior Heuristics' },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#F5EFEB] text-[#12161A] p-4 sm:p-8 md:p-12 flex flex-col justify-between overflow-hidden border-b-4 border-[#B81D13] shadow-2xl">
      {/* Background Vintage Texture & Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#12161A_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Top Main Section */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: Typography & Manifesto */}
        <div className="lg:col-span-8 space-y-4">
          <BlurReveal delay={0.05} yOffset={20}>
            {/* Main Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl sm:text-8xl lg:text-9xl tracking-tight text-[#B81D13] leading-none uppercase drop-shadow-sm select-none"
            >
              LIKE A PROTECTOR
            </motion.h1>
          </BlurReveal>

          {/* Monospace Subheader */}
          <BlurReveal delay={0.15} yOffset={15}>
            <div className="flex items-center gap-3 text-sm sm:text-base md:text-lg font-mono font-bold tracking-widest text-[#12161A] uppercase border-b-2 border-[#12161A] pb-2">
              <span className="text-[#B81D13]">■</span> WATCHING. UNDERSTANDING. RESPONDING.
            </div>
          </BlurReveal>

          {/* Description */}
          <BlurReveal delay={0.25} yOffset={20}>
            <p className="text-base sm:text-lg md:text-xl font-mono text-[#2B303A] max-w-3xl leading-relaxed pt-2">
              <strong className="text-[#B81D13] font-bold underline decoration-[#B81D13]/40">GAURDIA AI</strong> turns ordinary CCTV into an intelligent first responder — detecting people, analyzing movement, identifying incidents, and triggering real-time alerts.
            </p>
          </BlurReveal>

          {/* Big Punchy Banner */}
          <BlurReveal delay={0.35} yOffset={20}>
            <div className="pt-2">
              <div className="font-display text-4xl sm:text-6xl lg:text-7xl tracking-wide text-[#12161A] leading-none select-none">
                DON'T JUST RECORD. <span className="text-[#B81D13]">REPORT IT.</span>
              </div>
            </div>
          </BlurReveal>
        </div>

        {/* Right 4 Cols: Cyborg Profile & Red Banner */}
        <div className="lg:col-span-4 flex justify-end">
          <BlurReveal delay={0.2} yOffset={25} className="w-full">
            <motion.div
              whileHover={{ scale: 1.04, y: -6 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              onMouseEnter={() => sounds.playHover()}
              className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-white hover:bg-[#B81D13] p-5 text-[#12161A] hover:text-white shadow-md hover:shadow-[0_25px_45px_-10px_rgba(184,29,19,0.55)] flex flex-col justify-between aspect-[4/3] group border-2 border-[#12161A]/15 hover:border-white/60 transition-all duration-300 cursor-pointer"
            >
              {/* Top Accent & Red Star */}
              <div className="flex items-center justify-between">
                <span className="text-4xl text-[#B81D13] group-hover:text-white group-hover:scale-125 transition-all duration-300">★</span>
                <span className="font-mono text-[10px] uppercase tracking-widest bg-[#EDE3D8] text-[#12161A] group-hover:bg-black/30 group-hover:text-white transition-colors px-2.5 py-1 rounded-full font-bold border border-[#12161A]/10 group-hover:border-transparent">
                  SEC_LEVEL // 01
                </span>
              </div>

              {/* Cyborg Profile Title */}
              <div className="my-auto flex items-center justify-center">
                <div className="text-center space-y-1">
                  <div className="font-display text-4xl sm:text-5xl text-[#12161A] group-hover:text-white tracking-widest uppercase drop-shadow-sm group-hover:tracking-wider transition-all duration-300">
                    GAURDIA // AI
                  </div>
                  <div className="font-mono text-xs text-[#B81D13] group-hover:text-white tracking-wider font-bold transition-colors">
                    AUTONOMOUS GUARDIAN SENTINEL
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-[11px] font-mono border-t border-[#12161A]/15 group-hover:border-white/20 pt-2 text-[#4A5568] group-hover:text-white/90 transition-colors">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  SYSTEM: ARMED
                </span>
                <span className="font-semibold">30 FPS INFERENCE</span>
              </div>
            </motion.div>
          </BlurReveal>
        </div>
      </div>

      {/* Middle & Bottom Section: Live CCTV Player + Contributors Tree */}
      <div className="relative z-10 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: Live CCTV Player Card */}
        <div className="lg:col-span-8">
          <BlurReveal delay={0.2} yOffset={30}>
            <div className="mb-2 flex items-center justify-between font-mono text-xs text-[#12161A]">
              <span className="font-bold flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-[#B81D13] animate-pulse" />
                INTELLIGENT CCTV FEED // 01:24:17
              </span>
              <span className="text-[#B81D13] font-bold">INTERACTIVE HUD SIMULATOR</span>
            </div>

            <motion.div
              whileHover={{ scale: 1.015, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="rounded-2xl border-2 border-[#12161A]/20 hover:border-[#B81D13] hover:shadow-[0_20px_40px_-10px_rgba(184,29,19,0.35)] transition-all duration-300 overflow-hidden"
            >
              <InteractiveVideoModal isInline={true} />
            </motion.div>
          </BlurReveal>
        </div>

        {/* Right 4 Cols: Contributors Card Box */}
        <div className="lg:col-span-4">
          <BlurReveal delay={0.3} yOffset={30}>
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="bg-[#EDE3D8] hover:bg-[#F2EAE0] p-6 rounded-2xl border-2 border-[#12161A] hover:border-[#B81D13] shadow-lg hover:shadow-[0_20px_35px_-10px_rgba(184,29,19,0.25)] transition-all duration-300"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#12161A]">
                <h3 className="font-display text-2xl sm:text-3xl tracking-wider text-[#12161A] uppercase">
                  CONTRIBUTORS
                </h3>
                <span className="w-2.5 h-2.5 rounded-full bg-[#B81D13] animate-ping"></span>
              </div>

              <div className="space-y-3">
                {contributors.map((c, idx) => {
                  const isHovered = hoveredContributor === idx;
                  const isDull = hoveredContributor !== null && !isHovered;

                  return (
                    <motion.div
                      key={c.name}
                      whileHover={{ scale: 1.04, x: 6, y: -2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      onMouseEnter={() => {
                        sounds.playHover();
                        setHoveredContributor(idx);
                      }}
                      onMouseLeave={() => setHoveredContributor(null)}
                      className={`group flex items-start gap-3 p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                        isHovered
                          ? 'bg-[#B81D13] text-white border-white/60 shadow-[0_15px_30px_-5px_rgba(184,29,19,0.55)]'
                          : isDull
                          ? 'bg-white/60 text-[#12161A] border-[#12161A]/10 opacity-40 scale-[0.98] blur-[0.2px]'
                          : 'bg-white hover:bg-[#B81D13] text-[#12161A] border-[#12161A]/15 shadow-sm'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 shadow-sm transition-all ${
                          isHovered
                            ? 'bg-white text-[#B81D13] scale-110'
                            : 'bg-[#B81D13] group-hover:bg-white text-white group-hover:text-[#B81D13]'
                        }`}
                      >
                        ★
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-sans font-bold text-base flex items-center justify-between transition-colors">
                          <span className={isHovered ? 'text-white' : 'text-[#12161A] group-hover:text-white'}>
                            {c.name}
                          </span>
                          <span
                            className={`text-[10px] font-mono font-semibold tracking-wider px-1.5 py-0.5 rounded transition-colors ${
                              isHovered
                                ? 'text-white bg-black/30'
                                : 'text-[#B81D13] bg-red-100/70 group-hover:bg-black/30 group-hover:text-white'
                            }`}
                          >
                            {c.role}
                          </span>
                        </div>
                        <p
                          className={`text-xs font-mono mt-0.5 truncate transition-colors ${
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
              <div className="mt-4 pt-3 border-t border-[#12161A]/15 text-[11px] font-mono text-[#4A5568] flex justify-between items-center">
                <span>TEAM BRAINBYTES</span>
                <span className="text-[#B81D13] font-bold">2026 EDITION</span>
              </div>
            </motion.div>
          </BlurReveal>
        </div>
      </div>

      {/* Bottom Hazard Stripe Footer */}
      <BlurReveal delay={0.35} yOffset={15}>
        <div className="relative z-10 mt-8 pt-4 border-t-2 border-[#12161A] flex items-center justify-between flex-wrap gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-24 h-4 bg-[repeating-linear-gradient(45deg,#B81D13,#B81D13_8px,#F5EFEB_8px,#F5EFEB_16px)] border border-[#B81D13]"></div>
            <span className="font-bold text-[#12161A]">GAURDIA AI // SENTINEL KERNEL</span>
          </div>

          <div className="text-center text-sm font-bold text-[#B81D13]">
            ★
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-600">SMARTER SURVEILLANCE. SAFER TOMORROW.</span>
            <div className="w-24 h-4 bg-[repeating-linear-gradient(45deg,#B81D13,#B81D13_8px,#F5EFEB_8px,#F5EFEB_16px)] border border-[#B81D13]"></div>
          </div>
        </div>
      </BlurReveal>
    </section>
  );
};
