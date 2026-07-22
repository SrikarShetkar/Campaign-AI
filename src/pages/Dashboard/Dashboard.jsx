import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaignStore } from '../../store/useCampaignStore';
import analyticsData from '../../mock/analytics.json';
import trendData from '../../mock/trends.json';
import personaData from '../../mock/personas.json';
import { StatCard } from '../../components/Cards/StatCard';
import { GlassCard } from '../../components/Cards/GlassCard';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import {
  FiZap,
  FiTrendingUp,
  FiPieChart,
  FiDollarSign,
  FiUsers,
  FiBookmark,
  FiPlusCircle,
  FiArrowUpRight,
  FiCalendar,
  FiAward,
} from 'react-icons/fi';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { campaigns, setActiveCampaign } = useCampaignStore();

  const handleViewCampaign = (cmp) => {
    setActiveCampaign(cmp);
    navigate('/result');
  };

  // Soft luxury pastel pink colors for charts
  const roseColors = ['#A96A80', '#D89AAA', '#EBC8D0', '#7D6670', '#945A70'];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#4A2E38] tracking-tight font-serif">
            Marketing <span className="text-gradient-rose">War Room</span>
          </h1>
          <p className="text-[#7D6670] text-sm mt-1">
            Real-time multi-agent campaign synthesis & consumer telemetry.
          </p>
        </div>
        <PrimaryButton icon={FiPlusCircle} onClick={() => navigate('/generator')}>
          Create New Campaign
        </PrimaryButton>
      </div>

      {/* Top 6 KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Campaign Score"
          value={`${analyticsData.kpis.campaignScore}/100`}
          change="+4.2%"
          trend="up"
          icon={FiAward}
          color="#A96A80"
        />
        <StatCard
          title="Trend Score"
          value={`${analyticsData.kpis.trendScore}/100`}
          change="+6.8%"
          trend="up"
          icon={FiTrendingUp}
          color="#A96A80"
        />
        <StatCard
          title="Virality Rate"
          value={analyticsData.kpis.viralityRate}
          change="+12.1%"
          trend="up"
          icon={FiZap}
          color="#A96A80"
        />
        <StatCard
          title="Projected ROI"
          value={analyticsData.kpis.projectedRoi}
          change="+0.8x"
          trend="up"
          icon={FiDollarSign}
          color="#A96A80"
        />
        <StatCard
          title="Target Reach"
          value={analyticsData.kpis.totalReach}
          change="+18.4%"
          trend="up"
          icon={FiUsers}
          color="#A96A80"
        />
        <StatCard
          title="Saved Campaigns"
          value={analyticsData.kpis.savedCampaignsCount}
          subtitle="Active benchmarks"
          icon={FiBookmark}
          color="#A96A80"
        />
      </div>

      {/* Main Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget Allocation Pie Chart */}
        <GlassCard className="flex flex-col justify-between bg-[#FFFFFF] border-[#EDD5DB]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#4A2E38] text-base flex items-center gap-2 font-serif">
              <FiPieChart className="text-[#A96A80]" /> Budget Channel Distribution
            </h3>
            <span className="text-xs text-[#7D6670]">Q3 Allocation</span>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.budgetAllocation}
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analyticsData.budgetAllocation.map((entry, index) => (
                    <Cell key={`budget-pie-${entry.name || index}`} fill={roseColors[index % roseColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#EDD5DB', borderRadius: '12px', color: '#4A2E38' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-[#EDD5DB] text-xs">
            {analyticsData.budgetAllocation.map((item, idx) => (
              <div key={`budget-legend-${item.name || idx}`} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: roseColors[idx % roseColors.length] }} />
                <span className="text-[#7D6670] truncate">{item.name}</span>
                <span className="font-bold text-[#4A2E38] ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Timeline Performance Area Chart */}
        <GlassCard className="lg:col-span-2 flex flex-col justify-between bg-[#FFFFFF] border-[#EDD5DB]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#4A2E38] text-base flex items-center gap-2 font-serif">
              <FiTrendingUp className="text-[#A96A80]" /> Campaign Performance Timeline
            </h3>
            <span className="text-xs text-[#A96A80] font-bold">+4.8x Peak ROI</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.timelinePerformance}>
                <defs>
                  <linearGradient id="colorImpressionsRose" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A96A80" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#A96A80" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#7D6670" fontSize={12} tickLine={false} />
                <YAxis stroke="#7D6670" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#EDD5DB', borderRadius: '12px', color: '#4A2E38' }}
                />
                <Area type="monotone" dataKey="impressions" stroke="#A96A80" strokeWidth={3} fillOpacity={1} fill="url(#colorImpressionsRose)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Marketing Funnel */}
        <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB]">
          <h3 className="font-bold text-[#4A2E38] text-base mb-4 flex items-center gap-2 font-serif">
            <FiUsers className="text-[#A96A80]" /> Marketing Funnel Telemetry
          </h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.marketingFunnel} layout="vertical">
                <XAxis type="number" stroke="#7D6670" fontSize={12} />
                <YAxis dataKey="stage" type="category" stroke="#4A2E38" fontSize={11} width={130} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#EDD5DB', borderRadius: '12px', color: '#4A2E38' }} />
                <Bar dataKey="count" fill="#A96A80" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Campaign Trend Radar */}
        <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB]">
          <h3 className="font-bold text-[#4A2E38] text-base mb-4 flex items-center gap-2 font-serif">
            <FiAward className="text-[#A96A80]" /> Campaign Attribute Radar vs Industry
          </h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={analyticsData.campaignTrendRadar}>
                <PolarGrid stroke="#EDD5DB" />
                <PolarAngleAxis dataKey="attribute" stroke="#4A2E38" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#7D6670" />
                <Radar name="AuraGlow" dataKey="AuraGlow" stroke="#A96A80" fill="#A96A80" fillOpacity={0.5} />
                <Radar name="Industry Benchmark" dataKey="IndustryAvg" stroke="#D89AAA" fill="#D89AAA" fillOpacity={0.2} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#EDD5DB', borderRadius: '12px', color: '#4A2E38' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Active AI Campaigns Table */}
      <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-[#4A2E38] text-lg font-serif">Active AI Campaigns</h3>
            <p className="text-xs text-[#7D6670]">Select any campaign to view full executive deck & AI generated creatives.</p>
          </div>
          <button
            onClick={() => navigate('/history')}
            className="text-xs font-bold text-[#A96A80] hover:underline flex items-center gap-1"
          >
            View All ({campaigns.length}) <FiArrowUpRight />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#EDD5DB] text-[#7D6670] text-xs uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">Campaign Name</th>
                <th className="py-3 px-4 font-bold">Brand</th>
                <th className="py-3 px-4 font-bold">Score</th>
                <th className="py-3 px-4 font-bold">Virality</th>
                <th className="py-3 px-4 font-bold">ROI</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDD5DB]">
              {campaigns.map((cmp, idx) => (
                <tr key={cmp.id || `dash-cmp-${idx}`} className="hover:bg-[#F8E8EB]/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-[#4A2E38]">
                    {cmp.name || cmp.title || cmp.campaign_title || 'Untitled Campaign'}
                    <span className="block text-xs font-normal text-[#7D6670]">{cmp.tagline}</span>
                  </td>
                  <td className="py-4 px-4 text-[#7D6670]">{cmp.brand || cmp.brand_name}</td>
                  <td className="py-4 px-4 font-bold text-[#A96A80]">{cmp.campaignScore || 96}/100</td>
                  <td className="py-4 px-4 text-[#4A2E38] font-semibold">{cmp.virality || 94}%</td>
                  <td className="py-4 px-4 text-[#A96A80] font-bold">{cmp.projectedRoi || cmp.roi || '5.2x'}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-[#F3D8DE] text-[#4A2E38] border border-[#EDD5DB]">
                      {cmp.status || 'Active'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleViewCampaign(cmp)}
                      className="px-3.5 py-1.5 rounded-full bg-[#A96A80] text-white font-bold text-xs hover:bg-[#945A70] transition-all shadow-soft-sm"
                    >
                      View Result
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Cards Grid: Recent Trends, Festival Cards & Consumer Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Trends */}
        <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#4A2E38] text-base flex items-center gap-2 font-serif">
              <FiTrendingUp className="text-[#A96A80]" /> Market Signals
            </h3>
            <span className="text-xs text-[#A96A80] font-bold">+340% Spike</span>
          </div>
          <div className="space-y-3">
            {trendData.trendingKeywords.slice(0, 3).map((kw, i) => (
              <div key={`dash-kw-${kw.keyword || i}`} className="p-3 rounded-xl bg-[#F8E8EB] border border-[#EDD5DB] flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-[#4A2E38]">{kw.keyword}</div>
                  <div className="text-xs text-[#7D6670]">{kw.volume} monthly queries</div>
                </div>
                <span className="text-xs font-extrabold text-[#A96A80] px-2.5 py-0.5 rounded-full bg-[#FFFFFF] border border-[#EDD5DB]">
                  {kw.growth}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Festival Cards */}
        <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#4A2E38] text-base flex items-center gap-2 font-serif">
              <FiCalendar className="text-[#A96A80]" /> Festival Opportunities
            </h3>
            <span className="text-xs text-[#7D6670]">Q3/Q4</span>
          </div>
          <div className="space-y-3">
            {trendData.festivals.slice(0, 2).map((fest, i) => (
              <div key={`dash-fest-${fest.name || i}`} className="p-3 rounded-xl bg-[#F8E8EB] border border-[#EDD5DB] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-[#4A2E38]">{fest.name}</div>
                  <span className="text-[10px] font-bold text-white px-2.5 py-0.5 rounded-full bg-[#A96A80]">
                    Score {fest.opportunityScore}
                  </span>
                </div>
                <div className="text-xs text-[#7D6670]">{fest.date}</div>
                <p className="text-xs text-[#7D6670] italic pt-1">{fest.recommendedAngle}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Consumer Insights Cards */}
        <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#4A2E38] text-base flex items-center gap-2 font-serif">
              <FiUsers className="text-[#A96A80]" /> Active Consumer Persona
            </h3>
            <span className="text-xs text-[#7D6670]">Target Match</span>
          </div>
          <div className="p-4 rounded-xl bg-[#F8E8EB] border border-[#EDD5DB] space-y-2">
            <div className="font-bold text-sm text-[#4A2E38]">{personaData[0].name}</div>
            <div className="text-xs text-[#7D6670]">Age: {personaData[0].age} | Income: {personaData[0].income}</div>
            <p className="text-xs text-[#4A2E38]">
              <strong>Pain Point:</strong> {personaData[0].painPoints[0]}
            </p>
            <div className="flex flex-wrap gap-1 pt-2">
              {personaData[0].interests.slice(0, 3).map((tag, idx) => (
                <span key={`dash-tag-${idx}`} className="px-2.5 py-0.5 text-[10px] rounded-full bg-[#FFFFFF] border border-[#EDD5DB] text-[#4A2E38]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
