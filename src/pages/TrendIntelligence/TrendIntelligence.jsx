import React from 'react';
import trendData from '../../mock/trends.json';
import { GlassCard } from '../../components/Cards/GlassCard';
import { StatCard } from '../../components/Cards/StatCard';
import { FiTrendingUp, FiCalendar, FiActivity, FiZap } from 'react-icons/fi';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export const TrendIntelligence = () => {
  const chartKeywords = trendData.trendingKeywords.map((k) => ({
    keyword: k.keyword,
    growth: parseInt(k.growth.replace('+', '').replace('%', '')),
  }));

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          Trend <span className="text-gradient">Intelligence</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Real-time market sentiment telemetry, viral keywords, and cultural festival opportunities.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Top Keyword Momentum"
          value="#BioPeptideGlow"
          change="+340%"
          trend="up"
          icon={FiZap}
          color="#8F7BFF"
        />
        <StatCard
          title="Active Festival Windows"
          value="3 Global Events"
          subtitle="Highest Q3 opportunity window"
          icon={FiCalendar}
          color="#F3D382"
        />
        <StatCard
          title="Consumer Sentiment Index"
          value="96.4% Positive"
          change="+3.1%"
          trend="up"
          icon={FiActivity}
          color="#6EE7B7"
        />
      </div>

      {/* Keywords & Heatmap Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Keywords Table & Chart */}
        <GlassCard className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <FiTrendingUp className="text-accent-mint" /> Viral Keyword Momentum
            </h3>
            <span className="text-xs text-slate-400">Live 24h Feed</span>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartKeywords}>
                <XAxis dataKey="keyword" stroke="#94A3B8" fontSize={10} />
                <YAxis stroke="#64748B" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#16161E', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Bar dataKey="growth" fill="#8F7BFF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2">
            {trendData.trendingKeywords.map((kw, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs">
                <span className="font-bold text-white font-mono">{kw.keyword}</span>
                <div className="flex items-center gap-4">
                  <span className="text-slate-400">{kw.volume}</span>
                  <span className="text-accent-mint font-bold">{kw.growth}</span>
                  <span className="px-2 py-0.5 rounded-full bg-accent-lavender/10 text-accent-lavender font-semibold">{kw.sentiment}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Consumer Sentiment Heatmap Placeholder */}
        <GlassCard className="space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white text-lg mb-2 flex items-center gap-2">
              <FiZap className="text-accent-gold" /> Sentiment Heatmap
            </h3>
            <p className="text-xs text-slate-400 mb-4">Regional viral sentiment intensity map.</p>

            {/* Interactive Grid Heatmap */}
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 16 }).map((_, idx) => {
                const intensities = [
                  'bg-[#8F7BFF]/20',
                  'bg-[#8F7BFF]/40',
                  'bg-[#8F7BFF]/70',
                  'bg-brand-gradient shadow-glow-purple',
                ];
                const intensity = intensities[idx % intensities.length];

                return (
                  <div
                    key={idx}
                    className={`h-14 rounded-xl border border-white/10 ${intensity} flex items-center justify-center text-[10px] font-mono text-white font-bold transition-all hover:scale-105 cursor-pointer`}
                  >
                    R-{idx + 1}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-slate-400 flex items-center justify-between pt-4 border-t border-white/10">
            <span>Low Intensity</span>
            <div className="w-24 h-2 rounded-full bg-gradient-to-r from-[#8F7BFF]/20 to-[#C9B8FF]" />
            <span className="text-white font-bold">High Surge</span>
          </div>
        </GlassCard>
      </div>

      {/* Trend Cards & Festival Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trend Cards */}
        <GlassCard className="space-y-4">
          <h3 className="font-bold text-white text-lg">Market Trend Shift Cards</h3>
          <div className="space-y-3">
            {trendData.trendCards.map((tr) => (
              <div key={tr.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-accent-lavender uppercase">{tr.category}</span>
                  <span className="px-2 py-0.5 rounded-full bg-accent-mint/10 text-accent-mint text-[10px] font-bold">
                    Momentum {tr.momentum}
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm">{tr.title}</h4>
                <p className="text-xs text-slate-300">{tr.description}</p>
                <div className="text-xs text-accent-gold font-semibold pt-1">Impact: {tr.impact}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Festival Playbook */}
        <GlassCard className="space-y-4">
          <h3 className="font-bold text-white text-lg">Cultural Festival Opportunities</h3>
          <div className="space-y-3">
            {trendData.festivals.map((fest, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">{fest.name}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-gradient text-slate-950 text-xs font-bold">
                    Score {fest.opportunityScore}
                  </span>
                </div>
                <div className="text-xs text-slate-400">{fest.date}</div>
                <p className="text-xs text-slate-300 italic pt-1">
                  <strong>Recommended Angle:</strong> {fest.recommendedAngle}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
