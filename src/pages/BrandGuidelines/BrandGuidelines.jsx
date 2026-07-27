import React, { useState } from 'react';
import brandData from '../../mock/brand.json';
import { GlassCard } from '../../components/Cards/GlassCard';
import { FiBookOpen, FiUploadCloud, FiCheck, FiX, FiDroplet, FiCheckCircle } from 'react-icons/fi';

export const BrandGuidelines = () => {
  const [brand] = useState(brandData);
  const [uploaded, setUploaded] = useState(false);

  const handleSimulateUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploaded(true);
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
          Brand <span className="text-gradient-rose">Guidelines</span>
        </h1>
        <p className="text-[#7D6670] text-sm mt-1 leading-relaxed">
          Ingest PDFs or asset packs to automatically enforce brand voice, vocabulary, and color tokens.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="rounded-2xl border border-[#A96A80] bg-gradient-to-r from-[#FFF8F8] via-[#F8E8EB] to-[#F3D8DE] p-6 md:p-8 shadow-soft-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 min-w-0 flex-1">
            <h3 className="text-xl font-bold text-[#4A2E38] flex items-center gap-2 font-serif">
              <FiUploadCloud className="text-[#A96A80] flex-shrink-0" />
              Ingest New Brand Guidelines PDF
            </h3>
            <p className="text-sm text-[#7D6670] leading-relaxed max-w-prose">
              Drag and drop brand playbooks, voice guides, or design specs. Neural parser will extract color rules &amp; vocabulary.
            </p>
          </div>
          <label className="relative cursor-pointer flex-shrink-0">
            <input type="file" onChange={handleSimulateUpload} className="hidden" />
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A96A80] text-white font-bold text-sm hover:bg-[#945A70] transition-colors shadow-soft-sm cursor-pointer">
              <FiUploadCloud className="w-4 h-4" />
              {uploaded ? '✓ Guidelines Uploaded' : 'Upload Brand PDF'}
            </span>
          </label>
        </div>
      </div>

      {/* Detected Tone & Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB] space-y-3">
          <h3 className="font-bold text-[#4A2E38] text-base flex items-center gap-2 font-serif">
            <FiCheckCircle className="text-[#A96A80]" /> Detected Brand Tone
          </h3>
          <p className="text-2xl font-bold text-[#A96A80] font-serif">{brand.detectedTone}</p>
          <p className="text-sm text-[#7D6670] leading-relaxed">
            Automatically enforced across all AI generated social media copy, email sequences, and ad headlines.
          </p>
        </GlassCard>

        <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB] space-y-3">
          <h3 className="font-bold text-[#4A2E38] text-base flex items-center gap-2 font-serif">
            <FiDroplet className="text-[#A96A80]" /> Detected Design Aesthetic
          </h3>
          <p className="text-2xl font-bold text-[#4A2E38] font-serif">{brand.detectedStyle}</p>
          <p className="text-sm text-[#7D6670] leading-relaxed">
            Used as visual conditioning parameters for Midjourney &amp; Runway video prompt synthesis.
          </p>
        </GlassCard>
      </div>

      {/* Vocabulary Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DO USE */}
        <GlassCard className="bg-[#FFFFFF] border-[#A96A80]/30 space-y-4">
          <h3 className="font-bold text-[#4A2E38] text-lg flex items-center gap-2 font-serif">
            <FiCheck className="text-[#A96A80]" /> Approved Vocabulary (DO)
          </h3>
          <div className="flex flex-wrap gap-2">
            {brand.vocabularyRules.doUse.map((word, idx) => (
              <span
                key={`do-${idx}`}
                className="px-3 py-1.5 rounded-xl bg-[#F3D8DE] text-[#4A2E38] text-xs font-semibold border border-[#EDD5DB]"
              >
                + {word}
              </span>
            ))}
          </div>
        </GlassCard>

        {/* DON'T USE */}
        <GlassCard className="bg-[#FFFFFF] border-rose-200 space-y-4">
          <h3 className="font-bold text-[#4A2E38] text-lg flex items-center gap-2 font-serif">
            <FiX className="text-rose-500" /> Banned Keywords (DON'T)
          </h3>
          <div className="flex flex-wrap gap-2">
            {brand.vocabularyRules.dontUse.map((word, idx) => (
              <span
                key={`dont-${idx}`}
                className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200"
              >
                ✕ {word}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Logo Rules & Color Palette */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logo Rules */}
        <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB] space-y-4">
          <h3 className="font-bold text-[#4A2E38] text-lg font-serif">Logo Usage Governance</h3>
          <ul className="space-y-2.5">
            {brand.logoRules.map((rule, i) => (
              <li key={`rule-${i}`} className="flex items-start gap-2.5 text-sm text-[#7D6670]">
                <FiCheckCircle className="text-[#A96A80] flex-shrink-0 mt-0.5 w-4 h-4" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        {/* Color Palette */}
        <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB] space-y-4">
          <h3 className="font-bold text-[#4A2E38] text-lg font-serif">Brand Color Tokens</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {brand.colorPalette.map((color, idx) => (
              <div
                key={`color-${idx}`}
                className="p-3 rounded-2xl bg-[#F8E8EB] border border-[#EDD5DB] space-y-2 text-center"
              >
                <div
                  className="h-10 rounded-xl border border-[#EDD5DB] shadow-soft-sm"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="text-[10px] text-[#7D6670] font-semibold truncate">{color.name}</div>
                <div className="text-xs font-mono font-bold text-[#4A2E38]">{color.hex}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
