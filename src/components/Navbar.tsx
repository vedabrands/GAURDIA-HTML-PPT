import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Maximize, Minimize, Layers, PlayCircle, Shield, Sparkles, Navigation } from 'lucide-react';
import { sounds } from './AudioController';

interface NavbarProps {
  currentSlide: number;
  totalSlides: number;
  viewMode: 'scroll' | 'deck';
  setViewMode: (mode: 'scroll' | 'deck') => void;
  onSelectSlide: (slideIndex: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSlide,
  totalSlides,
  viewMode,
  setViewMode,
  onSelectSlide,
}) => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleAudio = () => {
    const newState = sounds.toggleSound();
    setIsSoundOn(newState);
  };

  const toggleFullscreen = () => {
    sounds.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 transition-all duration-300 backdrop-blur-md bg-[#0C0F12]/80 border-b border-[#222933]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Anchor */}
        <div
          onClick={() => {
            sounds.playClick();
            onSelectSlide(0);
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded bg-[#B81D13] flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(184,29,19,0.5)] group-hover:scale-105 transition-transform">
            ★
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-xl sm:text-2xl tracking-wider text-white">GAURDIA</span>
              <span className="font-display text-xl sm:text-2xl tracking-wider text-[#B81D13]">AI</span>
            </div>
            <div className="text-[9px] font-mono text-zinc-400 tracking-widest uppercase -mt-1 hidden sm:block">
              // INTELLIGENT FIRST RESPONDER
            </div>
          </div>
        </div>

        {/* Center: Slide Jump Pills */}
        <div className="hidden md:flex items-center gap-1 bg-[#141920] p-1 rounded-lg border border-[#232B36]">
          {[
            { id: 0, label: '01 VISION' },
            { id: 1, label: '02 ACTION' },
            { id: 2, label: '03 PIPELINE' },
            { id: 3, label: '04 CONTEXT' },
            { id: 4, label: '05 ENGINE' },
            { id: 5, label: '06 ROADMAP' },
            { id: 6, label: '07 MANIFESTO' },
            { id: 7, label: '08 OUTRO' },
          ].map(s => (
            <button
              key={s.id}
              onClick={() => {
                sounds.playClick();
                onSelectSlide(s.id);
              }}
              className={`px-2.5 py-1 rounded text-xs font-tactical font-bold transition-all ${
                currentSlide === s.id
                  ? 'bg-[#B81D13] text-white font-bold shadow-sm scale-105'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-[#141920] p-0.5 rounded-lg border border-[#232B36] text-xs font-tactical">
            <button
              onClick={() => {
                sounds.playClick();
                setViewMode('scroll');
              }}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                viewMode === 'scroll'
                  ? 'bg-[#B81D13] text-white font-bold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Continuous Interactive Scroll Mode"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Story</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setViewMode('deck');
              }}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                viewMode === 'deck'
                  ? 'bg-[#B81D13] text-white font-bold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Slide Deck Mode"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Deck</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-lg border transition-all ${
              isSoundOn
                ? 'bg-red-950/80 border-red-500/80 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                : 'bg-[#141920] border-[#232B36] text-zinc-400 hover:text-white'
            }`}
            title={isSoundOn ? 'Mute Sound FX' : 'Enable Cyber Sound FX'}
          >
            {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-[#141920] border border-[#232B36] text-zinc-400 hover:text-white transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
