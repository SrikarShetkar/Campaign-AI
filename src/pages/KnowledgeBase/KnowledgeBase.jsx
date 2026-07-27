import React, { useState } from 'react';
import knowledgeData from '../../mock/knowledge.json';
import { GlassCard } from '../../components/Cards/GlassCard';
import { FiSearch, FiDatabase, FiArrowRight } from 'react-icons/fi';

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
      {/* Header & Search */}
      <div className="space-y-5">
        <div>
          <h1
            className="font-extrabold text-[#4A2E38] tracking-tight font-serif"
            style={{ fontSize: 'clamp(1.6rem,4vw,2.25rem)' }}
          >
            Knowledge <span className="text-gradient-rose">Base</span>
          </h1>
          <p className="text-[#7D6670] text-sm mt-1 leading-relaxed">
            Enterprise repository storing consumer datasets, brand playbooks, competitor positioning, and festival logs.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A08A92] w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search marketing frameworks, tags, or report titles..."
            className="w-full pl-12 pr-4 py-3 bg-[#FFFFFF] border border-[#EDD5DB] rounded-full text-[#4A2E38] text-sm
              placeholder-[#A08A92] focus:outline-none focus:border-[#A96A80] focus:ring-1 focus:ring-[#A96A80]/30 transition-all shadow-soft-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#A96A80] text-white border-[#A96A80] shadow-soft-sm'
                  : 'bg-[#FFFFFF] text-[#7D6670] border-[#EDD5DB] hover:border-[#A96A80] hover:text-[#4A2E38]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 text-[#A08A92]">
          <FiDatabase className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium">No documents match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between bg-[#FFFFFF] border border-[#EDD5DB] rounded-2xl p-6
                shadow-soft hover:-translate-y-1 hover:border-[#A96A80] hover:shadow-soft-lg transition-all duration-300 group"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#F3D8DE] text-[#4A2E38] text-[10px] font-bold border border-[#EDD5DB] truncate max-w-[70%]">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#A08A92] flex-shrink-0">{item.id.toUpperCase()}</span>
                </div>

                <h3
                  className="font-bold text-[#4A2E38] font-serif leading-snug break-words group-hover:text-[#A96A80] transition-colors"
                  style={{ fontSize: 'clamp(1rem,2vw,1.1rem)' }}
                >
                  {item.title}
                </h3>

                <p className="text-xs text-[#7D6670] leading-relaxed">{item.summary}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#EDD5DB] space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={`tag-${idx}`}
                      className="px-2 py-0.5 text-[10px] rounded-md bg-[#F8E8EB] text-[#7D6670] font-mono border border-[#EDD5DB]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-end gap-1 text-xs font-semibold text-[#A96A80] hover:underline cursor-pointer">
                  <span>View Full Vector Document</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
