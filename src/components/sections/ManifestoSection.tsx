import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Award, Zap, ArrowUpRight, Github, ExternalLink, Users, Heart } from 'lucide-react';
import { sounds } from '../AudioController';
import { BlurReveal } from '../BlurReveal';

export const ManifestoSection: React.FC<{ onRestart?: () => void }> = ({ onRestart }) => {
  const [hoveredPillarIdx, setHoveredPillarIdx] = useState<number | null>(null);
  const [hoveredContributorIdx, setHoveredContributorIdx] = useState<number | null>(null);

  const contributors = [
    {
      name: 'Dev Vashisht',
      role: 'VISION ANCHOR',
      icon: '★',
      desc: 'AI Architecture & System Conception',
      specialty: 'System Design & Neural Topology',
    },
    {
      name: 'Rohit Jana',
      role: 'BYTE SMITH',
      icon: '★',
      desc: 'Computer Vision & Inference Pipeline',
      specialty: 'YOLOv11 & Edge TensorRT Optimization',
    },
    {
      name: 'Manish',
      role: 'PIXEL ARCHITECT',
      icon: '★',
      desc: 'HUD Interface & Motion Telemetry',
      specialty: 'Dynamic Spatial HUD & Canvas Physics',
    },
    {
      name: 'Ziyullah Ahmed',
      role: 'INSIGHT ALCHEMIST',
      icon: '★',
      desc: 'Kinematic Models & Behavior Heuristics',
      specialty: 'Temporal Aggression Heuristics',
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#F5EFEB] text-[#12161A] p-4 sm:p-8 md:p-12 flex flex-col justify-between overflow-hidden border-b-4 border-[#B81D13] shadow-2xl">
      {/* Texture & Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-35 bg-[radial-gradient(#12161A_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Top Header */}
      <div className="relative z-10 space-y-3">
        <BlurReveal delay={0.05} yOffset={15}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#B81D13] uppercase">
              <span className="w-2.5 h-2.5 bg-[#B81D13] rounded-sm"></span>
              SECTION 07 // MANIFESTO &amp; INVOCATION
            </div>

            <span className="text-xs font-mono bg-[#EDE3D8] hover:bg-[#B81D13] hover:text-white transition-colors px-3 py-1 rounded-full border border-[#12161A]/15 font-bold cursor-default">
              TEAM BRAINBYTES // 2026
            </span>
          </div>
        </BlurReveal>

        <BlurReveal delay={0.15} yOffset={20}>
          <h2 className="font-display text-6xl sm:text-8xl lg:text-9xl tracking-tight text-[#12161A] leading-none uppercase">
            DON'T JUST RECORD. <span className="text-[#B81D13]">REPORT IT.</span>
          </h2>
        </BlurReveal>

        <BlurReveal delay={0.25} yOffset={20}>
          <p className="text-lg sm:text-xl md:text-2xl font-mono text-[#2B303A] max-w-4xl leading-relaxed">
            <strong className="text-[#B81D13]">GAURDIA AI</strong> is not just another passive CCTV monitoring screen. It is an active guardian — turning video into life-saving action in milliseconds.
          </p>
        </BlurReveal>
      </div>

      {/* 4 Pillars Summary */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {[
          { title: '< 1.2s DELAY', desc: 'From frame ingestion to SMS/Push dispatch.', badge: 'SPEED' },
          { title: '17 KEYPOINTS', desc: 'Continuous skeletal pose & kinematic analysis.', badge: 'VISION' },
          { title: '98.4% CONFIDENCE', desc: 'Eliminates false alarms via temporal heuristics.', badge: 'PRECISION' },
          { title: 'CITY-WIDE MESH', desc: 'Scales from single edge camera to municipal grid.', badge: 'SCALE' },
        ].map((item, idx) => {
          const isHovered = hoveredPillarIdx === idx;
          const isDull = hoveredPillarIdx !== null && !isHovered;

          return (
            <BlurReveal key={idx} delay={0.1 + idx * 0.07} yOffset={25}>
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                onMouseEnter={() => {
                  sounds.playHover();
                  setHoveredPillarIdx(idx);
                }}
                onMouseLeave={() => setHoveredPillarIdx(null)}
                className={`p-5 rounded-2xl border-2 flex flex-col justify-between h-full group transition-all duration-300 cursor-pointer ${
                  isHovered
                    ? 'bg-[#B81D13] text-white border-white/60 shadow-[0_25px_45px_-10px_rgba(184,29,19,0.55)]'
                    : isDull
                    ? 'bg-white/60 text-[#12161A] border-[#12161A]/10 opacity-40 scale-[0.98] blur-[0.2px]'
                    : 'bg-white hover:bg-[#B81D13] text-[#12161A] border-[#12161A]/15 shadow-sm'
                }`}
              >
                <span
                  className={`font-mono text-[10px] font-bold uppercase tracking-wider mb-2 transition-colors ${
                    isHovered ? 'text-white/80' : 'text-[#B81D13]'
                  }`}
                >
                  // {item.badge}
                </span>
                <div
                  className={`font-display text-3xl uppercase tracking-wider mb-1 transition-colors ${
                    isHovered ? 'text-white' : 'text-[#12161A]'
                  }`}
                >
                  {item.title}
                </div>
                <p
                  className={`text-xs font-mono leading-relaxed transition-colors ${
                    isHovered ? 'text-white/90' : 'text-[#4A5568]'
                  }`}
                >
                  {item.desc}
                </p>
              </motion.div>
            </BlurReveal>
          );
        })}
      </div>

      {/* Contributors Grand Showcase */}
      <BlurReveal delay={0.25} yOffset={30}>
        <motion.div
          whileHover={{ scale: 1.015, y: -4 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative z-10 bg-[#141920] hover:bg-[#181F28] rounded-2xl p-6 sm:p-8 text-white border-2 border-[#232B36] hover:border-[#B81D13] shadow-2xl hover:shadow-[0_25px_45px_-10px_rgba(184,29,19,0.35)] transition-all duration-300"
        >
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#2A3441] flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#B81D13] flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(184,29,19,0.5)]">
                ★
              </div>
              <div>
                <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wider text-white">
                  ARCHITECTS &amp; CONTRIBUTORS
                </h3>
                <p className="text-xs font-mono text-zinc-400">
                  Crafted with precision by Team BrainBytes
                </p>
              </div>
            </div>

            {onRestart && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onRestart();
                }}
                className="px-4 py-2 rounded-xl bg-[#B81D13] hover:bg-red-600 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-105 cursor-pointer"
              >
                ▲ BACK TO VISION ANCHOR
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contributors.map((c, i) => {
              const isHovered = hoveredContributorIdx === i;
              const isDull = hoveredContributorIdx !== null && !isHovered;

              return (
                <motion.div
                  key={c.name}
                  whileHover={{ scale: 1.05, y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  onMouseEnter={() => {
                    sounds.playHover();
                    setHoveredContributorIdx(i);
                  }}
                  onMouseLeave={() => setHoveredContributorIdx(null)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer group ${
                    isHovered
                      ? 'bg-[#B81D13] text-white border-white/60 shadow-[0_15px_30px_-8px_rgba(184,29,19,0.5)]'
                      : isDull
                      ? 'bg-[#0D1117]/50 border-[#21262D]/40 text-zinc-500 opacity-40 scale-[0.98]'
                      : 'bg-[#0D1117] text-white border-[#21262D] hover:border-[#B81D13]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                        isHovered ? 'bg-white text-[#B81D13] scale-110' : 'bg-[#B81D13] text-white'
                      }`}
                    >
                      {c.icon}
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase transition-colors ${
                        isHovered ? 'text-white bg-black/30 px-1.5 py-0.5 rounded' : 'text-red-400'
                      }`}
                    >
                      {c.role}
                    </span>
                  </div>

                  <div
                    className={`font-sans font-bold text-base mb-0.5 transition-colors ${
                      isHovered ? 'text-white' : 'text-white'
                    }`}
                  >
                    {c.name}
                  </div>

                  <div
                    className={`text-xs font-mono mb-2 leading-tight transition-colors ${
                      isHovered ? 'text-white/90' : 'text-zinc-400'
                    }`}
                  >
                    {c.desc}
                  </div>

                  <div
                    className={`pt-2 border-t text-[10px] font-mono transition-colors ${
                      isHovered
                        ? 'border-white/20 text-white font-semibold'
                        : 'border-[#1C2128] text-cyan-400'
                    }`}
                  >
                    {c.specialty}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </BlurReveal>

      {/* Bottom Hazard Stripe Footer */}
      <BlurReveal delay={0.3} yOffset={15}>
        <div className="relative z-10 mt-8 pt-4 border-t-2 border-[#12161A] flex items-center justify-between flex-wrap gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-24 h-4 bg-[repeating-linear-gradient(45deg,#B81D13,#B81D13_8px,#F5EFEB_8px,#F5EFEB_16px)] border border-[#B81D13]"></div>
            <span className="font-bold text-[#12161A]">GAURDIA AI // BRAINBYTES 2026</span>
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
