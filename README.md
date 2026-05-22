# Price Sense AI – Product Manager Case Study

Welcome to my submission for the Price Sense AI Product Manager case study. This project demonstrates a functioning prototype of an AI-powered tool that helps retailers answer a critical business question: **"Should I run this promotion?"**

## 1. Executive Summary
Price Sense AI is designed to solve a critical problem for mid-market retailers: determining the true ROI and impact of product promotions. By transitioning from gut-feel decisions to AI-driven elasticity and cannibalization modeling, retailers can optimize their margins while maximizing category growth. This prototype demonstrates a horizontal, scalable recommendation engine that works seamlessly across diverse product categories like specialty nuts, beverages, and general grocery.

## 2. Prototype Overview
The application features a dynamic, responsive user interface simulating an AI recommendation engine. 

**Tech Stack**: 
- **Frontend**: React.js (Vite)
- **Styling**: Tailwind CSS v4
- **Animations & Charts**: Framer Motion & Recharts
- **Icons**: Lucide React

- **Interactive UI**: A single-page application allowing users to input promotion variables (product, discount, timing).
- **Simulated Intelligence**: A mock data engine (`mockEngine.js`) simulates the underlying ML model, applying non-linear elasticity multipliers and cannibalization factors to generate realistic business metrics.

## 3. Key Features & Prioritization
When designing the POC, I prioritized features that directly answer the retailer's core questions ("Was 25% off better than 20%? What was the actual incremental profit?"):
1. **Dynamic Input Form**: Essential for testing different variables. Built with standard HTML inputs and synchronized sliders for immediate visual feedback.
2. **Clear Recommendation Banner**: The ultimate output of the product. It gives an immediate, actionable answer ("Strongly Recommend", "Proceed with Caution", or "Do Not Run").
3. **Comprehensive Metrics Grid**: Translates raw data into business value (Incremental Revenue, Profit, ROI, Cannibalization).
4. **Baseline vs. Promo Chart**: A visual representation built with Recharts to show the direct impact of the promotion against the baseline.
5. **Alternative Scenarios**: A comparative table allowing users to see if a slightly lower or higher discount would yield better results.

---

## 4. Installation & Setup Guide

Follow these steps to run the prototype locally.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or higher)

### Setup Instructions
1. **Clone the repository**
```bash
git clone https://github.com/lakadeamit220/price-sense-ai.git
cd price-sense-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the Development Server**
```bash
npm run dev
```
*The application will now be running at `http://localhost:5173`.*

---

## 5. Development Process
I partnered with an AI coding assistant to rapidly prototype the application. 
- **Ideation & Planning**: Outlined the core architecture and mock logic.
- **UI/UX Design**: Chose Tailwind CSS for rapid, modern styling. Implemented a clean SaaS aesthetic with a Sidebar catalog for quick testing.
- **Implementation**: Structured the React application into focused components (`InputForm`, `ResultsDashboard`, `SupportingInsights`). Used `framer-motion` to add micro-interactions and loading states that simulate the "AI thinking" process, enhancing the user experience.

## 6. Technical Architecture
**Current Architecture (POC):**
- **Frontend**: React (Vite) single-page application.
- **State Management**: React `useState` for local form and result state.
- **Logic**: Mock data engine simulating ML responses natively in the browser.

**Future Architecture (At Scale):**
- **Frontend**: Next.js for better routing and performance.
- **Backend API**: Node.js/Express or Python/FastAPI microservices.
- **Database**: PostgreSQL for storing product catalogs, historical promotion data, and user configurations.
- **Machine Learning Layer**: Python-based models (e.g., XGBoost, Random Forest) trained on historical Point-of-Sale (POS) data to accurately predict elasticity and cannibalization.
- **Authentication/Multi-tenancy**: Implementing standard Auth (e.g., Auth0 or Firebase) to support multiple retail organizations securely.

## 7. Challenges Faced
- **Simulating Realistic Data**: Creating a mock engine that generates believable numbers was challenging. I had to build simple non-linear elasticity logic to ensure that an extreme discount (e.g., 60%) would correctly show negative incremental profit due to margin compression, despite high volume.
- **UI Density**: Balancing a lot of data (metrics, charts, tables) on a single screen without overwhelming the user. I solved this by using clear visual hierarchy, whitespace, and icon-based metric cards.

## 8. Future Roadmap (Given More Time)
1. **Real Data Integration**: Connect the app to a real POS database or sample dataset to run actual regression models.
2. **"Ask AI" Chat Interface**: Add an LLM-powered chat window allowing users to ask natural language questions about the recommendation (e.g., "Why is cannibalization so high for this product?").
3. **Promotion Calendar**: A view to schedule and visualize upcoming promotions, ensuring overlapping discounts don't conflict.
4. **Post-Promo Analysis**: A module to ingest actual sales data after a promotion ends, comparing it against the AI's prediction to build trust and refine the model.

## 9. Final Thoughts
This prototype successfully proves the concept of Price Sense AI. It takes a complex, data-heavy decision and distills it into an intuitive, visually appealing, and highly actionable user interface.
