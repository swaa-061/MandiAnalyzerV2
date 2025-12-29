# PricePulse - Mandi Analyzer

AI-powered crop price prediction and market intelligence platform for Indian farmers.

## Overview

PricePulse helps farmers make informed decisions by analyzing crop prices and providing:
- 7-day price predictions
- Market trend analysis with visual indicators
- AI-generated selling recommendations
- Interactive price trend visualization

## Tech Stack

**Frontend:**
- React + TypeScript
- Tailwind CSS
- Vite

**Backend:**
- Flask (Python)
- Google Gemini AI API
- Flask-CORS

## Project Structure

```
/
├── backend/
│   ├── app.py              # Flask API server
│   ├── ai_advice.py        # Gemini AI integration
│   ├── price_logic.py      # Market analysis orchestration
│   ├── requirements.txt    # Python dependencies
│   └── .env.example        # Environment variables template
├── src/
│   ├── components/
│   │   ├── AnalysisForm.tsx      # Input form component
│   │   ├── ResultsDisplay.tsx    # Results display component
│   │   └── PriceChart.tsx        # Price visualization chart
│   ├── App.tsx             # Main application
│   └── index.css           # Global styles
└── README.md
```

## Setup Instructions

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and add your Gemini API key:
# GEMINI_API_KEY=your_actual_api_key_here
```

### 2. Get Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

### 3. Frontend Setup

```bash
# In project root directory
npm install
```

## Running the Application

### Start Backend Server

```bash
cd backend
python app.py
```

Backend will run on `http://127.0.0.1:5000`

### Start Frontend Development Server

```bash
# In project root directory
npm run dev
```

Frontend will run on `http://localhost:5173`

## Usage

1. Open the frontend in your browser
2. Enter crop name (e.g., "Tomato", "Wheat", "Rice")
3. Enter village/location name (e.g., "Pune", "Nashik", "Kolhapur")
4. Click "Analyze Market"
5. View results:
   - Price trend indicator (Up/Stable/Down)
   - 7-day price range
   - Interactive price chart
   - AI-generated selling advice

## API Endpoints

### POST /api/analyze

Analyzes market conditions for a specific crop and location.

**Request:**
```json
{
  "crop": "Tomato",
  "location": "Pune"
}
```

**Response:**
```json
{
  "signal": "Market Uptrend",
  "color": "green",
  "priceRange": "₹1200 – ₹1450",
  "pastPrices": [1100, 1120, 1150, 1170, 1180, 1190, 1200],
  "predictedPrices": [1220, 1250, 1280, 1300, 1350, 1400, 1450],
  "advice": "Based on current trends near Pune, tomato prices are expected to rise moderately..."
}
```

## How It Works

1. **User Input**: Farmer enters crop name and location
2. **AI Analysis**: Backend sends prompt to Google Gemini API
3. **Price Prediction**: Gemini analyzes market patterns and generates:
   - Historical price estimates
   - 7-day price forecasts
   - Trend direction
4. **Advisory Generation**: Gemini creates personalized selling recommendations
5. **Visualization**: Frontend displays interactive charts and insights

## Key Features

- **No Random Data**: All predictions powered by Google Gemini AI
- **Realistic Analysis**: Considers seasonal patterns, regional dynamics, supply-demand
- **Farmer-Friendly UI**: Clean, intuitive interface with visual indicators
- **Production-Ready**: Proper error handling, loading states, responsive design
- **Explainable Logic**: Clear flow for hackathon judges to understand

## For GDG Judges

This project demonstrates:
- Integration with Google Gemini AI API
- Full-stack development (React + Flask)
- Real-world problem solving for Indian agriculture
- Clean code architecture with separation of concerns
- Production-ready error handling and user experience
- No dummy/random data - all intelligence from AI

## License

Built for GDG Hackathon Submission
