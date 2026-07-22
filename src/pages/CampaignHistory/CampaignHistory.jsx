import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaignStore } from '../../store/useCampaignStore';
import { GlassCard } from '../../components/Cards/GlassCard';
import { GlassModal } from '../../components/Modal/GlassModal';
import { FiSearch, FiEye } from 'react-icons/fi';

export const CampaignHistory = () => {
  const navigate = useNavigate();
  const { campaigns, setActiveCampaign } = useCampaignStore();
  const [filter, setFilter] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const filteredCampaigns = (campaigns || []).filter((c) => {
    if (!c) return false;
    const name = (c.name || c.title || c.campaign_title || 'Untitled Campaign').toLowerCase();
    const brand = (c.brand || c.brand_name || '').toLowerCase();
    const cat = (c.category || c.product_category || '').toLowerCase();
    const f = (filter || '').toLowerCase();
    return name.includes(f) || brand.includes(f) || cat.includes(f);
  });

  const handleOpenDetail = (cmp) => {
    setSelectedCampaign(cmp);
  };

  const handleLaunchResult = (cmp) => {
    setActiveCampaign(cmp);
    navigate('/result');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#4A2E38] tracking-tight font-serif">
            Campaign <span className="text-gradient-rose">History</span>
          </h1>
          <p className="text-[#7D6670] text-sm mt-1">
            Search, filter, and archive generated enterprise campaign decks.
          </p>
        </div>

        {/* Filter Input */}
        <div className="relative w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A08A92] w-4 h-4" />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter campaigns..."
            className="w-full pl-10 pr-4 py-2 bg-[#FFFFFF] border border-[#EDD5DB] rounded-full text-[#4A2E38] text-sm focus:outline-none focus:border-[#A96A80] shadow-soft-sm"
          />
        </div>
      </div>

      {/* Campaigns Table */}
      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#EDD5DB] text-[#7D6670] text-xs uppercase tracking-wider">
                <th className="py-3.5 px-4 font-bold">Campaign & Tagline</th>
                <th className="py-3.5 px-4 font-bold">Brand</th>
                <th className="py-3.5 px-4 font-bold">Category</th>
                <th className="py-3.5 px-4 font-bold">Score</th>
                <th className="py-3.5 px-4 font-bold">ROI</th>
                <th className="py-3.5 px-4 font-bold">Date</th>
                <th className="py-3.5 px-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDD5DB]">
              {filteredCampaigns.map((cmp, idx) => (
                <tr key={cmp.id || `cmp-hist-${idx}`} className="hover:bg-[#F8E8EB]/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-[#4A2E38]">
                    {cmp.name || cmp.title || cmp.campaign_title || 'Untitled Campaign'}
                    <span className="block text-xs font-normal text-[#7D6670]">{cmp.tagline}</span>
                  </td>
                  <td className="py-4 px-4 text-[#7D6670] font-medium">{cmp.brand || cmp.brand_name}</td>
                  <td className="py-4 px-4 text-[#A08A92] text-xs">{cmp.category || cmp.product_category}</td>
                  <td className="py-4 px-4 font-extrabold text-[#A96A80]">{cmp.campaignScore || 95}/100</td>
                  <td className="py-4 px-4 text-[#A96A80] font-extrabold">{cmp.projectedRoi || cmp.roi || '5.2x'}</td>
                  <td className="py-4 px-4 text-[#A08A92] text-xs font-mono">{cmp.createdAt || '2026-07-22'}</td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenDetail(cmp)}
                      className="p-2 rounded-full bg-[#F3D8DE] hover:bg-[#EBC8D0] text-[#4A2E38] transition-colors"
                      title="Quick Preview"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleLaunchResult(cmp)}
                      className="px-3.5 py-1.5 rounded-full bg-[#A96A80] text-white font-bold text-xs hover:bg-[#945A70] transition-colors shadow-soft-sm"
                    >
                      View Result Deck
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Quick Preview Modal */}
      <GlassModal
        isOpen={!!selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        title={selectedCampaign?.name || selectedCampaign?.title || 'Campaign Details'}
      >
        {selectedCampaign && (
          <div className="space-y-4 text-sm">
            <p className="text-[#A96A80] font-serif italic text-base">"{selectedCampaign.tagline}"</p>
            <div className="p-4 rounded-2xl bg-[#F8E8EB] border border-[#EDD5DB] space-y-2">
              <h4 className="font-bold text-[#4A2E38]">Executive Summary</h4>
              <p className="text-xs text-[#7D6670] leading-relaxed">{selectedCampaign.executiveSummary || selectedCampaign.campaign_strategy}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#EDD5DB]">
                <span className="text-[#A08A92] block">Score</span>
                <span className="text-[#4A2E38] font-bold text-base">{selectedCampaign.campaignScore || 95}/100</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#EDD5DB]">
                <span className="text-[#A08A92] block">ROI</span>
                <span className="text-[#A96A80] font-bold text-base">{selectedCampaign.projectedRoi || '5.2x'}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#EDD5DB]">
                <span className="text-[#A08A92] block">Virality</span>
                <span className="text-[#4A2E38] font-bold text-base">{selectedCampaign.virality || 94}%</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#EDD5DB]">
                <span className="text-[#A08A92] block">Budget</span>
                <span className="text-[#4A2E38] font-bold text-base">{selectedCampaign.budget || selectedCampaign.budget_input}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EDD5DB] flex justify-end gap-3">
              <button
                onClick={() => setSelectedCampaign(null)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-[#7D6670] hover:bg-[#F3D8DE]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedCampaign(null);
                  handleLaunchResult(selectedCampaign);
                }}
                className="px-5 py-2 rounded-full bg-[#A96A80] text-white text-xs font-bold shadow-soft-sm hover:bg-[#945A70]"
              >
                Open Full Deck
              </button>
            </div>
          </div>
        )}
      </GlassModal>
    </div>
  );
};
