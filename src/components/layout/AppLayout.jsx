import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar';
import { Navbar } from './Navbar/Navbar';
import { useAppStore } from '../../store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';

export const AppLayout = () => {
  const { sidebarCollapsed } = useAppStore();
  const location = useLocation();

  // If on landing page or processing page, render full screen without dashboard shell
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-slate-100 flex flex-col font-sans">
      <Sidebar />
      <Navbar />

      <main
        className={`
          flex-1 p-6 md:p-8 transition-all duration-300 min-h-[calc(100vh-4rem)]
          ${sidebarCollapsed ? 'ml-20' : 'ml-64'}
        `}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="max-w-7xl mx-auto space-y-8"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
