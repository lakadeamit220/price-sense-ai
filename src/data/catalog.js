export const catalog = [
  {
    category: "Specialty Nuts",
    id: "cat-nuts",
    products: [
      { id: "p-1", name: "Roasted Almonds", sizes: ["8oz", "16oz", "32oz"], basePrice: 8.99, margin: 0.45 },
      { id: "p-2", name: "Salted Pistachios", sizes: ["8oz", "16oz", "32oz"], basePrice: 10.99, margin: 0.50 },
      { id: "p-3", name: "Mixed Nuts Variety Pack", sizes: ["16oz", "32oz"], basePrice: 14.99, margin: 0.40 }
    ]
  },
  {
    category: "Beverages",
    id: "cat-bev",
    products: [
      { id: "p-4", name: "Sparkling Water (12-pack)", sizes: ["Standard"], basePrice: 5.99, margin: 0.35 },
      { id: "p-5", name: "Cold Brew Coffee", sizes: ["11oz", "32oz"], basePrice: 4.50, margin: 0.60 },
      { id: "p-6", name: "Organic Kombucha", sizes: ["16oz"], basePrice: 3.99, margin: 0.45 }
    ]
  },
  {
    category: "Grocery",
    id: "cat-groc",
    products: [
      { id: "p-7", name: "Extra Virgin Olive Oil", sizes: ["500ml", "1L"], basePrice: 12.99, margin: 0.30 },
      { id: "p-8", name: "Artisan Sourdough Bread", sizes: ["Loaf"], basePrice: 6.99, margin: 0.25 },
      { id: "p-9", name: "Organic Avocados (Bag)", sizes: ["4-count"], basePrice: 5.49, margin: 0.20 }
    ]
  }
];

export const getAllProducts = () => {
  return catalog.flatMap(c => c.products.map(p => ({ ...p, categoryName: c.category })));
};
