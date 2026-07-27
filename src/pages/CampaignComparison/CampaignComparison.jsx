import React from 'react';
import comparisonData from '../../mock/comparison.json';
import { GlassCard } from '../../components/Cards/GlassCard';
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

      {/* ── Page Title Row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1
            className="font-extrabold text-[#4A2E38] tracking-tight leading-tight font-serif"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)' }}
          >
            Campaign{' '}
            <span className="text-gradient-rose">Comparison</span>
          </h1>
          <p className="text-[#7D6670] text-sm mt-1 leading-relaxed">
            Side-by-side A/B/C version matrix with AI winner badge attribution.
          </p>
        </div>

        {/* Winner badge */}
        <div className="inline-flex flex-shrink-0 items-center gap-2 px-4 py-2 rounded-full
          bg-[#F3D8DE] border border-[#EDD5DB] text-[#4A2E38] text-xs font-bold whitespace-nowrap shadow-soft-sm">
          <FiAward className="w-4 h-4 text-[#A96A80]" />
          Winner Badge: {comparisonData.winnerVersion}
        </div>
      </div>

      {/* ── Recommended Strategy Banner ── */}
      <div className="rounded-2xl border border-[#A96A80] bg-gradient-to-r from-[#FFF8F8] via-[#F8E8EB] to-[#F3D8DE]
        shadow-soft-lg p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          {/* Left: label + title + reason */}
          <div className="space-y-1.5 min-w-0 flex-1">
            <span className="text-xs font-bold text-[#A96A80] uppercase tracking-widest block">
              Recommended Strategy
            </span>
            <h3
              className="font-bold text-[#4A2E38] font-serif leading-snug break-words"
              style={{ fontSize: 'clamp(1.15rem, 3vw, 1.5rem)' }}
            >
              {comparisonData.versions[0].name}
            </h3>
            <p className="text-sm text-[#7D6670] leading-relaxed break-words max-w-prose">
              {comparisonData.reason}
            </p>
          </div>

          {/* Right: ROI metric */}
          <div className="flex-shrink-0 text-center sm:text-right bg-[#FFFFFF] border border-[#EDD5DB]
            rounded-2xl px-6 py-4 shadow-soft-sm">
            <div className="text-xs font-semibold text-[#7D6670] uppercase tracking-wider mb-1">
              Projected ROI
            </div>
            <div
              className="font-extrabold text-[#A96A80] font-serif leading-none"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
            >
              {comparisonData.versions[0].projectedRoi}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3 Version Cards Side-by-Side ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {comparisonData.versions.map((ver) => {
          const isWinner = ver.name.startsWith(comparisonData.winnerVersion);

          return (
            <div
              key={ver.id}
              className={`
                flex flex-col justify-between rounded-2xl border p-6 bg-[#FFFFFF]
                shadow-soft transition-all duration-300 hover:-translate-y-1
                ${isWinner
                  ? 'border-[#A96A80] shadow-soft-lg ring-1 ring-[#A96A80]/30'
                  : 'border-[#EDD5DB]'}
              `}
            >
              {/* Top section: id + winner badge + name + tagline + details */}
              <div className="space-y-4 flex-1">

                {/* ID row */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-[#A08A92] bg-[#F8E8EB]
                    px-2.5 py-1 rounded-full border border-[#EDD5DB] tracking-wider">
                    {ver.id.toUpperCase()}
                  </span>
                  {isWinner && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                      bg-[#A96A80] text-white text-[10px] font-extrabold tracking-wider shadow-soft-sm">
                      <FiCheckCircle className="w-3 h-3" />
                      WINNER
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3
                  className="font-bold text-[#4A2E38] font-serif leading-snug break-words"
                  style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)' }}
                >
                  {ver.name}
                </h3>

                {/* Tagline */}
                <p className="text-sm text-[#A96A80] italic leading-relaxed break-words">
                  "{ver.tagline}"
                </p>

                {/* Tone & Primary Angle */}
                <div className="pt-4 border-t border-[#EDD5DB] space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-[#A08A92] uppercase tracking-wider block mb-0.5">
                      Tone &amp; Style
                    </span>
                    <span className="text-sm text-[#4A2E38] font-semibold leading-snug break-words">
                      {ver.tone}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-[#A08A92] uppercase tracking-wider block mb-0.5">
                      Primary Angle
                    </span>
                    <span className="text-sm text-[#7D6670] leading-relaxed break-words">
                      {ver.primaryAngle}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom: Score & ROI metrics — always pinned to bottom */}
              <div className="grid grid-cols-2 gap-3 pt-5 mt-5 border-t border-[#EDD5DB]">
                <div className="p-3 rounded-xl bg-[#F8E8EB] border border-[#EDD5DB] text-center">
                  <div className="text-[11px] font-semibold text-[#A08A92] uppercase tracking-wider mb-1">
                    Score
                  </div>
                  <div className="text-2xl font-extrabold text-[#4A2E38] font-serif leading-none">
                    {ver.campaignScore}
                    <span className="text-sm font-medium text-[#A08A92]">/100</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#F8E8EB] border border-[#EDD5DB] text-center">
                  <div className="text-[11px] font-semibold text-[#A08A92] uppercase tracking-wider mb-1">
                    ROI
                  </div>
                  <div className="text-2xl font-extrabold text-[#A96A80] font-serif leading-none">
                    {ver.projectedRoi}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Score & Virality Bar Chart ── */}
      <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB]">
        <h3 className="font-bold text-[#4A2E38] text-lg mb-5 flex items-center gap-2 font-serif">
          <FiColumns className="text-[#A96A80] flex-shrink-0" />
          Version Score &amp; Virality Benchmarks
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
              <XAxis
                dataKey="name"
                stroke="#7D6670"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#EDD5DB' }}
              />
              <YAxis
                stroke="#7D6670"
                fontSize={12}
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#EDD5DB',
                  borderRadius: '12px',
                  color: '#4A2E38',
                  boxShadow: '0 4px 16px rgba(169,106,128,0.12)',
                  fontSize: '12px',
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '12px', color: '#7D6670', paddingTop: '12px' }}
              />
              <Bar dataKey="Score" fill="#A96A80" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Virality" fill="#D89AAA" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* ── Detailed Metrics Matrix Table ── */}
      <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB]">
        <h3 className="font-bold text-[#4A2E38] text-lg mb-5 font-serif">
          Detailed Metrics Matrix
        </h3>
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-left text-sm border-collapse min-w-[480px]">
            <thead>
              <tr className="bg-[#F8E8EB] text-[#7D6670] text-xs uppercase tracking-wider">
                <th className="py-3.5 px-5 font-bold rounded-l-xl">Metric</th>
                {comparisonData.versions.map((v) => (
                  <th key={v.id} className="py-3.5 px-5 font-bold last:rounded-r-xl">
                    {v.name.split(':')[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDD5DB]">
              <tr className="hover:bg-[#FFF8F8] transition-colors">
                <td className="py-4 px-5 font-semibold text-[#4A2E38] whitespace-nowrap">
                  CTR Estimate
                </td>
                {comparisonData.versions.map((v) => (
                  <td key={v.id} className="py-4 px-5 font-bold text-[#A96A80]">
                    {v.ctrEstimate}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-[#FFF8F8] transition-colors">
                <td className="py-4 px-5 font-semibold text-[#4A2E38] whitespace-nowrap">
                  Estimated CPC
                </td>
                {comparisonData.versions.map((v) => (
                  <td key={v.id} className="py-4 px-5 text-[#7D6670] font-medium">
                    {v.estimatedCpc}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-[#FFF8F8] transition-colors">
                <td className="py-4 px-5 font-semibold text-[#4A2E38] whitespace-nowrap">
                  Best Performing Channel
                </td>
                {comparisonData.versions.map((v) => (
                  <td key={v.id} className="py-4 px-5">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#F3D8DE] border border-[#EDD5DB]
                      text-[#4A2E38] text-xs font-bold">
                      {v.bestChannel}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </GlassCard>

    </div>
  );
};
