import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Compass,
  Activity,
  Layers,
  Zap,
  Radio,
  Maximize2,
  Scan,
  Shield,
  Gauge
} from 'lucide-react';
import { sounds } from './AudioController';

interface SlideDeckViewerProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onSelectSlide: (index: number) => void;
  onToggleViewMode: () => void;
  children: React.ReactNode;
}

export const SlideDeckViewer: React.FC<SlideDeckViewerProps> = ({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onSelectSlide,
  onToggleViewMode,
  children,
}) => {
  // Direction tracking for 3D spatial flip
  const [direction, setDirection] = useState<number>(1);
  const [transitionFx, setTransitionFx] = useState<'3d-warp' | 'holo-flip' | 'kinetic-shutter'>('3d-warp');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Wheel / Gesture Scroll Scrub Accumulator State
  const [wheelCharge, setWheelCharge] = useState<number>(0);
  const [scrubDirection, setScrubDirection] = useState<'IDLE' | 'NEXT' | 'PREV'>('IDLE');
  const wheelAccumulator = useRef<number>(0);
  const isCooldown = useRef<boolean>(false);
  const scrubTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastSlideRef = useRef<number>(currentSlide);

  const slideTitles = [
    { id: 0, title: 'SENTINEL VISION', code: 'PROT-01', tag: 'HERO // COLD REALITY' },
    { id: 1, title: 'DEATH OF LATENCY', code: 'ACT-02', tag: 'REAL-TIME TRIAGE' },
    { id: 2, title: 'TRI-TIER PIPELINE', code: 'PIPE-03', tag: 'EDGE TO LLM' },
    { id: 3, title: 'INTENT NOT MOTION', code: 'CTX-04', tag: 'SPATIO-TEMPORAL' },
    { id: 4, title: 'INFERENCE ENGINE', code: 'ENG-05', tag: 'ZERO RE-ID CLOUD' },
    { id: 5, title: 'MUNICIPAL MESH', code: 'MESH-06', tag: 'MULTI-CAMERA GRID' },
    { id: 6, title: 'MANIFESTO & SPECS', code: 'INV-07', tag: 'FIRST PRINCIPLES' },
  ];

  // Helper for directed navigation
  const navigateTo = useCallback(
    (targetIndex: number) => {
      if (targetIndex === currentSlide || targetIndex < 0 || targetIndex >= totalSlides) return;
      const dir = targetIndex > currentSlide ? 1 : -1;
      setDirection(dir);
      sounds.playWarp();
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 700);
      onSelectSlide(targetIndex);
    },
    [currentSlide, totalSlides, onSelectSlide]
  );

  const handleNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      navigateTo(currentSlide + 1);
    }
  }, [currentSlide, totalSlides, navigateTo]);

  const handlePrev = useCallback(() => {
    if (currentSlide > 0) {
      navigateTo(currentSlide - 1);
    }
  }, [currentSlide, navigateTo]);

  // Keep track of slide changes for direction
  useEffect(() => {
    if (currentSlide !== lastSlideRef.current) {
      setDirection(currentSlide > lastSlideRef.current ? 1 : -1);
      lastSlideRef.current = currentSlide;
    }
  }, [currentSlide]);

  // Scroll Scrub Gesture Engine (Wheel & Trackpad Detection)
  useEffect(() => {
    const WHEEL_THRESHOLD = 140; // Accumulated delta needed to switch slide
    const COOLDOWN_MS = 650; // Prevention of accidental rapid-fire skips

    const handleWheel = (e: WheelEvent) => {
      // Don't intercept if scrolling inside a nested scrollable element with scroll height
      const target = e.target as HTMLElement;
      if (target && target.closest('.no-deck-scrub')) return;

      // Vertical or horizontal trackpad scroll delta
      const rawDelta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(rawDelta) < 6) return; // ignore micro jitter

      if (isCooldown.current) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      wheelAccumulator.current += rawDelta;

      // Calculate fill progress [0, 100]
      const currentDelta = wheelAccumulator.current;
      const progress = Math.min(Math.abs(currentDelta) / WHEEL_THRESHOLD, 1);
      setWheelCharge(progress * 100);
      setScrubDirection(currentDelta > 0 ? 'NEXT' : 'PREV');

      // Audio micro-tick feedback as scrub charges
      if (Math.random() > 0.6) {
        sounds.playScrubTick(progress);
      }

      // Clear existing decay timeout
      if (scrubTimeout.current) clearTimeout(scrubTimeout.current);

      // Check if threshold exceeded
      if (wheelAccumulator.current >= WHEEL_THRESHOLD) {
        // Scrub Forward
        if (currentSlide < totalSlides - 1) {
          isCooldown.current = true;
          handleNext();
          setWheelCharge(100);
          setTimeout(() => {
            wheelAccumulator.current = 0;
            setWheelCharge(0);
            setScrubDirection('IDLE');
            isCooldown.current = false;
          }, COOLDOWN_MS);
        } else {
          wheelAccumulator.current = WHEEL_THRESHOLD;
        }
      } else if (wheelAccumulator.current <= -WHEEL_THRESHOLD) {
        // Scrub Backward
        if (currentSlide > 0) {
          isCooldown.current = true;
          handlePrev();
          setWheelCharge(100);
          setTimeout(() => {
            wheelAccumulator.current = 0;
            setWheelCharge(0);
            setScrubDirection('IDLE');
            isCooldown.current = false;
          }, COOLDOWN_MS);
        } else {
          wheelAccumulator.current = -WHEEL_THRESHOLD;
        }
      } else {
        // Gradually decay charge if user stops scrolling
        scrubTimeout.current = setTimeout(() => {
          wheelAccumulator.current = 0;
          setWheelCharge(0);
          setScrubDirection('IDLE');
        }, 300);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrubTimeout.current) clearTimeout(scrubTimeout.current);
    };
  }, [currentSlide, totalSlides, handleNext, handlePrev]);

  // Keyboard Navigation Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'Backspace') {
        e.preventDefault();
        handlePrev();
      } else if (e.key.toLowerCase() === 'm') {
        sounds.playClick();
        onToggleViewMode();
      } else if (e.key >= '1' && e.key <= '7') {
        const slideIdx = parseInt(e.key, 10) - 1;
        if (slideIdx < totalSlides) {
          navigateTo(slideIdx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onToggleViewMode, navigateTo, totalSlides]);

  // 3D Motion Variants Matrix
  const getVariants = () => {
    switch (transitionFx) {
      case '3d-warp':
        return {
          enter: (dir: number) => ({
            x: dir > 0 ? '65%' : '-65%',
            rotateY: dir > 0 ? 42 : -42,
            rotateX: dir > 0 ? 5 : -5,
            z: -420,
            scale: 0.8,
            opacity: 0,
            filter: 'blur(10px) brightness(1.7) contrast(1.2)',
          }),
          center: {
            x: 0,
            rotateY: 0,
            rotateX: 0,
            z: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px) brightness(1) contrast(1)',
            transition: {
              duration: 0.72,
              ease: [0.16, 1, 0.3, 1],
            },
          },
          exit: (dir: number) => ({
            x: dir > 0 ? '-65%' : '65%',
            rotateY: dir > 0 ? -42 : 42,
            rotateX: dir > 0 ? -5 : 5,
            z: -420,
            scale: 0.8,
            opacity: 0,
            filter: 'blur(10px) brightness(0.4) contrast(1.2)',
            transition: {
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            },
          }),
        };

      case 'holo-flip':
        return {
          enter: (dir: number) => ({
            y: dir > 0 ? '60%' : '-60%',
            rotateX: dir > 0 ? -50 : 50,
            scale: 0.85,
            opacity: 0,
            filter: 'blur(12px)',
          }),
          center: {
            y: 0,
            rotateX: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1] },
          },
          exit: (dir: number) => ({
            y: dir > 0 ? '-60%' : '60%',
            rotateX: dir > 0 ? 50 : -50,
            scale: 0.85,
            opacity: 0,
            filter: 'blur(12px)',
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }),
        };

      case 'kinetic-shutter':
      default:
        return {
          enter: (dir: number) => ({
            x: dir > 0 ? '100%' : '-100%',
            scale: 0.9,
            opacity: 0,
            skewX: dir > 0 ? -6 : 6,
          }),
          center: {
            x: 0,
            scale: 1,
            opacity: 1,
            skewX: 0,
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          },
          exit: (dir: number) => ({
            x: dir > 0 ? '-100%' : '100%',
            scale: 0.9,
            opacity: 0,
            skewX: dir > 0 ? 6 : -6,
            transition: { duration: 0.58, ease: [0.16, 1, 0.3, 1] },
          }),
        };
    }
  };

  const currentInfo = slideTitles[currentSlide] || slideTitles[0];

  return (
    <div className="relative w-full min-h-screen bg-[#0A0D10] text-[#EDE3D8] pt-16 pb-28 overflow-hidden flex flex-col justify-between select-none">
      {/* 3D Depth Viewport Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#B81D13_1px,transparent_1px),linear-gradient(to_bottom,#B81D13_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Top Tactical Telemetry HUD */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 py-2 flex items-center justify-between font-mono text-xs text-zinc-400 border-b border-[#1E2631]/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#12161E] border border-[#232B38] text-white">
            <Shield className="w-3.5 h-3.5 text-[#B81D13]" />
            <span className="font-bold tracking-wider font-tactical">SLIDE DECK 3D HUD</span>
          </div>
          <span className="hidden sm:inline text-zinc-500 font-tactical">{currentInfo.tag}</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-[11px]">
          {/* Transition FX Switcher */}
          <div className="flex items-center gap-1 bg-[#12161E] p-1 rounded-lg border border-[#232B38]">
            {(['3d-warp', 'holo-flip', 'kinetic-shutter'] as const).map((fx) => (
              <button
                key={fx}
                onClick={() => {
                  sounds.playClick();
                  setTransitionFx(fx);
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                  transitionFx === fx
                    ? 'bg-[#B81D13] text-white shadow-sm'
                    : 'text-zinc-500 hover:text-white'
                }`}
                title={`Switch transition mode to ${fx}`}
              >
                {fx.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-1 text-[#B81D13] font-bold">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>KINETIC ENGINE ONLINE</span>
          </div>
        </div>
      </div>

      {/* Main 3D Perspective Stage */}
      <div
        className="relative w-full max-w-7xl mx-auto px-2 sm:px-4 flex-1 flex items-center justify-center my-auto py-2"
        style={{
          perspective: '1500px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* Flash Scanline Glitch Aperture Overlay during transitions */}
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0.9, scaleY: 1 }}
            animate={{ opacity: 0, scaleY: 0.05 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="absolute inset-x-0 h-full z-40 pointer-events-none bg-gradient-to-r from-transparent via-[#B81D13]/40 to-transparent flex items-center justify-center"
          >
            <div className="w-full h-1 bg-white shadow-[0_0_20px_#B81D13]" />
          </motion.div>
        )}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={getVariants()}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
            className="w-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] rounded-2xl overflow-hidden border-2 border-[#263140] will-change-transform"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Tactical Wheel Scroll Charge Ring & Indicator (Visible on Scrub) */}
      <AnimatePresence>
        {wheelCharge > 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            className="fixed top-24 right-6 z-50 bg-[#0E1218]/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#B81D13] shadow-[0_0_30px_rgba(184,29,19,0.4)] flex items-center gap-3 font-mono"
          >
            {/* Circular Gauge */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-zinc-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#B81D13] transition-all duration-75"
                  strokeDasharray={`${wheelCharge}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <Gauge className="w-4 h-4 text-white absolute" />
            </div>

            <div>
              <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
                SCROLL SCRUB ACCUMULATOR
              </div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="text-[#B81D13] font-mono">{scrubDirection}</span>
                <span>// {Math.round(wheelCharge)}% CHARGE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Mission-Control Scrubber HUD */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-5xl bg-[#0F131A]/95 backdrop-blur-xl px-4 py-3 rounded-2xl border border-[#232B38] shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-2.5">
        {/* Interactive Milestone Timeline Scrubber */}
        <div className="relative w-full flex items-center justify-between gap-1 sm:gap-2">
          {slideTitles.map((slide, idx) => {
            const isActive = currentSlide === idx;
            const isPast = currentSlide > idx;

            return (
              <div key={slide.id} className="flex-1 flex flex-col items-center gap-1 group">
                <button
                  onClick={() => {
                    sounds.playClick();
                    navigateTo(idx);
                  }}
                  onMouseEnter={() => sounds.playHover()}
                  className="w-full relative py-1 focus:outline-none cursor-pointer"
                  title={`Jump to Slide ${idx + 1}: ${slide.title}`}
                >
                  {/* Scrubber Segment Rail */}
                  <div
                    className={`h-1.5 w-full rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-[#B81D13] shadow-[0_0_12px_rgba(184,29,19,0.8)] h-2'
                        : isPast
                        ? 'bg-zinc-600 hover:bg-zinc-400'
                        : 'bg-zinc-800 hover:bg-zinc-600'
                    }`}
                  />

                  {/* Active Pin Dot */}
                  {isActive && (
                    <motion.div
                      layoutId="activeScrubPin"
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#B81D13] shadow-[0_0_10px_#B81D13]"
                    />
                  )}
                </button>

                {/* Chapter Label (Responsive) */}
                <span
                  className={`text-[9px] font-mono font-bold tracking-tight uppercase truncate transition-colors hidden md:block max-w-[100px] text-center ${
                    isActive ? 'text-[#B81D13]' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                >
                  {slide.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Primary Controls Row */}
        <div className="flex items-center justify-between pt-1 border-t border-[#1C232E] font-mono text-xs">
          {/* Left: Prev Slide Button & Current Slide Spec */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                handlePrev();
              }}
              disabled={currentSlide === 0}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentSlide === 0
                  ? 'opacity-25 cursor-not-allowed text-zinc-600 border border-zinc-800'
                  : 'bg-[#151B24] text-white hover:bg-[#B81D13] border border-[#2B3542] hover:border-[#B81D13] shadow-md hover:scale-105 active:scale-95'
              }`}
              title="Previous Slide (Left Arrow / Scroll Up)"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">PREV</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="font-display text-lg text-white tracking-wider">
                {String(currentSlide + 1).padStart(2, '0')}
              </span>
              <span className="text-zinc-600 font-bold">/</span>
              <span className="text-zinc-500 font-bold">
                {String(totalSlides).padStart(2, '0')}
              </span>
              <span className="hidden lg:inline text-xs font-tactical text-zinc-400 font-semibold px-2 py-0.5 rounded bg-[#141820] border border-[#232B36]">
                {currentInfo.title}
              </span>
            </div>
          </div>

          {/* Center: Scroll Scrub Hint */}
          <div className="hidden md:flex items-center gap-2 text-[10px] text-zinc-400 bg-[#12161E] px-3 py-1 rounded-full border border-[#202733]">
            <Compass className="w-3.5 h-3.5 text-[#B81D13] animate-spin" style={{ animationDuration: '8s' }} />
            <span>SCROLL WHEEL / TRACKPAD SCRUBS SLIDES</span>
          </div>

          {/* Right: Next Slide Button & Switch Mode */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                onToggleViewMode();
              }}
              className="px-2.5 py-1.5 rounded-xl bg-[#151B24] hover:bg-zinc-800 text-zinc-300 hover:text-white border border-[#2B3542] transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              title="Switch to Continuous Scroll Mode (Press M)"
            >
              <Layers className="w-3.5 h-3.5 text-[#B81D13]" />
              <span className="hidden sm:inline">CONTINUOUS MODE</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                handleNext();
              }}
              disabled={currentSlide === totalSlides - 1}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentSlide === totalSlides - 1
                  ? 'opacity-25 cursor-not-allowed text-zinc-600 border border-zinc-800'
                  : 'bg-[#B81D13] text-white hover:bg-red-600 border border-red-500/50 shadow-[0_0_15px_rgba(184,29,19,0.5)] hover:scale-105 active:scale-95'
              }`}
              title="Next Slide (Right Arrow / Space / Scroll Down)"
            >
              <span className="hidden sm:inline">NEXT</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SlideDeckViewer;
