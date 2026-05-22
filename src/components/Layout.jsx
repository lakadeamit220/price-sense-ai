import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import { Menu, X, Bell } from 'lucide-react';

export default function Layout({ children, onSelectProduct, selectedProductId }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 lg:w-72 h-full shrink-0 shadow-sm z-20 border-r border-slate-200">
        <Sidebar onSelectProduct={onSelectProduct} selectedProductId={selectedProductId} />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
              aria-hidden="true"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white shadow-2xl z-50 md:hidden flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Sidebar Menu"
            >
              <div className="absolute top-3 right-3 z-50">
                <button 
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 bg-slate-100 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Sidebar 
                onSelectProduct={(p, c) => {
                  onSelectProduct(p, c);
                  setIsMobileOpen(false); // Auto-close on mobile selection
                }} 
                selectedProductId={selectedProductId} 
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col relative w-full">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-6 py-3.5 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                Price Sense
                <span className="bg-gradient-to-r from-primary-600 to-indigo-600 text-transparent bg-clip-text">AI</span>
              </h1>
              <p className="hidden sm:block text-xs text-slate-500 font-semibold tracking-wide uppercase mt-0.5">
                Promotion Intelligence Engine
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-5">
            <button 
              className="hidden sm:flex text-slate-400 hover:text-slate-600 transition-colors relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-full p-1"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-0.5 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              System Online
            </div>
            
            <button 
              className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-primary-100 hover:ring-primary-200 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600"
              aria-label="User Profile"
            >
              PM
            </button>
          </div>
        </header>
        
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
