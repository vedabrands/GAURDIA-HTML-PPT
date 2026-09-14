import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  Compass
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
      sounds.playClick();
      onSelectSlide(targetIndex);
    },
    [currentSlide, totalSlides, onSelectSlide]
  );

  const handleNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      sounds.playClick();
      onNext();
    }
  }, [currentSlide, totalSlides, onNext]);

  const handlePrev = useCallback(() => {
    if (currentSlide > 0) {
      sounds.playClick();
      onPrev();
    }
  }, [currentSlide, onPrev]);

  // Keyboard Navigation Listener (Left/Right, Space, 1-7, M)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
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

  const currentInfo = slideTitles[currentSlide] || slideTitles[0];

  return (
    <div className="relative w-full min-h-screen bg-[#0C0F12] pt-14 pb-20 overflow-x-hidden flex flex-col justify-between select-none">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#21262D_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Main Slide Transition Stage */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-4 flex-1 flex items-center justify-center my-auto py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.01, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full shadow-2xl rounded-2xl overflow-hidden border-2 border-[#232B36]"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Bottom Mission-Control Scrubber HUD */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-5xl bg-[#0F131A]/95 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-[#232B38] shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-2">
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
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentSlide === 0
                  ? 'opacity-25 cursor-not-allowed text-zinc-600 border border-zinc-800'
                  : 'bg-[#151B24] text-white hover:bg-[#B81D13] border border-[#2B3542] hover:border-[#B81D13] shadow-md hover:scale-105 active:scale-95'
              }`}
              title="Previous Slide (Left Arrow / Backspace)"
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

          {/* Center: Navigation Shortcut Guide */}
          <div className="hidden md:flex items-center gap-2 text-[10px] text-zinc-400 bg-[#12161E] px-3 py-1 rounded-full border border-[#202733]">
            <Compass className="w-3.5 h-3.5 text-[#B81D13]" />
            <span>PRESS SPACE OR ARROW KEYS (← / →) TO NAVIGATE</span>
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
              onClick={handleNext}
              disabled={currentSlide === totalSlides - 1}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentSlide === totalSlides - 1
                  ? 'opacity-25 cursor-not-allowed text-zinc-600 border border-zinc-800'
                  : 'bg-[#B81D13] text-white hover:bg-red-600 border border-red-500/50 shadow-[0_0_15px_rgba(184,29,19,0.5)] hover:scale-105 active:scale-95'
              }`}
              title="Next Slide (Right Arrow / Space)"
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
