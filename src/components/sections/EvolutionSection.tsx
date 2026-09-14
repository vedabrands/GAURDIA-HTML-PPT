import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Network, Radio, Navigation, Shield, Compass, Sparkles, ArrowRight, CheckCircle2, Share2 } from 'lucide-react';
import { MeshNetworkCanvas } from '../MeshNetworkCanvas';
import { sounds } from '../AudioController';
import { BlurReveal } from '../BlurReveal';

export const EvolutionSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(1); // Default Phase 2: Mesh
  const [hoveredPhaseIdx, setHoveredPhaseIdx] = useState<number | null>(null);

  // Scroll scrub tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 25 });
  const meshConduitWidth = useTransform(smoothProgress, [0.1, 0.8], ['0%', '100%']);
  const meshConduitPulse = useTransform(smoothProgress, [0.1, 0.8], ['0%', '98%']);

  const phases = [
    {
      phase: '01',
      name: 'Intelligent Edge Sentinel',
      badge: 'PRODUCTION READY',
      badgeColor: 'bg-emerald-600',
      timeline: 'Q1 - Q2 2026',
      desc: 'Single-camera high-frame-rate pose inference, kinematic aggression triage, and instant push/SMS multi-channel incident dispatch.',
      capabilities: [
        'YOLOv11 + ByteTrack edge inference',
        '17-keypoint strike vector heuristics',
        '< 1.2s SMS & Telegram alert dispatch',
        'Forensic 10s MP4 loop compilation',
      ],
    },
    {
      phase: '02',
      name: 'City-Wide Visual Mesh',
      badge: 'ACTIVE EXPEDITION',
      badgeColor: 'bg-[#B81D13]',
      timeline: 'Q3 - Q4 2026',
      desc: 'Interconnected CCTV camera nodes with multi-camera re-identification (ReID), trajectory handover across blindspots, and city heatmaps.',
      capabilities: [
        'Cross-camera subject Re-ID tracking',
        'Multi-angle blindspot compensation',
        'Distributed edge sync & telemetry',
        'Dynamic urban threat contour maps',
      ],
    },
    {
      phase: '03',
      name: 'Autonomous Municipal Grid',
      badge: 'FUTURE BLUEPRINT',
      badgeColor: 'bg-cyan-600',
      timeline: '2027 VISION',
      desc: 'Full-spectrum smart city safety grid orchestrating autonomous aerial drone dispatch, dynamic traffic routing, and perimeter lockdown.',
      capabilities: [
        'Autonomous drone first responder dispatch',
        'Smart city traffic signal green-wave',
        'Predictive crowd density surge models',
        'Municipal emergency API federation',
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F5EFEB] text-[#12161A] p-4 sm:p-6 lg:p-7 flex flex-col justify-between overflow-hidden border-b-4 border-[#B81D13] shadow-2xl rounded-2xl"
    >
      {/* Texture & Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-35 bg-[radial-gradient(#12161A_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Header */}
      <div className="relative z-10 space-y-2">
        <BlurReveal delay={0.05} yOffset={10}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-tactical font-bold tracking-widest text-[#B81D13] uppercase">
              <span className="w-2.5 h-2.5 bg-[#B81D13] rounded-sm"></span>
              SECTION 06 // AUTONOMOUS SENTINEL ROADMAP &amp; MESH
            </div>

            <span className="text-xs font-tactical bg-[#EDE3D8] hover:bg-[#B81D13] hover:text-white transition-colors px-3 py-0.5 rounded-full border border-[#12161A]/15 font-bold cursor-default">
              EXPANDING HORIZONS
            </span>
          </div>
        </BlurReveal>

        <BlurReveal delay={0.12} yOffset={15}>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-[#12161A] leading-none uppercase">
            THE CAMERA IS <span className="text-[#B81D13]">ONLY THE BEGINNING</span>
          </h2>
        </BlurReveal>

        <BlurReveal delay={0.18} yOffset={10}>
          <p className="text-sm sm:text-base font-body text-[#2B303A] max-w-4xl leading-relaxed">
            Transforming isolated surveillance cameras into an interconnected, cooperative visual intelligence grid capable of real-time multi-angle awareness.
          </p>
        </BlurReveal>
      </div>

      {/* Scroll Scrubbed Mesh Network Conduit */}
      <div className="relative z-10 my-1.5">
        <div className="flex items-center justify-between font-mono text-[10px] text-zinc-600 mb-1">
          <span className="font-bold flex items-center gap-1 text-[#12161A] font-tactical">
            <Share2 className="w-3 h-3 text-[#B81D13]" />
            MUNICIPAL MESH EXPANSION VECTOR
          </span>
          <span className="text-[#B81D13] font-bold font-tactical">SCROLL-LINKED SPATIAL TOPOLOGY</span>
        </div>

        <div className="w-full h-1.5 bg-[#12161A]/10 rounded-full overflow-hidden relative">
          <motion.div
            style={{ width: meshConduitWidth }}
            className="h-full bg-gradient-to-r from-[#B81D13] via-amber-500 to-[#B81D13] rounded-full relative"
          >
            <motion.div
              style={{ left: meshConduitPulse }}
              className="absolute top-0 w-8 h-full bg-white blur-[2px] opacity-80"
            />
          </motion.div>
        </div>
      </div>

      {/* 3 Strategic Phases */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3 my-2.5">
        {phases.map((p, idx) => {
          const isSelected = activePhaseIndex === idx;
          const isHovered = hoveredPhaseIdx === idx;
          const isDull = hoveredPhaseIdx !== null && !isHovered;

          return (
            <BlurReveal key={p.phase} delay={0.08 + idx * 0.05} yOffset={15}>
              <motion.div
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                onMouseEnter={() => {
                  sounds.playHover();
                  setHoveredPhaseIdx(idx);
                }}
                onMouseLeave={() => setHoveredPhaseIdx(null)}
                onClick={() => {
                  sounds.playClick();
                  setActivePhaseIndex(idx);
                }}
                className={`p-3.5 sm:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 flex flex-col justify-between h-full group ${
                  isHovered
                    ? 'bg-[#B81D13] text-white border-white/60 shadow-[0_20px_40px_-10px_rgba(184,29,19,0.55)]'
                    : isDull
                    ? 'bg-white/60 text-[#12161A] border-[#12161A]/10 opacity-40 scale-[0.98] blur-[0.2px]'
                    : isSelected
                    ? 'bg-white text-[#12161A] border-[#B81D13] shadow-md ring-2 ring-[#B81D13]/20'
                    : 'bg-white hover:bg-[#B81D13] text-[#12161A] border-[#12161A]/15 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-display text-2xl transition-colors ${
                        isHovered ? 'text-white' : 'text-[#B81D13] group-hover:text-white'
                      }`}
                    >
                      PHASE {p.phase}
                    </span>
                    <span
                      className={`text-[9px] font-tactical px-2 py-0.5 rounded-full text-white font-bold tracking-wider transition-all ${
                        isHovered ? 'bg-black/30 text-white' : p.badgeColor
                      }`}
                    >
                      {p.badge}
                    </span>
                  </div>

                  <h3
                    className={`font-display text-lg sm:text-xl uppercase tracking-wide leading-tight mb-0.5 transition-colors ${
                      isHovered ? 'text-white' : 'text-[#12161A] group-hover:text-white'
                    }`}
                  >
                    {p.name}
                  </h3>
                  <div
                    className={`text-[10px] font-mono font-bold mb-2 transition-colors ${
                      isHovered ? 'text-red-200' : 'text-[#B81D13] group-hover:text-red-100'
                    }`}
                  >
                    {p.timeline}
                  </div>
                  <p
                    className={`text-[11px] font-body leading-snug mb-2.5 transition-colors ${
                      isHovered ? 'text-white/90' : 'text-[#4A5568] group-hover:text-white/90'
                    }`}
                  >
                    {p.desc}
                  </p>
                </div>

                {/* Capabilities checklist */}
                <div className="pt-2 border-t border-current/20 space-y-1 font-mono text-[10px]">
                  {p.capabilities.map((c, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <CheckCircle2
                        className={`w-3 h-3 shrink-0 transition-colors ${
                          isHovered ? 'text-white' : 'text-[#B81D13] group-hover:text-white'
                        }`}
                      />
                      <span className="truncate font-body text-[11px]">{c}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </BlurReveal>
          );
        })}
      </div>

      {/* Live Interactive City Mesh Canvas */}
      <BlurReveal delay={0.2} yOffset={20}>
        <div className="relative z-10 my-1 space-y-1.5">
          <div className="flex items-center justify-between font-mono text-xs text-[#12161A]">
            <span className="font-bold flex items-center gap-1.5 font-tactical text-[11px]">
              <Network className="w-3.5 h-3.5 text-[#B81D13]" />
              LIVE MULTI-CAMERA MESH VISUALIZATION
            </span>
            <span className="text-[#B81D13] font-bold font-tactical text-[11px]">CLICK NODES TO SWITCH PERSPECTIVE</span>
          </div>

          <motion.div
            whileHover={{ scale: 1.015, y: -3 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="rounded-2xl border-2 border-[#12161A]/20 hover:border-[#B81D13] hover:shadow-[0_20px_40px_-10px_rgba(184,29,19,0.35)] transition-all duration-300 overflow-hidden"
          >
            <MeshNetworkCanvas />
          </motion.div>
        </div>
      </BlurReveal>

      {/* Footer Hazard Stripe */}
      <BlurReveal delay={0.28} yOffset={10}>
        <div className="relative z-10 mt-4 pt-3 border-t-2 border-[#12161A] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-16 h-3 bg-[repeating-linear-gradient(45deg,#B81D13,#B81D13_6px,#F5EFEB_6px,#F5EFEB_12px)] border border-[#B81D13]"></div>
            <span className="font-bold">COOPERATIVE SPATIAL INTELLIGENCE MATRIX</span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">GAURDIA AI // SLIDE 06</span>
        </div>
      </BlurReveal>
    </section>
  );
};
