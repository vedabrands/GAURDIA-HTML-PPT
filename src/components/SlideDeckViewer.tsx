import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Layers, PlayCircle, Maximize2, Sparkles, Volume2, VolumeX } from 'lucide-react';
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
  // Keyboard Navigation Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault();
        sounds.playClick();
        onNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'Backspace') {
        e.preventDefault();
        sounds.playClick();
        onPrev();
      } else if (e.key.toLowerCase() === 'm') {
        sounds.playClick();
        onToggleViewMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onToggleViewMode]);

  return (
    <div className="relative w-full min-h-screen bg-[#0C0F12] pt-16 pb-20 overflow-hidden flex flex-col justify-center">
      {/* Slide Transition Frame */}
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full shadow-2xl rounded-2xl overflow-hidden border-2 border-[#232B36]"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Deck Control Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#141920]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#232B36] shadow-2xl flex items-center gap-3 sm:gap-6 text-xs font-mono">
        {/* Prev Slide Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onPrev();
          }}
          disabled={currentSlide === 0}
          className={`p-2 rounded-xl transition-all flex items-center gap-1 ${
            currentSlide === 0
              ? 'opacity-30 cursor-not-allowed text-zinc-600'
              : 'bg-[#B81D13] text-white hover:bg-red-600 hover:scale-105 shadow-md'
          }`}
          title="Previous Slide (Left Arrow)"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">PREV</span>
        </button>

        {/* Slide Counter & Indicators */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                sounds.playClick();
                onSelectSlide(i);
              }}
              className={`h-2 rounded-full transition-all ${
                currentSlide === i
                  ? 'w-7 bg-[#B81D13] shadow-[0_0_10px_rgba(184,29,19,0.5)]'
                  : 'w-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
              title={`Slide ${i + 1}`}
            />
          ))}
          <span className="text-zinc-400 font-bold ml-2">
            {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
        </div>

        {/* Next Slide Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onNext();
          }}
          disabled={currentSlide === totalSlides - 1}
          className={`p-2 rounded-xl transition-all flex items-center gap-1 ${
            currentSlide === totalSlides - 1
              ? 'opacity-30 cursor-not-allowed text-zinc-600'
              : 'bg-[#B81D13] text-white hover:bg-red-600 hover:scale-105 shadow-md'
          }`}
          title="Next Slide (Right Arrow or Space)"
        >
          <span className="hidden sm:inline">NEXT</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Keyboard hint */}
        <div className="hidden md:flex items-center gap-1 text-[10px] text-zinc-500 border-l border-[#2B3542] pl-3">
          <span>KEYBOARD: [←] [→] [SPACE]</span>
        </div>
      </div>
    </div>
  );
};
