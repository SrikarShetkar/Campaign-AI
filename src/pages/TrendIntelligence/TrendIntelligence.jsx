import React from 'react';
import trendData from '../../mock/trends.json';
import { GlassCard } from '../../components/Cards/GlassCard';
import { StatCard } from '../../components/Cards/StatCard';
import { FiTrendingUp, FiCalendar, FiActivity, FiZap } from 'react-icons/fi';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const tooltipStyle = {
  backgroundColor: '#FFFFFF',
  borderColor: '#EDD5DB',
  borderRadius: '12px',
  color: '#4A2E38',
  fontSize: '12px',
};

export const TrendIntelligence = () => {
  const chartKeywords = trendData.trendingKeywords.map((k) => ({
    keyword: k.keyword,
    growth: parseInt(k.growth.replace('+', '').replace('%', '')),
  }));

  const heatIntensities = [
    'bg-[#F8D9DF]',
    'bg-[#EBC8D0]',
    'bg-[#D89AAA]',
    'bg-[#A96A80]',
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1
          className="font-extrabold text-[#4A2E38] tracking-tight font-serif"
          style={{ fontSize: 'clamp(1.6rem,4vw,2.25rem)' }}
        >
          Trend <span className="text-gradient-rose">Intelligence</span>
        </h1>
        <p className="text-[#7D6670] text-sm mt-1 leading-relaxed">
          Real-time market sentiment telemetry, viral keywords, and cultural festival opportunities.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Top Keyword Momentum" value="#BioPeptideGlow" change="+340%" trend="up" icon={FiZap} />
        <StatCard title="Active Festival Windows" value="3 Global Events" subtitle="Highest Q3 opportunity" icon={FiCalendar} />
        <StatCard title="Consumer Sentiment Index" value="96.4% Positive" change="+3.1%" trend="up" icon={FiActivity} />
      </div>

      {/* Keywords Chart + Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Keywords */}
        <GlassCard className="lg:col-span-2 bg-[#FFFFFF] border-[#EDD5DB] space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#4A2E38] text-lg flex items-center gap-2 font-serif">
              <FiTrendingUp className="text-[#A96A80] flex-shrink-0" /> Viral Keyword Momentum
            </h3>
            <span className="text-xs text-[#A08A92] bg-[#F8E8EB] px-3 py-1 rounded-full border border-[#EDD5DB]">Live 24h Feed</span>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartKeywords}>
                <XAxis dataKey="keyword" stroke="#7D6670" fontSize={10} tickLine={false} />
                <YAxis stroke="#7D6670" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="growth" fill="#A96A80" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2">
            {trendData.trendingKeywords.map((kw, i) => (
              <div
                key={`kw-${i}`}
                className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-[#F8E8EB] border border-[#EDD5DB] text-xs"
              >
                <span className="font-bold text-[#4A2E38] font-mono">{kw.keyword}</span>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[#7D6670]">{kw.volume}</span>
                  <span className="font-bold text-[#A96A80]">{kw.growth}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFFFFF] border border-[#EDD5DB] text-[#4A2E38] font-semibold">
                    {kw.sentiment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Sentiment Heatmap */}
        <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB] space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-[#4A2E38] text-lg mb-1 flex items-center gap-2 font-serif">
              <FiZap className="text-[#A96A80]" /> Sentiment Heatmap
            </h3>
            <p className="text-xs text-[#7D6670] mb-5">Regional viral sentiment intensity map.</p>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 16 }).map((_, idx) => {
                const intensity = heatIntensities[idx % heatIntensities.length];
                const textColor = idx % 4 >= 2 ? 'text-white' : 'text-[#4A2E38]';
                return (
                  <div
                    key={`heat-${idx}`}
                    className={`h-14 rounded-xl border border-[#EDD5DB] ${intensity} flex items-center justify-center
                      text-[10px] font-mono font-bold ${textColor} transition-all hover:scale-105 cursor-pointer shadow-soft-sm`}
                  >
                    R-{idx + 1}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-xs text-[#7D6670] flex items-center justify-between pt-4 border-t border-[#EDD5DB]">
            <span>Low Intensity</span>
            <div className="w-24 h-2 rounded-full bg-gradient-to-r from-[#F8D9DF] to-[#A96A80]" />
            <span className="font-bold text-[#4A2E38]">High Surge</span>
          </div>
        </GlassCard>
      </div>

      {/* Trend Cards & Festival Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trend Cards */}
        <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB] space-y-4">
          <h3 className="font-bold text-[#4A2E38] text-lg font-serif">Market Trend Shift Cards</h3>
          <div className="space-y-3">
            {trendData.trendCards.map((tr) => (
              <div key={tr.id} className="p-4 rounded-2xl bg-[#F8E8EB] border border-[#EDD5DB] space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-bold text-[#A96A80] uppercase tracking-wider">{tr.category}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFFFFF] border border-[#EDD5DB] text-[#4A2E38] text-[10px] font-bold">
                    Momentum {tr.momentum}
                  </span>
                </div>
                <h4 className="font-bold text-[#4A2E38] text-sm font-serif leading-snug">{tr.title}</h4>
                <p className="text-xs text-[#7D6670] leading-relaxed">{tr.description}</p>
                <div className="text-xs text-[#A96A80] font-semibold pt-1">Impact: {tr.impact}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Festival Playbook */}
        <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB] space-y-4">
          <h3 className="font-bold text-[#4A2E38] text-lg font-serif">Cultural Festival Opportunities</h3>
          <div className="space-y-3">
            {trendData.festivals.map((fest, idx) => (
              <div key={`fest-${idx}`} className="p-4 rounded-2xl bg-[#F8E8EB] border border-[#EDD5DB] space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h4 className="font-bold text-[#4A2E38] text-sm font-serif">{fest.name}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#A96A80] text-white text-xs font-bold">
                    Score {fest.opportunityScore}
                  </span>
                </div>
                <div className="text-xs text-[#A08A92]">{fest.date}</div>
                <p className="text-xs text-[#7D6670] italic pt-1 leading-relaxed">
                  <strong className="text-[#4A2E38] not-italic">Recommended Angle:</strong> {fest.recommendedAngle}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
