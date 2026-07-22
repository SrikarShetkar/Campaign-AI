import React from 'react';
import { useCampaignStore } from '../../store/useCampaignStore';
import { GlassCard } from '../../components/Cards/GlassCard';
import { StatCard } from '../../components/Cards/StatCard';
import { FiUser, FiAward, FiShield, FiBriefcase, FiZap, FiCheckCircle } from 'react-icons/fi';

export const Profile = () => {
  const { campaigns } = useCampaignStore();

  return (
    <div className="space-y-8 pb-12">
      {/* User Header Profile Card */}
      <GlassCard glow className="p-8 border-brand-start/30 shadow-glow-purple">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-brand-gradient flex items-center justify-center text-slate-950 font-extrabold text-3xl shadow-glow-purple flex-shrink-0">
            EK
          </div>
          <div className="space-y-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">Emma K.</h1>
              <span className="px-3 py-0.5 rounded-full bg-brand-gradient text-slate-950 font-extrabold text-xs">
                Chief Marketing Officer
              </span>
            </div>
            <p className="text-sm text-slate-300">AuraGlow Cosmetics Global</p>
            <p className="text-xs text-slate-400 font-mono">emma.k@auraglow.cosmetics | Enterprise Admin</p>
          </div>
        </div>
      </GlassCard>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Active Campaigns" value={campaigns.length} icon={FiAward} color="#8F7BFF" />
        <StatCard title="Organization Seats" value="12 / 20" subtitle="Enterprise Plan" icon={FiBriefcase} color="#F3D382" />
        <StatCard title="Security Clearance" value="Tier 1 Full" subtitle="SOC 2 Compliant" icon={FiShield} color="#6EE7B7" />
      </div>

      {/* Organization & Preferences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Organization Info */}
        <GlassCard className="space-y-4">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <FiBriefcase className="text-accent-lavender" /> Enterprise Organization
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-3 rounded-xl bg-white/5">
              <span className="text-slate-400">Company Name</span>
              <span className="text-white font-bold">AuraGlow Cosmetics Inc.</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-white/5">
              <span className="text-slate-400">Domain</span>
              <span className="text-accent-lavender font-mono">auraglow.cosmetics</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-white/5">
              <span className="text-slate-400">Billing Tier</span>
              <span className="text-accent-gold font-bold">Enterprise Unlimited AI</span>
            </div>
          </div>
        </GlassCard>

        {/* User Preferences */}
        <GlassCard className="space-y-4">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <FiZap className="text-accent-gold" /> Personal AI Preferences
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <FiCheckCircle className="text-accent-mint" />
              <span>Default Brand Tone: Sophisticated & Science-Backed</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <FiCheckCircle className="text-accent-mint" />
              <span>Auto-export format: Executive 12-page PDF</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <FiCheckCircle className="text-accent-mint" />
              <span>High-Frequency Viral Trend Telemetry Active</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Recent Activity Log */}
      <GlassCard className="space-y-4">
        <h3 className="font-bold text-white text-lg">Recent User Activity</h3>
        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
            <div>
              <span className="font-bold text-white">Generated Campaign:</span> AuraGlow Silk Skin Summer Launch
              <span className="block text-[10px] text-slate-400">30 minutes ago</span>
            </div>
            <span className="text-accent-mint font-bold">+94 Score</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
            <div>
              <span className="font-bold text-white">Updated Brand Guidelines:</span> Approved Vocabulary Tokens
              <span className="block text-[10px] text-slate-400">Yesterday at 4:15 PM</span>
            </div>
            <span className="text-accent-lavender font-bold">Enforced</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
