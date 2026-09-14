import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Cpu, Activity, Shield, Eye, ArrowRight, Zap, Target, Layers, Binary } from 'lucide-react';
import { PoseSkeletonViewer } from '../PoseSkeletonViewer';
import { TerminalLogs } from '../TerminalLogs';
import { sounds } from '../AudioController';
import { BlurReveal } from '../BlurReveal';

export const IntelligenceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [hoveredStageIdx, setHoveredStageIdx] = useState<number | null>(null);

  // Scroll scrub telemetry
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 25 });
  const streamLineWidth = useTransform(smoothProgress, [0.15, 0.75], ['0%', '100%']);
  const pulseX = useTransform(smoothProgress, [0.15, 0.75], ['0%', '98%']);

  const pipelineStages = [
    {
      step: '01',
      title: 'Person Detection & Tracking',
      model: 'YOLOv11 + ByteTrack',
      latency: '14.2ms',
      desc: 'Detects all human subjects in 1080p frame and maintains stable tracking IDs across heavy visual occlusions.',
    },
    {
      step: '02',
      title: '17-Point Pose Estimation',
      model: 'COCO Keypoint Topology',
      latency: '11.8ms',
      desc: 'Extracts full anatomical wireframes for every subject in view, tracking joint coordinates and angles in real-time.',
    },
    {
      step: '03',
      title: 'Spatial Kinematics & Velocity',
      model: 'Euclidean Vector Geometry',
      latency: '3.4ms',
      desc: 'Measures proximity vectors between subjects (<2.0m) and tracks limb acceleration vectors for rapid strike detection.',
    },
    {
      step: '04',
      title: 'Incident Classification',
      model: 'Temporal Heuristic Engine',
      latency: '6.1ms',
      desc: 'Identifies physical assaults, scuffles, falls, and weapons with 98.2% verified confidence, filtering false positives.',
    },
    {
      step: '05',
      title: 'Autonomous Multi-Dispatch',
      model: 'Edge Gateway & Webhooks',
      latency: '120ms',
      desc: 'Compiles timestamped video evidence loops, GPS markers, and broadcasts to security terminals and mobile push.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#F5EFEB] text-[#12161A] p-4 sm:p-8 md:p-12 flex flex-col justify-between overflow-hidden border-b-4 border-[#B81D13] shadow-2xl"
    >
      {/* Subtle Texture & Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-35 bg-[radial-gradient(#12161A_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Top Header */}
      <div className="relative z-10 space-y-3">
        <BlurReveal delay={0.05} yOffset={15}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#B81D13] uppercase">
              <span className="w-2.5 h-2.5 bg-[#B81D13] rounded-sm"></span>
              SECTION 03 // VISION &amp; KINEMATICS PIPELINE
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-[#EDE3D8] hover:bg-[#B81D13] hover:text-white transition-colors px-3 py-1 rounded-full border border-[#12161A]/15 font-bold cursor-default">
                TOTAL LATENCY: &lt; 35MS PER FRAME (30 FPS)
              </span>
            </div>
          </div>
        </BlurReveal>

        <BlurReveal delay={0.15} yOffset={20}>
          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#12161A] leading-none uppercase">
            THE INTELLIGENCE <span className="text-[#B81D13]">BEHIND THE ALERT</span>
          </h2>
        </BlurReveal>

        <BlurReveal delay={0.25} yOffset={20}>
          <p className="text-base sm:text-lg md:text-xl font-mono text-[#2B303A] max-w-4xl leading-relaxed">
            Traditional cameras only record passive pixels. <strong className="text-[#B81D13]">GAURDIA AI</strong> executes a real-time 5-stage neural inference pipeline to understand kinematic intent and posture dynamics.
          </p>
        </BlurReveal>
      </div>

      {/* Scroll-Scrubbed Data Stream Pipeline Track */}
      <div className="relative z-10 my-2">
        <div className="flex items-center justify-between font-mono text-[11px] text-zinc-600 mb-1">
          <span className="font-bold flex items-center gap-1 text-[#12161A]">
            <Binary className="w-3.5 h-3.5 text-[#B81D13]" />
            NEURAL INFERENCE FLOW TRACK
          </span>
          <span className="text-[#B81D13] font-bold">SCROLL-LINKED DATA CONDUIT</span>
        </div>

        {/* Laser conduit line */}
        <div className="w-full h-1.5 bg-[#12161A]/10 rounded-full overflow-hidden relative">
          <motion.div
            style={{ width: streamLineWidth }}
            className="h-full bg-gradient-to-r from-[#B81D13] via-amber-500 to-[#B81D13] rounded-full relative"
          >
            <motion.div
              style={{ left: pulseX }}
              className="absolute top-0 w-8 h-full bg-white blur-[2px] opacity-80"
            />
          </motion.div>
        </div>
      </div>

      {/* 5-Stage Pipeline Interactive Stepper */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 my-4">
        {pipelineStages.map((stage, idx) => {
          const isActive = activeStage === idx;
          const isHovered = hoveredStageIdx === idx;
          const isDull = hoveredStageIdx !== null && !isHovered;

          return (
            <BlurReveal key={stage.step} delay={0.1 + idx * 0.06} yOffset={25}>
              <motion.div
                whileHover={{ scale: 1.05, y: -7 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                onMouseEnter={() => {
                  sounds.playHover();
                  setHoveredStageIdx(idx);
                }}
                onMouseLeave={() => setHoveredStageIdx(null)}
                onClick={() => {
                  sounds.playClick();
                  setActiveStage(idx);
                }}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 flex flex-col justify-between h-full group ${
                  isHovered
                    ? 'bg-[#B81D13] text-white border-white/60 shadow-[0_20px_40px_-10px_rgba(184,29,19,0.55)]'
                    : isDull
                    ? 'bg-white/60 text-[#12161A] border-[#12161A]/10 opacity-40 scale-[0.98] blur-[0.2px]'
                    : isActive
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
                      STAGE {stage.step}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold transition-all ${
                        isHovered
                          ? 'bg-black/30 text-white'
                          : 'bg-black/10 group-hover:bg-black/30 group-hover:text-white text-[#12161A]'
                      }`}
                    >
                      {stage.latency}
                    </span>
                  </div>

                  <h4
                    className={`font-sans font-bold text-sm uppercase mb-1 transition-colors ${
                      isHovered ? 'text-white' : 'text-[#12161A] group-hover:text-white'
                    }`}
                  >
                    {stage.title}
                  </h4>

                  <div
                    className={`text-[11px] font-mono font-semibold mb-2 transition-colors ${
                      isHovered ? 'text-red-200' : 'text-[#B81D13] group-hover:text-red-100'
                    }`}
                  >
                    {stage.model}
                  </div>

                  <p
                    className={`text-xs font-mono leading-snug transition-colors ${
                      isHovered ? 'text-white/90' : 'text-[#4A5568] group-hover:text-white/90'
                    }`}
                  >
                    {stage.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-current/15 text-[10px] font-mono flex items-center justify-between">
                  <span className="font-bold">STATUS: ACTIVE</span>
                  <span className="group-hover:font-bold">
                    {isHovered ? '● ACTIVE' : isActive ? '● SELECTED' : 'INSPECT →'}
                  </span>
                </div>
              </motion.div>
            </BlurReveal>
          );
        })}
      </div>

      {/* Interactive Dual Sandbox: Pose Skeleton & Terminal Logs */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 my-4 items-start">
        {/* Left 6 Cols: Pose Skeleton */}
        <div className="lg:col-span-6 space-y-2">
          <BlurReveal delay={0.2} yOffset={30}>
            <div className="flex items-center justify-between font-mono text-xs text-[#12161A] mb-1">
              <span className="font-bold flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#B81D13]" />
                INTERACTIVE 17-KEYPOINT KINEMATICS
              </span>
              <span className="text-[#B81D13] font-bold">CLICK JOINTS TO INSPECT</span>
            </div>

            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="rounded-2xl border-2 border-[#12161A]/20 hover:border-[#B81D13] hover:shadow-[0_20px_40px_-10px_rgba(184,29,19,0.35)] transition-all duration-300 overflow-hidden"
            >
              <PoseSkeletonViewer />
            </motion.div>
          </BlurReveal>
        </div>

        {/* Right 6 Cols: Streaming Terminal Daemon */}
        <div className="lg:col-span-6 space-y-2">
          <BlurReveal delay={0.3} yOffset={30}>
            <div className="flex items-center justify-between font-mono text-xs text-[#12161A] mb-1">
              <span className="font-bold flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#B81D13]" />
                LIVE INFERENCE DAEMON ENGINE
              </span>
              <span className="text-emerald-700 font-bold">REAL-TIME TELEMETRY</span>
            </div>

            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="rounded-2xl border-2 border-[#12161A]/20 hover:border-[#B81D13] hover:shadow-[0_20px_40px_-10px_rgba(184,29,19,0.35)] transition-all duration-300 overflow-hidden"
            >
              <TerminalLogs />
            </motion.div>
          </BlurReveal>
        </div>
      </div>

      {/* Footer Hazard Stripe */}
      <BlurReveal delay={0.35} yOffset={15}>
        <div className="relative z-10 mt-6 pt-3 border-t-2 border-[#12161A] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-16 h-3.5 bg-[repeating-linear-gradient(45deg,#B81D13,#B81D13_6px,#F5EFEB_6px,#F5EFEB_12px)] border border-[#B81D13]"></div>
            <span className="font-bold">HEURISTIC TEMPORAL PATTERN RECOGNITION</span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">GAURDIA AI // SLIDE 03</span>
        </div>
      </BlurReveal>
    </section>
  );
};
