# Price Sense AI

Welcome to **Price Sense AI**! This is a smart, interactive dashboard designed to help retailers answer a very common business question: *"Should I run a promotion on this product, and if so, at what discount?"*

Instead of relying on guesswork, this app simulates an Artificial Intelligence that predicts how a discount will affect sales volume, profit margins, and cannibalization (when a cheaper product steals sales from a more expensive one).

---

## 🚀 How to Run the App

### Prerequisites
- You need [Node.js](https://nodejs.org/en/) installed on your computer.

### Setup Instructions
1. **Open your terminal** and clone the repository:
   ```bash
   git clone https://github.com/lakadeamit220/price-sense-ai.git
   cd price-sense-ai
   ```
2. **Install the required packages**:
   ```bash
   npm install
   ```
3. **Start the application**:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173`.

---

## 🧪 Step-by-Step Guide to Test Every Feature

Follow these simple steps to experience everything the app has to offer:

### 1. Run a Standard AI Simulation
- Look at the **Sidebar** on the left and click on a product (e.g., "Premium Almonds").
- In the **Simulation Inputs** box on the left, set a **Discount Depth** (e.g., 20%) using the slider or input box.
- Set a **Promotion Duration** (e.g., 7 days).
- Click the **"Run AI Simulation"** button.
- *Notice the "AI thinking" loading animation, followed by a dashboard showing a clear recommendation (e.g., Strongly Recommend), projected profit, and a visual bar chart.*

### 2. Try the A/B Testing (Compare Mode)
- In the Simulation Inputs box, flip the **"Compare Scenario"** toggle switch so it turns purple.
- You will now see two discount sliders. Set **Scenario A to 20%** and **Scenario B to 40%**.
- Click **"Run AI Simulation"**.
- *Notice how the dashboard transforms! It now shows a side-by-side comparison of both scenarios, declares a mathematical winner at the top, and plots both on the chart.*

### 3. Schedule a Promotion (Promo Calendar)
- Once your simulation is finished, look for the purple **"Schedule"** button in the top right corner of the dashboard.
- Click **Schedule**.
- *Notice the green success notification dropping down from the top of the screen.*
- The app will automatically switch you from the "AI Simulator" tab to the **"Promo Calendar"** tab, where your promotion is now permanently saved on a timeline!
- You can toggle back and forth between the Simulator and Calendar tabs at the top center of the screen.

### 4. Ask the AI a Question
- Look in the **bottom right corner** of the screen for a floating purple chat bubble.
- Click it to open the **Ask Price Sense AI** widget.
- Type a question like: *"Why is this risky?"* or *"Compare these for me."*
- Click send. *Notice the realistic typing animation before the AI responds using the exact math from your current active simulation!*

### 5. Export to CSV
- Go back to the **AI Simulator** tab.
- Click the **"Export"** button in the top right of the dashboard.
- *Notice a CSV file is downloaded to your computer containing the exact data from your simulation, which you can open in Excel.*

### 6. Test the Notification History
- Look at the very top right of the navigation bar. You should see a **Bell icon** with a red dot.
- Click the Bell icon.
- *A beautiful dropdown will appear showing a history of all the notifications you triggered (like exporting or scheduling), complete with timestamps. Click "Clear All" to wipe them.*

### 7. Toggle Dark Mode
- Next to the notification bell in the top navigation bar, click the **Moon icon**.
- *Watch the entire application instantly and smoothly transition into a beautiful, premium Dark Mode.*
- Click the Sun icon to switch back to Light Mode.

---

## 🛠 Tech Stack
- **Frontend Framework**: React.js (Vite)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
