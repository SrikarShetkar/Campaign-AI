import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiShield, FiTrendingUp, FiTarget, FiZap, FiCheckCircle } from 'react-icons/fi';
import { campaignService } from '../../services/campaignService';

export const CompetitorAnalyzer = () => {
  const [brandName, setBrandName] = useState('AuraPure');
  const [category, setCategory] = useState('Skincare');
  const [region, setRegion] = useState('North America');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await campaignService.analyzeCompetitors({ brand_name: brandName, category, region });
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#4A2E38] tracking-tight flex items-center gap-3 font-serif">
          <FiShield className="w-8 h-8 text-[#A96A80]" />
          Brand Competitor Analyzer
        </h1>
        <p className="text-[#7D6670] text-sm mt-1">
          RAG-driven competitive benchmarking, market positioning matrix, and strategic gap analysis.
        </p>
      </div>

      {/* Inputs Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 border border-[#EDD5DB] bg-[#FFFFFF] rounded-2xl shadow-soft"
      >
        <form onSubmit={handleAnalyze} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-[#7D6670] uppercase tracking-wider mb-2">Brand Name</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl px-4 py-2.5 text-[#4A2E38] focus:outline-none focus:border-[#A96A80]"
              placeholder="e.g. AuraPure"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#7D6670] uppercase tracking-wider mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl px-4 py-2.5 text-[#4A2E38] focus:outline-none focus:border-[#A96A80]"
            >
              {['Skincare', 'Beverages', 'Food', 'Hair Care', 'Cosmetics', 'Household Cleaning', 'Baby Care', 'Pet Care'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#7D6670] uppercase tracking-wider mb-2">Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl px-4 py-2.5 text-[#4A2E38] focus:outline-none focus:border-[#A96A80]"
            >
              {['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa'].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-6 rounded-xl bg-[#A96A80] font-bold text-white flex items-center justify-center gap-2 hover:bg-[#945A70] transition-colors shadow-soft-sm disabled:opacity-50"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><FiSearch className="w-4 h-4" /> Analyze Competitors</>}
          </button>
        </form>
      </motion.div>

      {/* Results Section */}
      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          {/* Competitor Comparison Table */}
          <div className="glass-card p-6 border border-[#EDD5DB] bg-[#FFFFFF] rounded-2xl space-y-4 shadow-soft">
            <h2 className="text-xl font-bold text-[#4A2E38] flex items-center gap-2 font-serif">
              <FiTarget className="text-[#A96A80]" /> Competitor Comparison Matrix
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#4A2E38]">
                <thead className="bg-[#F8E8EB] text-xs text-[#7D6670] uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 rounded-l-xl font-bold">Brand</th>
                    <th className="p-3.5 font-bold">Price</th>
                    <th className="p-3.5 font-bold">Rating</th>
                    <th className="p-3.5 font-bold">Positioning</th>
                    <th className="p-3.5 font-bold">Target Audience</th>
                    <th className="p-3.5 font-bold">Distribution</th>
                    <th className="p-3.5 font-bold">Strengths</th>
                    <th className="p-3.5 rounded-r-xl font-bold">Weaknesses</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDD5DB]">
                  {result.competitor_table?.map((c, i) => (
                    <tr key={i} className="hover:bg-[#F8E8EB]/50 transition-colors">
                      <td className="p-3.5 font-bold text-[#4A2E38]">{c.name}</td>
                      <td className="p-3.5 text-[#A96A80] font-bold">{c.price}</td>
                      <td className="p-3.5 text-amber-600 font-bold">★ {c.rating}</td>
                      <td className="p-3.5 text-[#7D6670]">{c.market_position}</td>
                      <td className="p-3.5 text-[#7D6670]">{c.target_audience}</td>
                      <td className="p-3.5 text-[#7D6670]">{c.distribution}</td>
                      <td className="p-3.5 text-[#A96A80] text-xs font-semibold">{c.strengths}</td>
                      <td className="p-3.5 text-rose-700 text-xs font-medium">{c.weaknesses}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SWOT Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 border border-[#EDD5DB] bg-[#FFFFFF] rounded-2xl space-y-3 shadow-soft">
              <h3 className="text-lg font-bold text-[#4A2E38] flex items-center gap-2 font-serif"><FiCheckCircle className="text-[#A96A80]" /> Brand Strengths</h3>
              <ul className="space-y-2 text-sm text-[#7D6670]">
                {result.swot_analysis?.strengths?.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">✓ <span className="text-[#4A2E38]">{s}</span></li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-6 border border-[#EDD5DB] bg-[#FFFFFF] rounded-2xl space-y-3 shadow-soft">
              <h3 className="text-lg font-bold text-[#4A2E38] flex items-center gap-2 font-serif"><FiShield className="text-[#A96A80]" /> Weaknesses & Vulnerabilities</h3>
              <ul className="space-y-2 text-sm text-[#7D6670]">
                {result.swot_analysis?.weaknesses?.map((w, idx) => (
                  <li key={idx} className="flex items-start gap-2">⚠ <span className="text-[#4A2E38]">{w}</span></li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-6 border border-[#EDD5DB] bg-[#FFFFFF] rounded-2xl space-y-3 shadow-soft">
              <h3 className="text-lg font-bold text-[#4A2E38] flex items-center gap-2 font-serif"><FiTrendingUp className="text-[#A96A80]" /> Market Opportunities</h3>
              <ul className="space-y-2 text-sm text-[#7D6670]">
                {result.swot_analysis?.opportunities?.map((o, idx) => (
                  <li key={idx} className="flex items-start gap-2">🚀 <span className="text-[#4A2E38]">{o}</span></li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-6 border border-[#EDD5DB] bg-[#FFFFFF] rounded-2xl space-y-3 shadow-soft">
              <h3 className="text-lg font-bold text-[#4A2E38] flex items-center gap-2 font-serif"><FiZap className="text-[#A96A80]" /> Competitive Threats</h3>
              <ul className="space-y-2 text-sm text-[#7D6670]">
                {result.swot_analysis?.threats?.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2">⚡ <span className="text-[#4A2E38]">{t}</span></li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Recommendations Card */}
          <div className="glass-card p-6 border border-[#EDD5DB] bg-[#FFFFFF] rounded-2xl space-y-4 shadow-soft">
            <h2 className="text-xl font-bold text-[#4A2E38] flex items-center gap-2 font-serif">
              <FiZap className="text-[#A96A80]" /> AI Strategic Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#F8E8EB] rounded-xl border border-[#EDD5DB]">
                <span className="text-xs font-bold text-[#A96A80] uppercase tracking-wider block mb-1">Pricing Strategy</span>
                <p className="text-sm text-[#4A2E38]">{result.ai_recommendations?.pricing_improvements}</p>
              </div>
              <div className="p-4 bg-[#F8E8EB] rounded-xl border border-[#EDD5DB]">
                <span className="text-xs font-bold text-[#A96A80] uppercase tracking-wider block mb-1">Differentiation Strategy</span>
                <p className="text-sm text-[#4A2E38]">{result.ai_recommendations?.differentiation_strategy}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
