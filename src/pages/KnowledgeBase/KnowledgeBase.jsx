import React, { useState } from 'react';
import knowledgeData from '../../mock/knowledge.json';
import { GlassCard } from '../../components/Cards/GlassCard';
import { FiSearch, FiDatabase, FiTag, FiBookOpen, FiArrowRight } from 'react-icons/fi';

export const KnowledgeBase = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Consumer Personas', 'Brand Guidelines', 'Competitors', 'Festivals', 'Products'];

  const filteredItems = knowledgeData.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Search Bar */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Knowledge <span className="text-gradient">Base</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Enterprise repository storing consumer datasets, brand playbooks, competitor positioning, and festival logs.
          </p>
        </div>

        <div className="relative max-w-2xl">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search marketing frameworks, tags, or report titles..."
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/15 rounded-full text-white text-sm focus:outline-none focus:border-[#8F7BFF] focus:ring-1 focus:ring-[#8F7BFF]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-gradient text-slate-950 shadow-glow-purple'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <GlassCard key={item.id} className="flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-accent-lavender/10 text-accent-lavender text-[10px] font-bold border border-accent-lavender/20">
                  {item.category}
                </span>
                <span className="text-[10px] font-mono text-slate-500">{item.id.toUpperCase()}</span>
              </div>
              <h3 className="font-bold text-white text-lg group-hover:text-accent-lavender transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.summary}</p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-[10px] rounded-md bg-white/5 text-slate-300 font-mono">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-end text-xs font-semibold text-accent-lavender hover:underline cursor-pointer">
                <span>View Full Vector Document</span> <FiArrowRight className="ml-1 w-3.5 h-3.5" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
