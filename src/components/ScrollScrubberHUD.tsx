import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Compass, ChevronUp, Navigation, Radio, Activity, Target, Shield } from 'lucide-react';
import { sounds } from './AudioController';

interface ScrollScrubberHUDProps {
  currentSlide: number;
  totalSlides: number;
  onSelectSlide: (index: number) => void;
  visible: boolean;
}

export const ScrollScrubberHUD: React.FC<ScrollScrubberHUDProps> = ({
  currentSlide,
  totalSlides,
  onSelectSlide,
  visible,
}) => {
  const { scrollYProgress, scrollY } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 220, damping: 28 });

  // Transforms
  const scrollPercent = useTransform(smoothProgress, [0, 1], [0, 100]);
  const compassRotation = useTransform(smoothProgress, [0, 1], [0, 360]);
  const laserTopWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const laserPulseX = useTransform(smoothProgress, [0, 1], ['0%', '99%']);
  const laserRailHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // Dynamic percentage display state
  const [percentDisplay, setPercentDisplay] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'IDLE' | 'DOWN' | 'UP'>('IDLE');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = scrollPercent.on('change', (val) => {
      setPercentDisplay(Math.round(val));
    });
    return () => unsubscribe();
  }, [scrollPercent]);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (current) => {
      if (current > lastScrollY + 2) {
        setScrollDirection('DOWN');
      } else if (current < lastScrollY - 2) {
        setScrollDirection('UP');
      }
      setLastScrollY(current);
    });
    return () => unsubscribe();
  }, [scrollY, lastScrollY]);

  if (!visible) return null;

  const sections = [
    { id: 0, label: '01', name: 'VISION', badge: 'PROT' },
    { id: 1, label: '02', name: 'ACTION', badge: 'ACT' },
    { id: 2, label: '03', name: 'PIPELINE', badge: 'PIPE' },
    { id: 3, label: '04', name: 'CONTEXT', badge: 'CTX' },
    { id: 4, label: '05', name: 'ENGINE', badge: 'ENG' },
    { id: 5, label: '06', name: 'ROADMAP', badge: 'MESH' },
    { id: 6, label: '07', name: 'MANIFESTO', badge: 'INV' },
  ];

  return (
    <>
      {/* Top Hairline Scroll Progress Bar (Below Navbar) */}
      <div className="fixed top-[57px] left-0 right-0 z-40 h-[3px] bg-[#12161A]/40 overflow-hidden pointer-events-none">
        <motion.div
          style={{ width: laserTopWidth }}
          className="h-full bg-gradient-to-r from-[#B81D13] via-amber-500 to-[#B81D13] relative"
        >
          <motion.div
            style={{ left: laserPulseX }}
            className="absolute top-0 w-8 h-full bg-white blur-[2px] opacity-90"
          />
        </motion.div>
      </div>

      {/* Floating Tactical Telemetry Scrubber Rail (Right Side) */}
      <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 select-none pointer-events-auto">
        {/* Compass & Dial HUD */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="relative bg-[#0C0F12]/90 backdrop-blur-md p-2.5 rounded-xl border border-[#232B36] shadow-2xl flex flex-col items-center gap-1 cursor-default text-[#EDE3D8]"
        >
          <div className="flex items-center justify-between w-full text-[9px] font-mono font-bold text-zinc-400">
            <span>SCRUB</span>
            <span className="text-[#B81D13]">{percentDisplay}%</span>
          </div>

          {/* Rotating Gyro Compass */}
          <div className="relative w-10 h-10 flex items-center justify-center my-0.5">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-[#2A3442] [border-style:dashed]"></div>
            {/* Cardinal marks */}
            <div className="absolute -top-0.5 text-[7px] font-mono text-zinc-500 font-bold">N</div>
            <div className="absolute -bottom-0.5 text-[7px] font-mono text-zinc-500 font-bold">S</div>
            <div className="absolute -left-0.5 text-[7px] font-mono text-zinc-500 font-bold">W</div>
            <div className="absolute -right-0.5 text-[7px] font-mono text-zinc-500 font-bold">E</div>

            {/* Rotating needle */}
            <motion.div
              style={{ rotate: compassRotation }}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="w-0.5 h-7 bg-gradient-to-t from-zinc-600 via-white to-[#B81D13] relative rounded-full shadow-[0_0_8px_rgba(184,29,19,0.8)]">
                <div className="absolute -top-1 -left-0.5 w-1.5 h-1.5 bg-[#B81D13] rounded-full"></div>
              </div>
            </motion.div>
          </div>

          <div className="text-[8px] font-mono text-zinc-500 text-center uppercase tracking-wider">
            {scrollDirection}
          </div>
        </motion.div>

        {/* Section Node Rail */}
        <div className="relative bg-[#0C0F12]/90 backdrop-blur-md py-3 px-2 rounded-xl border border-[#232B36] shadow-2xl flex flex-col items-center gap-2.5">
          {/* Vertical Laser Fill Line */}
          <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-0.5 bg-[#232B36] rounded-full overflow-hidden">
            <motion.div
              style={{ height: laserRailHeight }}
              className="w-full bg-gradient-to-b from-[#B81D13] via-amber-500 to-[#B81D13]"
            />
          </div>

          {/* Section Nodes */}
          {sections.map((sec, idx) => {
            const isActive = currentSlide === idx;
            const isHovered = hoveredNode === idx;

            return (
              <motion.button
                key={sec.id}
                whileHover={{ scale: 1.15, x: -4 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => {
                  sounds.playHover();
                  setHoveredNode(idx);
                }}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => {
                  sounds.playClick();
                  onSelectSlide(sec.id);
                }}
                className={`relative z-10 w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#B81D13] text-white shadow-[0_0_12px_rgba(184,29,19,0.7)] scale-110 border border-white/50'
                    : isHovered
                    ? 'bg-white text-[#B81D13] shadow-md border border-white'
                    : 'bg-[#141920] text-zinc-400 hover:text-white border border-[#232B36]'
                }`}
                title={`Jump to Section ${sec.label}: ${sec.name}`}
              >
                {sec.label}

                {/* Tooltip on Hover */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute right-9 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-[#10141A] border border-[#2A3442] text-white text-[10px] font-mono font-bold tracking-wider uppercase whitespace-nowrap shadow-xl flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B81D13]"></span>
                    {sec.name}
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Quick Back to Top Trigger */}
        <motion.button
          whileHover={{ scale: 1.12, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => sounds.playHover()}
          onClick={() => {
            sounds.playClick();
            onSelectSlide(0);
          }}
          className="p-2 rounded-xl bg-[#141920] hover:bg-[#B81D13] text-zinc-400 hover:text-white border border-[#232B36] hover:border-white/50 transition-all shadow-lg flex items-center justify-center cursor-pointer group"
          title="Scroll Back to Top"
        >
          <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      </div>
    </>
  );
};
