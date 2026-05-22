import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children, onSelectProduct, selectedProductId }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar - hidden on mobile, fixed width on desktop */}
      <div className="hidden md:block w-64 h-full shrink-0 shadow-sm z-20">
        <Sidebar onSelectProduct={onSelectProduct} selectedProductId={selectedProductId} />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Price Sense AI</h1>
            <p className="text-sm text-slate-500 font-medium">Promotion Recommendation Engine</p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              System Online
            </span>
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
              PM
            </div>
          </div>
        </header>
        
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
