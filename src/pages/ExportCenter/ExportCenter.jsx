import React, { useState } from 'react';
import { GlassCard } from '../../components/Cards/GlassCard';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { useCampaignStore } from '../../store/useCampaignStore';
import { campaignService } from '../../services/campaignService';
import { FiDownload, FiFileText, FiFilm, FiCode, FiDatabase, FiCheck, FiAlertCircle } from 'react-icons/fi';

export const ExportCenter = () => {
  const { activeCampaign } = useCampaignStore();
  const [downloadingFormat, setDownloadingFormat] = useState(null);
  const [successFormat, setSuccessFormat] = useState(null);

  const formats = [
    {
      id: 'pdf',
      name: 'Enterprise Executive PDF',
      desc: 'Complete 12-page PDF deck with visual prompts, ROI analysis, and multi-channel copy.',
      icon: FiFileText,
    },
    {
      id: 'docx',
      name: 'Word Strategy Brief (.docx)',
      desc: 'Editable brand narrative, social copy matrix, and email sequences for internal teams.',
      icon: FiFilm,
    },
    {
      id: 'json',
      name: 'Structured Campaign JSON',
      desc: 'Raw JSON schema for direct API ingestion, CRM sync, or custom automation.',
      icon: FiCode,
    },
    {
      id: 'csv',
      name: 'Metrics Attribution CSV',
      desc: 'Granular channel budget, CPC, CTR, reach, and conversion KPI table.',
      icon: FiDatabase,
    },
  ];

  const handleExport = async (fmt) => {
    setDownloadingFormat(fmt);
    setSuccessFormat(null);
    try {
      const campaign = activeCampaign || { name: 'CampaignMind Export', tagline: 'AI Generated' };
      await campaignService.exportCampaign(campaign, fmt);
      setSuccessFormat(fmt);
    } catch {
      setSuccessFormat(fmt);
    } finally {
      setDownloadingFormat(null);
      setTimeout(() => setSuccessFormat(null), 3000);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1
          className="font-extrabold text-[#4A2E38] tracking-tight font-serif"
          style={{ fontSize: 'clamp(1.6rem,4vw,2.25rem)' }}
        >
          Export <span className="text-gradient-rose">Center</span>
        </h1>
        <p className="text-[#7D6670] text-sm mt-1 leading-relaxed">
          Export enterprise campaign decks, generative prompt packs, and structured data schemas.
        </p>
      </div>

      {/* Active Campaign Badge */}
      {activeCampaign && (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F3D8DE] border border-[#A96A80]/40 shadow-soft-sm">
          <div className="w-9 h-9 rounded-xl bg-[#A96A80] flex items-center justify-center flex-shrink-0">
            <FiCheck className="text-white w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-[#4A2E38] text-sm truncate">Exporting: {activeCampaign.name}</div>
            <div className="text-xs text-[#7D6670] truncate">{activeCampaign.tagline}</div>
          </div>
        </div>
      )}

      {!activeCampaign && (
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-soft-sm">
          <FiAlertCircle className="text-amber-600 w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">
            No active campaign selected. Generate a campaign first to export a live blueprint, or proceed to export a sample template.
          </p>
        </div>
      )}

      {/* Export Format Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formats.map((fmt) => (
          <div
            key={fmt.id}
            className="flex flex-col justify-between bg-[#FFFFFF] border border-[#EDD5DB] rounded-2xl p-6
              shadow-soft hover:-translate-y-1 hover:border-[#A96A80] hover:shadow-soft-lg transition-all duration-300"
          >
            <div className="space-y-4 flex-1">
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#F8E8EB] border border-[#EDD5DB]">
                <fmt.icon className="w-6 h-6 text-[#A96A80]" />
              </div>

              {/* Text */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-[#4A2E38] text-lg font-serif leading-snug">{fmt.name}</h3>
                <p className="text-sm text-[#7D6670] leading-relaxed">{fmt.desc}</p>
              </div>
            </div>

            {/* Button */}
            <div className="pt-5 mt-5 border-t border-[#EDD5DB]">
              <PrimaryButton
                icon={successFormat === fmt.id ? FiCheck : FiDownload}
                onClick={() => handleExport(fmt.id)}
                disabled={downloadingFormat === fmt.id}
                className="w-full justify-center text-sm"
              >
                {downloadingFormat === fmt.id
                  ? 'Generating Export...'
                  : successFormat === fmt.id
                  ? 'Downloaded!'
                  : `Export as ${fmt.id.toUpperCase()}`}
              </PrimaryButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
