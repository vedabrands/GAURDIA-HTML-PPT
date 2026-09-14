import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellRing, FileText, Share2, ShieldAlert, Zap, Radio, CheckCircle, Smartphone, Send, AlertTriangle } from 'lucide-react';
import { sounds } from '../AudioController';
import { BlurReveal } from '../BlurReveal';

interface ActionCard {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const ActionSection: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string>('sms');
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [hoveredSimStep, setHoveredSimStep] = useState<number | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);

  const cards: ActionCard[] = [
    {
      id: 'sms',
      title: 'Instant SMS & Push Alerts',
      subtitle: 'Patrol teams & on-duty authorities notified within seconds.',
      metric: '< 1.2s LATENCY',
      description: 'Dispatches high-priority mobile push notifications and SMS alerts with target coordinates and threat classification to on-foot officers.',
      badge: 'SPEED: CRITICAL',
      icon: BellRing,
    },
    {
      id: 'report',
      title: 'Automated Incident Reports',
      subtitle: 'Pre-compiled video clips, timestamps & location details.',
      metric: '100% FORENSIC READY',
      description: 'Generates auto-clipped 10s MP4 loops with overlaid pose telemetry, distance vectors, and timestamped keypoint tracking data.',
      badge: 'EVIDENCE GRADE',
      icon: FileText,
    },
    {
      id: 'multi',
      title: 'Multi-Channel Integration',
      subtitle: 'Telegram, SOC consoles, Webhooks & 911 dispatch.',
      metric: 'REST / WS / MQTT',
      description: 'Directly hooks into Police CAD terminals, Enterprise VMS (Milestone, Genetec), Slack emergency channels, and Telegram dispatch bots.',
      badge: 'OPEN API',
      icon: Share2,
    },
    {
      id: 'escalate',
      title: 'Emergency Escalation',
      subtitle: 'Trigger on-site alarms, audio deterrents & strobe lights.',
      metric: 'HARDWARE RELAY < 80ms',
      description: 'Direct GPIO relays activate high-decibel acoustic alarms, strobe deterrent lights, and electronic mag-lock perimeter containment.',
      badge: 'ACTIVE DETERRENT',
      icon: ShieldAlert,
    },
  ];

  const handleSimulate = () => {
    if (isSimulating) return;
    sounds.playAlert();
    setIsSimulating(true);
    setSimulationStep(1);

    setTimeout(() => {
      setSimulationStep(2);
      sounds.playScan();
    }, 1200);

    setTimeout(() => {
      setSimulationStep(3);
      sounds.playClick();
    }, 2400);

    setTimeout(() => {
      setSimulationStep(4);
      sounds.playClick();
    }, 3600);

    setTimeout(() => {
      setIsSimulating(false);
      setSimulationStep(0);
    }, 5500);
  };

  return (
    <section className="relative w-full bg-[#F5EFEB] text-[#12161A] p-4 sm:p-6 lg:p-7 flex flex-col justify-between overflow-hidden border-b-4 border-[#B81D13] shadow-2xl rounded-2xl">
      {/* Texture & Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-35 bg-[radial-gradient(#12161A_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Header */}
      <div className="relative z-10 space-y-2">
        <BlurReveal delay={0.05} yOffset={10}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-tactical font-bold tracking-widest text-[#B81D13] uppercase">
              <span className="w-2.5 h-2.5 bg-[#B81D13] rounded-sm"></span>
              SECTION 02 // CRISIS REACTION &amp; ESCALATION
            </div>

            <span className="text-xs font-tactical bg-[#EDE3D8] hover:bg-[#B81D13] hover:text-white transition-colors px-3 py-0.5 rounded-full border border-[#12161A]/15 font-bold cursor-default">
              TIME-TO-RESPOND: &lt; 2 SECONDS
            </span>
          </div>
        </BlurReveal>

        <BlurReveal delay={0.12} yOffset={15}>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-[#12161A] leading-none uppercase">
            FROM ALERTS <span className="text-[#B81D13]">TO ACTION</span>
          </h2>
        </BlurReveal>

        <BlurReveal delay={0.18} yOffset={10}>
          <p className="text-sm sm:text-base font-body text-[#2B303A] max-w-4xl leading-relaxed">
            When seconds matter, automation saves lives. <strong className="text-[#B81D13]">GAURDIA AI</strong> bridges the fatal gap between incident detection and physical response through verified multi-vector dispatch.
          </p>
        </BlurReveal>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          const isSelected = selectedCard === card.id;
          const isHovered = hoveredCardIdx === idx;
          const isDull = hoveredCardIdx !== null && !isHovered;

          return (
            <BlurReveal key={card.id} delay={0.08 + idx * 0.05} yOffset={15}>
              <motion.div
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                onMouseEnter={() => {
                  sounds.playHover();
                  setHoveredCardIdx(idx);
                }}
                onMouseLeave={() => setHoveredCardIdx(null)}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCard(card.id);
                }}
                className={`relative rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between h-full group border-2 ${
                  isHovered
                    ? 'bg-[#B81D13] text-white shadow-[0_25px_45px_-10px_rgba(184,29,19,0.55)] border-white/60'
                    : isDull
                    ? 'bg-white/60 text-[#12161A] border-[#12161A]/10 opacity-40 scale-[0.98] blur-[0.2px]'
                    : isSelected
                    ? 'bg-white text-[#12161A] border-[#B81D13] shadow-md ring-2 ring-[#B81D13]/20'
                    : 'bg-white hover:bg-[#B81D13] text-[#12161A] border-[#12161A]/15 shadow-md'
                }`}
              >
                {/* Card Header */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm ${
                        isHovered
                          ? 'bg-white text-[#B81D13] scale-110'
                          : 'bg-[#B81D13] group-hover:bg-white text-white group-hover:text-[#B81D13]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`font-tactical text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider transition-all duration-300 ${
                        isHovered
                          ? 'bg-black/30 text-white'
                          : 'bg-black/10 group-hover:bg-black/30 group-hover:text-white text-[#12161A]'
                      }`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <h3
                    className={`font-display text-xl sm:text-2xl uppercase tracking-wide leading-tight mb-1.5 transition-colors duration-200 ${
                      isHovered ? 'text-white' : 'text-[#12161A] group-hover:text-white'
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`text-xs font-body leading-relaxed mb-3 transition-colors duration-200 ${
                      isHovered ? 'text-white/90' : 'text-[#4A5568] group-hover:text-white/90'
                    }`}
                  >
                    {card.subtitle}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-current/20 flex items-center justify-between font-mono text-xs">
                  <span
                    className={`font-condensed text-xs sm:text-sm font-bold tracking-wider transition-colors ${
                      isHovered ? 'text-white' : 'text-[#12161A] group-hover:text-white'
                    }`}
                  >
                    {card.metric}
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

      {/* Interactive Live Simulator Bar */}
      <BlurReveal delay={0.22} yOffset={20}>
        <motion.div
          whileHover={{ scale: 1.015, y: -3 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative z-10 bg-[#141920] hover:bg-[#181F28] rounded-2xl p-4 sm:p-5 text-white border-2 border-[#232B36] hover:border-[#B81D13] shadow-xl hover:shadow-[0_25px_45px_-10px_rgba(184,29,19,0.35)] transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-3 mb-3 pb-3 border-b border-[#2A3441]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#B81D13] flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(184,29,19,0.4)]">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display text-lg sm:text-xl uppercase tracking-wider text-white">
                  LIVE DISPATCH &amp; TELEMETRY SIMULATOR
                </h4>
                <p className="text-[11px] font-mono text-zinc-400">
                  Simulate end-to-end incident verification and automated first responder broadcast
                </p>
              </div>
            </div>

            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                isSimulating
                  ? 'bg-amber-500 text-black animate-pulse cursor-wait'
                  : 'bg-[#B81D13] text-white hover:bg-red-600 hover:scale-105 shadow-lg'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              {isSimulating ? 'DISPATCHING STREAM...' : 'TRIGGER TEST INCIDENT'}
            </button>
          </div>

          {/* Pipeline Step Sub-Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 font-mono text-xs">
            {[
              { step: 1, label: '01. YOLOV11 VERIFY', desc: 'Altercation classified (98.4%)', status: simulationStep >= 1 },
              { step: 2, label: '02. VIDEO COMPILATION', desc: '10s forensic MP4 buffered', status: simulationStep >= 2 },
              { step: 3, label: '03. GSM & PUSH DELIVER', desc: 'SMS sent to 4 patrol units', status: simulationStep >= 3 },
              { step: 4, label: '04. PERIMETER STROBE', desc: 'Hardware relays fired', status: simulationStep >= 4 },
            ].map((s, idx) => {
              const isHovered = hoveredSimStep === idx;
              const isDull = hoveredSimStep !== null && !isHovered;

              return (
                <motion.div
                  key={s.step}
                  whileHover={{ scale: 1.04, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  onMouseEnter={() => {
                    sounds.playHover();
                    setHoveredSimStep(idx);
                  }}
                  onMouseLeave={() => setHoveredSimStep(null)}
                  className={`p-2.5 sm:p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? 'bg-[#B81D13] text-white border-white/60 shadow-[0_10px_25px_-5px_rgba(184,29,19,0.5)]'
                      : isDull
                      ? 'bg-[#0E1217]/50 border-[#212833]/40 text-zinc-500 opacity-40 scale-[0.98]'
                      : s.status
                      ? 'bg-red-950/80 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.35)]'
                      : 'bg-[#0E1217] text-zinc-300 border-[#212833] hover:border-[#B81D13]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`font-bold text-[11px] transition-colors ${
                        isHovered ? 'text-white' : s.status ? 'text-red-400' : 'text-zinc-300'
                      }`}
                    >
                      {s.label}
                    </span>
                    {s.status ? (
                      <CheckCircle className={`w-3.5 h-3.5 ${isHovered ? 'text-white' : 'text-emerald-400'}`} />
                    ) : (
                      <span
                        className={`text-[9px] font-mono ${
                          isHovered ? 'text-white/80' : 'text-zinc-500'
                        }`}
                      >
                        PENDING
                      </span>
                    )}
                  </div>
                  <div
                    className={`text-[10px] transition-colors ${
                      isHovered ? 'text-white/90' : 'text-zinc-400'
                    }`}
                  >
                    {s.desc}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </BlurReveal>

      {/* Footer Hazard Stripe */}
      <BlurReveal delay={0.28} yOffset={10}>
        <div className="relative z-10 mt-5 pt-3 border-t-2 border-[#12161A] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-16 h-3 bg-[repeating-linear-gradient(45deg,#B81D13,#B81D13_6px,#F5EFEB_6px,#F5EFEB_12px)] border border-[#B81D13]"></div>
            <span className="font-bold">ZERO DELAY INCIDENT ORCHESTRATION</span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">GAURDIA AI // SLIDE 02</span>
        </div>
      </BlurReveal>
    </section>
  );
};
