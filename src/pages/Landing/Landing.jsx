import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';
import { Footer } from '../../components/layout/Footer/Footer';
import {
  FiCpu,
  FiZap,
  FiTrendingUp,
  FiSliders,
  FiBookOpen,
  FiColumns,
  FiBarChart2,
  FiArrowRight,
  FiCheckCircle,
  FiShield,
  FiLayers,
  FiSearch,
} from 'react-icons/fi';

export const Landing = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/generator?query=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/generator');
    }
  };

  const features = [
    {
      title: 'AI Marketing War Room',
      desc: 'Orchestrate autonomous specialized AI agents that research, draft, evaluate, and optimize complete campaigns.',
      icon: FiCpu,
      color: '#A96A80',
    },
    {
      title: 'Trend Intelligence Engine',
      desc: 'Real-time viral keyword tracking, cultural festival opportunities, and predictive consumer sentiment signals.',
      icon: FiTrendingUp,
      color: '#D89AAA',
    },
    {
      title: 'Sales & Discount Optimizer',
      desc: 'Simulate campaign ROI, pricing elasticity, inventory reduction, and discount depth before spend.',
      icon: FiSliders,
      color: '#A96A80',
    },
    {
      title: 'Brand Voice Learning',
      desc: 'Automatically ingest and enforce brand guidelines, vocabulary rules, logo standards, and tone consistency.',
      icon: FiBookOpen,
      color: '#945A70',
    },
    {
      title: 'Competitor Intelligence',
      desc: 'SWOT matrix generation, competitor comparison tables, and market positioning gap analysis.',
      icon: FiColumns,
      color: '#A96A80',
    },
    {
      title: 'Executive Analytics',
      desc: 'Unified multi-channel performance tracking, budget pie charts, and funnel conversion telemetry.',
      icon: FiBarChart2,
      color: '#D89AAA',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F8] via-[#F8E8EB] to-[#EBC8D0] text-[#4A2E38] selection:bg-[#EBC8D0] selection:text-[#4A2E38] overflow-x-hidden font-sans">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF]/90 backdrop-blur-2xl border-b border-[#EDD5DB] px-6 py-4 flex items-center justify-between shadow-soft-sm">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-2xl bg-[#A96A80] flex items-center justify-center shadow-soft-sm">
            <FiCpu className="w-6 h-6 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-[#4A2E38] font-serif">
            Campaign<span className="text-[#A96A80]">Mind AI</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#7D6670]">
          <a href="#services" className="hover:text-[#A96A80] transition-colors">Services</a>
          <a href="#features" className="hover:text-[#A96A80] transition-colors">Intelligence</a>
          <a href="#enterprise" className="hover:text-[#A96A80] transition-colors">Governance</a>
        </div>

        <div className="flex items-center gap-3">
          <SecondaryButton onClick={() => navigate('/dashboard')}>
            Launch App
          </SecondaryButton>
          <PrimaryButton icon={FiArrowRight} onClick={() => navigate('/generator')}>
            Get Started
          </PrimaryButton>
        </div>
      </header>

      {/* Hero Section */}
      <section id="services" className="relative pt-36 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#4A2E38] mb-4 font-serif"
        >
          Enterprise AI Marketing <br />
          <span className="text-gradient-rose">Operating System</span>
        </motion.h1>

        <p className="text-[#7D6670] text-lg md:text-xl max-w-2xl font-light mb-10">
          Autonomous AI decision support platform for Consumer Packaged Goods (CPG) companies.
        </p>

        {/* Liquid Search Bar */}
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          onSubmit={handleSearchSubmit}
          className="w-full max-w-xl mb-16"
        >
          <div className="liquid-search-container">
            <div className="liquid-search-inner">
              <FiSearch className="w-5 h-5 text-[#A96A80] mr-3 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI marketing services..."
                className="w-full bg-transparent text-[#4A2E38] placeholder-[#A08A92] text-sm font-medium focus:outline-none"
              />
              <button
                type="submit"
                className="ml-2 px-5 py-1.5 rounded-full bg-[#A96A80] text-white text-xs font-bold tracking-wider hover:bg-[#945A70] transition-colors flex-shrink-0 shadow-soft-sm"
              >
                2025
              </button>
            </div>
          </div>
        </motion.form>

        {/* 3 Soft Luxury Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-24">
          
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate('/generator')}
            className="card-luxury p-8 cursor-pointer group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
          >
            <div className="w-28 h-28 mx-auto mb-6 relative">
              <img src="/assets/sphere_pink.jpg" alt="Lightning Sphere" className="w-full h-full object-contain rounded-full shadow-soft group-hover:scale-105 transition-transform" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A96A80] block">Service 01</span>
              <h3 className="text-2xl font-bold text-[#4A2E38] font-serif">Campaign Generator</h3>
              <p className="text-xs text-[#7D6670] font-normal">Autonomous RAG strategy, buyer personas & multi-channel content.</p>
              <div className="pt-4 flex items-center justify-between text-[#A96A80] font-bold text-sm">
                <span>Explore</span>
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate('/competitor-analyzer')}
            className="card-luxury p-8 cursor-pointer group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
          >
            <div className="w-28 h-28 mx-auto mb-6 relative">
              <img src="/assets/sphere_gold.jpg" alt="Gold Chart Sphere" className="w-full h-full object-contain rounded-full shadow-soft group-hover:scale-105 transition-transform" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A96A80] block">Service 02</span>
              <h3 className="text-2xl font-bold text-[#4A2E38] font-serif">Competitor Analyzer</h3>
              <p className="text-xs text-[#7D6670] font-normal">SWOT matrix, price benchmarking & positioning maps.</p>
              <div className="pt-4 flex items-center justify-between text-[#A96A80] font-bold text-sm">
                <span>Analyze</span>
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => navigate('/sales-optimizer')}
            className="card-luxury p-8 cursor-pointer group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
          >
            <div className="w-28 h-28 mx-auto mb-6 relative">
              <img src="/assets/sphere_purple.jpg" alt="Purple Play Sphere" className="w-full h-full object-contain rounded-full shadow-soft group-hover:scale-105 transition-transform" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A96A80] block">Service 03</span>
              <h3 className="text-2xl font-bold text-[#4A2E38] font-serif">Sales Optimizer</h3>
              <p className="text-xs text-[#7D6670] font-normal">Discount depth calculation, inventory turn & revenue forecasting.</p>
              <div className="pt-4 flex items-center justify-between text-[#A96A80] font-bold text-sm">
                <span>Simulate</span>
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Feature Section Grid */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#4A2E38] mb-4 font-serif">
            Autonomous Marketing <span className="text-gradient-rose">Intelligence</span>
          </h2>
          <p className="text-[#7D6670] max-w-xl mx-auto text-base">
            Every module engineered to give enterprise CPG brands an unshakeable competitive moat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div key={`landing-feat-${idx}`} className="glass-panel p-6 glass-panel-hover flex flex-col justify-between bg-[#FFFFFF]">
              <div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border border-[#EDD5DB] bg-[#F8E8EB]"
                  style={{ color: '#A96A80' }}
                >
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#4A2E38] mb-2 font-serif">{feat.title}</h3>
                <p className="text-sm text-[#7D6670] leading-relaxed mb-6">{feat.desc}</p>
              </div>
              <div
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-xs font-bold text-[#A96A80] cursor-pointer hover:underline"
              >
                <span>Launch Module</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Governance Section */}
      <section id="enterprise" className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="glass-panel p-8 md:p-12 border-[#EDD5DB] bg-[#FFFFFF]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3D8DE] text-[#4A2E38] text-xs font-bold mb-4">
                <FiShield className="w-4 h-4 text-[#A96A80]" />
                <span>Bank-Grade Governance</span>
              </div>
              <h3 className="text-3xl font-extrabold text-[#4A2E38] mb-4 font-serif">
                Built for Fortune 500 Marketing Security
              </h3>
              <p className="text-[#7D6670] text-sm leading-relaxed mb-6">
                Your proprietary brand assets, consumer datasets, and strategy decks never train public LLMs. Fully isolated single-tenant environments.
              </p>
              <div className="space-y-2 text-sm text-[#7D6670]">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#A96A80] w-4 h-4" />
                  <span>SOC 2 Type II Certified Data Centers</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#A96A80] w-4 h-4" />
                  <span>Custom On-Premises & Private Cloud Deployment</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="p-8 rounded-3xl bg-[#F8E8EB] border border-[#EDD5DB] text-center space-y-4 max-w-sm shadow-soft">
                <FiLayers className="w-12 h-12 text-[#A96A80] mx-auto" />
                <h4 className="font-bold text-[#4A2E38] text-lg font-serif">Ready to Scale Marketing ROI?</h4>
                <PrimaryButton icon={FiArrowRight} className="w-full" onClick={() => navigate('/generator')}>
                  Start Free Trial
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
