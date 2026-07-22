import React, { useState } from 'react';
import { GlassCard } from '../../components/Cards/GlassCard';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { FiSettings, FiSliders, FiBell, FiCpu, FiGlobe, FiEye, FiCheck } from 'react-icons/fi';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('AI Provider');
  const [saved, setSaved] = useState(false);

  const tabs = ['AI Provider', 'Notifications', 'Language & Region', 'Appearance', 'Workspace Governance'];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          Application <span className="text-gradient">Settings</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Configure multi-agent LLM providers, notification triggers, and enterprise security policies.
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="glass-panel p-2 flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-brand-gradient text-slate-950 shadow-glow-purple font-bold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Settings Content Card */}
      <GlassCard className="p-6 md:p-8 space-y-6">
        {activeTab === 'AI Provider' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <FiCpu className="text-accent-lavender" /> Neural Agent Engine Configuration
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary LLM Provider</label>
                <select className="w-full px-4 py-2.5 bg-[#16161E] border border-white/10 rounded-xl text-white text-sm focus:border-[#8F7BFF]">
                  <option>CampaignMind Autonomous Neural Mesh (Recommended)</option>
                  <option>OpenAI GPT-4o / GPT-4 Turbo</option>
                  <option>Anthropic Claude 3.5 Sonnet</option>
                  <option>Google Gemini 1.5 Pro Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Vector DB Retrieval Index</label>
                <select className="w-full px-4 py-2.5 bg-[#16161E] border border-white/10 rounded-xl text-white text-sm focus:border-[#8F7BFF]">
                  <option>FAISS Enterprise Vector Store (Local Encrypted)</option>
                  <option>Pinecone Serverless Index</option>
                  <option>Qdrant Cloud</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">Agent Multi-Reasoning Pass</div>
                  <div className="text-slate-400">Run double evaluator agent verification for campaign scores</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#8F7BFF]" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Notifications' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <FiBell className="text-accent-gold" /> Alert & Telemetry Signals
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <span className="text-white font-medium">Viral Keyword Spike Alerts</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#8F7BFF]" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <span className="text-white font-medium">Weekly AI Performance Summaries</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#8F7BFF]" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <span className="text-white font-medium">Festival Opportunity Window Triggers</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#8F7BFF]" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Language & Region' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <FiGlobe className="text-accent-aqua" /> Regional Localization
            </h3>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">System Language</label>
              <select className="w-full px-4 py-2.5 bg-[#16161E] border border-white/10 rounded-xl text-white text-sm">
                <option>English (United States)</option>
                <option>Spanish (Global)</option>
                <option>French (European)</option>
                <option>German</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'Appearance' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <FiEye className="text-accent-mint" /> Interface Theme
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#0B0B0E] border-2 border-[#8F7BFF] text-center font-bold text-white cursor-pointer">
                Futuristic Dark Glassmorphism (Active)
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-center font-medium text-slate-400 cursor-pointer">
                High Contrast Monochrome
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Workspace Governance' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-3">
              Enterprise Workspace Policy
            </h3>
            <p className="text-xs text-slate-300">
              Single-tenant workspace active. All model weights and brand assets strictly isolated.
            </p>
          </div>
        )}

        {/* Save Button */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <PrimaryButton icon={saved ? FiCheck : undefined} onClick={handleSave}>
            {saved ? 'Settings Saved!' : 'Save Preferences'}
          </PrimaryButton>
        </div>
      </GlassCard>
    </div>
  );
};
