import React, { useState } from 'react';
import { MapPin, Navigation, Radio, Activity, Eye, ShieldCheck, Database, Layers } from 'lucide-react';

interface ProjectVisualProps {
  type: 'map' | 'telemetry' | 'vision' | 'pipeline';
  title?: string;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ type }) => {
  const [activeLayer, setActiveLayer] = useState<'infrastructure' | 'amenity' | 'heatmap'>('infrastructure');

  // OBRIX: Interactive Geospatial Intelligence Map Simulation
  if (type === 'map') {
    return (
      <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-[#0a0f18] border border-violet-500/20 shadow-2xl flex flex-col justify-between p-4 select-none">
        {/* Map Grid / Satellite Vector lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
        
        {/* Top HUD Bar */}
        <div className="relative z-10 flex items-center justify-between bg-[#080d16]/80 border border-white/10 px-3.5 py-2 rounded-lg backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider">
              GEOVISION AI // ENGINE ACTIVE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveLayer('infrastructure')}
              className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors ${
                activeLayer === 'infrastructure'
                  ? 'bg-violet-600/40 text-violet-300 border border-violet-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              INFRA
            </button>
            <button
              onClick={() => setActiveLayer('amenity')}
              className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors ${
                activeLayer === 'amenity'
                  ? 'bg-sky-600/40 text-sky-300 border border-sky-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              AMENITIES
            </button>
          </div>
        </div>

        {/* Map Center Simulation */}
        <div className="relative z-10 my-auto flex items-center justify-center">
          {/* Animated Catchment Radius Rings */}
          <div className="absolute w-44 h-44 rounded-full border border-dashed border-violet-500/30 animate-[spin_25s_linear_infinite]" />
          <div className="absolute w-64 h-64 rounded-full border border-violet-500/15 animate-ping opacity-25" style={{ animationDuration: '3s' }} />

          {/* Primary Candidate Location Node */}
          <div className="relative z-20 flex flex-col items-center">
            <div className="relative p-2.5 rounded-full bg-violet-600 text-white shadow-glow-purple ring-4 ring-violet-500/20 animate-pulse">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="mt-2 bg-[#0c101d]/90 border border-violet-500/40 px-2.5 py-1 rounded-md text-[11px] font-mono text-violet-300 shadow-lg">
              SITE A-42 • 94.8% SUITABLE
            </div>
          </div>

          {/* Surrounding Vector Nodes */}
          <div className="absolute -top-10 left-12 flex items-center gap-1 bg-[#090e18]/80 border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-sky-300">
            <Navigation className="w-3 h-3 text-sky-400" /> Transit Hub (450m)
          </div>

          <div className="absolute -bottom-8 right-10 flex items-center gap-1 bg-[#090e18]/80 border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-300">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Grid Power (High)
          </div>

          <div className="absolute top-12 -right-2 flex items-center gap-1 bg-[#090e18]/80 border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-amber-300">
            <Layers className="w-3 h-3 text-amber-400" /> Commercial Zone
          </div>
        </div>

        {/* Bottom Metrics Readout */}
        <div className="relative z-10 grid grid-cols-3 gap-2 bg-[#080d16]/85 border border-white/10 p-2.5 rounded-lg font-mono text-xs text-slate-300 backdrop-blur-md">
          <div>
            <div className="text-[10px] text-slate-400 uppercase">PostGIS Index</div>
            <div className="text-violet-400 font-bold">R-Tree Spatial</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Accessibility</div>
            <div className="text-sky-400 font-bold">96.2 / 100</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Query Response</div>
            <div className="text-emerald-400 font-bold">42ms</div>
          </div>
        </div>
      </div>
    );
  }

  // TransitOps: Real-Time Fleet Telemetry Visual
  if (type === 'telemetry') {
    return (
      <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-[#090d16] border border-sky-500/20 shadow-2xl flex flex-col justify-between p-4 select-none">
        <div className="flex items-center justify-between bg-[#070b13]/80 border border-white/10 px-3.5 py-2 rounded-lg backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold text-sky-300 uppercase tracking-wider">
              FLEET TELEMETRY WS // LIVE
            </span>
          </div>
          <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            482 ACTIVE UNITS
          </span>
        </div>

        {/* Telemetry Route Visualization */}
        <div className="my-auto space-y-3">
          <div className="bg-[#0b101e] border border-white/[0.06] p-3 rounded-lg space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold">BUS-704 // EXPRESS ROUTE 9</span>
              <span className="text-emerald-400">ON TIME (0.0m delay)</span>
            </div>
            <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden relative">
              <div className="bg-sky-400 h-full w-3/4 rounded-full" />
              <div className="absolute top-0 left-3/4 -ml-1.5 w-3 h-3 bg-white rounded-full shadow-glow-cyan" />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Terminal Central</span>
              <span>Next: Tech Corridor (2.4km)</span>
              <span>Metro North</span>
            </div>
          </div>

          <div className="bg-[#0b101e] border border-white/[0.06] p-3 rounded-lg space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold">BUS-312 // CIRCULAR 4B</span>
              <span className="text-amber-400">EST. DELAY: +1.8m</span>
            </div>
            <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden relative">
              <div className="bg-amber-400 h-full w-2/5 rounded-full" />
              <div className="absolute top-0 left-2/5 -ml-1.5 w-3 h-3 bg-white rounded-full shadow-glow-cyan" />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Civic Station</span>
              <span>Next: Junction 8 (Congestion Detected)</span>
              <span>South Bay</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-[#070b13]/85 border border-white/10 p-2.5 rounded-lg font-mono text-xs text-slate-300">
          <div>
            <div className="text-[10px] text-slate-400">Ping Rate</div>
            <div className="text-sky-400 font-bold">50ms WS</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">ML Forecast</div>
            <div className="text-emerald-400 font-bold">Ensemble V3</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">Accuracy</div>
            <div className="text-violet-400 font-bold">91.2%</div>
          </div>
        </div>
      </div>
    );
  }

  // NeuroVision: Computer Vision Multi-Spectral Visual
  if (type === 'vision') {
    return (
      <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-[#0a0a14] border border-violet-500/20 shadow-2xl flex flex-col justify-between p-4 select-none">
        <div className="flex items-center justify-between bg-[#080811]/80 border border-white/10 px-3.5 py-2 rounded-lg backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-violet-400" />
            <span className="font-mono text-xs font-semibold text-violet-300 uppercase tracking-wider">
              MULTI-SPECTRAL INFERENCE // PYTORCH
            </span>
          </div>
          <span className="font-mono text-[10px] text-violet-300 bg-violet-500/20 px-2 py-0.5 rounded">
            28ms / FRAME
          </span>
        </div>

        {/* Vision Detection Canvas Mock */}
        <div className="relative my-auto h-36 rounded-lg bg-[#0e0e1c] border border-white/10 flex items-center justify-center overflow-hidden">
          {/* Scanline Effect */}
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent animate-scanline" />

          {/* Bounding Boxes */}
          <div className="absolute top-4 left-8 border-2 border-dashed border-violet-400 p-2 rounded text-[10px] font-mono text-violet-300 bg-violet-950/40">
            [INFRASTRUCTURE] 98.2%
          </div>

          <div className="absolute bottom-4 right-10 border-2 border-dashed border-sky-400 p-2 rounded text-[10px] font-mono text-sky-300 bg-sky-950/40">
            [WATERWAY_MASK] 94.7%
          </div>

          <div className="text-center font-mono text-xs text-slate-400">
            <Activity className="w-6 h-6 text-violet-400 mx-auto mb-1 animate-pulse" />
            <span>UNet Semantic Segmentation Active</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-[#080811]/85 border border-white/10 p-2.5 rounded-lg font-mono text-xs text-slate-300">
          <div>
            <div className="text-[10px] text-slate-400">Backbone</div>
            <div className="text-violet-400 font-bold">ResNet-50</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">mIoU Metric</div>
            <div className="text-sky-400 font-bold">88.4%</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">Runtime</div>
            <div className="text-emerald-400 font-bold">ONNX C++</div>
          </div>
        </div>
      </div>
    );
  }

  // DataPulse Studio: Stream Pipeline Visual
  return (
    <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-[#080b12] border border-emerald-500/20 shadow-2xl flex flex-col justify-between p-4 select-none">
      <div className="flex items-center justify-between bg-[#06080e]/80 border border-white/10 px-3.5 py-2 rounded-lg backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-mono text-xs font-semibold text-emerald-300 uppercase tracking-wider">
            STREAM PIPELINE DAG // ACTIVE
          </span>
        </div>
        <span className="font-mono text-[10px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">
          10,000 EV/SEC
        </span>
      </div>

      {/* DAG Flow Visual */}
      <div className="my-auto flex items-center justify-between gap-2 px-2">
        <div className="p-3 bg-[#0d1322] border border-white/10 rounded-lg text-center font-mono text-xs flex-1">
          <div className="text-slate-400 text-[10px]">INGEST</div>
          <div className="text-sky-400 font-bold">Kafka Topic</div>
        </div>
        <div className="text-slate-600">→</div>
        <div className="p-3 bg-[#0d1322] border border-emerald-500/30 rounded-lg text-center font-mono text-xs flex-1 shadow-glow-cyan">
          <div className="text-emerald-400 text-[10px]">PROCESS</div>
          <div className="text-white font-bold">PyStream ETL</div>
        </div>
        <div className="text-slate-600">→</div>
        <div className="p-3 bg-[#0d1322] border border-white/10 rounded-lg text-center font-mono text-xs flex-1">
          <div className="text-slate-400 text-[10px]">STORAGE</div>
          <div className="text-violet-400 font-bold">PostgreSQL</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-[#06080e]/85 border border-white/10 p-2.5 rounded-lg font-mono text-xs text-slate-300">
        <div>
          <div className="text-[10px] text-slate-400">Sliding Window</div>
          <div className="text-emerald-400 font-bold">60s Rolling</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400">Anomaly Engine</div>
          <div className="text-sky-400 font-bold">Isolation Forest</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400">P99 Latency</div>
          <div className="text-violet-400 font-bold">&lt; 120ms</div>
        </div>
      </div>
    </div>
  );
};
