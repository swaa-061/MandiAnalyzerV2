import os
import google.generativeai as genai

def initialize_gemini():
    api_key = os.getenv('GEMINI_API_KEY')
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables")
    genai.configure(api_key=api_key)
    return genai.GenerativeModel('gemini-pro')

def get_price_prediction(crop, location):
    model = initialize_gemini()

    prompt = f"""You are an expert agricultural market analyst in India with deep knowledge of mandi prices and crop trading patterns.

Task: Analyze the market for {crop} near {location} (within 50km radius).

Provide a detailed analysis with:
1. Current estimated market price (₹ per quintal)
2. Past 7-day price trend (provide 7 realistic daily prices showing gradual change)
3. Next 7-day price prediction (provide 7 realistic daily prices)
4. Market trend direction (uptrend/stable/downtrend)
5. Confidence level in prediction

Base your analysis on:
- Seasonal patterns for {crop}
- Regional market dynamics near {location}
- Supply-demand factors
- Weather impact
- Festival/season timing

Format your response EXACTLY as JSON:
{{
  "currentPrice": <number>,
  "pastPrices": [day1, day2, day3, day4, day5, day6, day7],
  "predictedPrices": [day1, day2, day3, day4, day5, day6, day7],
  "trendDirection": "uptrend|stable|downtrend",
  "confidence": "high|medium|low"
}}

Provide realistic, logical prices based on actual Indian mandi patterns. No random numbers."""

    response = model.generate_content(prompt)
    return response.text

def get_farmer_advisory(crop, location, trend_direction, price_range, predicted_prices):
    model = initialize_gemini()

    avg_predicted = sum(predicted_prices) / len(predicted_prices)
    final_price = predicted_prices[-1]
    first_price = predicted_prices[0]

    prompt = f"""You are an agricultural advisor helping Indian farmers make smart selling decisions.

Context:
- Crop: {crop}
- Location: {location}
- Market Trend: {trend_direction}
- Expected Price Range: {price_range}
- Starting predicted price: ₹{first_price}
- Final predicted price: ₹{final_price}
- Average predicted price: ₹{avg_predicted:.0f}

Provide practical, actionable advice in 2-3 sentences for the farmer. Include:
- Whether to sell now, wait, or hold
- Best timing for selling
- Risk factors to consider
- Specific day recommendation if applicable

Write in professional but simple language. Be direct and helpful. Focus on maximizing farmer profit while managing risk.

Do not use formatting, just plain text."""

    response = model.generate_content(prompt)
    return response.text.strip()
