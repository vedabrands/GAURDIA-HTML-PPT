import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ShieldAlert, Activity, AlertTriangle } from 'lucide-react';
import { sounds } from './AudioController';

interface InteractiveVideoProps {
  onClose?: () => void;
  isInline?: boolean;
}

export const InteractiveVideoModal: React.FC<InteractiveVideoProps> = ({ isInline = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showTelemetry, setShowTelemetry] = useState(true);
  const [activeCam, setActiveCam] = useState<'CAM 01' | 'CAM 02' | 'CAM 03' | 'CAM 04'>('CAM 03');
  const [currentTime, setCurrentTime] = useState('01:24:17');
  const [alertTriggered, setAlertTriggered] = useState(false);
  const [detectionConfidence, setDetectionConfidence] = useState(94);
  const [distance, setDistance] = useState(1.8);
  const [velocity, setVelocity] = useState(2.4);

  useEffect(() => {
    const interval = setInterval(() => {
      // Subtle dynamic fluctuations in telemetry
      setDistance(prev => Number((1.8 + (Math.sin(Date.now() / 1000) * 0.15)).toFixed(1)));
      setVelocity(prev => Number((2.4 + (Math.cos(Date.now() / 800) * 0.3)).toFixed(1)));
      setDetectionConfidence(prev => Math.floor(92 + Math.random() * 6));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    sounds.playClick();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    sounds.playClick();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const triggerEmergencyAlert = () => {
    sounds.playAlert();
    setAlertTriggered(true);
    setTimeout(() => {
      setAlertTriggered(false);
    }, 4000);
  };

  return (
    <div className={`relative overflow-hidden rounded-xl bg-[#080A0C] border border-[#2A313C] shadow-2xl ${isInline ? 'w-full' : 'max-w-5xl mx-auto'}`}>
      {/* Top CCTV Terminal Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#0D1117] border-b border-[#21262D] text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-950/80 border border-red-500/50 text-red-400 font-bold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            LIVE FEED
          </span>
          <span className="text-zinc-200 font-bold">{activeCam} // PERIMETER LOT B</span>
          <span className="text-zinc-500 hidden sm:inline">CODEC: H.264 // 1080P @ 30FPS</span>
        </div>

        <div className="flex items-center gap-2">
          {['CAM 01', 'CAM 02', 'CAM 03', 'CAM 04'].map(cam => (
            <button
              key={cam}
              onClick={() => {
                sounds.playClick();
                setActiveCam(cam as any);
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                activeCam === cam
                  ? 'bg-[#B81D13] text-white font-bold'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {cam}
            </button>
          ))}
          <span className="text-amber-400 font-mono ml-2 font-bold">{currentTime}</span>
        </div>
      </div>

      {/* Video Viewport with AI HUD */}
      <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center select-none">
        <video
          ref={videoRef}
          src="/assets/media1.mp4"
          poster="/assets/image2.png"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-90"
        />

        {/* Scanline & Vignette Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]"></div>
        <div className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"></div>

        {/* Alarm Red Strobe Border on Critical Trigger */}
        <AnimatePresence>
          {alertTriggered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0.2, 0.8, 0] }}
              exit={{ opacity: 0 }}
              transition={{ repeat: 3, duration: 0.8 }}
              className="absolute inset-0 pointer-events-none border-4 border-red-600 bg-red-600/20 z-40"
            />
          )}
        </AnimatePresence>

        {/* AI Telemetry HUD Overlay Panel - Compact & Sleek */}
        {showTelemetry && (
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-3 right-3 z-20 w-44 sm:w-48 p-2.5 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-400 font-mono shadow-[0_0_15px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-cyan-500/30 font-bold text-[10px] text-zinc-200">
              <span className="flex items-center gap-1 font-tactical">
                <Activity className="w-3 h-3 text-cyan-400" />
                AI MOVEMENT ANALYSIS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            </div>

            <div className="space-y-1 text-[10px]">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Distance:</span>
                <span className="text-red-400 font-bold">↓ {distance} m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Velocity:</span>
                <span className="text-amber-400 font-bold">↑ {velocity} m/s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Interaction:</span>
                <span className="px-1 py-0.2 rounded bg-red-600/40 text-red-300 font-bold animate-pulse text-[9px]">
                  DETECTED
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Severity:</span>
                <span className="text-red-400 font-bold">HIGH ({detectionConfidence}%)</span>
              </div>
            </div>

            <div className="mt-1.5 pt-1.5 border-t border-cyan-500/30 flex items-center justify-between text-[9px]">
              <span className="text-zinc-400">17-PT POSE:</span>
              <span className="text-cyan-300 font-bold">● ACTIVE</span>
            </div>
          </motion.div>
        )}

        {/* Emergency SOS Banner on trigger */}
        {alertTriggered && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="absolute inset-x-8 top-1/2 -translate-y-1/2 z-30 p-4 rounded-xl bg-red-950/90 border-2 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.8)] backdrop-blur-lg text-center"
          >
            <div className="text-2xl sm:text-4xl font-display tracking-wider text-red-500 animate-pulse flex items-center justify-center gap-3">
              <AlertTriangle className="w-7 h-7 sm:w-10 sm:h-10 text-red-400" />
              SOS // CRITICAL INCIDENT DETECTED
              <AlertTriangle className="w-7 h-7 sm:w-10 sm:h-10 text-red-400" />
            </div>
            <p className="text-xs sm:text-sm font-mono text-zinc-200 mt-2">
              AUTOMATED FIRST-RESPONDER DISPATCH NOTIFICATION INITIATED &lt;500MS
            </p>
          </motion.div>
        )}
      </div>

      {/* Control Strip */}
      <div className="p-2.5 sm:p-3 bg-[#0D1117] border-t border-[#21262D] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleMute}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <div className="h-4 w-px bg-zinc-700 mx-1"></div>

          {/* Toggle Telemetry */}
          <button
            onClick={() => {
              sounds.playClick();
              setShowTelemetry(!showTelemetry);
            }}
            className={`px-2.5 py-1.5 rounded text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              showTelemetry
                ? 'bg-cyan-950/80 border border-cyan-500/60 text-cyan-300'
                : 'bg-zinc-800/80 text-zinc-400'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            AI Telemetry
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerEmergencyAlert}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-transform active:scale-95 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            SIMULATE ALERT
          </button>
        </div>
      </div>
    </div>
  );
};
