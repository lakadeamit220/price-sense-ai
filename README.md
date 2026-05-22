# Price Sense AI – Case Study Submission

This project represents a functioning prototype of **Price Sense AI**, an intelligence engine designed to help mid-market retailers confidently answer a critical business question: *"Should I run this promotion?"*

Rather than relying on intuition, this application simulates an artificial intelligence that predicts how specific discount depths will impact sales volume, profit margins, and category cannibalization (the rate at which a discounted item steals sales from a premium item).

---

## 1. Installation & Testing Guide

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or higher) must be installed.

### Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/lakadeamit220/price-sense-ai.git
   cd price-sense-ai
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. Open a browser and navigate to `http://localhost:5173`.

### Step-by-Step Functional Testing
Follow these steps to evaluate the core functionality of the application:

1. **Execute a Standard Simulation**: Navigate to the Sidebar on the left and select a product (e.g., "Premium Almonds"). In the Simulation Inputs panel, configure a Discount Depth (e.g., 20%) and a Promotion Duration. Click "Run AI Simulation". The system will render a dashboard containing a primary recommendation, projected financial metrics, and a comparative bar chart.
2. **Execute an A/B Test (Compare Mode)**: Activate the "Compare Scenario" toggle in the inputs panel. Set Scenario A to 20% and Scenario B to 40%. Run the simulation to view a side-by-side comparison that highlights the mathematical winner.
3. **Interact with the AI Assistant**: Locate the floating chat widget in the bottom right corner. Submit a query such as: *"Why is this risky?"* or *"Compare these for me."* The widget will simulate a processing state and return a contextual response utilizing the exact financial metrics from your active simulation.
4. **Schedule a Promotion (Calendar Integration)**: From the dashboard, click the "Schedule" button. The application will automatically route you to the "Promo Calendar" tab, where the promotion is saved to a persistent timeline based on your duration parameters.
5. **Export Data**: Return to the AI Simulator tab. Click the "Export" button to download a CSV file containing the active simulation metrics.
6. **View Notification History**: Click the Bell icon in the top right navigation bar to view a chronological history of application events.
7. **Toggle System Theme**: Click the Moon icon in the top navigation bar to transition the application to a dark theme.

---

## 2. Product Management Write-Up

### Feature Prioritization for the POC
When designing this prototype, the core goal was to directly answer the retailer's primary questions: *How much is cannibalization? Was 25% off better than 20%? What is the actual incremental profit?*
To achieve this, the following features were prioritized:
- **Dynamic Input Form**: Essential for testing different variables rapidly.
- **A/B Testing Simulator**: Directly answers the "20% vs 25%" question by forcing the model to pick a mathematical winner.
- **Comprehensive Metrics Grid**: Translates raw data into immediate, easy-to-understand business value (Total Extra Revenue, Total Extra Profit, Return on Investment, Lost Sales Elsewhere).
- **Premium Data Visualization**: Employs an interactive, dual-axis Composed Chart with gradient revenue tracking to map margin compression cleanly.
- **Ask AI Chat Widget**: Provides a natural language interface for users to drill down into the "Why" and "Risk" of a recommendation.
- **Promotion Calendar**: Evolves the product from a single-use calculator into a persistent planning tool.

### Product Creation Process
The product was created in partnership with an AI coding assistant. The process began with ideation, defining the data structures required to simulate a horizontal retail catalog (supporting specialty nuts, beverages, and grocery items). A mock engine (`mockEngine.js`) was engineered to handle non-linear elasticity and margin compression logic. Finally, the UI was constructed using modern frontend frameworks to simulate an enterprise-grade SaaS experience—featuring a "Cool Ocean Blue" color palette, frosted glass tooltips, Indian Rupee (INR) localization, and micro-interactions (e.g., loading states, typing indicators) to build user trust in the AI.

### Technical Architecture
**Current Architecture (POC):**
- **Frontend**: React.js (Vite) single-page application.
- **Styling & UI**: Tailwind CSS v4, Framer Motion (animations), Recharts (data visualization), Lucide React (icons).
- **State Management**: React `useState` and contextual prop drilling.
- **Logic**: Mock data engine simulating machine learning responses natively in the browser.

**Future Architecture (At Scale):**
- **Frontend**: Next.js to handle complex routing and server-side rendering.
- **Backend API**: Python/FastAPI microservices specifically designed to handle heavy data processing.
- **Database**: PostgreSQL for storing product catalogs, historical promotion data, and user configurations.
- **Machine Learning Layer**: XGBoost or Random Forest models trained on historical Point-of-Sale (POS) data to accurately predict elasticity and cross-elasticity (cannibalization).
- **Authentication**: OAuth implementation (e.g., Auth0) to support multi-tenant retail organizations securely.

### Challenges Faced
The primary challenge was designing a mathematical mock engine that felt realistic. Simulating cannibalization and margin compression required building custom logic to ensure that an extreme discount (e.g., 60%) would correctly result in a negative net profit, despite driving massive volume lift. Additionally, managing UI density—presenting charts, metrics, chat interfaces, and input forms on a single screen without overwhelming the user—required strict attention to visual hierarchy and responsive design.

### Future Additions
Given more time, the following features would be implemented:
1. **Real POS Data Integration**: Connecting the application to a sample retail dataset to run actual regression models.
2. **Live LLM Integration**: Replacing the mocked chat widget with a live connection to the Google Gemini or OpenAI API, allowing for unscripted data analysis.
3. **Post-Promo Analysis**: A module to ingest actual sales data after a promotion concludes, comparing it against the AI's initial prediction to refine the model's accuracy over time.

### Major Assumptions
- **Horizontal Applicability**: Assumed that basic price elasticity principles apply similarly across the mocked categories (nuts, beverages, grocery).
- **Data Availability**: Assumed the target customer has relatively clean historical sales and margin data required to train the eventual machine learning models.
- **User Intent**: Assumed the primary user (a retail category manager) values speed of insight over raw statistical outputs, driving the decision to present clear "Strongly Recommend" banners rather than raw regression tables.
