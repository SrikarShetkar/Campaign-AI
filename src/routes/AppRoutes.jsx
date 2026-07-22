import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';

import { Landing } from '../pages/Landing/Landing';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { CampaignGenerator } from '../pages/CampaignGenerator/CampaignGenerator';
import { CompetitorAnalyzer } from '../pages/CompetitorAnalyzer/CompetitorAnalyzer';
import { SalesOptimizer } from '../pages/SalesOptimizer/SalesOptimizer';
import { AIProcessing } from '../pages/AIProcessing/AIProcessing';
import { CampaignResult } from '../pages/CampaignResult/CampaignResult';
import { CampaignComparison } from '../pages/CampaignComparison/CampaignComparison';
import { TrendIntelligence } from '../pages/TrendIntelligence/TrendIntelligence';
import { CampaignHistory } from '../pages/CampaignHistory/CampaignHistory';
import { BrandGuidelines } from '../pages/BrandGuidelines/BrandGuidelines';
import { KnowledgeBase } from '../pages/KnowledgeBase/KnowledgeBase';
import { Analytics } from '../pages/Analytics/Analytics';
import { ExportCenter } from '../pages/ExportCenter/ExportCenter';
import { Settings } from '../pages/Settings/Settings';
import { Profile } from '../pages/Profile/Profile';
import { NotFound } from '../pages/NotFound/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* AI Processing Loading View */}
      <Route path="/processing" element={<AIProcessing />} />

      {/* Main App Layout Wrapper */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generator" element={<CampaignGenerator />} />
        <Route path="/competitor-analyzer" element={<CompetitorAnalyzer />} />
        <Route path="/sales-optimizer" element={<SalesOptimizer />} />
        <Route path="/result" element={<CampaignResult />} />
        <Route path="/comparison" element={<CampaignComparison />} />
        <Route path="/trends" element={<TrendIntelligence />} />
        <Route path="/history" element={<CampaignHistory />} />
        <Route path="/brand" element={<BrandGuidelines />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/export" element={<ExportCenter />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 404 Catch All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
