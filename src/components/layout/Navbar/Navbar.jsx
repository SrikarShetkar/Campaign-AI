import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../../store/useAppStore';
import { FiSearch, FiBell, FiPlusCircle, FiZap } from 'react-icons/fi';
import { PrimaryButton } from '../../Buttons/PrimaryButton';

export const Navbar = () => {
  const { searchQuery, setSearchQuery, notificationsCount, sidebarCollapsed } = useAppStore();
  const navigate = useNavigate();

  return (
    <header
      className={`
        sticky top-0 z-30 h-16 bg-[#FFFFFF]/90 backdrop-blur-xl border-b border-[#EDD5DB] px-6
        flex items-center justify-between transition-all duration-300 shadow-soft-sm
        ${sidebarCollapsed ? 'ml-20' : 'ml-64'}
      `}
    >
      {/* Search Input */}
      <div className="relative w-72 md:w-96">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A08A92] w-4 h-4" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search campaigns, trends, guidelines..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-[#FFF8F8] border border-[#EDD5DB] rounded-full text-[#4A2E38] placeholder-[#A08A92] focus:outline-none focus:border-[#A96A80] transition-all"
        />
      </div>

      {/* Quick Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* System AI Engine Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F8E8EB] border border-[#EDD5DB] text-xs text-[#7D6670]">
          <span className="w-2 h-2 rounded-full bg-[#A96A80] animate-pulse" />
          <FiZap className="w-3.5 h-3.5 text-[#A96A80]" />
          <span>AI Engine: <strong className="text-[#4A2E38] font-semibold">Ready v4.2</strong></span>
        </div>

        <PrimaryButton icon={FiPlusCircle} onClick={() => navigate('/generator')}>
          New Campaign
        </PrimaryButton>

        {/* Notifications */}
        <button
          onClick={() => navigate('/notifications')}
          className="relative p-2.5 rounded-full bg-[#F3D8DE] hover:bg-[#EBC8D0] border border-[#EDD5DB] text-[#4A2E38] transition-colors"
        >
          <FiBell className="w-5 h-5 text-[#A96A80]" />
          {notificationsCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 text-[10px] font-bold rounded-full bg-[#A96A80] text-white flex items-center justify-center border border-[#FFFFFF]">
              {notificationsCount}
            </span>
          )}
        </button>

        {/* Profile Pill */}
        <div
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-full bg-[#FFF8F8] border border-[#EDD5DB] hover:border-[#A96A80] cursor-pointer transition-all shadow-soft-sm"
        >
          <div className="w-8 h-8 rounded-full bg-[#A96A80] flex items-center justify-center text-white font-bold text-xs shadow-soft-sm">
            EK
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-[#4A2E38] leading-none">Emma K.</div>
            <div className="text-[10px] text-[#7D6670] leading-tight">CMO @ AuraGlow</div>
          </div>
        </div>
      </div>
    </header>
  );
};
