import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Activity, RefreshCw } from 'lucide-react';
import { sounds } from './AudioController';

export const TerminalLogs: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([
    '[01:24:14.201] [SYSTEM] Guardia AI Core Kernel Initialized — YOLOv11 + ByteTrack Active',
    '[01:24:15.042] [CAM_03] RTSP Stream Ingested @ 1080p 30fps (Bitrate: 4.2Mbps)',
    '[01:24:16.110] [VISION] Detection: P01 (Confidence: 0.94, Class: Person), P02 (Confidence: 0.96, Class: Person)',
    '[01:24:16.890] [POSE] 17 Keypoints Extracted for P01 & P02 (Avg Latency: 12.4ms)',
    '[01:24:17.020] [KINEMATICS] Euclidean Distance Vector = 1.84m (Threshold: 2.0m)',
    '[01:24:17.150] [ANALYZE] Strike Acceleration Vector Detected on P02_R_WRIST (2.42 m/s)',
    '[01:24:17.210] [DECISION] Incident Class: AGGRESSION_PHYSICAL_ALTERCATION (Confidence: 98.2%)',
    '[01:24:17.300] [ALERT] Dispatched Critical Webhook -> Security Center (Latency: 180ms)',
  ]);

  useEffect(() => {
    const dynamicMessages = [
      '[CAM_03] Frame buffer synchronized (0 dropped frames)',
      '[VLM_INFER] Scene contextual summary: "Active altercation in parking lot sector B"',
      '[TRACK] Kalman filter state updated: Subject P01 trajectory delta -0.4m',
      '[INCIDENT_ENGINE] Escalation score: 0.985 (Severity Level: CRITICAL_ALPHA)',
      '[COMM] SMS & Push notification delivered to 3 nearby security personnel',
    ];

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `[01:24:${String(18 + Math.floor(Math.random() * 40)).padStart(2, '0')}.${String(Math.floor(Math.random() * 999)).padStart(3, '0')}]`;
      const randomMsg = dynamicMessages[Math.floor(Math.random() * dynamicMessages.length)];
      setLogs(prev => [...prev.slice(-12), `${timeStr} ${randomMsg}`]);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-xl bg-[#090C10] border border-[#21262D] font-mono text-xs overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0D1117] border-b border-[#21262D] text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-zinc-200 font-bold ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-red-500" />
            guardia-daemon // live-inference.log
          </span>
        </div>
        <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          STREAMING (30 FPS)
        </span>
      </div>

      {/* Logs Window */}
      <div className="p-4 h-48 sm:h-56 overflow-y-auto space-y-1 bg-[#06080B] text-zinc-300 font-mono text-[11px] select-text">
        {logs.map((log, idx) => {
          let colorClass = 'text-zinc-400';
          if (log.includes('ALERT') || log.includes('DECISION') || log.includes('CRITICAL')) colorClass = 'text-red-400 font-bold';
          else if (log.includes('ANALYZE') || log.includes('KINEMATICS')) colorClass = 'text-amber-300';
          else if (log.includes('VISION') || log.includes('POSE')) colorClass = 'text-cyan-300';
          else if (log.includes('SYSTEM')) colorClass = 'text-emerald-400';

          return (
            <div key={idx} className="leading-relaxed hover:bg-white/5 px-1 py-0.5 rounded transition-colors">
              <span className={colorClass}>{log}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
