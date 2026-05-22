# Price Sense AI

Price Sense AI is an interactive dashboard designed to help retail product managers answer a critical business question: "Should I run a promotion on this product, and if so, at what discount?"

Rather than relying on guesswork, this application simulates an intelligence engine that predicts how specific discount depths will impact sales volume, profit margins, and category cannibalization (the rate at which a discounted item steals sales from a premium item).

---

## How to Run the Application

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or higher) must be installed on your local machine.

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
4. Open your browser and navigate to `http://localhost:5173`.

---

## Testing Guide

Follow these steps to evaluate the core functionality of the application:

### 1. Execute a Standard Simulation
- Navigate to the **Sidebar** on the left and select a product (e.g., "Premium Almonds").
- In the **Simulation Inputs** panel, configure a **Discount Depth** (e.g., 20%) using the slider.
- Configure a **Promotion Duration** (e.g., 7 days).
- Click **"Run AI Simulation"**.
- The system will render a dashboard containing a primary recommendation, projected financial metrics, and a comparative bar chart.

### 2. Execute an A/B Test (Compare Mode)
- In the Simulation Inputs panel, activate the **"Compare Scenario"** toggle.
- Set **Scenario A to 20%** and **Scenario B to 40%**.
- Click **"Run AI Simulation"**.
- The dashboard will display a side-by-side comparison of both scenarios, highlight the mathematical winner, and plot both projections on the chart.

### 3. Schedule a Promotion (Calendar Integration)
- From the active simulation dashboard, click the **"Schedule"** button in the top right corner.
- A success notification will appear.
- The application will automatically route you to the **"Promo Calendar"** tab, where the promotion is saved to a persistent timeline based on your duration parameters.

### 4. Interact with the AI Assistant
- Locate the floating chat widget in the bottom right corner of the viewport.
- Click to open the **Ask Price Sense AI** interface.
- Submit a query such as: *"Why is this risky?"* or *"Compare these for me."*
- The widget will simulate a processing state and return a contextual response utilizing the exact financial metrics from your active simulation.

### 5. Export Data
- Return to the **AI Simulator** tab.
- Click the **"Export"** button in the top right corner of the dashboard.
- A CSV file containing the active simulation metrics will be generated and downloaded to your local machine.

### 6. View Notification History
- Locate the **Bell icon** in the top right of the primary navigation bar.
- Click the icon to open the notifications dropdown.
- This panel maintains a chronological history of application events (e.g., exports, scheduled promotions). You may clear the history using the provided action button.

### 7. Toggle System Theme
- Click the **Moon icon** located in the top navigation bar.
- The application will transition to a dark theme. Click the Sun icon to revert to the light theme.

---

## Technical Stack
- **Frontend Framework**: React.js (Vite)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
