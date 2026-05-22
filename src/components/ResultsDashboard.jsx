import React from 'react';
import { motion } from 'framer-motion';
import DiscountChart from './Charts/DiscountChart';
import SupportingInsights from './SupportingInsights';
import { TrendingUp, DollarSign, Activity, AlertTriangle, ShieldCheck, PieChart, Info, Download } from 'lucide-react';

export default function ResultsDashboard({ results, onExport }) {
  if (!results) return null;

  const { recommendation, status, metrics, chartData, inputs } = results;

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  // Status mapping
  const statusStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    danger: 'bg-red-50 border-red-200 text-red-800'
  };

  const statusIcons = {
    success: <ShieldCheck className="w-8 h-8 text-green-600" />,
    warning: <AlertTriangle className="w-8 h-8 text-yellow-600" />,
    danger: <AlertTriangle className="w-8 h-8 text-red-600" />
  };

  const handleExportCSV = () => {
    if (!inputs) return;
    
    const headers = [
      "Product Name", "Category", "Discount (%)", "Duration (Days)", 
      "AI Recommendation", "Net Incremental Profit ($)", "Projected Lift (%)", 
      "Cannibalization Impact ($)", "Gross Incremental Revenue ($)", "Expected ROI (%)", "Confidence Score (%)"
    ];
    
    const row = [
      `"${inputs.product.name}"`,
      `"${inputs.product.categoryName}"`,
      inputs.discount,
      inputs.duration,
      `"${recommendation}"`,
      metrics.netIncrementalProfit,
      metrics.liftPercentage,
      metrics.cannibalizationImpact,
      metrics.incrementalRevenue,
      metrics.roi,
      metrics.confidenceScore
    ];
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + row.join(",");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `PriceSense_Scenario_${inputs.product.name.replace(/\s+/g, '_')}_${inputs.discount}pct.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    if (onExport) onExport();
  };

  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { type: 'spring', stiffness: 250, damping: 20 } 
    }
  };

  return (
    <motion.div 
      variants={containerVariant}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Top Action Bar */}
      <motion.div variants={itemVariant} className="flex justify-end">
        <button 
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          <Download className="w-4 h-4" />
          Export to CSV
        </button>
      </motion.div>

      {/* Recommendation Banner */}
      <motion.div variants={itemVariant} className={`p-5 rounded-2xl border flex items-start sm:items-center gap-4 ${statusStyles[status]}`}>
        <div className="shrink-0 mt-1 sm:mt-0">
          {statusIcons[status]}
        </div>
        <div>
          <h3 className="font-bold text-lg sm:text-xl tracking-tight">AI Recommendation: {recommendation}</h3>
          <p className="text-sm opacity-90 mt-1 font-medium leading-relaxed">
            Based on historical category elasticity, margin compression, and modeled cannibalization impact.
          </p>
        </div>
      </motion.div>

      {/* Key Metrics Grid */}
      <motion.div variants={itemVariant} className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <MetricCard 
          title="Net Incr. Profit" 
          value={formatCurrency(metrics.netIncrementalProfit)} 
          subtitle="After cannibalization"
          icon={<DollarSign className="w-4 h-4" />}
          trend={metrics.netIncrementalProfit > 0 ? 'up' : 'down'}
        />
        <MetricCard 
          title="Projected Lift" 
          value={`+${metrics.liftPercentage}%`} 
          subtitle="Volume increase"
          icon={<TrendingUp className="w-4 h-4" />}
          trend="up"
        />
        <MetricCard 
          title="Cannibalization" 
          value={formatCurrency(metrics.cannibalizationImpact)} 
          subtitle="Impact on sibling SKUs"
          icon={<PieChart className="w-4 h-4" />}
          trend="down"
        />
        <MetricCard 
          title="Gross Incr. Rev" 
          value={`+${formatCurrency(metrics.incrementalRevenue)}`} 
          subtitle="Incremental revenue"
          icon={<Activity className="w-4 h-4" />}
          trend="up"
        />
        <MetricCard 
          title="Expected ROI" 
          value={`${metrics.roi}%`} 
          subtitle="Return on investment"
          icon={<TrendingUp className="w-4 h-4" />}
          trend={metrics.roi > 0 ? 'up' : 'down'}
        />
        <MetricCard 
          title="AI Confidence" 
          value={`${metrics.confidenceScore}%`} 
          subtitle="Model certainty"
          icon={<Info className="w-4 h-4" />}
          trend={metrics.confidenceScore > 80 ? 'up' : 'neutral'}
        />
      </motion.div>

      {/* Chart Section */}
      <motion.div variants={itemVariant} className="pt-6 border-t border-slate-200">
        <h3 className="font-bold text-slate-800 tracking-tight">Profitability Scenario Analysis</h3>
        <p className="text-sm text-slate-500 mb-2 font-medium">Comparing baseline profit against the proposed discount and adjacent alternatives.</p>
        <DiscountChart data={chartData} />
      </motion.div>

      {/* Supporting Insights */}
      <motion.div variants={itemVariant}>
        <SupportingInsights results={results} />
      </motion.div>
    </motion.div>
  );
}

function MetricCard({ title, value, subtitle, icon, trend }) {
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-slate-600';
  
  return (
    <motion.div 
      whileHover={{ y: -4, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
      className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm transition-colors duration-300"
    >
      <div className="flex items-center gap-2 text-slate-500 mb-3">
        {icon}
        <span className="text-xs font-bold uppercase tracking-wider">{title}</span>
      </div>
      <div className={`text-2xl font-black tracking-tight ${trendColor}`}>
        {value}
      </div>
      <div className="text-xs font-medium text-slate-500 mt-1">
        {subtitle}
      </div>
    </motion.div>
  );
}
