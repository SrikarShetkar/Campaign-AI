import React, { useState } from 'react';
import { GlassCard } from '../../components/Cards/GlassCard';
import { StatCard } from '../../components/Cards/StatCard';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { FiSliders, FiTrendingUp, FiDollarSign, FiUsers, FiShield, FiZap, FiRefreshCw } from 'react-icons/fi';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export const Simulator = () => {
  const [budget, setBudget] = useState(50000);
  const [durationDays, setDurationDays] = useState(30);
  const [metaWeight, setMetaWeight] = useState(40);
  const [tiktokWeight, setTiktokWeight] = useState(35);
  const [googleWeight, setGoogleWeight] = useState(25);

  // Dynamic calculated metrics based on sliders
  const calculatedReach = ((budget * 32) / 1000000).toFixed(2) + 'M';
  const calculatedRoi = (3.2 + (budget / 50000) * 0.8 + (tiktokWeight / 100) * 0.5).toFixed(1) + 'x';
  const calculatedCtr = (4.2 + (tiktokWeight / 50) * 0.6).toFixed(1) + '%';
  const calculatedVirality = Math.min(99, Math.round(75 + (tiktokWeight / 100) * 20)).toString() + '%';
  const riskScore = Math.max(12, Math.round(45 - (budget / 100000) * 15)).toString() + '/100';

  const simulatedChartData = [
    { day: 'Day 5', projectedReach: Math.round(budget * 0.15), conversions: Math.round(budget * 0.008) },
    { day: 'Day 10', projectedReach: Math.round(budget * 0.35), conversions: Math.round(budget * 0.022) },
    { day: 'Day 15', projectedReach: Math.round(budget * 0.65), conversions: Math.round(budget * 0.048) },
    { day: 'Day 20', projectedReach: Math.round(budget * 0.95), conversions: Math.round(budget * 0.075) },
    { day: 'Day 30', projectedReach: Math.round(budget * 1.35), conversions: Math.round(budget * 0.11) },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          Campaign <span className="text-gradient">Simulator</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Predict reach, CTR, virality, and financial risk before committing ad spend.
        </p>
      </div>

      {/* Interactive Controls & Projected Metric Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Slider Panel */}
        <GlassCard className="space-y-6 lg:col-span-1 border-brand-start/30">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <FiSliders className="text-accent-lavender" /> Simulation Controls
            </h3>
            <span className="text-xs text-accent-mint font-mono font-bold">Real-Time</span>
          </div>

          {/* Budget Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Allocated Budget</span>
              <span className="text-accent-gold font-bold font-mono">${budget.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="250000"
              step="5000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-[#8F7BFF] cursor-pointer"
            />
          </div>

          {/* Duration Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Campaign Duration</span>
              <span className="text-white font-bold font-mono">{durationDays} Days</span>
            </div>
            <input
              type="range"
              min="7"
              max="90"
              step="1"
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full accent-[#8F7BFF] cursor-pointer"
            />
          </div>

          {/* Channel Mix Sliders */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Channel Mix Weight</h4>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>TikTok / Short-Form Video</span>
                <span className="font-bold text-accent-aqua">{tiktokWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={tiktokWeight}
                onChange={(e) => setTiktokWeight(Number(e.target.value))}
                className="w-full accent-[#67E8F9] cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Meta (IG / FB Reels)</span>
                <span className="font-bold text-accent-lavender">{metaWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={metaWeight}
                onChange={(e) => setMetaWeight(Number(e.target.value))}
                className="w-full accent-[#8F7BFF] cursor-pointer"
              />
            </div>
          </div>
        </GlassCard>

        {/* Dynamic Simulated Metric Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <StatCard title="Expected Reach" value={calculatedReach} change="+14.2%" trend="up" icon={FiUsers} color="#8F7BFF" />
            <StatCard title="Projected ROI" value={calculatedRoi} change="+0.4x" trend="up" icon={FiDollarSign} color="#F3D382" />
            <StatCard title="Estimated CTR" value={calculatedCtr} change="+0.6%" trend="up" icon={FiTrendingUp} color="#6EE7B7" />
            <StatCard title="Virality Index" value={calculatedVirality} subtitle="High Organic Potential" icon={FiZap} color="#67E8F9" />
            <StatCard title="Risk Score" value={riskScore} subtitle="Low Capital Volatility" icon={FiShield} color="#F0A696" />
            <GlassCard className="flex flex-col justify-center items-center text-center p-4">
              <div className="text-xs text-slate-400 font-semibold mb-1">Simulated Winner</div>
              <div className="text-sm font-extrabold text-white">Version A (High-Peptide Glow)</div>
              <span className="px-2 py-0.5 rounded-full bg-accent-mint/20 text-accent-mint text-[10px] font-bold mt-2">
                98% Match
              </span>
            </GlassCard>
          </div>

          {/* Dynamic Simulation Curve Chart */}
          <GlassCard>
            <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
              <FiTrendingUp className="text-accent-mint" /> Projected Cumulative Impressions Curve
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simulatedChartData}>
                  <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#16161E', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="projectedReach" stroke="#8F7BFF" fill="#8F7BFF" fillOpacity={0.3} strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
