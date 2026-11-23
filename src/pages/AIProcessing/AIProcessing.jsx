import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AgentCard } from '../../components/Loading/AgentCard';
import { GlassCard } from '../../components/Cards/GlassCard';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { useCampaignStore } from '../../store/useCampaignStore';
import { campaignService } from '../../services/campaignService';
import {
  FiSearch, FiTrendingUp, FiFeather, FiEdit3,
  FiDollarSign, FiCpu, FiAlertCircle,
} from 'react-icons/fi';

export const AIProcessing = () => {
  const navigate = useNavigate();
  const { wizardData, saveGeneratedCampaign } = useCampaignStore();
  const [overallProgress, setOverallProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [error, setError] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const apiCalledRef = useRef(false);

  const agents = [
    { id: 0, name: 'Research Agent', role: 'Ingesting market benchmarks & competitor intelligence', icon: FiSearch, color: '#A96A80' },
    { id: 1, name: 'Persona Agent', role: 'Crafting buyer personas from 150+ consumer profiles', icon: FiTrendingUp, color: '#D89AAA' },
    { id: 2, name: 'Creative Strategy Agent', role: 'Synthesizing brand narrative & campaign theme', icon: FiFeather, color: '#A96A80' },
    { id: 3, name: 'Copywriting Agent', role: 'Drafting multi-platform copy (IG, TikTok, Email, SMS)', icon: FiEdit3, color: '#945A70' },
    { id: 4, name: 'Visual & Video Agent', role: 'Generating 8K luxury prompts and storyboard frames', icon: FiCpu, color: '#A96A80' },
    { id: 5, name: 'Budget & Evaluation Agent', role: 'Allocating channels, projecting ROI, scoring campaign', icon: FiDollarSign, color: '#D89AAA' },
  ];

  useEffect(() => {
    if (apiCalledRef.current) return;
    apiCalledRef.current = true;

    let step = 0;
    const totalSteps = agents.length;

    const stepInterval = setInterval(() => {
      setActiveStep(step);
      setOverallProgress(Math.round(((step + 1) / totalSteps) * 85));
      step++;
      if (step >= totalSteps) clearInterval(stepInterval);
    }, 1200);

    const runGeneration = async () => {
      try {
        const result = await campaignService.generateCampaign(wizardData);
        clearInterval(stepInterval);
        setActiveStep(totalSteps - 1);
        setOverallProgress(100);
        setIsComplete(true);
        saveGeneratedCampaign(result);
        setTimeout(() => navigate('/result'), 800);
      } catch (err) {
        clearInterval(stepInterval);
        setError('Generation failed. Please retry.');
      }
    };

    runGeneration();
    return () => clearInterval(stepInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F8] via-[#F8E8EB] to-[#EBC8D0] text-[#4A2E38] flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">
      <div className="w-full max-w-4xl space-y-8 z-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-[#A96A80] flex items-center justify-center mx-auto shadow-soft-lg">
            <FiCpu className="w-8 h-8 text-white animate-bounce" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#4A2E38] font-serif">
            AI Agent <span className="text-gradient-rose">Orchestration</span>
          </h1>
          <p className="text-[#7D6670] text-sm max-w-md mx-auto">
            Preparing your campaign blueprint. These workflow stages are illustrative, not live agent telemetry.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <GlassCard className="border-[#EDD5DB] flex items-center gap-4 bg-[#FFFFFF]">
            <FiAlertCircle className="text-rose-500 w-6 h-6 flex-shrink-0" />
            <div>
              <p className="text-[#4A2E38] font-semibold">{error}</p>
              <p className="text-xs text-[#7D6670]">Proceeding with local synthesized campaign model.</p>
            </div>
            <PrimaryButton onClick={() => navigate('/result')} className="ml-auto">
              View Result
            </PrimaryButton>
          </GlassCard>
        )}

        {/* Global Progress Bar */}
        <GlassCard className="p-5 bg-[#FFFFFF]">
          <div className="flex items-center justify-between text-xs font-semibold text-[#4A2E38] mb-2">
            <span>Multi-Agent Synthesis Progress</span>
            <span className="text-[#A96A80] font-bold">{overallProgress}%</span>
          </div>
          <div className="w-full bg-[#F8E8EB] h-3 rounded-full overflow-hidden border border-[#EDD5DB] p-0.5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#A96A80] to-[#D89AAA] shadow-soft-sm"
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-[10px] text-[#A08A92]">
            <span>Illustrative progress display</span>
            <span>{isComplete ? '✓ All Agents Complete' : `Agent ${Math.min(activeStep + 1, agents.length)} of ${agents.length} Running`}</span>
          </div>
        </GlassCard>

        {/* 6 Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((ag) => {
            const status = ag.id < activeStep ? 'completed' : ag.id === activeStep ? 'working' : 'waiting';
            const progress = ag.id < activeStep ? 100 : ag.id === activeStep ? 65 : 0;
            return (
              <AgentCard key={ag.id} name={ag.name} role={ag.role} status={status}
                progress={progress} icon={ag.icon} color={ag.color} />
            );
          })}
        </div>

      </div>
    </div>
  );
};
