import React, { useState } from 'react';
import Layout from './components/Layout';
import InputForm from './components/InputForm';
import ResultsDashboard from './components/ResultsDashboard';
import { calculateRecommendation } from './utils/mockEngine';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleProductSelect = (product, categoryName) => {
    setSelectedProduct({ ...product, categoryName });
  };

  const handleSimulate = (product, discount, duration) => {
    setIsLoading(true);
    
    // Simulate AI processing time for better UX
    setTimeout(() => {
      const recommendation = calculateRecommendation(product, discount, duration);
      setResults(recommendation);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Layout 
      onSelectProduct={handleProductSelect} 
      selectedProductId={selectedProduct?.id}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-slate-800 mb-6 tracking-tight">Simulation Inputs</h2>
          <InputForm 
            selectedProductId={selectedProduct?.id} 
            onProductSelect={handleProductSelect}
            onSimulate={handleSimulate}
            isLoading={isLoading}
          />
        </div>
        
        {/* Right Column: Dashboard */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-[500px]">
          <h2 className="text-xl font-bold text-slate-800 mb-6 tracking-tight">Results Dashboard</h2>
          
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-5">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
              </div>
              <p className="text-slate-500 font-semibold animate-pulse tracking-wide">Analyzing historical performance...</p>
            </div>
          ) : results ? (
            <div className="flex-1">
              <ResultsDashboard results={results} />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-sm">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Configure your promotion parameters on the left and run the simulation to see AI recommendations.
                </p>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </Layout>
  )
}

export default App;
