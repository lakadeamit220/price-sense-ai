import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, AlertOctagon } from 'lucide-react';

export default function SupportingInsights({ results }) {
  if (!results) return null;

  const { recommendation, status, metrics, inputs } = results;

  // Generate dynamic textual insights based on the mathematical outputs
  const generateRationale = () => {
    if (status === 'success') {
      return `At a ${inputs.discount}% discount depth, the elasticity model predicts a substantial volume lift of ${metrics.liftPercentage}%. This volume cleanly offsets the margin compression and yields positive net incremental profit.`;
    }
    if (status === 'danger') {
      return `The ${inputs.discount}% discount compresses the unit margin too aggressively. Even with a ${metrics.liftPercentage}% lift in volume, it fails to surpass the baseline profit curve, resulting in a net loss.`;
    }
    return `This discount generates marginal lift (${metrics.liftPercentage}%), but the incremental profit is largely negated by the cannibalization effect within the ${inputs.product.categoryName} category.`;
  };

  const generateRisks = () => {
    let risks = [];
    if (metrics.cannibalizationImpact < -100) {
      risks.push(`High cannibalization expected. Shoppers may trade down from premium SKUs to this discounted variant.`);
    }
    if (inputs.discount > 40) {
      risks.push(`Steep discount depth (${inputs.discount}%) risks resetting the consumer's internal reference price, hurting long-term brand equity.`);
    }
    if (inputs.duration > 10) {
      risks.push(`Extended promotion duration (${inputs.duration} days) may lead to promotion fatigue and pull-forward behavior (stockpiling).`);
    }
    if (risks.length === 0) {
      risks.push("No significant risks identified. The scenario is well within optimal historical bounds.");
    }
    return risks;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      
      {/* AI Rationale */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="bg-blue-50/50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-100 dark:border-blue-900/30 transition-colors"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-md text-blue-600 dark:text-blue-400">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-blue-900 dark:text-blue-200">AI Rationale</h4>
        </div>
        <p className="text-sm text-blue-800/80 dark:text-blue-200/70 leading-relaxed font-medium">
          {generateRationale()}
        </p>
      </motion.div>

      {/* Risk Factors */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="bg-amber-50/50 dark:bg-amber-900/10 p-5 rounded-xl border border-amber-100 dark:border-amber-900/30 transition-colors"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-amber-100 dark:bg-amber-900/50 rounded-md text-amber-600 dark:text-amber-400">
            <AlertOctagon className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200">Risk Factors</h4>
        </div>
        <ul className="text-sm text-amber-800/80 dark:text-amber-200/70 leading-relaxed font-medium space-y-2 list-disc list-inside">
          {generateRisks().map((risk, i) => (
            <li key={i}>{risk}</li>
          ))}
        </ul>
      </motion.div>

    </div>
  );
}
