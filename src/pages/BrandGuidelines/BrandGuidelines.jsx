import React, { useState } from 'react';
import brandData from '../../mock/brand.json';
import { GlassCard } from '../../components/Cards/GlassCard';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { FiBookOpen, FiUploadCloud, FiCheck, FiX, FiDroplet, FiCheckCircle } from 'react-icons/fi';

export const BrandGuidelines = () => {
  const [brand, setBrand] = useState(brandData);
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
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          Brand <span className="text-gradient">Guidelines</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Ingest PDFs or asset packs to automatically enforce brand voice, vocabulary, and color tokens.
        </p>
      </div>

      {/* Upload Zone */}
      <GlassCard className="p-8 border-brand-start/30 shadow-glow-purple">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FiUploadCloud className="text-accent-lavender" /> Ingest New Brand Guidelines PDF
            </h3>
            <p className="text-xs text-slate-300">
              Drag and drop brand playbooks, voice guides, or design specs. Neural parser will extract color rules & vocabulary.
            </p>
          </div>

          <label className="relative cursor-pointer">
            <input type="file" onChange={handleSimulateUpload} className="hidden" />
            <span className="pill-btn btn-primary cursor-pointer">
              {uploaded ? '✓ Guidelines Uploaded' : 'Upload Brand PDF'}
            </span>
          </label>
        </div>
      </GlassCard>

      {/* Detected Tone & Style Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="space-y-3">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <FiCheckCircle className="text-accent-mint" /> Detected Brand Tone
          </h3>
          <p className="text-2xl font-bold text-gradient">{brand.detectedTone}</p>
          <p className="text-xs text-slate-400">
            Automatically enforced across all AI generated social media copy, email sequences, and ad headlines.
          </p>
        </GlassCard>

        <GlassCard className="space-y-3">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <FiDroplet className="text-accent-aqua" /> Detected Design Aesthetic
          </h3>
          <p className="text-2xl font-bold text-accent-gold">{brand.detectedStyle}</p>
          <p className="text-xs text-slate-400">
            Used as visual conditioning parameters for Midjourney & Runway video prompt synthesis.
          </p>
        </GlassCard>
      </div>

      {/* Vocabulary Rules (DOs and DONTs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DO USE */}
        <GlassCard className="border-accent-mint/30 space-y-4">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <FiCheck className="text-accent-mint" /> Approved Vocabulary (DO)
          </h3>
          <div className="flex flex-wrap gap-2">
            {brand.vocabularyRules.doUse.map((word, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-xl bg-accent-mint/10 text-accent-mint text-xs font-semibold border border-accent-mint/20">
                + {word}
              </span>
            ))}
          </div>
        </GlassCard>

        {/* DONT USE */}
        <GlassCard className="border-rose-500/30 space-y-4">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <FiX className="text-rose-400" /> Banned Keywords (DON'T)
          </h3>
          <div className="flex flex-wrap gap-2">
            {brand.vocabularyRules.dontUse.map((word, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-400 text-xs font-semibold border border-rose-500/20">
                ✕ {word}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Logo Rules & Color Palette Tokens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logo Rules */}
        <GlassCard className="space-y-4">
          <h3 className="font-bold text-white text-lg">Logo Usage Governance</h3>
          <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
            {brand.logoRules.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
        </GlassCard>

        {/* Color Palette */}
        <GlassCard className="space-y-4">
          <h3 className="font-bold text-white text-lg">Brand Color Tokens</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {brand.colorPalette.map((color, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-center">
                <div
                  className="h-10 rounded-xl border border-white/20 shadow-glass-sm"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="text-[10px] text-slate-400 font-semibold">{color.name}</div>
                <div className="text-xs font-mono font-bold text-white">{color.hex}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
