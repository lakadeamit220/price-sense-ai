import React from 'react';
import DiscountChart from './Charts/DiscountChart';
import { TrendingUp, DollarSign, Activity, AlertTriangle, ShieldCheck, PieChart, Info } from 'lucide-react';

export default function ResultsDashboard({ results }) {
  if (!results) return null;

  const { recommendation, status, metrics, chartData } = results;

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

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Recommendation Banner */}
      <div className={`p-5 rounded-2xl border flex items-start sm:items-center gap-4 ${statusStyles[status]}`}>
        <div className="shrink-0 mt-1 sm:mt-0">
          {statusIcons[status]}
        </div>
        <div>
          <h3 className="font-bold text-lg sm:text-xl tracking-tight">AI Recommendation: {recommendation}</h3>
          <p className="text-sm opacity-90 mt-1 font-medium leading-relaxed">
            Based on historical category elasticity, margin compression, and modeled cannibalization impact.
          </p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
      </div>

      {/* Chart Section */}
      <div className="pt-6 border-t border-slate-200">
        <h3 className="font-bold text-slate-800 tracking-tight">Profitability Scenario Analysis</h3>
        <p className="text-sm text-slate-500 mb-2 font-medium">Comparing baseline profit against the proposed discount and adjacent alternatives.</p>
        <DiscountChart data={chartData} />
      </div>
    </div>
  );
}

function MetricCard({ title, value, subtitle, icon, trend }) {
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-slate-600';
  
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
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
    </div>
  );
}
