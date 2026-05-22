import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, TrendingUp, Tag, ArrowRight } from 'lucide-react';

export default function PromotionCalendar({ promotions }) {
  
  if (!promotions || promotions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-5 border border-slate-100 dark:border-slate-600">
          <CalendarIcon className="w-10 h-10 text-slate-300 dark:text-slate-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 tracking-tight">No Scheduled Promotions</h3>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-md">
          Your promotional calendar is currently empty. Run an AI simulation and click "Schedule Promotion" to add it here.
        </p>
      </div>
    );
  }

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  
  // Format date natively
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 md:p-8 transition-colors duration-300 min-h-[500px]">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Promotional Calendar</h2>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Timeline of all approved and scheduled discount campaigns.</p>
        </div>
      </div>

      <motion.div 
        variants={containerVariant}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {promotions.map((promo, index) => (
          <motion.div 
            key={promo.id || index}
            variants={itemVariant}
            className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
          >
            
            <div className="flex items-start gap-4 mb-4 md:mb-0">
              <div className="p-3 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 shrink-0">
                <CalendarIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 tracking-tight">
                  {promo.product.name}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-sm font-medium text-slate-500 dark:text-slate-400 flex-wrap">
                  <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md">
                    <Tag className="w-3.5 h-3.5 text-slate-400 dark:text-slate-400" />
                    {promo.product.categoryName}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {formatDate(promo.startDate)} <ArrowRight className="w-3 h-3 mx-0.5" /> {formatDate(promo.endDate)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-3 md:gap-6 items-center border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 pt-4 md:pt-0 md:pl-6">
              
              <div className="text-center bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-lg border border-indigo-100 dark:border-indigo-800 shrink-0">
                <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-0.5">Discount</div>
                <div className="text-xl font-black text-indigo-700 dark:text-indigo-400">{promo.discount}%</div>
              </div>

              <div className="text-center px-4 py-2">
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Proj. Lift</div>
                <div className="text-lg font-black text-green-600 dark:text-green-400">+{promo.metrics.liftPercentage}%</div>
              </div>

              <div className="text-center px-4 py-2">
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Net Profit</div>
                <div className="text-lg font-black text-slate-800 dark:text-slate-200">{formatCurrency(promo.metrics.netIncrementalProfit)}</div>
              </div>
              
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
