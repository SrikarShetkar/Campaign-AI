import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { GlassCard } from '../../components/Cards/GlassCard';
import { FiAlertTriangle, FiHome } from 'react-icons/fi';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#8F7BFF]/20 rounded-full blur-[140px] pointer-events-none" />

      <GlassCard className="max-w-md text-center p-8 space-y-6 border-brand-start/30 shadow-glow-purple z-10">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <FiAlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-extrabold text-white tracking-tight text-gradient">404</h1>
          <h2 className="text-xl font-bold text-white">Route Outside Vector Index</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            The page or neural endpoint you are requesting does not exist or has been relocated.
          </p>
        </div>

        <PrimaryButton icon={FiHome} onClick={() => navigate('/dashboard')} className="w-full">
          Return to Marketing War Room
        </PrimaryButton>
      </GlassCard>
    </div>
  );
};
