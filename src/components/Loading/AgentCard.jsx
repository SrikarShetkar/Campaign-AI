import React from 'react';
import { motion } from 'framer-motion';

export const AgentCard = ({ name, role, status, progress, icon: Icon, color = '#8F7BFF' }) => {
  const isDone = status === 'completed';
  const isWorking = status === 'working';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-panel p-5 border transition-all duration-300 ${
        isWorking ? 'border-[#8F7BFF] shadow-glow-purple bg-brand-surfaceDark/80' : isDone ? 'border-accent-mint/30 bg-emerald-950/20' : 'border-white/5 opacity-60'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="p-3 rounded-2xl border border-white/10"
            style={{ backgroundColor: `${color}20`, color: color }}
          >
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-white text-base">{name}</h4>
            <p className="text-xs text-slate-400">{role}</p>
          </div>
        </div>

        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full border ${
            isDone
              ? 'bg-accent-mint/10 text-accent-mint border-accent-mint/30'
              : isWorking
              ? 'bg-[#8F7BFF]/10 text-[#C9B8FF] border-[#8F7BFF]/40 animate-pulse'
              : 'bg-white/5 text-slate-500 border-white/5'
          }`}
        >
          {isDone ? '✓ Completed' : isWorking ? '⚡ Processing...' : 'Waiting'}
        </span>
      </div>

      {/* Animated Progress Bar */}
      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: isDone
              ? 'linear-gradient(90deg, #6EE7B7 0%, #34D399 100%)'
              : 'linear-gradient(90deg, #8F7BFF 0%, #C9B8FF 100%)',
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};
