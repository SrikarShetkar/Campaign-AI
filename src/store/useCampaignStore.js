import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import initialCampaigns from '../mock/campaigns.json';

export const useCampaignStore = create(persist((set) => ({
  campaigns: initialCampaigns,
  activeCampaign: initialCampaigns[0],
  
  // Generator wizard state
  wizardStep: 1,
  wizardData: {
    productName: '',
    brandName: '',
    category: 'Skincare & Beauty',
    description: '',
    ingredients: '',
    usp: '',
    features: '',
    ageRange: '25 - 40',
    gender: 'All',
    income: '$80,000 - $150,000',
    location: 'Urban & Suburban',
    occupation: 'Professionals & Leaders',
    lifestyle: 'Eco-conscious, tech-savvy',
    painPoints: '',
    campaignGoal: 'Brand Awareness & High Conversion',
    budget: '$50,000',
    duration: '30 Days',
    language: 'English (US)',
    brandTone: 'Sophisticated & Science-Backed',
    region: 'North America',
    competitors: 'Legacy Luxury Brands',
    season: 'Current season',
    festival: 'International Skincare Month',
    notes: '',
  },

  setWizardStep: (step) => set({ wizardStep: step }),
  updateWizardData: (fields) =>
    set((state) => ({
      wizardData: { ...state.wizardData, ...fields },
    })),

  resetWizard: () =>
    set({
      wizardStep: 1,
      wizardData: {
        productName: '',
        brandName: '',
        category: 'Skincare & Beauty',
        description: '',
        ingredients: '',
        usp: '',
        features: '',
        ageRange: '25 - 40',
        gender: 'All',
        income: '$80,000 - $150,000',
        location: 'Urban & Suburban',
        occupation: 'Professionals & Leaders',
        lifestyle: 'Eco-conscious, tech-savvy',
        painPoints: '',
        campaignGoal: 'Brand Awareness & High Conversion',
        budget: '$50,000',
        duration: '30 Days',
        language: 'English (US)',
        brandTone: 'Sophisticated & Science-Backed',
        region: 'North America',
        competitors: 'Legacy Luxury Brands',
        season: 'Current season',
        festival: 'International Skincare Month',
        notes: '',
      },
    }),

  // Add generated campaign
  saveGeneratedCampaign: (newCampaign) =>
    set((state) => ({
      campaigns: [newCampaign, ...state.campaigns],
      activeCampaign: newCampaign,
    })),

  setActiveCampaign: (campaign) => set({ activeCampaign: campaign }),
}), { name: 'campaignmind-drafts-v1', partialize: state => ({ campaigns: state.campaigns, activeCampaign: state.activeCampaign }) }));
