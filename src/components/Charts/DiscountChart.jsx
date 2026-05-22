import React from 'react';
import { 
  ComposedChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function DiscountChart({ data, isDarkMode }) {
  const formatYAxis = (tickItem) => {
    return `₹${tickItem.toLocaleString()}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 dark:bg-slate-800/90 p-4 border border-slate-200/80 dark:border-slate-700/80 rounded-xl shadow-xl backdrop-blur-md z-50">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 pb-2 border-b border-slate-100 dark:border-slate-700 uppercase tracking-wider">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex justify-between gap-8 items-center mb-1">
              <span className="text-sm font-bold flex items-center gap-1.5" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: entry.color }}></span>
                {entry.name}
              </span>
              <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
                ₹{entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke={isDarkMode ? '#334155' : '#e2e8f0'} 
          />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11, fontWeight: 700 }}
            dy={15}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tickFormatter={formatYAxis}
            tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11, fontWeight: 700 }}
            width={70}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }} />
          <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 'bold' }} />
          
          {/* Revenue Area (Gradient Background) */}
          <Area 
            type="monotone" 
            dataKey="revenue" 
            name="Gross Revenue" 
            stroke="#0ea5e9" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
            activeDot={{ r: 6, strokeWidth: 0, fill: '#0ea5e9' }}
          />

          {/* Profit Line (Solid Overlay) */}
          <Line 
            type="monotone" 
            dataKey="profit" 
            name="Net Profit" 
            stroke="#8b5cf6" 
            strokeWidth={4}
            dot={{ r: 5, fill: '#8b5cf6', strokeWidth: 2, stroke: isDarkMode ? '#1e293b' : '#ffffff' }}
            activeDot={{ r: 7, strokeWidth: 0, fill: '#8b5cf6', stroke: '#ffffff' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
