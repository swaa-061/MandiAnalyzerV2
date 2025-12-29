import json
import re
from ai_advice import get_price_prediction, get_farmer_advisory

def extract_json_from_response(text):
    json_match = re.search(r'\{[\s\S]*\}', text)
    if json_match:
        json_str = json_match.group(0)
        return json.loads(json_str)
    raise ValueError("No valid JSON found in Gemini response")

def determine_trend_signal(trend_direction):
    trend_map = {
        'uptrend': ('Market Uptrend', 'green'),
        'stable': ('Market Stable', 'yellow'),
        'downtrend': ('Market Downtrend', 'red')
    }
    return trend_map.get(trend_direction.lower(), ('Market Analysis', 'yellow'))

def format_price_range(predicted_prices):
    min_price = min(predicted_prices)
    max_price = max(predicted_prices)
    return f"₹{int(min_price)} – ₹{int(max_price)}"

def analyze_market(crop, location):
    try:
        prediction_response = get_price_prediction(crop, location)

        prediction_data = extract_json_from_response(prediction_response)

        past_prices = prediction_data.get('pastPrices', [])
        predicted_prices = prediction_data.get('predictedPrices', [])
        trend_direction = prediction_data.get('trendDirection', 'stable')

        if not past_prices or not predicted_prices:
            raise ValueError("Invalid price data received from Gemini")

        signal, color = determine_trend_signal(trend_direction)
        price_range = format_price_range(predicted_prices)

        advisory = get_farmer_advisory(
            crop,
            location,
            trend_direction,
            price_range,
            predicted_prices
        )

        return {
            'signal': signal,
            'color': color,
            'priceRange': price_range,
            'pastPrices': past_prices,
            'predictedPrices': predicted_prices,
            'advice': advisory
        }

    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse Gemini response: {str(e)}")
    except Exception as e:
        raise Exception(f"Market analysis failed: {str(e)}")
