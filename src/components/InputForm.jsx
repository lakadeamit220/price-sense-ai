import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllProducts } from '../data/catalog';
import { Search, SplitSquareHorizontal } from 'lucide-react';

export default function InputForm({ selectedProductId, onProductSelect, onSimulate, isLoading }) {
  const products = getAllProducts();
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [discountA, setDiscountA] = useState(20);
  const [discountB, setDiscountB] = useState(30);
  const [duration, setDuration] = useState(7); // days
  
  const handleProductChange = (e) => {
    const prod = products.find(p => p.id === e.target.value);
    if (prod) {
      onProductSelect(prod, prod.categoryName);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProductId) return;
    const prod = products.find(p => p.id === selectedProductId);
    if (isCompareMode) {
      onSimulate(prod, duration, discountA, discountB);
    } else {
      onSimulate(prod, duration, discountA);
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.form 
      variants={formVariants} 
      initial="hidden" 
      animate="show" 
      onSubmit={handleSubmit} 
      className="space-y-7"
    >
      {/* Product Selection */}
      <motion.div variants={itemVariants} className="space-y-2.5">
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Target Product</label>
          
          <button 
            type="button"
            onClick={() => setIsCompareMode(!isCompareMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              isCompareMode 
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <SplitSquareHorizontal className="w-3.5 h-3.5" />
            A/B Test Mode
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </div>
          <select 
            value={selectedProductId || ""} 
            onChange={handleProductChange}
            className="block w-full pl-11 pr-10 py-3 text-sm border-slate-300 dark:border-slate-600 rounded-xl focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 bg-slate-50 dark:bg-slate-800 border outline-none transition-all shadow-sm font-medium text-slate-700 dark:text-slate-200"
            required
          >
            <option value="" disabled>Select a product to test...</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.categoryName} - {p.name}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Discount Sliders */}
      <motion.div variants={itemVariants} className="space-y-5">
        
        {/* Scenario A Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
              {isCompareMode ? "Scenario A Discount" : "Discount Depth"}
            </label>
            <div className="relative w-24">
              <input 
                type="number" 
                min="5" 
                max="70" 
                value={discountA}
                onChange={(e) => setDiscountA(Number(e.target.value))}
                className="block w-full pr-7 py-1.5 text-sm font-semibold text-right border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 border bg-slate-50 dark:bg-slate-800 outline-none shadow-sm text-slate-900 dark:text-slate-100"
              />
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">%</span>
              </div>
            </div>
          </div>
          <input 
            type="range" 
            min="5" 
            max="70" 
            step="5"
            value={discountA}
            onChange={(e) => setDiscountA(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary-600 dark:accent-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          />
          <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 font-semibold px-1">
            <span>5%</span>
            <span>70%</span>
          </div>
        </div>

        {/* Scenario B Slider */}
        <AnimatePresence>
          {isCompareMode && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-700 overflow-hidden"
            >
              <div className="flex justify-between items-center pt-2">
                <label className="block text-sm font-bold text-indigo-700 dark:text-indigo-400">Scenario B Discount</label>
                <div className="relative w-24">
                  <input 
                    type="number" 
                    min="5" 
                    max="70" 
                    value={discountB}
                    onChange={(e) => setDiscountB(Number(e.target.value))}
                    className="block w-full pr-7 py-1.5 text-sm font-semibold text-right border-indigo-200 dark:border-indigo-800 rounded-lg focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 border bg-indigo-50 dark:bg-indigo-900/30 outline-none shadow-sm text-indigo-900 dark:text-indigo-100"
                  />
                  <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                    <span className="text-indigo-500 dark:text-indigo-400 text-sm font-medium">%</span>
                  </div>
                </div>
              </div>
              <input 
                type="range" 
                min="5" 
                max="70" 
                step="5"
                value={discountB}
                onChange={(e) => setDiscountB(Number(e.target.value))}
                className="w-full h-2.5 bg-indigo-100 dark:bg-indigo-900/50 rounded-full appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              />
              <div className="flex justify-between text-xs text-indigo-400 dark:text-indigo-500/70 font-semibold px-1">
                <span>5%</span>
                <span>70%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>

      {/* Duration */}
      <motion.div variants={itemVariants} className="space-y-3">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Promotion Period</label>
        <div className="grid grid-cols-3 gap-3">
          {[3, 7, 14].map(days => (
            <button
              key={days}
              type="button"
              onClick={() => setDuration(days)}
              className={`py-2.5 px-3 rounded-xl text-sm font-semibold border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                duration === days 
                  ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-500 dark:border-primary-500 text-primary-700 dark:text-primary-300 shadow-sm' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {days} Days
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="pt-2">
        <button 
          type="submit" 
          disabled={!selectedProductId || isLoading}
          className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
            !selectedProductId 
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-200 dark:border-slate-700'
              : 'bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-600 text-white shadow-primary-500/30 dark:shadow-primary-900/50 shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-primary-600 dark:border-primary-500'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Running Simulation...
            </>
          ) : (
            isCompareMode ? 'Run A/B Comparison' : 'Get AI Recommendation'
          )}
        </button>
      </motion.div>
    </motion.form>
  );
}
