import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../../store/useAppStore';
import {
  FiGrid,
  FiPlusCircle,
  FiShield,
  FiDollarSign,
  FiTrendingUp,
  FiColumns,
  FiClock,
  FiBookOpen,
  FiDatabase,
  FiBarChart2,
  FiDownload,
  FiSettings,
  FiUser,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiCpu,
} from 'react-icons/fi';

export const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiGrid },
    { name: 'Campaign Generator', path: '/generator', icon: FiPlusCircle, badge: 'AI' },
    { name: 'Competitor Analyzer', path: '/competitor-analyzer', icon: FiShield },
    { name: 'Sales Optimizer', path: '/sales-optimizer', icon: FiDollarSign },
    { name: 'Campaign History', path: '/history', icon: FiClock },
    { name: 'Export Center', path: '/export', icon: FiDownload },
  ];

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen z-40 bg-[#FFFFFF]/90 backdrop-blur-xl border-r border-[#EDD5DB]
        transition-all duration-300 flex flex-col justify-between py-5 px-3 shadow-soft
        ${sidebarCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Brand Header */}
      <div>
        <div className="flex items-center justify-between px-2 mb-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-10 h-10 rounded-2xl bg-[#A96A80] flex items-center justify-center shadow-soft-sm flex-shrink-0">
              <FiCpu className="w-6 h-6 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <span className="font-extrabold text-lg text-[#4A2E38] tracking-tight leading-none block font-serif">
                  Campaign<span className="text-[#A96A80]">Mind</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-[#A96A80] tracking-widest block">
                  Campaign Studio
                </span>
              </div>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-xl text-[#7D6670] hover:text-[#4A2E38] hover:bg-[#F8E8EB] transition-colors"
          >
            {sidebarCollapsed ? <FiChevronRight className="w-5 h-5" /> : <FiChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 group relative
                ${
                  isActive
                    ? 'bg-[#A96A80] text-white shadow-soft-sm'
                    : 'text-[#7D6670] hover:text-[#4A2E38] hover:bg-[#F8E8EB]'
                }
              `}
              title={sidebarCollapsed ? item.name : undefined}
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {!sidebarCollapsed && (
                <span className="flex-1 truncate">{item.name}</span>
              )}
              {!sidebarCollapsed && item.badge && (
                <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-[#F3D8DE] text-[#4A2E38]">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="pt-4 border-t border-[#EDD5DB] space-y-1">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-[#4A2E38] hover:bg-[#F3D8DE] transition-colors"
          title={sidebarCollapsed ? 'Logout' : undefined}
        >
          <FiLogOut className="w-5 h-5 text-[#A96A80]" />
          {!sidebarCollapsed && <span>Back to home</span>}
        </button>
      </div>
    </aside>
  );
};
