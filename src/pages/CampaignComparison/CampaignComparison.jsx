import React from 'react';
import comparisonData from '../../mock/comparison.json';
import { GlassCard } from '../../components/Cards/GlassCard';
import { StatCard } from '../../components/Cards/StatCard';
import { FiAward, FiColumns, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

export const CampaignComparison = () => {
  const chartData = comparisonData.versions.map((ver) => ({
    name: ver.name.split(':')[0],
    Score: ver.campaignScore,
    Virality: ver.viralityScore,
  }));

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Campaign <span className="text-gradient">Comparison</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Side-by-side A/B/C version matrix with AI winner badge attribution.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-mint/10 border border-accent-mint/30 text-accent-mint text-xs font-bold">
          <FiAward className="w-4 h-4" /> Winner Badge: {comparisonData.winnerVersion}
        </div>
      </div>

      {/* Winner Highlight Banner */}
      <GlassCard glow className="border-accent-mint/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-accent-mint uppercase tracking-wider">Recommended Strategy</span>
            <h3 className="text-2xl font-bold text-white">{comparisonData.versions[0].name}</h3>
            <p className="text-xs text-slate-300">{comparisonData.reason}</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">Projected ROI</div>
            <div className="text-4xl font-extrabold text-accent-gold">{comparisonData.versions[0].projectedRoi}</div>
          </div>
        </div>
      </GlassCard>

      {/* 3 Versions Side-by-Side Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {comparisonData.versions.map((ver, idx) => {
          const isWinner = ver.name.startsWith(comparisonData.winnerVersion);

          return (
            <GlassCard
              key={ver.id}
              glow={isWinner}
              className={`flex flex-col justify-between space-y-4 ${
                isWinner ? 'border-accent-mint/40 bg-emerald-950/20' : 'border-white/10'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">{ver.id.toUpperCase()}</span>
                  {isWinner && (
                    <span className="px-2.5 py-0.5 rounded-full bg-accent-mint text-slate-950 text-[10px] font-extrabold flex items-center gap-1">
                      <FiCheckCircle /> WINNER
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-white text-lg">{ver.name}</h3>
                <p className="text-xs text-accent-lavender italic">"{ver.tagline}"</p>
                
                <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">Tone & Style</span>
                    <span className="text-white font-medium">{ver.tone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Primary Angle</span>
                    <span className="text-slate-300">{ver.primaryAngle}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 text-center">
                  <div className="text-slate-400">Score</div>
                  <div className="text-xl font-extrabold text-white">{ver.campaignScore}/100</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 text-center">
                  <div className="text-slate-400">ROI</div>
                  <div className="text-xl font-extrabold text-accent-gold">{ver.projectedRoi}</div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Comparison Visual Bar Chart */}
      <GlassCard>
        <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
          <FiColumns className="text-accent-lavender" /> Version Score & Virality Benchmarks
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#16161E', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
              <Legend />
              <Bar dataKey="Score" fill="#8F7BFF" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Virality" fill="#67E8F9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Detailed Matrix Table */}
      <GlassCard>
        <h3 className="font-bold text-white text-lg mb-4">Detailed Metrics Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-xs uppercase">
                <th className="py-3 px-4">Metric</th>
                {comparisonData.versions.map((v) => (
                  <th key={v.id} className="py-3 px-4">{v.name.split(':')[0]}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-300">CTR Estimate</td>
                {comparisonData.versions.map((v) => (
                  <td key={v.id} className="py-3 px-4 text-white font-bold">{v.ctrEstimate}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-300">Estimated CPC</td>
                {comparisonData.versions.map((v) => (
                  <td key={v.id} className="py-3 px-4 text-slate-300">{v.estimatedCpc}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-300">Best Performing Channel</td>
                {comparisonData.versions.map((v) => (
                  <td key={v.id} className="py-3 px-4 text-accent-lavender font-semibold">{v.bestChannel}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
