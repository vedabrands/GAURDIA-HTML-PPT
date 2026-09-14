import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crosshair, UserCheck, Shield, Activity } from 'lucide-react';
import { sounds } from './AudioController';

interface Joint {
  id: string;
  name: string;
  x: number;
  y: number;
  confidence: number;
  type: 'head' | 'upper' | 'core' | 'lower';
}

export const PoseSkeletonViewer: React.FC = () => {
  const [selectedJoint, setSelectedJoint] = useState<string | null>('wrists');

  const joints: Joint[] = [
    { id: 'head', name: 'Nose & Cranium', x: 100, y: 35, confidence: 99, type: 'head' },
    { id: 'l_eye', name: 'Left Eye', x: 95, y: 30, confidence: 98, type: 'head' },
    { id: 'r_eye', name: 'Right Eye', x: 105, y: 30, confidence: 98, type: 'head' },
    { id: 'neck', name: 'Cervical Base', x: 100, y: 50, confidence: 99, type: 'head' },

    { id: 'l_shoulder', name: 'Left Shoulder', x: 75, y: 65, confidence: 96, type: 'upper' },
    { id: 'r_shoulder', name: 'Right Shoulder', x: 125, y: 65, confidence: 97, type: 'upper' },

    { id: 'l_elbow', name: 'Left Elbow', x: 55, y: 95, confidence: 94, type: 'upper' },
    { id: 'r_elbow', name: 'Right Elbow (Fist Guard)', x: 145, y: 90, confidence: 95, type: 'upper' },

    { id: 'l_wrist', name: 'Left Wrist', x: 45, y: 125, confidence: 91, type: 'upper' },
    { id: 'r_wrist', name: 'Right Wrist (Strike Vector)', x: 160, y: 110, confidence: 94, type: 'upper' },

    { id: 'l_hip', name: 'Left Pelvis', x: 85, y: 140, confidence: 97, type: 'core' },
    { id: 'r_hip', name: 'Right Pelvis', x: 115, y: 140, confidence: 96, type: 'core' },

    { id: 'l_knee', name: 'Left Knee', x: 75, y: 195, confidence: 93, type: 'lower' },
    { id: 'r_knee', name: 'Right Knee (Stance)', x: 125, y: 190, confidence: 95, type: 'lower' },

    { id: 'l_ankle', name: 'Left Ankle', x: 68, y: 250, confidence: 91, type: 'lower' },
    { id: 'r_ankle', name: 'Right Ankle (Pivoting)', x: 135, y: 245, confidence: 92, type: 'lower' },
  ];

  const bones = [
    ['head', 'neck'],
    ['neck', 'l_shoulder'],
    ['neck', 'r_shoulder'],
    ['l_shoulder', 'l_elbow'],
    ['l_elbow', 'l_wrist'],
    ['r_shoulder', 'r_elbow'],
    ['r_elbow', 'r_wrist'],
    ['neck', 'l_hip'],
    ['neck', 'r_hip'],
    ['l_hip', 'r_hip'],
    ['l_hip', 'l_knee'],
    ['l_knee', 'l_ankle'],
    ['r_hip', 'r_knee'],
    ['r_knee', 'r_ankle'],
  ];

  const jointLookup = Object.fromEntries(joints.map(j => [j.id, j]));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-[#0B0E12] border border-[#21262D] text-white">
      {/* Left: Interactive Skeleton Wireframe */}
      <div className="relative aspect-[3/4] bg-[#07090C] rounded-lg border border-[#1A222C] flex items-center justify-center p-4 overflow-hidden">
        {/* Radar grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,229,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        <svg viewBox="0 0 200 280" className="w-full h-full max-h-72 drop-shadow-[0_0_10px_rgba(0,229,255,0.4)]">
          {/* Bones / Vectors */}
          {bones.map(([startId, endId], idx) => {
            const p1 = jointLookup[startId];
            const p2 = jointLookup[endId];
            if (!p1 || !p2) return null;
            return (
              <line
                key={idx}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="#00E5FF"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="opacity-70 animate-pulse"
              />
            );
          })}

          {/* Joints */}
          {joints.map(joint => {
            const isSelected = selectedJoint === joint.id;
            return (
              <g
                key={joint.id}
                className="cursor-pointer group"
                onClick={() => {
                  sounds.playClick();
                  setSelectedJoint(joint.id);
                }}
              >
                {/* Outer halo */}
                <circle
                  cx={joint.x}
                  cy={joint.y}
                  r={isSelected ? 8 : 5}
                  fill={joint.type === 'head' ? '#FF2A2A' : '#00E5FF'}
                  className="transition-all duration-200 group-hover:scale-125"
                />
                <circle
                  cx={joint.x}
                  cy={joint.y}
                  r={isSelected ? 14 : 9}
                  fill="none"
                  stroke={joint.type === 'head' ? '#FF2A2A' : '#00E5FF'}
                  strokeWidth="1"
                  className="opacity-50 animate-ping"
                />
              </g>
            );
          })}
        </svg>

        {/* Live HUD Pill */}
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/50 text-[10px] font-mono text-cyan-300 flex items-center gap-1">
          <Activity className="w-3 h-3 text-cyan-400" />
          17 KEYPOINT POSE MODEL
        </div>
      </div>

      {/* Right: Telemetry & Selected Joint Analysis */}
      <div className="flex flex-col justify-between space-y-3 font-mono text-xs">
        <div>
          <div className="text-[11px] text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>KEYPOINT TELEMETRY</span>
            <span className="text-emerald-400">STATUS: TRACKING</span>
          </div>
          <div className="p-3 rounded-lg bg-[#141A22] border border-[#2A3441] space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Target Segment:</span>
              <span className="text-cyan-300 font-bold">
                {joints.find(j => j.id === selectedJoint)?.name || 'Select Joint'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Confidence Score:</span>
              <span className="text-emerald-400 font-bold">
                {joints.find(j => j.id === selectedJoint)?.confidence || 96}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Kinetic Velocity:</span>
              <span className="text-amber-400 font-bold">↑ 2.4 m/s (Rapid Strike)</span>
            </div>
          </div>
        </div>

        {/* Body Segments Quick Select */}
        <div className="space-y-1.5">
          <div className="text-[10px] text-zinc-400 font-bold">ANATOMICAL SEGMENTS:</div>
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            {[
              { label: 'Head & Neck', id: 'head' },
              { label: 'Shoulders', id: 'r_shoulder' },
              { label: 'Elbows & Wrists', id: 'r_wrist' },
              { label: 'Hips & Knees', id: 'r_knee' },
            ].map(seg => (
              <button
                key={seg.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedJoint(seg.id);
                }}
                className={`px-2.5 py-1.5 rounded text-left border transition-colors ${
                  selectedJoint === seg.id
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-200'
                    : 'bg-[#10141A] border-[#222B36] text-zinc-400 hover:text-white'
                }`}
              >
                {seg.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-2.5 rounded bg-red-950/40 border border-red-500/30 text-[10px] text-red-300">
          <span className="font-bold">Aggression Heuristic:</span> Upper extremity velocity exceeds 2.1 m/s threshold while stance distance narrows &lt; 2.0m.
        </div>
      </div>
    </div>
  );
};
