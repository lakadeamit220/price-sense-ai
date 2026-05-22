import React, { useState } from 'react';
import Layout from './components/Layout';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product, categoryName) => {
    setSelectedProduct({ ...product, categoryName });
  };

  return (
    <Layout 
      onSelectProduct={handleProductSelect} 
      selectedProductId={selectedProduct?.id}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Simulation Inputs</h2>
          {selectedProduct ? (
            <p className="text-slate-600">Selected Product: <span className="font-semibold">{selectedProduct.name}</span></p>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 italic">Select a product from the sidebar catalog to begin.</p>
            </div>
          )}
          {/* Phase 4: InputForm will go here */}
        </div>
        
        {/* Right Column: Dashboard */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Results Dashboard</h2>
          <div className="flex-1 flex items-center justify-center min-h-[300px]">
            <p className="text-slate-500 italic text-center max-w-sm">
              AI recommendations and business metrics will appear here once you run a simulation.
            </p>
          </div>
          {/* Phase 5: ResultsDashboard will go here */}
        </div>
        
      </div>
    </Layout>
  )
}

export default App;
