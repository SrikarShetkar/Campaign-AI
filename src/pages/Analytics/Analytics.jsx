import React from 'react';
import analyticsData from '../../mock/analytics.json';
import { GlassCard } from '../../components/Cards/GlassCard';
import { StatCard } from '../../components/Cards/StatCard';
import { FiBarChart2, FiTrendingUp, FiPieChart, FiDollarSign, FiUsers, FiAward } from 'react-icons/fi';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export const Analytics = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          Analytics & <span className="text-gradient">Telemetry</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Comprehensive multi-channel marketing performance telemetry & AI forecast models.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Average Campaign Score" value="94 / 100" change="+3.4%" trend="up" icon={FiAward} color="#8F7BFF" />
        <StatCard title="Overall ROI Multiplier" value="4.8x" change="+0.6x" trend="up" icon={FiDollarSign} color="#F3D382" />
        <StatCard title="Combined Reach" value="4.8M" change="+22.1%" trend="up" icon={FiUsers} color="#67E8F9" />
        <StatCard title="Conversion Efficiency" value="12.4%" change="+1.8%" trend="up" icon={FiTrendingUp} color="#6EE7B7" />
      </div>

      {/* 4 Charts Grid (Pie, Bar, Radar, Area) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line / Area Chart */}
        <GlassCard>
          <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
            <FiTrendingUp className="text-accent-mint" /> Weekly Conversion Growth
          </h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.timelinePerformance}>
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#16161E', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="conversions" stroke="#6EE7B7" fill="#6EE7B7" fillOpacity={0.2} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Budget Pie Chart */}
        <GlassCard>
          <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
            <FiPieChart className="text-accent-lavender" /> Channel Spend Share
          </h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analyticsData.budgetAllocation} innerRadius={50} outerRadius={80} dataKey="value">
                  {analyticsData.budgetAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#16161E', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Funnel Bar Chart */}
        <GlassCard>
          <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
            <FiBarChart2 className="text-accent-aqua" /> Marketing Funnel Stages
          </h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.marketingFunnel} layout="vertical">
                <XAxis type="number" stroke="#64748B" fontSize={10} />
                <YAxis dataKey="stage" type="category" stroke="#94A3B8" fontSize={10} width={120} />
                <Tooltip contentStyle={{ backgroundColor: '#16161E', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Bar dataKey="count" fill="#8F7BFF" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Radar Attributes */}
        <GlassCard>
          <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
            <FiAward className="text-accent-gold" /> Performance vs Benchmark Radar
          </h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={analyticsData.campaignTrendRadar}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="attribute" stroke="#94A3B8" fontSize={10} />
                <Radar name="AuraGlow" dataKey="AuraGlow" stroke="#8F7BFF" fill="#8F7BFF" fillOpacity={0.5} />
                <Radar name="Industry" dataKey="IndustryAvg" stroke="#F3D382" fill="#F3D382" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Detailed Channel Performance Table */}
      <GlassCard>
        <h3 className="font-bold text-white text-lg mb-4">Channel Attribution Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-xs uppercase">
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Total Clicks</th>
                <th className="py-3 px-4">CTR</th>
                <th className="py-3 px-4">Avg CPC</th>
                <th className="py-3 px-4">Conversions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {analyticsData.channelBreakdown.map((ch, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{ch.channel}</td>
                  <td className="py-3 px-4 text-slate-300 font-mono">{ch.clicks.toLocaleString()}</td>
                  <td className="py-3 px-4 text-accent-mint font-bold">{ch.ctr}</td>
                  <td className="py-3 px-4 text-slate-300">{ch.cpc}</td>
                  <td className="py-3 px-4 text-accent-lavender font-bold">{ch.conversions.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
