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

const ROSE = ['#A96A80', '#D89AAA', '#EBC8D0', '#945A70', '#7D6670'];

const tooltipStyle = {
  backgroundColor: '#FFFFFF',
  borderColor: '#EDD5DB',
  borderRadius: '12px',
  color: '#4A2E38',
  boxShadow: '0 4px 16px rgba(169,106,128,0.12)',
  fontSize: '12px',
};

export const Analytics = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1
          className="font-extrabold text-[#4A2E38] tracking-tight font-serif"
          style={{ fontSize: 'clamp(1.6rem,4vw,2.25rem)' }}
        >
          Analytics &amp; <span className="text-gradient-rose">Telemetry</span>
        </h1>
        <p className="text-[#7D6670] text-sm mt-1 leading-relaxed">
          Comprehensive multi-channel marketing performance telemetry &amp; AI forecast models.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Average Campaign Score" value="94 / 100" change="+3.4%" trend="up" icon={FiAward} />
        <StatCard title="Overall ROI Multiplier" value="4.8x" change="+0.6x" trend="up" icon={FiDollarSign} />
        <StatCard title="Combined Reach" value="4.8M" change="+22.1%" trend="up" icon={FiUsers} />
        <StatCard title="Conversion Efficiency" value="12.4%" change="+1.8%" trend="up" icon={FiTrendingUp} />
      </div>

      {/* 4 Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart */}
        <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB]">
          <h3 className="font-bold text-[#4A2E38] text-base mb-5 flex items-center gap-2 font-serif">
            <FiTrendingUp className="text-[#A96A80] flex-shrink-0" /> Weekly Conversion Growth
          </h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.timelinePerformance}>
                <defs>
                  <linearGradient id="areaRose" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A96A80" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#A96A80" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#7D6670" fontSize={11} tickLine={false} />
                <YAxis stroke="#7D6670" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="conversions" stroke="#A96A80" fill="url(#areaRose)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Pie Chart */}
        <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB]">
          <h3 className="font-bold text-[#4A2E38] text-base mb-5 flex items-center gap-2 font-serif">
            <FiPieChart className="text-[#A96A80] flex-shrink-0" /> Channel Spend Share
          </h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analyticsData.budgetAllocation} innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                  {analyticsData.budgetAllocation.map((entry, index) => (
                    <Cell key={`pie-cell-${index}`} fill={ROSE[index % ROSE.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Funnel Bar */}
        <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB]">
          <h3 className="font-bold text-[#4A2E38] text-base mb-5 flex items-center gap-2 font-serif">
            <FiBarChart2 className="text-[#A96A80] flex-shrink-0" /> Marketing Funnel Stages
          </h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.marketingFunnel} layout="vertical" margin={{ left: 8 }}>
                <XAxis type="number" stroke="#7D6670" fontSize={10} tickLine={false} />
                <YAxis dataKey="stage" type="category" stroke="#4A2E38" fontSize={10} width={120} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="count" fill="#A96A80" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Radar */}
        <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB]">
          <h3 className="font-bold text-[#4A2E38] text-base mb-5 flex items-center gap-2 font-serif">
            <FiAward className="text-[#A96A80] flex-shrink-0" /> Performance vs Benchmark Radar
          </h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={analyticsData.campaignTrendRadar}>
                <PolarGrid stroke="#EDD5DB" />
                <PolarAngleAxis dataKey="attribute" stroke="#7D6670" fontSize={10} />
                <Radar name="AuraGlow" dataKey="AuraGlow" stroke="#A96A80" fill="#A96A80" fillOpacity={0.5} />
                <Radar name="Industry" dataKey="IndustryAvg" stroke="#D89AAA" fill="#D89AAA" fillOpacity={0.2} />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Channel Attribution Table */}
      <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB]">
        <h3 className="font-bold text-[#4A2E38] text-lg mb-5 font-serif">Channel Attribution Breakdown</h3>
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-left text-sm border-collapse min-w-[520px]">
            <thead>
              <tr className="bg-[#F8E8EB] text-[#7D6670] text-xs uppercase tracking-wider">
                <th className="py-3.5 px-5 font-bold rounded-l-xl">Channel</th>
                <th className="py-3.5 px-5 font-bold">Total Clicks</th>
                <th className="py-3.5 px-5 font-bold">CTR</th>
                <th className="py-3.5 px-5 font-bold">Avg CPC</th>
                <th className="py-3.5 px-5 font-bold rounded-r-xl">Conversions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDD5DB]">
              {analyticsData.channelBreakdown.map((ch, idx) => (
                <tr key={`ch-${idx}`} className="hover:bg-[#FFF8F8] transition-colors">
                  <td className="py-4 px-5 font-bold text-[#4A2E38]">{ch.channel}</td>
                  <td className="py-4 px-5 text-[#7D6670] font-mono">{ch.clicks.toLocaleString()}</td>
                  <td className="py-4 px-5 font-bold text-[#A96A80]">{ch.ctr}</td>
                  <td className="py-4 px-5 text-[#7D6670]">{ch.cpc}</td>
                  <td className="py-4 px-5 font-bold text-[#4A2E38]">{ch.conversions.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
