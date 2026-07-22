import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiTrendingUp, FiBox, FiPercent, FiCalendar, FiBarChart2 } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { campaignService } from '../../services/campaignService';

export const SalesOptimizer = () => {
  const [product, setProduct] = useState('AuraPure Bio-Active Serum');
  const [currentPrice, setCurrentPrice] = useState(35.00);
  const [inventory, setInventory] = useState(12000);
  const [monthlySales, setMonthlySales] = useState(1800);
  const [campaignGoal, setCampaignGoal] = useState('Maximize Revenue & Margin');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleOptimize = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await campaignService.optimizeSales({
        product,
        current_price: currentPrice,
        inventory,
        monthly_sales: monthlySales,
        campaign_goal: campaignGoal
      });
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
          <FiDollarSign className="w-8 h-8 text-[#A96A80]" />
          Sales & Discount Optimizer
        </h1>
        <p className="text-[#7D6670] text-sm mt-1">
          Predict optimal sale windows, discount depth, bundle strategies, and revenue growth.
        </p>
      </div>

      {/* Input Form */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 border border-[#EDD5DB] bg-[#FFFFFF] rounded-2xl shadow-soft">
        <form onSubmit={handleOptimize} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-[#7D6670] uppercase tracking-wider mb-2">Product Name</label>
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl px-4 py-2.5 text-[#4A2E38] focus:outline-none focus:border-[#A96A80]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#7D6670] uppercase tracking-wider mb-2">Current Price ($)</label>
            <input
              type="number"
              step="0.01"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(parseFloat(e.target.value))}
              className="w-full bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl px-4 py-2.5 text-[#4A2E38] focus:outline-none focus:border-[#A96A80]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#7D6670] uppercase tracking-wider mb-2">Inventory (Units)</label>
            <input
              type="number"
              value={inventory}
              onChange={(e) => setInventory(parseInt(e.target.value))}
              className="w-full bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl px-4 py-2.5 text-[#4A2E38] focus:outline-none focus:border-[#A96A80]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#7D6670] uppercase tracking-wider mb-2">Monthly Sales (Units)</label>
            <input
              type="number"
              value={monthlySales}
              onChange={(e) => setMonthlySales(parseInt(e.target.value))}
              className="w-full bg-[#FFF8F8] border border-[#EDD5DB] rounded-xl px-4 py-2.5 text-[#4A2E38] focus:outline-none focus:border-[#A96A80]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-6 rounded-xl bg-[#A96A80] font-bold text-white flex items-center justify-center gap-2 hover:bg-[#945A70] transition-colors shadow-soft-sm disabled:opacity-50"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><FiTrendingUp className="w-4 h-4" /> Optimize Sales</>}
          </button>
        </form>
      </motion.div>

      {/* Output Dashboard */}
      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-5 border border-[#EDD5DB] bg-[#FFFFFF] rounded-2xl space-y-2 shadow-soft">
              <span className="text-xs font-bold text-[#7D6670] uppercase tracking-wider block">Suggested Discount</span>
              <div className="text-2xl font-extrabold text-[#A96A80] flex items-center gap-2 font-serif">
                <FiPercent /> {result.suggested_discount}
              </div>
              <span className="text-xs text-[#7D6670]">Target price: {result.suggested_price}</span>
            </div>

            <div className="glass-card p-5 border border-[#EDD5DB] bg-[#FFFFFF] rounded-2xl space-y-2 shadow-soft">
              <span className="text-xs font-bold text-[#7D6670] uppercase tracking-wider block">Revenue Forecast</span>
              <div className="text-2xl font-extrabold text-[#4A2E38] flex items-center gap-2 font-serif">
                <FiDollarSign className="text-[#A96A80]" /> {result.revenue_forecast}
              </div>
              <span className="text-xs text-[#A96A80] font-bold">{result.sales_increase_estimate}</span>
            </div>

            <div className="glass-card p-5 border border-[#EDD5DB] bg-[#FFFFFF] rounded-2xl space-y-2 shadow-soft">
              <span className="text-xs font-bold text-[#7D6670] uppercase tracking-wider block">ROI Estimate</span>
              <div className="text-2xl font-extrabold text-[#A96A80] flex items-center gap-2 font-serif">
                <FiTrendingUp /> {result.roi_estimate}
              </div>
              <span className="text-xs text-[#7D6670]">ROAS Efficiency</span>
            </div>

            <div className="glass-card p-5 border border-[#EDD5DB] bg-[#FFFFFF] rounded-2xl space-y-2 shadow-soft">
              <span className="text-xs font-bold text-[#7D6670] uppercase tracking-wider block">Stock Reduction</span>
              <div className="text-2xl font-extrabold text-[#4A2E38] flex items-center gap-2 font-serif">
                <FiBox className="text-[#A96A80]" /> {result.inventory_reduction_prediction?.split(' ')[2] || '3,600'} Units
              </div>
              <span className="text-xs text-[#7D6670]">Clearance velocity</span>
            </div>
          </div>

          {/* Visualized Graphs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card p-6 border border-[#EDD5DB] bg-[#FFFFFF] rounded-2xl space-y-4 shadow-soft">
              <h3 className="text-lg font-bold text-[#4A2E38] flex items-center gap-2 font-serif"><FiBarChart2 className="text-[#A96A80]" /> Sales Volume Curve (30-Day Forecast)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={result.chart_data?.sales_forecast_curve || []}>
                    <defs>
                      <linearGradient id="optColorRose" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A96A80" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#A96A80" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="#7D6670" />
                    <YAxis stroke="#7D6670" />
                    <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#EDD5DB', borderRadius: '12px', color: '#4A2E38' }} />
                    <Area type="monotone" dataKey="optimized_sales" name="Optimized Sales" stroke="#A96A80" fillOpacity={1} fill="url(#optColorRose)" />
                    <Area type="monotone" dataKey="standard_sales" name="Baseline Sales" stroke="#7D6670" fillOpacity={0.2} fill="#7D6670" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card p-6 border border-[#EDD5DB] bg-[#FFFFFF] rounded-2xl space-y-4 shadow-soft">
              <h3 className="text-lg font-bold text-[#4A2E38] flex items-center gap-2 font-serif"><FiCalendar className="text-[#A96A80]" /> Recommendations & Strategy</h3>
              <div className="space-y-3">
                <div className="p-3.5 bg-[#F8E8EB] rounded-xl border border-[#EDD5DB]">
                  <span className="text-xs font-bold text-[#A96A80] uppercase tracking-wider block mb-1">Best Sale Window</span>
                  <p className="text-sm text-[#4A2E38]">{result.best_sale_window}</p>
                </div>
                <div className="p-3.5 bg-[#F8E8EB] rounded-xl border border-[#EDD5DB]">
                  <span className="text-xs font-bold text-[#A96A80] uppercase tracking-wider block mb-1">Flash Sale Recommendation</span>
                  <p className="text-sm text-[#4A2E38]">{result.flash_sale_recommendation}</p>
                </div>
                <div className="p-3.5 bg-[#F8E8EB] rounded-xl border border-[#EDD5DB]">
                  <span className="text-xs font-bold text-[#A96A80] uppercase tracking-wider block mb-1">Bundle Recommendation</span>
                  <p className="text-sm text-[#4A2E38]">{result.bundle_recommendation}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
