import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Cpu, Server, Network, ShieldCheck, Film, Radio, Check, Layers, Zap, Gauge } from 'lucide-react';
import { sounds } from '../AudioController';
import { BlurReveal } from '../BlurReveal';

interface EngineModule {
  id: string;
  name: string;
  category: string;
  tech: string;
  metric: string;
  description: string;
  specifications: string[];
  icon: React.ComponentType<{ className?: string }>;
}

export const EngineSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string>('detection');
  const [hoveredModIdx, setHoveredModIdx] = useState<number | null>(null);

  // Scroll scrub tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 25 });
  const tensorLineWidth = useTransform(smoothProgress, [0.1, 0.8], ['0%', '100%']);
  const tensorPulse = useTransform(smoothProgress, [0.1, 0.8], ['0%', '98%']);

  const modules: EngineModule[] = [
    {
      id: 'detection',
      name: 'Vision & Pose Kernel',
      category: 'NEURAL INFERENCE',
      tech: 'YOLOv11 + ByteTrack + COCO 17-Keypoint',
      metric: '12ms (83 FPS CAPABLE)',
      description: 'Ultra-lightweight convolutional neural network optimized with TensorRT INT8 quantization for real-time edge processing.',
      specifications: ['TensorRT 10.x & ONNX Runtime', 'Multi-subject ByteTrack ID persistence', '17 anatomical keypoint topology'],
      icon: Cpu,
    },
    {
      id: 'ingestion',
      name: 'RTSP Stream Demuxer',
      category: 'DATA INGESTION',
      tech: 'Hardware-Accelerated NVDEC / FFmpeg',
      metric: '32 CONCURRENT FEEDS',
      description: 'Zero-copy direct GPU memory ingestion handling multi-angle CCTV feeds with automatic reconnect and frame buffering.',
      specifications: ['NVDEC hardware decoding', 'Zero dropped frames at 1080p', 'Adaptive RTSP jitter buffer'],
      icon: Server,
    },
    {
      id: 'kinematics',
      name: 'Spatial Kinematics Engine',
      category: 'GEOMETRIC MATH',
      tech: 'Euclidean Vector Calculus & 3D Projections',
      metric: '3,000 VECTORS/SEC',
      description: 'Computes multi-person Euclidean distance metrics, joint angular acceleration vectors, and directional strike trajectories.',
      specifications: ['Sub-pixel joint tracking', 'Velocity derivative calculation', 'Dynamic interpersonal boundary radius'],
      icon: Network,
    },
    {
      id: 'classifier',
      name: 'Temporal Threat Engine',
      category: 'DECISION LOGIC',
      tech: 'Temporal Heuristic State Machine',
      metric: '98.4% VERIFIED ACCURACY',
      description: 'Aggregates temporal frame sequences to eliminate false alarms caused by casual gestures, running, or handshakes.',
      specifications: ['Multi-frame sliding window analysis', 'Dual-person interaction scoring', 'Zero false positive alarm filter'],
      icon: ShieldCheck,
    },
    {
      id: 'synthesizer',
      name: 'Forensic Video Synthesizer',
      category: 'EVIDENCE COMPILER',
      tech: 'Fast H.264 In-Memory Muxer',
      metric: '< 180ms COMPILATION',
      description: 'Instantly captures 5s pre-incident ring buffer and 5s post-incident video with burned-in telemetry and timestamp overlay.',
      specifications: ['Lossless MP4 containerization', 'Overlaid kinetic telemetry HUD', 'Instant cloud and edge dispatch'],
      icon: Film,
    },
    {
      id: 'dispatch',
      name: 'Multi-Vector Gateway',
      category: 'BROADCAST ENGINE',
      tech: 'Async WebHooks / GSM / MQTT / WebSocket',
      metric: '< 1.2s END-TO-END',
      description: 'Pushes verified alerts and forensic bundles simultaneously to mobile devices, police CAD terminals, and physical sirens.',
      specifications: ['SMS & Telegram Bot API', 'GPIO hardware alarm triggers', '99.99% webhook retry reliability'],
      icon: Radio,
    },
  ];

  const currentModule = modules.find(m => m.id === selectedModuleId) || modules[0];

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
              SECTION 05 // SYSTEM ARCHITECTURE &amp; KERNEL SPECIFICATIONS
            </div>

            <span className="text-xs font-tactical bg-[#EDE3D8] hover:bg-[#B81D13] hover:text-white transition-colors px-3 py-0.5 rounded-full border border-[#12161A]/15 font-bold cursor-default">
              MODULAR EDGE &amp; CLOUD HYBRID
            </span>
          </div>
        </BlurReveal>

        <BlurReveal delay={0.12} yOffset={15}>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-[#12161A] leading-none uppercase">
            THE ENGINE <span className="text-[#B81D13]">BEHIND GAURDIA</span>
          </h2>
        </BlurReveal>

        <BlurReveal delay={0.18} yOffset={10}>
          <p className="text-sm sm:text-base font-body text-[#2B303A] max-w-4xl leading-relaxed">
            High throughput. Low latency. Zero compromise. Built with modular micro-engines designed to operate on local edge hardware or distributed cloud nodes.
          </p>
        </BlurReveal>
      </div>

      {/* Scroll Scrubbed Micro-Engine Data Conduit */}
      <div className="relative z-10 my-1.5">
        <div className="flex items-center justify-between font-mono text-[10px] text-zinc-600 mb-1">
          <span className="font-bold flex items-center gap-1 text-[#12161A] font-tactical">
            <Gauge className="w-3 h-3 text-[#B81D13]" />
            TENSORRT QUANTIZATION PIPELINE FLOW
          </span>
          <span className="text-[#B81D13] font-bold font-tactical">SCROLL-LINKED ENGINE METRICS</span>
        </div>

        <div className="w-full h-1.5 bg-[#12161A]/10 rounded-full overflow-hidden relative">
          <motion.div
            style={{ width: tensorLineWidth }}
            className="h-full bg-gradient-to-r from-[#B81D13] via-amber-500 to-[#B81D13] rounded-full relative"
          >
            <motion.div
              style={{ left: tensorPulse }}
              className="absolute top-0 w-8 h-full bg-white blur-[2px] opacity-80"
            />
          </motion.div>
        </div>
      </div>

      {/* 6 Engine Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 my-2.5">
        {modules.map((mod, idx) => {
          const Icon = mod.icon;
          const isSelected = selectedModuleId === mod.id;
          const isHovered = hoveredModIdx === idx;
          const isDull = hoveredModIdx !== null && !isHovered;

          return (
            <BlurReveal key={mod.id} delay={0.08 + idx * 0.04} yOffset={15}>
              <motion.div
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                onMouseEnter={() => {
                  sounds.playHover();
                  setHoveredModIdx(idx);
                }}
                onMouseLeave={() => setHoveredModIdx(null)}
                onClick={() => {
                  sounds.playClick();
                  setSelectedModuleId(mod.id);
                }}
                className={`p-3 sm:p-3.5 rounded-xl cursor-pointer transition-all duration-300 border-2 flex flex-col justify-between h-full group ${
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
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm ${
                        isHovered
                          ? 'bg-white text-[#B81D13] scale-110'
                          : 'bg-[#B81D13] group-hover:bg-white text-white group-hover:text-[#B81D13]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`font-tactical text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider transition-colors ${
                        isHovered
                          ? 'bg-black/30 text-white'
                          : 'bg-black/10 group-hover:bg-black/30 group-hover:text-white text-[#12161A]'
                      }`}
                    >
                      {mod.category}
                    </span>
                  </div>

                  <h3
                    className={`font-display text-lg sm:text-xl uppercase tracking-wide leading-tight mb-0.5 transition-colors ${
                      isHovered ? 'text-white' : 'text-[#12161A] group-hover:text-white'
                    }`}
                  >
                    {mod.name}
                  </h3>
                  <div
                    className={`text-[10px] font-mono font-bold mb-1 transition-colors ${
                      isHovered ? 'text-red-200' : 'text-[#B81D13] group-hover:text-red-100'
                    }`}
                  >
                    {mod.tech}
                  </div>
                  <p
                    className={`text-[11px] font-body leading-snug transition-colors ${
                      isHovered ? 'text-white/90' : 'text-[#4A5568] group-hover:text-white/90'
                    }`}
                  >
                    {mod.description}
                  </p>
                </div>

                <div className="mt-2.5 pt-1.5 border-t border-current/15 flex items-center justify-between font-mono text-[10px]">
                  <span
                    className={`font-condensed font-bold text-xs tracking-wide transition-colors ${
                      isHovered ? 'text-white' : 'text-[#12161A] group-hover:text-white'
                    }`}
                  >
                    {mod.metric}
                  </span>
                  <span className="text-[9px] font-tactical opacity-80 group-hover:opacity-100 group-hover:font-bold transition-all">
                    {isHovered ? '● ACTIVE' : isSelected ? '● SELECTED' : 'INSPECT →'}
                  </span>
                </div>
              </motion.div>
            </BlurReveal>
          );
        })}
      </div>

      {/* Selected Module Technical Specs Bar */}
      <BlurReveal delay={0.22} yOffset={20}>
        <motion.div
          whileHover={{ scale: 1.015, y: -3 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative z-10 bg-[#12161D] hover:bg-[#161C25] rounded-2xl p-4 sm:p-5 text-white border-2 border-[#222934] hover:border-[#B81D13] shadow-xl hover:shadow-[0_25px_45px_-10px_rgba(184,29,19,0.35)] transition-all duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-6 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-tactical text-cyan-400 font-bold">
                <Zap className="w-3.5 h-3.5" />
                DETAILED COMPONENT BREAKDOWN: {currentModule.name.toUpperCase()}
              </div>
              <h4 className="font-display text-xl sm:text-2xl uppercase tracking-wider text-white">
                {currentModule.tech}
              </h4>
              <p className="text-xs font-body text-zinc-300 leading-relaxed">
                {currentModule.description}
              </p>
            </div>

            <div className="md:col-span-6 bg-[#0B0E13] p-3 rounded-xl border border-[#1E2633] space-y-1.5 shadow-inner">
              <div className="text-[9px] font-tactical text-zinc-400 font-bold uppercase tracking-wider mb-0.5">
                ENGINE SPECIFICATIONS:
              </div>
              {currentModule.specifications.map((spec, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  onMouseEnter={() => sounds.playHover()}
                  className="flex items-center gap-2 text-xs font-mono text-zinc-200 p-1 rounded hover:bg-[#131922] transition-colors cursor-default"
                >
                  <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="font-body text-xs">{spec}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </BlurReveal>

      {/* Footer Hazard Stripe */}
      <BlurReveal delay={0.28} yOffset={10}>
        <div className="relative z-10 mt-4 pt-3 border-t-2 border-[#12161A] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-16 h-3 bg-[repeating-linear-gradient(45deg,#B81D13,#B81D13_6px,#F5EFEB_6px,#F5EFEB_12px)] border border-[#B81D13]"></div>
            <span className="font-bold">LOW LATENCY PARALLEL TENSOR FLOW</span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">GAURDIA AI // SLIDE 05</span>
        </div>
      </BlurReveal>
    </section>
  );
};
