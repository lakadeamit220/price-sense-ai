import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import InputForm from './components/InputForm';
import ResultsDashboard from './components/ResultsDashboard';
import { calculateRecommendation } from './utils/mockEngine';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toastTimeoutRef = React.useRef(null);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const showToast = (message) => {
    setToastMessage(message);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToastMessage(null), 3000);
  };

  const handleProductSelect = (product, categoryName) => {
    setSelectedProduct({ ...product, categoryName });
  };

  const handleSimulate = (product, duration, discountA, discountB) => {
    setIsLoading(true);
    setResults(null); // Clear previous results to trigger re-animation
    
    setTimeout(() => {
      const recA = calculateRecommendation(product, discountA, duration);
      recA.inputs = { product, discount: discountA, duration };
      
      if (discountB !== undefined) {
        const recB = calculateRecommendation(product, discountB, duration);
        recB.inputs = { product, discount: discountB, duration };
        setResults({ isCompare: true, A: recA, B: recB });
      } else {
        setResults({ isCompare: false, ...recA });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-24 left-1/2 z-[9999] bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 font-semibold text-sm border border-slate-700/50 backdrop-blur-md"
          >
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <Layout 
        onSelectProduct={handleProductSelect} 
        selectedProductId={selectedProduct?.id}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      >

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, ease: "easeOut" }} 
          className="lg:col-span-5 bg-white dark:bg-slate-800 p-5 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm h-fit transition-colors duration-300"
        >
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 tracking-tight">Simulation Inputs</h2>
          <InputForm 
            selectedProductId={selectedProduct?.id} 
            onProductSelect={handleProductSelect}
            onSimulate={handleSimulate}
            isLoading={isLoading}
          />
        </motion.div>
        
        {/* Right Column: Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} 
          className="lg:col-span-7 bg-white dark:bg-slate-800 p-5 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col min-h-[500px] transition-colors duration-300"
        >
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 tracking-tight">Results Dashboard</h2>
          
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col items-center justify-center space-y-5 py-12"
              >
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-slate-700"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-semibold animate-pulse tracking-wide">Analyzing historical performance...</p>
              </motion.div>
            ) : results ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1"
              >
                <ResultsDashboard 
                  results={results} 
                  onExport={() => showToast("Report exported successfully!")} 
                  isDarkMode={isDarkMode}
                />
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12"
              >
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">No Simulation Active</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                  Select a product from the catalog and configure your discount parameters to generate an AI recommendation.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
      </div>
      </Layout>
    </>
  );
}

export default App;
