import React from 'react';

export const GlassCard = ({ children, className = '', hover = true, glow = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        glass-panel p-6 relative overflow-hidden transition-all duration-300 bg-[#FFFFFF] border border-[#EDD5DB] rounded-2xl shadow-soft
        ${hover ? 'glass-panel-hover' : ''}
        ${glow ? 'shadow-soft-lg border-[#A96A80]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
