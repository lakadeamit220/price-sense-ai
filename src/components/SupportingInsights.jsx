import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, AlertCircle, Info, Send } from 'lucide-react';

export default function SupportingInsights({ results }) {
  const { recommendation, status, metrics } = results;
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState(null);
  
  const handleAskAI = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Simulate AI response
    setChatResponse("Analyzing your query... Based on historical data, this cannibalization rate is standard for deep discounts in this category. To mitigate this, consider bundling instead of a straight discount to protect margin integrity.");
    setChatInput('');
  };

  // Generate dynamic explanation based on metrics
  const getExplanation = () => {
    if (status === 'success') {
      return "The model projects strong volume elasticity that more than compensates for the margin reduction. Cannibalization of adjacent SKUs is within acceptable limits.";
    } else if (status === 'warning') {
      return "While this promotion drives volume, margin compression heavily eats into the incremental revenue. Consider a slightly shallower discount to preserve profitability.";
    } else {
      return "This discount level causes severe margin erosion. The projected cannibalization of full-priced sibling products outpaces the incremental volume gained.";
    }
  };

  const getRisks = () => {
    const risks = [];
    if (metrics.cannibalizationImpact < -100) risks.push("High risk of cannibalizing premium SKU sales.");
    if (metrics.liftPercentage < 10) risks.push("Product historically shows low price elasticity.");
    if (metrics.roi < 0) risks.push("Projected ROI is negative. Consider vendor funding to offset costs.");
    if (risks.length === 0) risks.push("No significant risks identified for this scenario.");
    return risks;
  };

  return (
    <div className="mt-8 pt-6 border-t border-slate-200 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Explanation Block */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-primary-50 p-5 rounded-xl border border-primary-100 shadow-sm"
        >
          <div className="flex items-center gap-2 text-primary-800 mb-3">
            <Info className="w-4 h-4" />
            <h4 className="font-bold text-xs uppercase tracking-wider">AI Rationale</h4>
          </div>
          <p className="text-sm text-primary-900 leading-relaxed font-medium">
            {getExplanation()}
          </p>
        </motion.div>

        {/* Risk Factors */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-amber-50 p-5 rounded-xl border border-amber-100 shadow-sm"
        >
          <div className="flex items-center gap-2 text-amber-800 mb-3">
            <AlertCircle className="w-4 h-4" />
            <h4 className="font-bold text-xs uppercase tracking-wider">Risk Factors</h4>
          </div>
          <ul className="text-sm text-amber-900 space-y-1.5 list-disc pl-4 font-medium">
            {getRisks().map((risk, i) => <li key={i}>{risk}</li>)}
          </ul>
        </motion.div>
      </div>

      {/* Ask AI Chat Box */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="border border-slate-200 rounded-xl overflow-hidden shadow-sm"
      >
        <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-slate-500" />
          <h4 className="font-bold text-sm text-slate-700 tracking-tight">Ask Price Sense AI</h4>
        </div>
        <div className="p-5 bg-white">
          {chatResponse && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-5 bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm text-slate-700 leading-relaxed font-medium"
            >
              <span className="font-black text-primary-600 mr-2">Price Sense AI:</span>
              {chatResponse}
            </motion.div>
          )}
          <form onSubmit={handleAskAI} className="relative">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="e.g., Why is the cannibalization impact so high?" 
              className="w-full pl-4 pr-12 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium placeholder:font-normal"
            />
            <button 
              type="submit"
              disabled={!chatInput.trim()}
              className="absolute right-2 top-2 p-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
