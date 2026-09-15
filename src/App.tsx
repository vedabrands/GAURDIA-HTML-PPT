import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { BackgroundParticles } from './components/BackgroundParticles';
import { Navbar } from './components/Navbar';
import { SlideDeckViewer } from './components/SlideDeckViewer';
import { ScrollScrubberHUD } from './components/ScrollScrubberHUD';

// 8 Slide Sections
import { HeroSection } from './components/sections/HeroSection';
import { ActionSection } from './components/sections/ActionSection';
import { IntelligenceSection } from './components/sections/IntelligenceSection';
import { UnderstandingSection } from './components/sections/UnderstandingSection';
import { EngineSection } from './components/sections/EngineSection';
import { EvolutionSection } from './components/sections/EvolutionSection';
import { ManifestoSection } from './components/sections/ManifestoSection';
import { ConclusionSection } from './components/sections/ConclusionSection';

export const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'scroll' | 'deck'>('scroll');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const totalSlides = 8;
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Smooth Scroll with Lenis
  useEffect(() => {
    if (viewMode !== 'scroll') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [viewMode]);

  // Scroll tracking to update active slide pill in Navbar
  useEffect(() => {
    if (viewMode !== 'scroll') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
        const el = sectionRefs.current[i];
        if (el && el.offsetTop <= scrollPosition) {
          setCurrentSlide(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  const handleSelectSlide = (index: number) => {
    setCurrentSlide(index);
    if (viewMode === 'scroll') {
      const el = sectionRefs.current[index];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      handleSelectSlide(currentSlide + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      handleSelectSlide(currentSlide - 1);
    }
  };

  const renderSlideContent = (index: number) => {
    switch (index) {
      case 0:
        return <HeroSection />;
      case 1:
        return <ActionSection />;
      case 2:
        return <IntelligenceSection />;
      case 3:
        return <UnderstandingSection />;
      case 4:
        return <EngineSection />;
      case 5:
        return <EvolutionSection />;
      case 6:
        return <ManifestoSection onRestart={() => handleSelectSlide(0)} />;
      case 7:
        return <ConclusionSection onRestart={() => handleSelectSlide(0)} isActive={currentSlide === 7} isDeck={viewMode === 'deck'} />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0C0F12] text-white selection:bg-[#B81D13] selection:text-white font-sans">
      {/* 3D WebGL Background Particles */}
      <BackgroundParticles />

      {/* Top Fixed Tactical Navbar */}
      <Navbar
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onSelectSlide={handleSelectSlide}
      />

      {/* Real-Time Scroll Scrubber Telemetry HUD */}
      <ScrollScrubberHUD
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onSelectSlide={handleSelectSlide}
        visible={viewMode === 'scroll'}
      />

      {/* Main Presentation Content View */}
      {viewMode === 'scroll' ? (
        // Continuous Interactive Scroll Mode
        <main className="relative z-10 w-full pt-16 max-w-7xl mx-auto px-2 sm:px-4 space-y-8 pb-16">
          <div ref={(el) => (sectionRefs.current[0] = el)} id="slide-0">
            <HeroSection />
          </div>

          <div ref={(el) => (sectionRefs.current[1] = el)} id="slide-1">
            <ActionSection />
          </div>

          <div ref={(el) => (sectionRefs.current[2] = el)} id="slide-2">
            <IntelligenceSection />
          </div>

          <div ref={(el) => (sectionRefs.current[3] = el)} id="slide-3">
            <UnderstandingSection />
          </div>

          <div ref={(el) => (sectionRefs.current[4] = el)} id="slide-4">
            <EngineSection />
          </div>

          <div ref={(el) => (sectionRefs.current[5] = el)} id="slide-5">
            <EvolutionSection />
          </div>

          <div ref={(el) => (sectionRefs.current[6] = el)} id="slide-6">
            <ManifestoSection onRestart={() => handleSelectSlide(0)} />
          </div>

          <div ref={(el) => (sectionRefs.current[7] = el)} id="slide-7">
            <ConclusionSection onRestart={() => handleSelectSlide(0)} isActive={currentSlide === 7} isDeck={viewMode === 'deck'} />
          </div>
        </main>
      ) : (
        // Slide-by-Slide Deck Mode
        <SlideDeckViewer
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onNext={handleNextSlide}
          onPrev={handlePrevSlide}
          onSelectSlide={handleSelectSlide}
          onToggleViewMode={() => setViewMode('scroll')}
        >
          {renderSlideContent(currentSlide)}
        </SlideDeckViewer>
      )}
    </div>
  );
};
export default App;
