import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize, Sparkles, Shield, ArrowUpRight, MessageSquare, Terminal, Award } from 'lucide-react';
import { sounds } from '../AudioController';
import { BlurReveal } from '../BlurReveal';

export const ConclusionSection: React.FC<{ onRestart?: () => void }> = ({ onRestart }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    sounds.playClick();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    sounds.playClick();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleRestartVideo = () => {
    sounds.playClick();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleFullscreen = () => {
    sounds.playClick();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen().catch(() => {});
    }
  };

  const actionCards = [
    {
      id: 'qa',
      tag: '// INQUIRIES',
      title: 'Q&A FORUM OPEN',
      desc: 'Floor is open for jury cross-examination, model benchmarks, and deployment feasibility.',
      badge: 'LIVE DIALOGUE',
      icon: MessageSquare,
      detail: 'Model weights, latency graphs & pipeline demo available on demand.',
    },
    {
      id: 'repo',
      tag: '// CODEBASE',
      title: 'OPEN ARTIFACTS',
      desc: 'Full TensorRT inference engine, ByteTrack pipelines, and HUD UI open for inspection.',
      badge: 'GITHUB // READY',
      icon: Terminal,
      detail: 'github.com/vedabrands/GAURDIA-HTML-PPT',
    },
    {
      id: 'team',
      tag: '// BRAINBYTES',
      title: 'DEV, ROHIT, MANISH, ZIYAULLAH',
      desc: 'Four specialized vectors united into one autonomous computer vision guardian.',
      badge: 'MISSION READY',
      icon: Award,
      detail: 'Vision Anchor, Byte Smith, Pixel Architect, Insight Alchemist.',
    },
  ];

  return (
    <section className="relative w-full bg-[#F5EFEB] text-[#12161A] p-4 sm:p-6 lg:p-7 flex flex-col justify-between overflow-hidden border-b-4 border-[#B81D13] shadow-2xl rounded-2xl">
      {/* Texture & Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-35 bg-[radial-gradient(#12161A_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Top Header */}
      <div className="relative z-10 space-y-2">
        <BlurReveal delay={0.05} yOffset={10}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-tactical font-bold tracking-widest text-[#B81D13] uppercase">
              <span className="w-2.5 h-2.5 bg-[#B81D13] rounded-sm"></span>
              SECTION 08 // TRANSMISSION TERMINUS &amp; OUTRO
            </div>

            <span className="text-xs font-tactical bg-[#EDE3D8] hover:bg-[#B81D13] hover:text-white transition-colors px-3 py-0.5 rounded-full border border-[#12161A]/15 font-bold cursor-default">
              FINAL TRANSMISSION // 2026
            </span>
          </div>
        </BlurReveal>

        <BlurReveal delay={0.12} yOffset={15}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3">
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-[#12161A] leading-none uppercase">
              THAT'S THE END OF <span className="text-[#B81D13]">OUR PRESENTATION</span>
            </h2>

            {onRestart && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  sounds.playClick();
                  onRestart();
                }}
                className="px-4 py-2 rounded-xl bg-[#B81D13] hover:bg-red-600 text-white font-tactical text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer self-start lg:self-end shrink-0"
              >
                <span>▲ RESTART FROM SLIDE 01</span>
              </motion.button>
            )}
          </div>
        </BlurReveal>

        <BlurReveal delay={0.18} yOffset={10}>
          <p className="text-sm sm:text-base font-body text-[#2B303A] max-w-4xl leading-relaxed">
            Thank you for your attention. <strong className="text-[#B81D13]">GAURDIA AI</strong> is built with conviction by <strong className="text-[#12161A]">Team BrainBytes</strong> — transforming passive recording into autonomous life-saving action.
          </p>
        </BlurReveal>
      </div>

      {/* Main Dual Grid: Outro Video (Left 7 Cols) + Interactive Action Matrix (Right 5 Cols) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 my-3 items-stretch">
        {/* Left 7 Cols: Video Showcase Player */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <BlurReveal delay={0.2} yOffset={20}>
            <div className="flex items-center justify-between font-mono text-xs text-[#12161A] mb-1.5">
              <span className="font-bold flex items-center gap-1.5 font-tactical text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#B81D13] animate-ping" />
                OUTRO VIDEO PLAYBACK // HAMSTER SENTINEL
              </span>
              <span className="text-[#B81D13] font-bold font-tactical text-[11px]">
                {isPlaying ? '▶ BROADCASTING' : '⏸ PAUSED'}
              </span>
            </div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative bg-[#0C0F14] rounded-2xl overflow-hidden border-2 border-[#12161A]/20 hover:border-[#B81D13] shadow-2xl transition-all duration-300 group"
            >
              {/* Scanline CRT Texture Overlay */}
              <div className="absolute inset-0 pointer-events-none z-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)] opacity-60"></div>

              {/* Top HUD Bar */}
              <div className="absolute top-0 left-0 right-0 z-20 p-3 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white font-mono text-[10px]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#B81D13]"></div>
                  <span className="font-bold tracking-wider font-tactical text-[11px]">TERMINUS FEED // CAM-FINAL</span>
                </div>
                <div className="px-2 py-0.5 rounded bg-black/60 border border-white/20 text-emerald-400 font-bold">
                  24 FPS // SYNCED
                </div>
              </div>

              {/* Video Element */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  src="/hamster-presentation-end.mp4"
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={togglePlay}
                />

                {/* Big Center Play/Pause button on hover/pause */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 m-auto z-20 w-16 h-16 rounded-full bg-[#B81D13]/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(184,29,19,0.8)] hover:scale-110 transition-transform cursor-pointer border-2 border-white"
                  >
                    <Play className="w-7 h-7 ml-1" />
                  </button>
                )}
              </div>

              {/* Bottom Interactive Video Controller HUD */}
              <div className="relative z-20 bg-[#12161E] p-3 border-t border-[#232B38] flex items-center justify-between text-white font-mono text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-lg bg-[#1B222E] hover:bg-[#B81D13] text-white transition-colors cursor-pointer"
                    title={isPlaying ? 'Pause Video' : 'Play Video'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={handleRestartVideo}
                    className="p-1.5 rounded-lg bg-[#1B222E] hover:bg-zinc-700 text-white transition-colors cursor-pointer"
                    title="Replay from Beginning"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={toggleMute}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isMuted ? 'bg-red-950 text-red-400 border border-red-500/50' : 'bg-[#1B222E] hover:bg-zinc-700 text-white'
                    }`}
                    title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <div className="text-[11px] font-tactical font-bold text-zinc-400">
                  CLICK VIDEO TO TOGGLE PLAYBACK
                </div>

                <button
                  onClick={handleFullscreen}
                  className="p-1.5 rounded-lg bg-[#1B222E] hover:bg-zinc-700 text-white transition-colors cursor-pointer"
                  title="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </BlurReveal>
        </div>

        {/* Right 5 Cols: 3 Sibling Interactive Highlight Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-2.5">
          {actionCards.map((card, idx) => {
            const Icon = card.icon;
            const isHovered = hoveredCardIdx === idx;
            const isDull = hoveredCardIdx !== null && !isHovered;

            return (
              <BlurReveal key={card.id} delay={0.12 + idx * 0.06} yOffset={15}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  onMouseEnter={() => {
                    sounds.playHover();
                    setHoveredCardIdx(idx);
                  }}
                  onMouseLeave={() => setHoveredCardIdx(null)}
                  className={`p-3.5 sm:p-4 rounded-xl border-2 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? 'bg-[#B81D13] text-white border-white/60 shadow-[0_20px_40px_-10px_rgba(184,29,19,0.55)]'
                      : isDull
                      ? 'bg-white/60 text-[#12161A] border-[#12161A]/10 opacity-40 scale-[0.98] blur-[0.2px]'
                      : 'bg-white hover:bg-[#B81D13] text-[#12161A] border-[#12161A]/15 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                            isHovered ? 'bg-white text-[#B81D13] scale-110' : 'bg-[#B81D13] text-white'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-[9px] font-tactical font-bold uppercase tracking-wider ${
                            isHovered ? 'text-white/80' : 'text-[#B81D13]'
                          }`}
                        >
                          {card.tag}
                        </span>
                      </div>

                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          isHovered ? 'bg-black/30 text-white' : 'bg-black/10 text-[#12161A]'
                        }`}
                      >
                        {card.badge}
                      </span>
                    </div>

                    <h3
                      className={`font-display text-lg sm:text-xl uppercase tracking-wide leading-tight mb-1 ${
                        isHovered ? 'text-white' : 'text-[#12161A]'
                      }`}
                    >
                      {card.title}
                    </h3>

                    <p
                      className={`text-xs font-body leading-snug mb-2 ${
                        isHovered ? 'text-white/90' : 'text-[#4A5568]'
                      }`}
                    >
                      {card.desc}
                    </p>
                  </div>

                  <div
                    className={`pt-2 border-t text-[10px] font-mono transition-colors ${
                      isHovered ? 'border-white/20 text-white font-semibold' : 'border-[#12161A]/10 text-zinc-600'
                    }`}
                  >
                    {card.detail}
                  </div>
                </motion.div>
              </BlurReveal>
            );
          })}
        </div>
      </div>

      {/* Bottom Hazard Stripe Footer */}
      <BlurReveal delay={0.28} yOffset={10}>
        <div className="relative z-10 mt-4 pt-3 border-t-2 border-[#12161A] flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-16 h-3 bg-[repeating-linear-gradient(45deg,#B81D13,#B81D13_6px,#F5EFEB_6px,#F5EFEB_12px)] border border-[#B81D13]"></div>
            <span className="font-bold text-[#12161A]">GAURDIA AI // END OF TRANSMISSION // 2026</span>
          </div>

          <div className="text-center text-xs font-bold text-[#B81D13]">
            ★ ★ ★
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-600 hidden sm:inline">DON'T JUST RECORD. REPORT IT.</span>
            <div className="w-16 h-3 bg-[repeating-linear-gradient(45deg,#B81D13,#B81D13_6px,#F5EFEB_6px,#F5EFEB_12px)] border border-[#B81D13]"></div>
          </div>
        </div>
      </BlurReveal>
    </section>
  );
};
export default ConclusionSection;
