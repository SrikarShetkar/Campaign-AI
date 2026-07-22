import React from 'react';
import { GlassCard } from './GlassCard';

export const StatCard = ({ title, value, change, trend = 'up', icon: Icon, color = '#A96A80', subtitle }) => {
  return (
    <GlassCard glow={trend === 'up'} className="flex flex-col justify-between h-full bg-[#FFFFFF] border border-[#EDD5DB]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#7D6670]">{title}</span>
        {Icon && (
          <div
            className="p-2.5 rounded-xl border border-[#EDD5DB] bg-[#F8E8EB]"
            style={{ color: '#A96A80' }}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div>
        <div className="text-3xl font-extrabold text-[#4A2E38] tracking-tight mb-1 font-serif">{value}</div>
        {change && (
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className={trend === 'up' ? 'text-[#A96A80]' : 'text-rose-500'}>
              {trend === 'up' ? '▲' : '▼'} {change}
            </span>
            <span className="text-[#A08A92]">vs last period</span>
          </div>
        )}
        {subtitle && <p className="text-xs text-[#7D6670] mt-1">{subtitle}</p>}
      </div>
    </GlassCard>
  );
};
