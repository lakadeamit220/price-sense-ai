export const calculateRecommendation = (product, discountPercentage, durationDays) => {
  const discount = parseInt(discountPercentage, 10);
  const baseSalesVolume = 1000 * (parseInt(durationDays, 10) / 7); // Baseline units sold scaled by duration
  
  // Basic elasticity multiplier: higher discount = non-linear increase in volume
  const elasticityMultiplier = 1 + Math.pow(discount / 15, 1.5);
  const promoVolume = Math.round(baseSalesVolume * elasticityMultiplier);
  const liftPercentage = Math.round(((promoVolume - baseSalesVolume) / baseSalesVolume) * 100);
  
  const baseRevenue = baseSalesVolume * product.basePrice;
  const promoPrice = product.basePrice * (1 - (discount / 100));
  const promoRevenue = promoVolume * promoPrice;
  const incrementalRevenue = promoRevenue - baseRevenue;
  
  // Profit calculations
  const unitCost = product.basePrice * (1 - product.margin);
  const baseProfit = baseSalesVolume * (product.basePrice - unitCost);
  const promoProfit = promoVolume * (promoPrice - unitCost);
  
  const incrementalProfit = promoProfit - baseProfit;
  
  // Cannibalization (simulating that high discounts steal sales from other variants)
  const cannibalizationFactor = Math.pow(discount / 10, 2) * 15 * (parseInt(durationDays, 10) / 7);
  const cannibalizationImpact = -Math.round(cannibalizationFactor);
  
  const netIncrementalProfit = incrementalProfit + cannibalizationImpact;
  
  const roi = baseProfit > 0 ? Math.round((netIncrementalProfit / baseProfit) * 100) : 0;
  
  // Confidence score based on standard vs extreme discounts
  let confidenceScore = 95 - Math.abs(20 - discount);
  if (confidenceScore < 40) confidenceScore = 40;
  
  // Recommendation logic
  let recommendation = "Proceed with Caution";
  let status = "warning";
  
  if (netIncrementalProfit > 50 && roi > 5) {
    recommendation = "Strongly Recommend";
    status = "success";
  } else if (netIncrementalProfit < 0) {
    recommendation = "Do Not Run";
    status = "danger";
  }

  // Generate chart data comparing baseline, current requested promo, and nearby alternatives
  const chartData = [
    { name: 'Baseline (0%)', profit: Math.round(baseProfit) },
    { name: `${Math.max(5, discount - 5)}% Off`, profit: Math.round(baseProfit + calculateSimulatedProfit(product, Math.max(5, discount - 5), baseSalesVolume, unitCost, durationDays)) },
    { name: `Proposed (${discount}%)`, profit: Math.round(promoProfit + cannibalizationImpact) },
    { name: `${discount + 5}% Off`, profit: Math.round(baseProfit + calculateSimulatedProfit(product, discount + 5, baseSalesVolume, unitCost, durationDays)) },
  ];

  return {
    recommendation,
    status,
    metrics: {
      liftPercentage,
      incrementalRevenue: Math.round(incrementalRevenue),
      incrementalProfit: Math.round(incrementalProfit),
      netIncrementalProfit: Math.round(netIncrementalProfit),
      cannibalizationImpact,
      roi,
      confidenceScore
    },
    chartData
  };
};

function calculateSimulatedProfit(product, discount, baseVol, cost, durationDays) {
   const mult = 1 + Math.pow(discount / 15, 1.5);
   const pVol = Math.round(baseVol * mult);
   const pPrice = product.basePrice * (1 - (discount / 100));
   const pProf = pVol * (pPrice - cost);
   const bProf = baseVol * (product.basePrice - cost);
   const canni = -Math.round(Math.pow(discount / 10, 2) * 15 * (parseInt(durationDays, 10) / 7));
   return (pProf - bProf) + canni;
}
