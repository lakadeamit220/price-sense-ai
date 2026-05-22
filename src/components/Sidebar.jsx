import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { catalog } from '../data/catalog';
import { ChevronDown, ChevronRight, Package, Tag, Coffee, ShoppingBag } from 'lucide-react';

const getCategoryIcon = (category) => {
  if (category.includes("Nuts")) return <Tag className="w-4 h-4" />;
  if (category.includes("Beverages")) return <Coffee className="w-4 h-4" />;
  return <ShoppingBag className="w-4 h-4" />;
};

export default function Sidebar({ onSelectProduct, selectedProductId }) {
  const [expandedCategories, setExpandedCategories] = useState(
    catalog.map(c => c.id) // all expanded by default
  );

  const toggleCategory = (id) => {
    setExpandedCategories(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <aside className="w-full bg-white border-r border-slate-200 h-full flex flex-col">
      <div className="p-5 border-b border-slate-200 bg-slate-50/50">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider">
          <Package className="text-primary-600 w-5 h-5" />
          Product Catalog
        </h2>
        <p className="text-xs text-slate-500 mt-1.5">Select an item to simulate promo</p>
      </div>
      
      <motion.div 
        variants={listVariants}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto py-3"
      >
        {catalog.map(category => {
          const isExpanded = expandedCategories.includes(category.id);
          return (
            <motion.div variants={itemVariants} key={category.id} className="mb-2">
              <button 
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between px-5 py-2 hover:bg-slate-50 text-slate-700 transition-colors focus:outline-none"
              >
                <div className="flex items-center gap-2 font-semibold text-sm">
                  {getCategoryIcon(category.category)}
                  {category.category}
                </div>
                {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
              </button>
              
              {isExpanded && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-1 pb-2 overflow-hidden"
                >
                  {category.products.map(product => {
                    const isSelected = selectedProductId === product.id;
                    return (
                      <button
                        key={product.id}
                        onClick={() => onSelectProduct(product, category.category)}
                        className={`w-full text-left px-5 py-2 pl-11 text-sm transition-colors focus:outline-none ${
                          isSelected 
                            ? 'bg-primary-50 text-primary-700 font-medium border-r-2 border-primary-600' 
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {product.name}
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </motion.div>
    </aside>
  );
}
