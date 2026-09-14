import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Clock, Eye, AlertCircle, ShieldAlert, CheckCircle2, ChevronRight, Activity, Zap, Play, Radio } from 'lucide-react';
import { sounds } from '../AudioController';
import { BlurReveal } from '../BlurReveal';

interface TimecodeStep {
  timecode: string;
  seconds: number;
  phase: string;
  status: 'NORMAL' | 'ELEVATED' | 'THREAT' | 'CRITICAL' | 'DISPATCH';
  title: string;
  telemetry: {
    proximity: string;
    velocity: string;
    confidence: string;
    action: string;
  };
  description: string;
  heuristic: string;
}

export const UnderstandingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const [hoveredStepIdx, setHoveredStepIdx] = useState<number | null>(null);
  const [hoveredTelemIdx, setHoveredTelemIdx] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Scroll scrub tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 25 });
  const scrubberWidth = useTransform(smoothProgress, [0.1, 0.8], ['0%', '100%']);
  const scrubberIndicator = useTransform(smoothProgress, [0.1, 0.8], ['0%', '98%']);

  const steps: TimecodeStep[] = [
    {
      timecode: '00:00:00',
      seconds: 0,
      phase: 'BASELINE PATROL',
      status: 'NORMAL',
      title: 'Pedestrian Spatial Baseline',
      telemetry: {
        proximity: '4.82 meters',
        velocity: '1.05 m/s (Walking)',
        confidence: '99.1%',
        action: 'Normal Transit',
      },
      description: 'Two human subjects (P01 & P02) enter Camera 03 field of view. Pose skeletons reflect symmetric walking gait with zero aggressive acceleration markers.',
      heuristic: 'Velocity vector within normal pedestrian range. No spatial conflict detected.',
    },
    {
      timecode: '00:00:02',
      seconds: 2,
      phase: 'PROXIMITY CONVERGENCE',
      status: 'ELEVATED',
      title: 'Rapid Interception & Distance Narrowing',
      telemetry: {
        proximity: '1.84 meters',
        velocity: '1.85 m/s (Approaching)',
        confidence: '95.4%',
        action: 'Converging Paths',
      },
      description: 'P02 abruptly alters trajectory towards P01, breaching the 2.0-meter proximity comfort radius. Kalman filter tracks sudden closing velocity.',
      heuristic: 'Spatial proximity narrowing threshold crossed. State elevated to MONITORING_ORANGE.',
    },
    {
      timecode: '00:00:04',
      seconds: 4,
      phase: 'STRIKE ACCELERATION',
      status: 'THREAT',
      title: 'Upper Extremity Kinetic Spike',
      telemetry: {
        proximity: '1.20 meters',
        velocity: '2.42 m/s (Strike Vector)',
        confidence: '96.8%',
        action: 'Rapid Arm Extension',
      },
      description: 'P02 right wrist keypoint undergoes instantaneous angular acceleration exceeding 2.1 m/s aimed at P01 head keypoint. Stance wide with defensive posture.',
      heuristic: 'Kinetic strike vector detected. Heuristic triggers pre-alert frame buffering.',
    },
    {
      timecode: '00:00:06',
      seconds: 6,
      phase: 'INCIDENT CLASSIFICATION',
      status: 'CRITICAL',
      title: 'Physical Altercation & Grapple Confirmed',
      telemetry: {
        proximity: '0.65 meters',
        velocity: '2.95 m/s (Impact)',
        confidence: '98.2%',
        action: 'Physical Altercation',
      },
      description: 'Full multi-joint impact shock verified. Rapid erratic displacement of 17 keypoints across both subjects confirms violent confrontation.',
      heuristic: 'High-confidence assault verified (>98%). Autonomous alarm triggers activated.',
    },
    {
      timecode: '00:00:08',
      seconds: 8,
      phase: 'MULTI-VECTOR DISPATCH',
      status: 'DISPATCH',
      title: 'Evidence Compilation & Response Broadcast',
      telemetry: {
        proximity: '0.80 meters',
        velocity: 'Active Response',
        confidence: '100% Delivered',
        action: 'Dispatched to 4 Units',
      },
      description: '10-second compressed video clip, GPS coordinates, and threat level delivered via GSM SMS & Telegram to nearest 3 security patrol units.',
      heuristic: 'Zero-human-delay protocol completed in 1.18 seconds total elapsed latency.',
    },
  ];

  const currentStep = steps[selectedStepIndex];

  const toggleAutoPlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    sounds.playScan();
    setIsPlaying(true);
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % steps.length;
      setSelectedStepIndex(idx);
      sounds.playClick();
      if (idx === steps.length - 1) {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, 1500);
  };

  const getStatusColor = (status: TimecodeStep['status']) => {
    switch (status) {
      case 'NORMAL':
        return 'bg-emerald-600 text-white';
      case 'ELEVATED':
        return 'bg-amber-500 text-black';
      case 'THREAT':
        return 'bg-orange-600 text-white';
      case 'CRITICAL':
        return 'bg-[#B81D13] text-white';
      case 'DISPATCH':
        return 'bg-cyan-600 text-white';
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F5EFEB] text-[#12161A] p-4 sm:p-6 lg:p-7 flex flex-col justify-between overflow-hidden border-b-4 border-[#B81D13] shadow-2xl rounded-2xl"
    >
      {/* Background Texture & Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-35 bg-[radial-gradient(#12161A_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Header */}
      <div className="relative z-10 space-y-2">
        <BlurReveal delay={0.05} yOffset={10}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-tactical font-bold tracking-widest text-[#B81D13] uppercase">
              <span className="w-2.5 h-2.5 bg-[#B81D13] rounded-sm"></span>
              SECTION 04 // TEMPORAL CONTEXTUAL RECONSTRUCTION
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onMouseEnter={() => sounds.playHover()}
              onClick={toggleAutoPlay}
              className={`px-3 py-0.5 rounded-full font-tactical text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                isPlaying
                  ? 'bg-amber-500 text-black animate-pulse'
                  : 'bg-[#EDE3D8] hover:bg-[#B81D13] hover:text-white border border-[#12161A]/15 text-[#12161A]'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              {isPlaying ? 'PLAYING SEQUENCE...' : 'PLAY TIMECODE TIMELINE'}
            </motion.button>
          </div>
        </BlurReveal>

        <BlurReveal delay={0.12} yOffset={15}>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-[#12161A] leading-none uppercase">
            IT DOESN'T JUST SEE. <span className="text-[#B81D13]">IT UNDERSTANDS.</span>
          </h2>
        </BlurReveal>

        <BlurReveal delay={0.18} yOffset={10}>
          <p className="text-sm sm:text-base font-body text-[#2B303A] max-w-4xl leading-relaxed">
            An isolated frame is blind. <strong className="text-[#B81D13]">GAURDIA AI</strong> reconstructs temporal context across timecode vectors to distinguish accidental contact from deliberate assault.
          </p>
        </BlurReveal>
      </div>

      {/* Interactive Time Scrubber Bar */}
      <div className="relative z-10 my-3">
        {/* Step Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-2.5">
          {steps.map((step, idx) => {
            const isSelected = selectedStepIndex === idx;
            const isHovered = hoveredStepIdx === idx;
            const isDull = hoveredStepIdx !== null && !isHovered;

            return (
              <BlurReveal key={step.timecode} delay={0.08 + idx * 0.04} yOffset={15}>
                <motion.button
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  onMouseEnter={() => {
                    sounds.playHover();
                    setHoveredStepIdx(idx);
                  }}
                  onMouseLeave={() => setHoveredStepIdx(null)}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedStepIndex(idx);
                  }}
                  className={`w-full p-2.5 sm:p-3 rounded-xl font-mono text-left border-2 transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                    isHovered
                      ? 'bg-[#B81D13] text-white border-white/60 shadow-[0_15px_30px_-8px_rgba(184,29,19,0.55)]'
                      : isDull
                      ? 'bg-white/60 text-[#12161A] border-[#12161A]/10 opacity-40 scale-[0.98] blur-[0.2px]'
                      : isSelected
                      ? 'bg-white text-[#12161A] border-[#B81D13] shadow-md ring-2 ring-[#B81D13]/20'
                      : 'bg-white hover:bg-[#B81D13] text-[#12161A] border-[#12161A]/15 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`font-bold text-xs transition-colors ${
                        isHovered ? 'text-white' : 'text-[#12161A] group-hover:text-white'
                      }`}
                    >
                      {step.timecode}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold transition-colors ${
                        isHovered
                          ? 'bg-black/30 text-white'
                          : 'bg-black/10 group-hover:bg-black/30 group-hover:text-white text-zinc-700'
                      }`}
                    >
                      T+{step.seconds}S
                    </span>
                  </div>
                  <div
                    className={`text-[10px] font-tactical font-bold uppercase truncate transition-colors ${
                      isHovered ? 'text-white/90' : 'text-zinc-600 group-hover:text-white'
                    }`}
                  >
                    {step.phase}
                  </div>
                </motion.button>
              </BlurReveal>
            );
          })}
        </div>

        {/* Scroll-Scrubbed Telemetry Timeline */}
        <div className="w-full bg-[#12161A]/10 h-1.5 rounded-full overflow-hidden relative">
          <motion.div
            style={{ width: scrubberWidth }}
            className="h-full bg-gradient-to-r from-[#B81D13] via-amber-500 to-[#B81D13] relative rounded-full"
          >
            <motion.div
              style={{ left: scrubberIndicator }}
              className="absolute top-0 w-6 h-full bg-white blur-[2px] opacity-90"
            />
          </motion.div>
        </div>
      </div>

      {/* Main Selected State Showcase Card */}
      <BlurReveal delay={0.2} yOffset={20}>
        <motion.div
          whileHover={{ scale: 1.015, y: -3 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative z-10 bg-[#10141A] hover:bg-[#151B22] rounded-2xl p-4 sm:p-5 text-white border-2 border-[#232B36] hover:border-[#B81D13] shadow-2xl hover:shadow-[0_25px_45px_-10px_rgba(184,29,19,0.35)] transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Left 7 Cols: Detailed Analysis */}
            <div className="lg:col-span-7 space-y-2.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-md font-tactical text-[11px] font-bold uppercase shadow-sm ${getStatusColor(currentStep.status)}`}>
                  STATUS: {currentStep.status}
                </span>
                <span className="font-mono text-[11px] text-zinc-400">
                  TIMECODE // {currentStep.timecode} (PHASE {selectedStepIndex + 1}/5)
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wide text-white leading-tight">
                {currentStep.title}
              </h3>

              <p className="font-body text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {currentStep.description}
              </p>

              {/* Heuristic Callout Box */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                onMouseEnter={() => sounds.playHover()}
                className="p-2.5 sm:p-3 rounded-xl bg-[#161D26] hover:bg-[#1C2633] border border-[#2B3848] hover:border-cyan-400/50 text-xs font-mono space-y-0.5 transition-all duration-200 cursor-default"
              >
                <div className="text-cyan-400 font-tactical font-bold flex items-center gap-1.5 text-[11px]">
                  <Activity className="w-3 h-3" />
                  NEURAL HEURISTIC TRIGGER
                </div>
                <p className="text-zinc-300 font-body text-xs">{currentStep.heuristic}</p>
              </motion.div>
            </div>

            {/* Right 5 Cols: Live Kinematic Matrix */}
            <div className="lg:col-span-5 bg-[#0A0D11] p-3.5 sm:p-4 rounded-xl border border-[#202733] font-mono text-xs space-y-2 shadow-inner">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#202733] text-zinc-400 font-bold text-[11px]">
                <span>TEMPORAL TELEMETRY</span>
                <span className="text-emerald-400">30 FPS SYNC</span>
              </div>

              <div className="space-y-1.5">
                {[
                  { label: 'Subject Proximity:', value: currentStep.telemetry.proximity, valColor: 'text-white' },
                  { label: 'Kinetic Velocity:', value: currentStep.telemetry.velocity, valColor: 'text-amber-400' },
                  { label: 'Model Confidence:', value: currentStep.telemetry.confidence, valColor: 'text-emerald-400' },
                  { label: 'System Action:', value: currentStep.telemetry.action, valColor: 'text-cyan-300' },
                ].map((item, idx) => {
                  const isHovered = hoveredTelemIdx === idx;
                  const isDull = hoveredTelemIdx !== null && !isHovered;

                  return (
                    <motion.div
                      key={item.label}
                      whileHover={{ scale: 1.03, x: 4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      onMouseEnter={() => {
                        sounds.playHover();
                        setHoveredTelemIdx(idx);
                      }}
                      onMouseLeave={() => setHoveredTelemIdx(null)}
                      className={`flex justify-between items-center p-2 rounded border transition-all duration-200 cursor-pointer ${
                        isHovered
                          ? 'bg-[#B81D13] text-white border-white/60 shadow-md'
                          : isDull
                          ? 'bg-[#131820]/40 border-[#1E2734]/40 text-zinc-500 opacity-40'
                          : 'bg-[#131820] text-zinc-300 border-[#1E2734]'
                      }`}
                    >
                      <span className={isHovered ? 'text-white' : 'text-zinc-400'}>{item.label}</span>
                      <span className={`font-bold ${isHovered ? 'text-white' : item.valColor}`}>{item.value}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </BlurReveal>

      {/* Footer Hazard Stripe */}
      <BlurReveal delay={0.28} yOffset={10}>
        <div className="relative z-10 mt-4 pt-3 border-t-2 border-[#12161A] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-16 h-3 bg-[repeating-linear-gradient(45deg,#B81D13,#B81D13_6px,#F5EFEB_6px,#F5EFEB_12px)] border border-[#B81D13]"></div>
            <span className="font-bold">CONTINUOUS TEMPORAL POSE CONVOLUTION</span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">GAURDIA AI // SLIDE 04</span>
        </div>
      </BlurReveal>
    </section>
  );
};
