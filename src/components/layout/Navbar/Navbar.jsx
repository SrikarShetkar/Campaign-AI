import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../../store/useAppStore';
import { FiPlusCircle } from 'react-icons/fi';
import { PrimaryButton } from '../../Buttons/PrimaryButton';

export const Navbar = () => {
  const navigate = useNavigate();
  const { sidebarCollapsed } = useAppStore();
  return (
    <header className={`sticky top-0 z-30 ${sidebarCollapsed ? "ml-20" : "ml-64"} h-16 bg-white/90 backdrop-blur-xl border-b border-[#EDD5DB] px-6 flex items-center justify-between shadow-soft-sm`}>
      <span className="font-serif font-bold text-[#4A2E38]">Campaign Studio</span>
      <PrimaryButton icon={FiPlusCircle} onClick={() => navigate('/generator')}>New Campaign</PrimaryButton>
    </header>
  );
};
