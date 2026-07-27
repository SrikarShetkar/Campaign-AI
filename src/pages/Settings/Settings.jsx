import React, { useState } from 'react';
import { GlassCard } from '../../components/Cards/GlassCard';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { FiSettings, FiBell, FiCpu, FiGlobe, FiEye, FiCheck, FiShield } from 'react-icons/fi';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('AI Provider');
  const [saved, setSaved] = useState(false);

  const tabs = ['AI Provider', 'Notifications', 'Language & Region', 'Appearance', 'Workspace Governance'];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputCls = `w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl
    text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none focus:ring-1 focus:ring-[#A96A80]/30 transition-all`;

  const labelCls = 'block text-xs font-semibold text-[#7D6670] mb-1.5 uppercase tracking-wider';

  const toggleRow = (label) => (
    <div className="flex items-center justify-between p-4 rounded-xl bg-[#F8E8EB] border border-[#EDD5DB]">
      <span className="text-sm font-medium text-[#4A2E38]">{label}</span>
      <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#A96A80] cursor-pointer" />
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1
          className="font-extrabold text-[#4A2E38] tracking-tight font-serif"
          style={{ fontSize: 'clamp(1.6rem,4vw,2.25rem)' }}
        >
          Application <span className="text-gradient-rose">Settings</span>
        </h1>
        <p className="text-[#7D6670] text-sm mt-1 leading-relaxed">
          Configure multi-agent LLM providers, notification triggers, and enterprise security policies.
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="bg-[#FFFFFF] border border-[#EDD5DB] rounded-2xl p-2 flex gap-2 overflow-x-auto shadow-soft-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-[#A96A80] text-white shadow-soft-sm'
                : 'text-[#7D6670] hover:text-[#4A2E38] hover:bg-[#F8E8EB]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB] p-6 md:p-8 space-y-6">

        {/* AI Provider */}
        {activeTab === 'AI Provider' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#4A2E38] flex items-center gap-2 border-b border-[#EDD5DB] pb-4 font-serif">
              <FiCpu className="text-[#A96A80]" /> Neural Agent Engine Configuration
            </h3>
            <div className="space-y-5">
              <div>
                <label className={labelCls}>Primary LLM Provider</label>
                <select className={inputCls}>
                  <option>CampaignMind Autonomous Neural Mesh (Recommended)</option>
                  <option>OpenAI GPT-4o / GPT-4 Turbo</option>
                  <option>Anthropic Claude 3.5 Sonnet</option>
                  <option>Google Gemini 1.5 Pro Enterprise</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Vector DB Retrieval Index</label>
                <select className={inputCls}>
                  <option>FAISS Enterprise Vector Store (Local Encrypted)</option>
                  <option>Pinecone Serverless Index</option>
                  <option>Qdrant Cloud</option>
                </select>
              </div>
              <div className="p-4 rounded-xl bg-[#F8E8EB] border border-[#EDD5DB] flex items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-[#4A2E38] text-sm">Agent Multi-Reasoning Pass</div>
                  <div className="text-xs text-[#7D6670] mt-0.5">Run double evaluator agent verification for campaign scores</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#A96A80] cursor-pointer flex-shrink-0" />
              </div>
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === 'Notifications' && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-[#4A2E38] border-b border-[#EDD5DB] pb-4 flex items-center gap-2 font-serif">
              <FiBell className="text-[#A96A80]" /> Alert &amp; Telemetry Signals
            </h3>
            <div className="space-y-3">
              {toggleRow('Viral Keyword Spike Alerts')}
              {toggleRow('Weekly AI Performance Summaries')}
              {toggleRow('Festival Opportunity Window Triggers')}
            </div>
          </div>
        )}

        {/* Language & Region */}
        {activeTab === 'Language & Region' && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-[#4A2E38] border-b border-[#EDD5DB] pb-4 flex items-center gap-2 font-serif">
              <FiGlobe className="text-[#A96A80]" /> Regional Localization
            </h3>
            <div>
              <label className={labelCls}>System Language</label>
              <select className={inputCls}>
                <option>English (United States)</option>
                <option>Spanish (Global)</option>
                <option>French (European)</option>
                <option>German</option>
              </select>
            </div>
          </div>
        )}

        {/* Appearance */}
        {activeTab === 'Appearance' && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-[#4A2E38] border-b border-[#EDD5DB] pb-4 flex items-center gap-2 font-serif">
              <FiEye className="text-[#A96A80]" /> Interface Theme
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FFF8F8] to-[#F3D8DE] border-2 border-[#A96A80] text-center font-bold text-[#4A2E38] cursor-pointer shadow-soft-sm">
                ✨ Soft Luxury Blush (Active)
              </div>
              <div className="p-5 rounded-2xl bg-[#F8E8EB] border border-[#EDD5DB] text-center font-medium text-[#7D6670] cursor-pointer hover:border-[#A96A80] transition-colors">
                High Contrast Monochrome
              </div>
            </div>
          </div>
        )}

        {/* Workspace Governance */}
        {activeTab === 'Workspace Governance' && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-[#4A2E38] border-b border-[#EDD5DB] pb-4 flex items-center gap-2 font-serif">
              <FiShield className="text-[#A96A80]" /> Enterprise Workspace Policy
            </h3>
            <div className="p-5 rounded-2xl bg-[#F8E8EB] border border-[#EDD5DB] space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#4A2E38]">
                <FiCheck className="text-[#A96A80] w-4 h-4" />
                Single-tenant workspace active
              </div>
              <p className="text-sm text-[#7D6670] leading-relaxed">
                All model weights and brand assets are strictly isolated. No data is shared with public LLMs.
              </p>
            </div>
          </div>
        )}

        {/* Save */}
        <div className="pt-5 border-t border-[#EDD5DB] flex justify-end">
          <PrimaryButton icon={saved ? FiCheck : undefined} onClick={handleSave}>
            {saved ? 'Settings Saved!' : 'Save Preferences'}
          </PrimaryButton>
        </div>
      </GlassCard>
    </div>
  );
};
