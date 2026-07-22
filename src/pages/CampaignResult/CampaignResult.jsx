import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaignStore } from '../../store/useCampaignStore';
import { GlassCard } from '../../components/Cards/GlassCard';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';
import {
  FiAward,
  FiZap,
  FiDollarSign,
  FiUsers,
  FiCopy,
  FiCheck,
  FiShare2,
  FiDownload,
  FiFilm,
  FiImage,
  FiMail,
  FiMessageSquare,
  FiSliders,
} from 'react-icons/fi';

export const CampaignResult = () => {
  const navigate = useNavigate();
  const { activeCampaign } = useCampaignStore();
  const [copiedKey, setCopiedKey] = useState(null);

  const campaign = activeCampaign || {
    name: 'AuraGlow Silk Skin Summer Launch',
    tagline: 'Radiate Elegance. Powered by Bio-Peptides.',
    executiveSummary: 'A high-conversion multi-channel campaign highlighting bio-peptide hydration for eco-conscious Millennials & Gen-Z beauty enthusiasts.',
    campaignScore: 94,
    trendScore: 98,
    virality: 91,
    projectedRoi: '4.8x',
    targetReach: '1.2M',
    budget: '$45,000',
    duration: '30 Days',
    persona: {
      name: 'Eco-Conscious Executive Emma',
      age: '26 - 38',
      interests: 'Clean Beauty, Sustainable Fashion, Wellness Tech',
      painPoint: 'Harsh synthetic ingredients causing skin sensitivity during summer heat.'
    },
    story: 'Emma wakes up early, navigates a busy corporate day, and seeks effortless skincare that protects against urban pollution while maintaining an effortless glass-skin glow.',
    socialPosts: [
      {
        platform: 'Instagram',
        copy: '✨ Ditch 10-step routines for 1 pure peptide drop. Meet AuraGlow Silk Skin—summer hydration reimagined. 🌿 #GlassSkin #CleanBeauty #AuraGlow',
        engagementEstimate: '48.2k interactions'
      },
      {
        platform: 'TikTok',
        copy: 'POV: You found the ONLY bio-peptide serum that doesn\'t feel sticky in 90° weather 🔥 Hydration level: 1000/10. Link in bio! 💧 #BeautyTok',
        engagementEstimate: '125.4k views'
      }
    ],
    emailSequence: [
      {
        subject: 'Exclusive First Access: Summer\'s Most Anticipated Glow',
        previewText: 'Pure bio-peptides. Unmatched summer hydration.',
        body: 'Hi {{FirstName}},\n\nSummer heat shouldn\'t mean compromised skin hydration. AuraGlow is thrilled to present our flagship Silk Skin Peptide Serum...'
      }
    ],
    posterPrompt: 'Hyper-realistic bottle of iridescent glass skincare serum resting on wet volcanic stone surrounded by soft lavender orchids, cinematic lighting, 8k resolution.',
    videoPrompt: '15-second dynamic advert showing macro droplet falling in slow-motion onto glowing skin, transitioning to a confident woman walking down a sunny city avenue.',
    suggestions: [
      'Boost TikTok budget by 15% to capitalize on trending skincare hashtags.',
      'Pair with summer glow influencer micro-gifting strategy.',
      'A/B test champagne gold vs soft aqua CTA button colors on landing page.'
    ]
  };

  const copyToClipboard = (text, key) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <GlassCard className="p-8 border-[#EDD5DB] bg-[#FFFFFF] shadow-soft-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#F3D8DE] text-[#4A2E38] border border-[#EDD5DB] text-xs font-semibold">
                ✓ AI Generated & Evaluated
              </span>
              <span className="text-xs text-[#A08A92] font-mono">ID: {campaign.id || 'cmp-101'}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#4A2E38] font-serif">{campaign.name || campaign.title}</h1>
            <p className="text-[#A96A80] text-base font-serif italic">"{campaign.tagline}"</p>
          </div>

          {/* Campaign Score Badge */}
          <div className="flex items-center gap-4 bg-[#F8E8EB] p-4 rounded-2xl border border-[#EDD5DB]">
            <div className="text-center">
              <div className="text-xs text-[#7D6670] font-semibold uppercase">Campaign Score</div>
              <div className="text-3xl font-extrabold text-[#A96A80]">{campaign.campaignScore || 96}/100</div>
            </div>
            <div className="h-10 w-px bg-[#EDD5DB]" />
            <div className="text-center">
              <div className="text-xs text-[#7D6670] font-semibold uppercase">Projected ROI</div>
              <div className="text-3xl font-extrabold text-[#4A2E38]">{campaign.projectedRoi || campaign.roi || '5.2x'}</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[#EDD5DB]">
          <PrimaryButton icon={FiDownload} onClick={() => navigate('/export')}>
            Export Deck (PDF / PPT)
          </PrimaryButton>
          <SecondaryButton icon={FiSliders} onClick={() => navigate('/sales-optimizer')}>
            Run in Optimizer
          </SecondaryButton>
          <SecondaryButton icon={FiShare2} onClick={() => copyToClipboard(window.location.href, 'share')}>
            {copiedKey === 'share' ? 'Link Copied!' : 'Share Campaign'}
          </SecondaryButton>
        </div>
      </GlassCard>

      {/* Executive Summary & Persona Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Executive Summary */}
        <GlassCard className="lg:col-span-2 space-y-4 bg-[#FFFFFF]">
          <h3 className="text-xl font-bold text-[#4A2E38] flex items-center gap-2 font-serif">
            <FiZap className="text-[#A96A80]" /> Executive Summary & Strategy
          </h3>
          <p className="text-[#7D6670] text-sm leading-relaxed">{campaign.executiveSummary || campaign.campaign_strategy}</p>
          
          <div className="pt-4 border-t border-[#EDD5DB]">
            <h4 className="font-bold text-[#4A2E38] text-sm mb-2 font-serif">Campaign Narrative Story</h4>
            <p className="text-xs text-[#7D6670] leading-relaxed italic">{campaign.story || campaign.executiveSummary}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#EDD5DB] text-xs">
            <div>
              <span className="text-[#A08A92] block">Total Budget</span>
              <span className="text-[#4A2E38] font-bold text-base">{campaign.budget || campaign.budget_input}</span>
            </div>
            <div>
              <span className="text-[#A08A92] block">Target Reach</span>
              <span className="text-[#A96A80] font-bold text-base">{campaign.targetReach || campaign.estimated_reach}</span>
            </div>
            <div>
              <span className="text-[#A08A92] block">Duration</span>
              <span className="text-[#4A2E38] font-bold text-base">{campaign.duration}</span>
            </div>
          </div>
        </GlassCard>

        {/* Target Persona Card */}
        <GlassCard className="space-y-3 bg-[#FFFFFF]">
          <h3 className="text-lg font-bold text-[#4A2E38] flex items-center gap-2 font-serif">
            <FiUsers className="text-[#A96A80]" /> Target Persona
          </h3>
          <div className="p-4 rounded-2xl bg-[#F8E8EB] border border-[#EDD5DB] space-y-2 text-xs">
            <div className="font-bold text-sm text-[#4A2E38]">{campaign.persona?.name || campaign.persona?.persona_name || campaign.target_persona?.name || 'Target Buyer Persona'}</div>
            <div className="text-[#7D6670]">Demographics: {campaign.persona?.age || campaign.target_persona?.demographics || 'Age 25-40'}</div>
            <div className="text-[#4A2E38]">
              <strong>Interests / Triggers:</strong> {campaign.persona?.interests || (campaign.target_persona?.buying_triggers ? campaign.target_persona.buying_triggers.join(', ') : 'Clean Beauty')}
            </div>
            <div className="text-[#4A2E38] pt-2 border-t border-[#EDD5DB]">
              <strong>Pain Point:</strong> {campaign.persona?.painPoint || (Array.isArray(campaign.persona?.pain_points) ? campaign.persona.pain_points.join(', ') : 'Product opacity')}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Multi-Channel Content: Social Posts & Email Sequence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Social Media Copy */}
        <GlassCard className="space-y-4 bg-[#FFFFFF]">
          <h3 className="text-xl font-bold text-[#4A2E38] flex items-center gap-2 font-serif">
            <FiMessageSquare className="text-[#A96A80]" /> Multi-Platform Social Creatives
          </h3>
          <div className="space-y-3">
            {campaign.socialPosts?.map((post, idx) => (
              <div key={`post-${idx}`} className="p-4 rounded-2xl bg-[#F8E8EB] border border-[#EDD5DB] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#4A2E38] px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#EDD5DB]">
                    {post.platform}
                  </span>
                  <span className="text-[#A96A80] font-semibold">{post.engagementEstimate || 'High Engagement'}</span>
                </div>
                <p className="text-xs text-[#4A2E38] leading-relaxed font-sans">{post.copy}</p>
                <div className="text-right">
                  <button
                    onClick={() => copyToClipboard(post.copy, `social-${idx}`)}
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#A96A80] hover:underline"
                  >
                    {copiedKey === `social-${idx}` ? <FiCheck /> : <FiCopy />}
                    {copiedKey === `social-${idx}` ? 'Copied!' : 'Copy Post'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Email Copy Sequence */}
        <GlassCard className="space-y-4 bg-[#FFFFFF]">
          <h3 className="text-xl font-bold text-[#4A2E38] flex items-center gap-2 font-serif">
            <FiMail className="text-[#A96A80]" /> Email Marketing Sequence
          </h3>
          {campaign.emailSequence?.map((email, i) => (
            <div key={`email-${i}`} className="p-4 rounded-2xl bg-[#F8E8EB] border border-[#EDD5DB] space-y-2 text-xs">
              <div className="font-bold text-[#4A2E38]">Subject: {email.subject}</div>
              <div className="text-[#7D6670]">Preview: {email.previewText || email.preview}</div>
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#EDD5DB] text-[#4A2E38] whitespace-pre-wrap leading-relaxed">
                {email.body}
              </div>
              <div className="text-right">
                <button
                  onClick={() => copyToClipboard(email.body, `email-${i}`)}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#A96A80] hover:underline"
                >
                  {copiedKey === `email-${i}` ? <FiCheck /> : <FiCopy />}
                  {copiedKey === `email-${i}` ? 'Copied Sequence!' : 'Copy Email Body'}
                </button>
              </div>
            </div>
          ))}
        </GlassCard>
      </div>

      {/* Visual & Video Generative Prompts */}
      <GlassCard className="space-y-6 bg-[#FFFFFF]">
        <h3 className="text-xl font-bold text-[#4A2E38] font-serif">Generative Visual & Motion Prompts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Poster Prompt */}
          <div className="p-5 rounded-2xl bg-[#F8E8EB] border border-[#EDD5DB] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-[#4A2E38] text-sm flex items-center gap-2 font-serif">
                <FiImage className="text-[#A96A80]" /> Midjourney 8K Poster Prompt
              </h4>
              <button
                onClick={() => copyToClipboard(campaign.posterPrompt, 'poster')}
                className="px-2.5 py-1 rounded-full bg-[#FFFFFF] border border-[#EDD5DB] text-[10px] font-semibold text-[#4A2E38] hover:bg-[#F3D8DE]"
              >
                {copiedKey === 'poster' ? 'Copied Prompt!' : 'Copy Prompt'}
              </button>
            </div>
            <p className="text-xs text-[#7D6670] bg-[#FFFFFF] p-3 rounded-xl border border-[#EDD5DB]">
              {campaign.posterPrompt}
            </p>
          </div>

          {/* Video Advert Prompt */}
          <div className="p-5 rounded-2xl bg-[#F8E8EB] border border-[#EDD5DB] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-[#4A2E38] text-sm flex items-center gap-2 font-serif">
                <FiFilm className="text-[#A96A80]" /> Runway Gen-2 Video Advert Prompt
              </h4>
              <button
                onClick={() => copyToClipboard(campaign.videoPrompt, 'video')}
                className="px-2.5 py-1 rounded-full bg-[#FFFFFF] border border-[#EDD5DB] text-[10px] font-semibold text-[#4A2E38] hover:bg-[#F3D8DE]"
              >
                {copiedKey === 'video' ? 'Copied Prompt!' : 'Copy Prompt'}
              </button>
            </div>
            <p className="text-xs text-[#7D6670] bg-[#FFFFFF] p-3 rounded-xl border border-[#EDD5DB]">
              {campaign.videoPrompt}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* AI Evaluator Recommendations */}
      <GlassCard className="bg-[#FFFFFF] border-[#EDD5DB]">
        <h3 className="text-xl font-bold text-[#4A2E38] mb-4 flex items-center gap-2 font-serif">
          <FiAward className="text-[#A96A80]" /> Evaluator Agent Optimization Recommendations
        </h3>
        <div className="space-y-2 text-sm text-[#7D6670]">
          {campaign.suggestions?.map((sug, idx) => (
            <div key={`sug-${idx}`} className="flex items-center gap-3 p-3 rounded-xl bg-[#F8E8EB] border border-[#EDD5DB]">
              <span className="w-6 h-6 rounded-full bg-[#A96A80] text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </span>
              <span className="text-[#4A2E38] text-xs">{sug}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
