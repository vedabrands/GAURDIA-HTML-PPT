import React, { useEffect, useRef, useState } from 'react';
import { Camera, Radio, Shield, Zap, RefreshCw } from 'lucide-react';
import { sounds } from './AudioController';

interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  status: 'active' | 'alert' | 'idle';
  type: 'hub' | 'camera';
  pulseRadius: number;
}

export const MeshNetworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedCam, setSelectedCam] = useState<string>('CAM 03');
  const [activeIncident, setActiveIncident] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', onResize);

    const hubX = width / 2;
    const hubY = height / 2;

    const nodes: Node[] = [
      { id: 'HUB', name: 'CENTRAL AI CORE', x: hubX, y: hubY, status: 'alert', type: 'hub', pulseRadius: 0 },
      { id: 'CAM 01', name: 'NORTH ENTRANCE', x: hubX - width * 0.32, y: hubY - height * 0.28, status: 'active', type: 'camera', pulseRadius: 0 },
      { id: 'CAM 02', name: 'EAST PARKING LOT', x: hubX + width * 0.33, y: hubY - height * 0.22, status: 'active', type: 'camera', pulseRadius: 0 },
      { id: 'CAM 03', name: 'MAIN PERIMETER', x: hubX - width * 0.28, y: hubY + height * 0.26, status: 'alert', type: 'camera', pulseRadius: 0 },
      { id: 'CAM 04', name: 'SOUTH TRANSIT DOCK', x: hubX + width * 0.3, y: hubY + height * 0.3, status: 'active', type: 'camera', pulseRadius: 0 },
      { id: 'CAM 05', name: 'WEST ALLEYWAY', x: hubX - width * 0.38, y: hubY + height * 0.02, status: 'idle', type: 'camera', pulseRadius: 0 },
      { id: 'CAM 06', name: 'PLAZA ESPLANADE', x: hubX + width * 0.36, y: hubY + height * 0.05, status: 'idle', type: 'camera', pulseRadius: 0 },
    ];

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw City Grid Map Background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 35;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Radar Scan Line from Central Hub
      ctx.save();
      ctx.translate(hubX, hubY);
      ctx.rotate(time);
      const grad = ctx.createLinearGradient(0, 0, width * 0.45, 0);
      grad.addColorStop(0, 'rgba(184, 29, 19, 0.35)');
      grad.addColorStop(1, 'rgba(184, 29, 19, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, width * 0.45, 0, Math.PI / 4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Draw Concentric Radar Rings
      ctx.strokeStyle = 'rgba(184, 29, 19, 0.15)';
      ctx.lineWidth = 1;
      [0.15, 0.28, 0.42].forEach(r => {
        ctx.beginPath();
        ctx.arc(hubX, hubY, width * r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw Network Beams between Cameras and Central Hub
      nodes.forEach(node => {
        if (node.type === 'camera') {
          ctx.beginPath();
          ctx.moveTo(hubX, hubY);
          ctx.lineTo(node.x, node.y);

          if (node.status === 'alert') {
            ctx.strokeStyle = 'rgba(255, 42, 42, 0.7)';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.lineDashOffset = -time * 20;
          } else {
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.35)';
            ctx.lineWidth = 1;
            ctx.setLineDash([]);
          }
          ctx.stroke();
          ctx.setLineDash([]);

          // Animated data packets travelling
          const packetProgress = (time * 0.8 + (node.id === 'CAM 03' ? 0.3 : 0)) % 1;
          const px = node.x + (hubX - node.x) * packetProgress;
          const py = node.y + (hubY - node.y) * packetProgress;

          ctx.fillStyle = node.status === 'alert' ? '#FF2A2A' : '#00E5FF';
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw Nodes
      nodes.forEach(node => {
        // Node Pulsing Aura
        node.pulseRadius = ((node.pulseRadius || 0) + 0.3) % 25;
        const alpha = 1 - node.pulseRadius / 25;

        if (node.type === 'hub') {
          // Draw Central Star Core
          ctx.beginPath();
          ctx.arc(node.x, node.y, 22 + node.pulseRadius * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(184, 29, 19, ${alpha * 0.5})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = '#B81D13';
          ctx.beginPath();
          ctx.arc(node.x, node.y, 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Star inside hub
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '14px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('★', node.x, node.y);
        } else {
          // Camera Node
          const isSelected = selectedCam === node.id;
          const isAlert = node.status === 'alert';

          ctx.beginPath();
          ctx.arc(node.x, node.y, 10 + (isSelected ? 4 : 0), 0, Math.PI * 2);
          ctx.fillStyle = isAlert ? '#FF2A2A' : (isSelected ? '#00E5FF' : '#161B22');
          ctx.fill();
          ctx.strokeStyle = isAlert ? '#FFF' : (isSelected ? '#00E5FF' : '#30363D');
          ctx.lineWidth = 2;
          ctx.stroke();

          // Label
          ctx.fillStyle = isAlert ? '#FF8888' : '#C9D1D9';
          ctx.font = '10px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(node.id, node.x, node.y - 14);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
    };
  }, [selectedCam, activeIncident]);

  return (
    <div className="relative w-full h-80 sm:h-96 rounded-xl bg-[#090C10] border border-[#21262D] overflow-hidden shadow-2xl flex flex-col">
      {/* Network Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0D1117] border-b border-[#21262D] text-xs font-mono">
        <div className="flex items-center gap-2 text-zinc-300">
          <Radio className="w-4 h-4 text-red-500 animate-pulse" />
          <span className="font-bold text-white">CITY-WIDE VISUAL MESH</span>
          <span className="text-zinc-500 hidden sm:inline">// 6 NODES SYNCHRONIZED</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/50 font-bold text-[10px]">
            ALERT ON CAM 03
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative flex-1 w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />

        {/* Quick Node Selector Pills */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-[#0D1117]/85 backdrop-blur-md px-3 py-2 rounded-lg border border-[#21262D] text-xs font-mono">
          <span className="text-zinc-400 text-[11px] hidden sm:inline">INSPECT NODE:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {['CAM 01', 'CAM 02', 'CAM 03', 'CAM 04', 'CAM 05', 'CAM 06'].map(cam => (
              <button
                key={cam}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCam(cam);
                }}
                className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
                  selectedCam === cam
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(0,229,255,0.5)]'
                    : cam === 'CAM 03'
                    ? 'bg-red-900/80 text-red-300 border border-red-500/50'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {cam}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
