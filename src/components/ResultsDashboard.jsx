import React from 'react';
import { motion } from 'framer-motion';
import DiscountChart from './Charts/DiscountChart';
import SupportingInsights from './SupportingInsights';
import { TrendingUp, DollarSign, Activity, AlertTriangle, ShieldCheck, PieChart, Info, Download, Crown } from 'lucide-react';

export default function ResultsDashboard({ results, onExport, isDarkMode }) {
  if (!results) return null;

  const isCompare = results.isCompare;
  
  // Extract primary data
  const mainData = isCompare ? results.A : results;
  const secondaryData = isCompare ? results.B : null;
  const { recommendation, status, metrics, chartData, inputs } = mainData;

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  // Status mapping
  const statusStyles = {
    success: 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20 text-green-800 dark:text-green-300',
    warning: 'bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20 text-yellow-800 dark:text-yellow-300',
    danger: 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-800 dark:text-red-300'
  };

  const statusIcons = {
    success: <ShieldCheck className="w-8 h-8 text-green-600 dark:text-green-400" />,
    warning: <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />,
    danger: <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
  };

  const handleExportCSV = () => {
    if (!inputs) return;
    
    const headers = [
      "Scenario", "Product Name", "Category", "Discount (%)", "Duration (Days)", 
      "AI Recommendation", "Net Incremental Profit ($)", "Projected Lift (%)", 
      "Cannibalization Impact ($)", "Gross Incremental Revenue ($)", "Expected ROI (%)", "Confidence Score (%)"
    ];
    
    const makeRow = (name, d) => [
      name,
      `"${d.inputs.product.name}"`,
      `"${d.inputs.product.categoryName}"`,
      d.inputs.discount,
      d.inputs.duration,
      `"${d.recommendation}"`,
      d.metrics.netIncrementalProfit,
      d.metrics.liftPercentage,
      d.metrics.cannibalizationImpact,
      d.metrics.incrementalRevenue,
      d.metrics.roi,
      d.metrics.confidenceScore
    ];

    let rows = [];
    if (isCompare) {
      rows.push(makeRow("Scenario A", results.A));
      rows.push(makeRow("Scenario B", results.B));
    } else {
      rows.push(makeRow("Primary", results));
    }
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(r => r.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `PriceSense_Report.csv`);
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

  // Build Compare Chart Data
  let finalChartData = chartData;
  if (isCompare) {
    finalChartData = [
      { name: 'Baseline (0%)', profit: results.A.chartData[0].profit },
      { name: `A (${results.A.inputs.discount}%)`, profit: results.A.chartData[2].profit },
      { name: `B (${results.B.inputs.discount}%)`, profit: results.B.chartData[2].profit },
    ];
  }

  // Determine Winner in Compare Mode
  let winnerText = "";
  if (isCompare) {
    if (results.A.metrics.netIncrementalProfit > results.B.metrics.netIncrementalProfit) {
      winnerText = `Scenario A (${results.A.inputs.discount}%) yields higher profitability.`;
    } else if (results.B.metrics.netIncrementalProfit > results.A.metrics.netIncrementalProfit) {
      winnerText = `Scenario B (${results.B.inputs.discount}%) yields higher profitability.`;
    } else {
      winnerText = "Both scenarios yield similar profitability.";
    }
  }

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
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
        >
          <Download className="w-4 h-4" />
          Export to CSV
        </button>
      </motion.div>

      {/* Recommendation Banner */}
      {isCompare ? (
        <motion.div variants={itemVariant} className={`p-5 rounded-2xl border flex items-start sm:items-center gap-4 bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800/50 text-indigo-900 dark:text-indigo-200`}>
          <div className="shrink-0 mt-1 sm:mt-0">
            <Crown className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="font-bold text-lg sm:text-xl tracking-tight">A/B Test Result: {winnerText}</h3>
            <p className="text-sm opacity-90 mt-1 font-medium leading-relaxed">
              Compare the metrics below to understand the tradeoff between volume lift and margin compression.
            </p>
          </div>
        </motion.div>
      ) : (
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
      )}

      {/* Key Metrics Grid */}
      <motion.div variants={itemVariant} className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <MetricCard 
          title="Net Incr. Profit" 
          value={formatCurrency(metrics.netIncrementalProfit)} 
          trend={metrics.netIncrementalProfit > 0 ? 'up' : 'down'}
          icon={<DollarSign className="w-4 h-4" />}
          isCompare={isCompare}
          valueB={isCompare ? formatCurrency(results.B.metrics.netIncrementalProfit) : null}
          trendB={isCompare ? (results.B.metrics.netIncrementalProfit > 0 ? 'up' : 'down') : null}
          labelA={`Scenario A`}
          labelB={`Scenario B`}
        />
        <MetricCard 
          title="Projected Lift" 
          value={`+${metrics.liftPercentage}%`} 
          trend="up"
          icon={<TrendingUp className="w-4 h-4" />}
          isCompare={isCompare}
          valueB={isCompare ? `+${results.B.metrics.liftPercentage}%` : null}
          trendB="up"
        />
        <MetricCard 
          title="Cannibalization" 
          value={formatCurrency(metrics.cannibalizationImpact)} 
          trend="down"
          icon={<PieChart className="w-4 h-4" />}
          isCompare={isCompare}
          valueB={isCompare ? formatCurrency(results.B.metrics.cannibalizationImpact) : null}
          trendB="down"
        />
        <MetricCard 
          title="Gross Incr. Rev" 
          value={`+${formatCurrency(metrics.incrementalRevenue)}`} 
          trend="up"
          icon={<Activity className="w-4 h-4" />}
          isCompare={isCompare}
          valueB={isCompare ? `+${formatCurrency(results.B.metrics.incrementalRevenue)}` : null}
          trendB="up"
        />
        <MetricCard 
          title="Expected ROI" 
          value={`${metrics.roi}%`} 
          trend={metrics.roi > 0 ? 'up' : 'down'}
          icon={<TrendingUp className="w-4 h-4" />}
          isCompare={isCompare}
          valueB={isCompare ? `${results.B.metrics.roi}%` : null}
          trendB={isCompare ? (results.B.metrics.roi > 0 ? 'up' : 'down') : null}
        />
        <MetricCard 
          title="AI Confidence" 
          value={`${metrics.confidenceScore}%`} 
          trend={metrics.confidenceScore > 80 ? 'up' : 'neutral'}
          icon={<Info className="w-4 h-4" />}
          isCompare={isCompare}
          valueB={isCompare ? `${results.B.metrics.confidenceScore}%` : null}
          trendB={isCompare ? (results.B.metrics.confidenceScore > 80 ? 'up' : 'neutral') : null}
        />
      </motion.div>

      {/* Chart Section */}
      <motion.div variants={itemVariant} className="pt-6 border-t border-slate-200 dark:border-slate-700">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 tracking-tight">Profitability Scenario Analysis</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-medium">Comparing baseline profit against the proposed discount scenarios.</p>
        <DiscountChart data={finalChartData} isCompare={isCompare} isDarkMode={isDarkMode} />
      </motion.div>

      {/* Supporting Insights */}
      {!isCompare && (
        <motion.div variants={itemVariant}>
          <SupportingInsights results={mainData} />
        </motion.div>
      )}
    </motion.div>
  );
}

function MetricCard({ title, value, icon, trend, isCompare, valueB, trendB, labelA = "Scenario A", labelB = "Scenario B" }) {
  const getTrendColor = (t) => t === 'up' ? 'text-green-600 dark:text-green-400' : t === 'down' ? 'text-red-500 dark:text-red-400' : 'text-slate-600 dark:text-slate-300';
  
  return (
    <motion.div 
      whileHover={{ y: -4, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
      className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-300"
    >
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-3">
        {icon}
        <span className="text-xs font-bold uppercase tracking-wider">{title}</span>
      </div>
      
      {isCompare ? (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mb-0.5 uppercase tracking-wide">{labelA}</div>
            <div className={`text-lg sm:text-xl font-black tracking-tight ${getTrendColor(trend)}`}>{value}</div>
          </div>
          <div className="border-l border-slate-200 dark:border-slate-700 pl-2">
            <div className="text-[10px] text-indigo-400 dark:text-indigo-500 font-bold mb-0.5 uppercase tracking-wide">{labelB}</div>
            <div className={`text-lg sm:text-xl font-black tracking-tight ${getTrendColor(trendB)}`}>{valueB}</div>
          </div>
        </div>
      ) : (
        <div className={`text-2xl font-black tracking-tight ${getTrendColor(trend)}`}>
          {value}
        </div>
      )}
    </motion.div>
  );
}
