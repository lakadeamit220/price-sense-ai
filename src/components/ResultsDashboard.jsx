import React from 'react';
import { motion } from 'framer-motion';
import DiscountChart from './Charts/DiscountChart';
import SupportingInsights from './SupportingInsights';
import { TrendingUp, IndianRupee, Activity, AlertTriangle, ShieldCheck, PieChart, Info, Download, Crown, Calendar as CalendarIcon } from 'lucide-react';

export default function ResultsDashboard({ results, onExport, isDarkMode, onSavePromotion }) {
  if (!results) return null;

  const isCompare = results.isCompare;
  
  // Extract primary data
  const mainData = isCompare ? results.A : results;
  const secondaryData = isCompare ? results.B : null;
  const { recommendation, status, metrics, chartData, inputs } = mainData;

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const statusStyles = {
    success: 'bg-gradient-to-r from-green-50 to-emerald-50/50 dark:from-green-500/10 dark:to-emerald-500/5 border-green-200/80 dark:border-green-500/20 text-green-900 dark:text-green-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]',
    warning: 'bg-gradient-to-r from-yellow-50 to-orange-50/50 dark:from-yellow-500/10 dark:to-orange-500/5 border-yellow-200/80 dark:border-yellow-500/20 text-yellow-900 dark:text-yellow-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]',
    danger: 'bg-gradient-to-r from-red-50 to-rose-50/50 dark:from-red-500/10 dark:to-rose-500/5 border-red-200/80 dark:border-red-500/20 text-red-900 dark:text-red-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
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
      "AI Recommendation", "Total Extra Profit (₹)", "Sales Boost (%)", 
      "Lost Sales Elsewhere (₹)", "Total Extra Revenue (₹)", "Return on Investment (%)", "AI Certainty (%)"
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

  let finalChartData = chartData;
  if (isCompare) {
    finalChartData = [
      { 
        name: 'Baseline (0%)', 
        profit: results.A.chartData[0].profit,
        revenue: results.A.chartData[0].revenue
      },
      { 
        name: `A (${results.A.inputs.discount}%)`, 
        profit: results.A.chartData[2].profit,
        revenue: results.A.chartData[2].revenue
      },
      { 
        name: `B (${results.B.inputs.discount}%)`, 
        profit: results.B.chartData[2].profit,
        revenue: results.B.chartData[2].revenue
      },
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
      <motion.div variants={itemVariant} className="flex justify-end gap-3">
        {onSavePromotion && (
          <button 
            onClick={() => {
              if (isCompare) {
                // Save the winner
                if (results.A.metrics.netIncrementalProfit > results.B.metrics.netIncrementalProfit) {
                  onSavePromotion(results.A);
                } else {
                  onSavePromotion(results.B);
                }
              } else {
                onSavePromotion(results);
              }
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          >
            <CalendarIcon className="w-4 h-4" />
            Schedule
          </button>
        )}
        <button 
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </motion.div>

      {/* Recommendation Banner */}
      {isCompare ? (
        <motion.div variants={itemVariant} className={`p-5 rounded-2xl border flex items-start sm:items-center gap-4 bg-gradient-to-r from-primary-50 to-blue-50/50 dark:from-primary-500/10 dark:to-blue-500/5 border-primary-200/80 dark:border-primary-800/50 text-primary-900 dark:text-primary-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]`}>
          <div className="shrink-0 mt-1 sm:mt-0">
            <Crown className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="text-sm font-semibold text-blue-800 dark:text-blue-300">
            Compare the numbers below to see if the extra sales make up for the lower price.
          </div>
        </motion.div>
      ) : (
        <motion.div variants={itemVariant} className={`p-5 rounded-2xl border flex items-start sm:items-center gap-4 ${statusStyles[status]}`}>
          <div className="shrink-0 mt-1 sm:mt-0">
            {statusIcons[status]}
          </div>
          <div>
            <h3 className="text-lg font-black mb-1 drop-shadow-sm">{recommendation}</h3>
            <p className="text-sm font-semibold opacity-90 leading-relaxed">
              Based on the numbers, this discount {status === 'success' ? 'will likely make you more money' : status === 'warning' ? 'might be risky due to lost sales elsewhere' : 'will likely lose you money'}.
            </p>
          </div>
        </motion.div>
      )}

      {/* Metrics Grid */}
      <motion.div variants={itemVariant} className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8">
        <MetricCard 
          title="Total Extra Profit" 
          value={formatCurrency(metrics.netIncrementalProfit)} 
          trend={metrics.netIncrementalProfit > 0 ? 'up' : 'down'}
          icon={<IndianRupee className="w-4 h-4" />}
          isCompare={isCompare}
          valueB={isCompare ? formatCurrency(results.B.metrics.netIncrementalProfit) : null}
          trendB={isCompare ? (results.B.metrics.netIncrementalProfit > 0 ? 'up' : 'down') : null}
        />
        <MetricCard 
          title="Sales Boost" 
          value={`+${metrics.liftPercentage}%`} 
          trend="up"
          icon={<TrendingUp className="w-4 h-4" />}
          isCompare={isCompare}
          valueB={isCompare ? `+${results.B.metrics.liftPercentage}%` : null}
          trendB="up"
        />
        <MetricCard 
          title="Lost Sales Elsewhere" 
          value={formatCurrency(metrics.cannibalizationImpact)} 
          trend="down"
          icon={<Activity className="w-4 h-4" />}
          isCompare={isCompare}
          valueB={isCompare ? formatCurrency(results.B.metrics.cannibalizationImpact) : null}
          trendB="down"
        />
        <MetricCard 
          title="Total Extra Revenue" 
          value={`+${formatCurrency(metrics.incrementalRevenue)}`} 
          trend="up"
          icon={<Activity className="w-4 h-4" />}
          isCompare={isCompare}
          valueB={isCompare ? `+${formatCurrency(results.B.metrics.incrementalRevenue)}` : null}
          trendB="up"
        />
        <MetricCard 
          title="Return on Investment" 
          value={`${metrics.roi}%`} 
          trend={metrics.roi > 0 ? 'up' : 'down'}
          icon={<TrendingUp className="w-4 h-4" />}
          isCompare={isCompare}
          valueB={isCompare ? `${results.B.metrics.roi}%` : null}
          trendB={isCompare ? (results.B.metrics.roi > 0 ? 'up' : 'down') : null}
        />
        <MetricCard 
          title="AI Certainty" 
          value={`${metrics.confidenceScore}%`} 
          trend="up"
          icon={<Info className="w-4 h-4" />}
          isCompare={isCompare}
          valueB={isCompare ? `${results.B.metrics.confidenceScore}%` : null}
          trendB="up"
        />
      </motion.div>

      <motion.div variants={itemVariant} className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-1">Profit Comparison Chart</h3>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4 sm:mb-6">Comparing normal profit against the discounted prices.</p>
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
      whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.01)' }}
      className="relative overflow-hidden bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm transition-all duration-300 group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 flex items-center justify-between mb-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{title}</span>
        <div className="p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-slate-400 dark:text-slate-500 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {icon}
        </div>
      </div>
      
      <div className="relative z-10">
        {isCompare ? (
          <div className="grid grid-cols-2 gap-1 sm:gap-2">
            <div>
              <div className="text-[9px] text-slate-400 dark:text-slate-500 font-bold mb-0.5 uppercase tracking-wider leading-none">Scen. A</div>
              <div className={`text-sm sm:text-base font-black tracking-tight ${getTrendColor(trend)} drop-shadow-sm break-words`}>{value}</div>
            </div>
            <div className="border-l border-slate-100 dark:border-slate-700/50 pl-1.5 sm:pl-2">
              <div className="text-[9px] text-primary-400 dark:text-primary-500 font-bold mb-0.5 uppercase tracking-wider leading-none">Scen. B</div>
              <div className={`text-sm sm:text-base font-black tracking-tight ${getTrendColor(trendB)} drop-shadow-sm break-words`}>{valueB}</div>
            </div>
          </div>
        ) : (
          <div className={`text-3xl font-black tracking-tighter ${getTrendColor(trend)} drop-shadow-sm`}>
            {value}
          </div>
        )}
      </div>
    </motion.div>
  );
}
