import React from 'react';

export const PulseSkeleton = ({ className = 'h-24 w-full' }) => {
  return (
    <div
      className={`glass-panel animate-pulse bg-white/5 border border-white/5 rounded-2xl ${className}`}
    />
  );
};
