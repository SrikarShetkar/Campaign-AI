import React from 'react';
import { FiCpu } from 'react-icons/fi';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12 bg-[#08080C] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-brand-gradient flex items-center justify-center text-slate-950 font-bold">
              <FiCpu className="w-5 h-5" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">CampaignMind AI</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Enterprise AI Marketing Operating System. Unifying market intelligence, real-time consumer telemetry, and autonomous campaign generation.
          </p>
          <div className="text-xs text-slate-500">© 2026 CampaignMind AI Inc. All rights reserved.</div>
        </div>

        <div>
          <h5 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">Platform</h5>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-white cursor-pointer">AI Marketing War Room</li>
            <li className="hover:text-white cursor-pointer">Trend Intelligence Engine</li>
            <li className="hover:text-white cursor-pointer">Campaign Simulator</li>
            <li className="hover:text-white cursor-pointer">Brand Voice Learning</li>
            <li className="hover:text-white cursor-pointer">Export & Governance</li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">Enterprise</h5>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-white cursor-pointer">Security & Compliance</li>
            <li className="hover:text-white cursor-pointer">SOC 2 Type II Certified</li>
            <li className="hover:text-white cursor-pointer">Custom Model Fine-tuning</li>
            <li className="hover:text-white cursor-pointer">Dedicated AI Strategists</li>
            <li className="hover:text-white cursor-pointer">API Integration Docs</li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">System Status</h5>
          <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Agent Network:</span>
              <span className="text-accent-mint font-semibold">100% Operational</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Market Feed Sync:</span>
              <span className="text-accent-mint font-semibold">Live (42ms)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Security Shield:</span>
              <span className="text-accent-gold font-semibold">Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
