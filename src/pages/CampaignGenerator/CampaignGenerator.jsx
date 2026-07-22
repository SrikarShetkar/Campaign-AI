import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaignStore } from '../../store/useCampaignStore';
import { GlassCard } from '../../components/Cards/GlassCard';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';
import {
  FiPackage,
  FiUsers,
  FiSliders,
  FiTrendingUp,
  FiCheckCircle,
  FiUploadCloud,
  FiArrowRight,
  FiArrowLeft,
  FiZap,
} from 'react-icons/fi';

export const CampaignGenerator = () => {
  const navigate = useNavigate();
  const { wizardStep, setWizardStep, wizardData, updateWizardData } = useCampaignStore();
  const [uploadedFileName, setUploadedFileName] = useState('');

  const steps = [
    { id: 1, name: 'Product Info', icon: FiPackage },
    { id: 2, name: 'Target Audience', icon: FiUsers },
    { id: 3, name: 'Campaign Settings', icon: FiSliders },
    { id: 4, name: 'Market Intelligence', icon: FiTrendingUp },
    { id: 5, name: 'Review & Synthesize', icon: FiCheckCircle },
  ];

  const handleNext = () => {
    if (wizardStep < 5) {
      setWizardStep(wizardStep + 1);
    } else {
      navigate('/processing');
    }
  };

  const handleBack = () => {
    if (wizardStep > 1) {
      setWizardStep(wizardStep - 1);
    }
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3D8DE] text-[#4A2E38] text-xs font-semibold mb-3 border border-[#EDD5DB]">
          <FiZap className="text-[#A96A80]" /> Autonomous 5-Step Agent Wizard
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#4A2E38] font-serif">
          AI Campaign <span className="text-gradient-rose">Generator</span>
        </h1>
        <p className="text-[#7D6670] text-sm mt-1 max-w-lg mx-auto">
          Feed raw brand context to our multi-agent network to generate an enterprise marketing plan.
        </p>
      </div>

      {/* Progress Bar Header */}
      <div className="glass-panel p-4 flex items-center justify-between overflow-x-auto gap-2 bg-[#FFFFFF]">
        {steps.map((st) => {
          const isActive = st.id === wizardStep;
          const isPassed = st.id < wizardStep;

          return (
            <div
              key={st.id}
              onClick={() => setWizardStep(st.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#A96A80] text-white font-bold shadow-soft-sm'
                  : isPassed
                  ? 'bg-[#F8E8EB] text-[#4A2E38] font-medium'
                  : 'text-[#A08A92] hover:text-[#4A2E38]'
              }`}
            >
              <st.icon className="w-4 h-4" />
              <span className="text-xs">{st.name}</span>
            </div>
          );
        })}
      </div>

      {/* Wizard Form Body */}
      <GlassCard className="p-6 md:p-8 space-y-6 bg-[#FFFFFF]">
        {/* STEP 1: PRODUCT INFORMATION */}
        {wizardStep === 1 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-[#4A2E38] border-b border-[#EDD5DB] pb-3 flex items-center gap-2 font-serif">
              <FiPackage className="text-[#A96A80]" /> Step 1: Product Specifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#7D6670] mb-1">Product Name</label>
                <input
                  type="text"
                  value={wizardData.productName}
                  onChange={(e) => updateWizardData({ productName: e.target.value })}
                  placeholder="e.g. Silk Skin Bio-Peptide Serum"
                  className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7D6670] mb-1">Brand Name</label>
                <input
                  type="text"
                  value={wizardData.brandName}
                  onChange={(e) => updateWizardData({ brandName: e.target.value })}
                  placeholder="e.g. AuraGlow Cosmetics"
                  className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#7D6670] mb-1">Category</label>
              <select
                value={wizardData.category}
                onChange={(e) => updateWizardData({ category: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
              >
                <option>Skincare & Beauty</option>
                <option>Food & Gourmet</option>
                <option>Beverages & Teas</option>
                <option>Hair Care & Salon</option>
                <option>Personal Hygiene</option>
                <option>Baby Care & Wellness</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#7D6670] mb-1">Product Description</label>
              <textarea
                rows={3}
                value={wizardData.description}
                onChange={(e) => updateWizardData({ description: e.target.value })}
                placeholder="Describe key functionality, user experience, and aesthetic appeal..."
                className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#7D6670] mb-1">Key Ingredients / Technology</label>
                <input
                  type="text"
                  value={wizardData.ingredients}
                  onChange={(e) => updateWizardData({ ingredients: e.target.value })}
                  placeholder="e.g. Bio-Peptide Complex, Fermented Camellia Oil"
                  className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7D6670] mb-1">Unique Selling Proposition (USP)</label>
                <input
                  type="text"
                  value={wizardData.usp}
                  onChange={(e) => updateWizardData({ usp: e.target.value })}
                  placeholder="e.g. 72-hour zero-tackiness summer peptide formulation"
                  className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
                />
              </div>
            </div>

            {/* Product Image Drag & Drop UI */}
            <div>
              <label className="block text-xs font-semibold text-[#7D6670] mb-1">Product Image Asset Upload</label>
              <div className="border-2 border-dashed border-[#EDD5DB] hover:border-[#A96A80] rounded-2xl p-6 text-center cursor-pointer bg-[#FFF8F8] transition-all relative">
                <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                <FiUploadCloud className="w-8 h-8 text-[#A96A80] mx-auto mb-2" />
                <div className="text-sm font-semibold text-[#4A2E38]">
                  {uploadedFileName ? `Selected: ${uploadedFileName}` : 'Drag and drop product photos or click to browse'}
                </div>
                <div className="text-xs text-[#A08A92] mt-1">PNG, JPG, WEBP up to 25MB</div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: TARGET AUDIENCE */}
        {wizardStep === 2 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-[#4A2E38] border-b border-[#EDD5DB] pb-3 flex items-center gap-2 font-serif">
              <FiUsers className="text-[#A96A80]" /> Step 2: Target Audience Demographics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#7D6670] mb-1">Age Range</label>
                <input
                  type="text"
                  value={wizardData.ageRange}
                  onChange={(e) => updateWizardData({ ageRange: e.target.value })}
                  placeholder="25 - 40"
                  className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7D6670] mb-1">Gender Segment</label>
                <select
                  value={wizardData.gender}
                  onChange={(e) => updateWizardData({ gender: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
                >
                  <option>Female & Non-Binary</option>
                  <option>Male & Non-Binary</option>
                  <option>All Demographics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7D6670] mb-1">Income Bracket</label>
                <input
                  type="text"
                  value={wizardData.income}
                  onChange={(e) => updateWizardData({ income: e.target.value })}
                  placeholder="$100k - $200k"
                  className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#7D6670] mb-1">Geographic Location</label>
                <input
                  type="text"
                  value={wizardData.location}
                  onChange={(e) => updateWizardData({ location: e.target.value })}
                  placeholder="e.g. North American & European Metro Hubs"
                  className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7D6670] mb-1">Primary Occupation</label>
                <input
                  type="text"
                  value={wizardData.occupation}
                  onChange={(e) => updateWizardData({ occupation: e.target.value })}
                  placeholder="e.g. Professionals, Leaders, Creators"
                  className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#7D6670] mb-1">Lifestyle & Psychographics</label>
              <input
                type="text"
                value={wizardData.lifestyle}
                onChange={(e) => updateWizardData({ lifestyle: e.target.value })}
                placeholder="e.g. Active, Pilates, Eco-conscious, Biohacking"
                className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#7D6670] mb-1">Primary Consumer Pain Points</label>
              <textarea
                rows={3}
                value={wizardData.painPoints}
                onChange={(e) => updateWizardData({ painPoints: e.target.value })}
                placeholder="What frustrating problem does this product solve for your audience?"
                className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* STEP 3: CAMPAIGN SETTINGS */}
        {wizardStep === 3 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-[#4A2E38] border-b border-[#EDD5DB] pb-3 flex items-center gap-2 font-serif">
              <FiSliders className="text-[#A96A80]" /> Step 3: Core Campaign Parameters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#7D6670] mb-1">Primary Campaign Goal</label>
                <select
                  value={wizardData.campaignGoal}
                  onChange={(e) => updateWizardData({ campaignGoal: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
                >
                  <option>Brand Awareness & High Conversion</option>
                  <option>New Product Launch & Pre-Orders</option>
                  <option>Viral Social Engagement</option>
                  <option>Customer Retention & LTV Expansion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7D6670] mb-1">Total Allocated Budget</label>
                <input
                  type="text"
                  value={wizardData.budget}
                  onChange={(e) => updateWizardData({ budget: e.target.value })}
                  placeholder="$50,000"
                  className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#7D6670] mb-1">Campaign Duration</label>
                <input
                  type="text"
                  value={wizardData.duration}
                  onChange={(e) => updateWizardData({ duration: e.target.value })}
                  placeholder="30 Days"
                  className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7D6670] mb-1">Target Language</label>
                <select
                  value={wizardData.language}
                  onChange={(e) => updateWizardData({ language: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
                >
                  <option>English (US & Global)</option>
                  <option>Spanish (ES & LATAM)</option>
                  <option>French (FR)</option>
                  <option>German (DE)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7D6670] mb-1">Brand Voice Tone</label>
                <select
                  value={wizardData.brandTone}
                  onChange={(e) => updateWizardData({ brandTone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
                >
                  <option>Sophisticated & Science-Backed</option>
                  <option>Soft Luxury & Elegant</option>
                  <option>Minimalist & Punchy</option>
                  <option>Warm & Empathetic</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: MARKET INTELLIGENCE */}
        {wizardStep === 4 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-[#4A2E38] border-b border-[#EDD5DB] pb-3 flex items-center gap-2 font-serif">
              <FiTrendingUp className="text-[#A96A80]" /> Step 4: Market Intelligence Context
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#7D6670] mb-1">Key Competitors</label>
                <input
                  type="text"
                  value={wizardData.competitors}
                  onChange={(e) => updateWizardData({ competitors: e.target.value })}
                  placeholder="e.g. Legacy Luxury Brands, Dior Beauty, Laneige"
                  className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7D6670] mb-1">Target Season & Festival</label>
                <input
                  type="text"
                  value={wizardData.festival}
                  onChange={(e) => updateWizardData({ festival: e.target.value })}
                  placeholder="e.g. Summer Skincare Month 2026"
                  className="w-full px-4 py-2.5 bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl text-[#4A2E38] text-sm focus:border-[#A96A80] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-[#EDD5DB] rounded-2xl p-4 bg-[#FFF8F8] text-center cursor-pointer">
                <FiUploadCloud className="w-6 h-6 text-[#A96A80] mx-auto mb-1" />
                <div className="text-xs font-semibold text-[#4A2E38]">Upload Past Campaign Report</div>
                <div className="text-[10px] text-[#A08A92]">PDF, CSV, PPTX up to 50MB</div>
              </div>

              <div className="border border-[#EDD5DB] rounded-2xl p-4 bg-[#FFF8F8] text-center cursor-pointer">
                <FiUploadCloud className="w-6 h-6 text-[#A96A80] mx-auto mb-1" />
                <div className="text-xs font-semibold text-[#4A2E38]">Upload Brand Guideline PDF</div>
                <div className="text-[10px] text-[#A08A92]">Auto-detect tone & colors</div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW & SYNTHESIZE */}
        {wizardStep === 5 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#4A2E38] border-b border-[#EDD5DB] pb-3 flex items-center gap-2 font-serif">
              <FiCheckCircle className="text-[#A96A80]" /> Step 5: Review & Synthesize Campaign
            </h3>

            <div className="p-6 rounded-2xl bg-[#F8E8EB] border border-[#EDD5DB] space-y-4">
              <div className="flex items-center justify-between border-b border-[#EDD5DB] pb-3">
                <div>
                  <h4 className="text-lg font-bold text-[#4A2E38] font-serif">{wizardData.productName || 'AuraGlow Silk Skin Serum'}</h4>
                  <p className="text-xs text-[#7D6670]">{wizardData.brandName || 'AuraGlow Cosmetics'} | {wizardData.category}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#A96A80] text-white font-bold text-xs shadow-soft-sm">
                  Ready to Synthesize
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-[#A08A92] block">Goal</span>
                  <span className="text-[#4A2E38] font-semibold">{wizardData.campaignGoal}</span>
                </div>
                <div>
                  <span className="text-[#A08A92] block">Budget</span>
                  <span className="text-[#A96A80] font-semibold">{wizardData.budget}</span>
                </div>
                <div>
                  <span className="text-[#A08A92] block">Duration</span>
                  <span className="text-[#4A2E38] font-semibold">{wizardData.duration}</span>
                </div>
                <div>
                  <span className="text-[#A08A92] block">Brand Tone</span>
                  <span className="text-[#A96A80] font-semibold">{wizardData.brandTone}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Control Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-[#EDD5DB]">
          <SecondaryButton icon={FiArrowLeft} onClick={handleBack} className={wizardStep === 1 ? 'opacity-0 pointer-events-none' : ''}>
            Previous Step
          </SecondaryButton>

          <PrimaryButton icon={wizardStep === 5 ? FiZap : FiArrowRight} onClick={handleNext}>
            {wizardStep === 5 ? 'Generate Enterprise Campaign' : 'Next Step'}
          </PrimaryButton>
        </div>
      </GlassCard>
    </div>
  );
};
