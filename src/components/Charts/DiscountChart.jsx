import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function DiscountChart({ data, isCompare, isDarkMode }) {
  if (!data || data.length === 0) return null;

  const formatCurrency = (val) => `$${val.toLocaleString()}`;
  
  // Theme-aware colors
  const gridColor = isDarkMode ? '#334155' : '#f1f5f9'; // slate-700 : slate-100
  const textColor = isDarkMode ? '#94a3b8' : '#64748b'; // slate-400 : slate-500
  const tooltipBg = isDarkMode ? '#1e293b' : '#ffffff'; // slate-800 : white
  const tooltipBorder = isDarkMode ? '#334155' : '#e2e8f0'; // slate-700 : slate-200
  const tooltipText = isDarkMode ? '#f8fafc' : '#0f172a'; // slate-50 : slate-900

  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: textColor, fontSize: 12, fontWeight: 500 }} 
            dy={10}
          />
          <YAxis 
            tickFormatter={formatCurrency} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: textColor, fontSize: 12, fontWeight: 500 }}
            dx={-10}
          />
          <Tooltip 
            formatter={(value) => [formatCurrency(value), 'Profit']}
            cursor={{ fill: isDarkMode ? '#334155' : '#f8fafc' }}
            contentStyle={{ 
              borderRadius: '8px', 
              border: `1px solid ${tooltipBorder}`, 
              backgroundColor: tooltipBg,
              color: tooltipText,
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', 
              fontWeight: 500 
            }}
          />
          <Bar dataKey="profit" radius={[6, 6, 0, 0]} maxBarSize={60}>
            {data.map((entry, index) => {
              let color = '#cbd5e1'; // default slate-300
              if (entry.name.includes('Baseline')) color = '#94a3b8'; // slate-400
              if (entry.name.includes('Proposed') || entry.name.includes('A (')) color = '#0ea5e9'; // primary-500
              if (entry.name.includes('B (')) color = '#0284c7'; // primary-600
              
              return <Cell key={`cell-${index}`} fill={color} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
