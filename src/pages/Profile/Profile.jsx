import React from 'react';
import { useCampaignStore } from '../../store/useCampaignStore';
import { GlassCard } from '../../components/Cards/GlassCard';
import { StatCard } from '../../components/Cards/StatCard';
import { FiUser, FiAward, FiShield, FiBriefcase, FiZap, FiCheckCircle, FiMail } from 'react-icons/fi';

export const Profile = () => {
  const { campaigns } = useCampaignStore();

  const infoRow = (label, value, valueClass = 'font-bold text-[#4A2E38]') => (
    <div className="flex items-center justify-between p-4 rounded-xl bg-[#F8E8EB] border border-[#EDD5DB]">
      <span className="text-sm text-[#7D6670]">{label}</span>
      <span className={`text-sm ${valueClass}`}>{value}</span>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Profile Header Card */}
      <div className="rounded-2xl border border-[#A96A80] bg-gradient-to-r from-[#FFF8F8] via-[#F8E8EB] to-[#F3D8DE] p-8 shadow-soft-lg">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-[#A96A80] flex items-center justify-center text-white font-extrabold text-3xl shadow-soft-lg flex-shrink-0">
            EK
          </div>

          {/* User Info */}
          <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#4A2E38] font-serif">Emma K.</h1>
              <span className="px-3 py-1 rounded-full bg-[#A96A80] text-white font-bold text-xs shadow-soft-sm">
                Chief Marketing Officer
              </span>
            </div>
            <p className="text-sm font-semibold text-[#7D6670]">AuraGlow Cosmetics Global</p>
            <p className="text-xs text-[#A08A92] font-mono flex items-center justify-center sm:justify-start gap-1.5">
              <FiMail className="w-3.5 h-3.5" />
              emma.k@auraglow.cosmetics
              <span className="px-2 py-0.5 rounded-full bg-[#F3D8DE] text-[#4A2E38] border border-[#EDD5DB] font-sans font-semibold ml-1">
                Enterprise Admin
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Active Campaigns" value={campaigns.length} icon={FiAward} />
        <StatCard title="Organisation Seats" value="12 / 20" subtitle="Enterprise Plan" icon={FiBriefcase} />
        <StatCard title="Security Clearance" value="Tier 1 Full" subtitle="SOC 2 Compliant" icon={FiShield} />
      </div>

      {/* Org + Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Organisation Info */}
        <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB] space-y-4">
          <h3 className="font-bold text-[#4A2E38] text-lg flex items-center gap-2 font-serif">
            <FiBriefcase className="text-[#A96A80]" /> Enterprise Organisation
          </h3>
          <div className="space-y-2">
            {infoRow('Company Name', 'AuraGlow Cosmetics Inc.')}
            {infoRow('Domain', 'auraglow.cosmetics', 'font-mono text-[#A96A80]')}
            {infoRow('Billing Tier', 'Enterprise Unlimited AI', 'font-bold text-[#A96A80]')}
          </div>
        </GlassCard>

        {/* Personal AI Preferences */}
        <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB] space-y-4">
          <h3 className="font-bold text-[#4A2E38] text-lg flex items-center gap-2 font-serif">
            <FiZap className="text-[#A96A80]" /> Personal AI Preferences
          </h3>
          <div className="space-y-3">
            {[
              'Default Brand Tone: Sophisticated & Science-Backed',
              'Auto-export format: Executive 12-page PDF',
              'High-Frequency Viral Trend Telemetry Active',
            ].map((pref, i) => (
              <div key={`pref-${i}`} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F8E8EB] border border-[#EDD5DB]">
                <FiCheckCircle className="text-[#A96A80] flex-shrink-0 mt-0.5 w-4 h-4" />
                <span className="text-sm text-[#4A2E38]">{pref}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recent Activity */}
      <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB] space-y-4">
        <h3 className="font-bold text-[#4A2E38] text-lg font-serif">Recent User Activity</h3>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#F8E8EB] border border-[#EDD5DB] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="font-bold text-[#4A2E38] text-sm">Generated Campaign: </span>
              <span className="text-sm text-[#7D6670]">AuraGlow Silk Skin Summer Launch</span>
              <span className="block text-xs text-[#A08A92] mt-0.5">30 minutes ago</span>
            </div>
            <span className="text-[#A96A80] font-bold text-sm flex-shrink-0">+94 Score</span>
          </div>
          <div className="p-4 rounded-xl bg-[#F8E8EB] border border-[#EDD5DB] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="font-bold text-[#4A2E38] text-sm">Updated Brand Guidelines: </span>
              <span className="text-sm text-[#7D6670]">Approved Vocabulary Tokens</span>
              <span className="block text-xs text-[#A08A92] mt-0.5">Yesterday at 4:15 PM</span>
            </div>
            <span className="text-[#A96A80] font-bold text-sm flex-shrink-0">Enforced</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
