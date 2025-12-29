from flask import Flask, request, jsonify
from flask_cors import CORS
from price_logic import analyze_market
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()

        if not data or 'crop' not in data or 'location' not in data:
            return jsonify({
                'error': 'Missing required fields: crop and location'
            }), 400

        crop = data['crop'].strip()
        location = data['location'].strip()

        if not crop or not location:
            return jsonify({
                'error': 'Crop and location cannot be empty'
            }), 400

        result = analyze_market(crop, location)

        return jsonify(result), 200

    except Exception as e:
        return jsonify({
            'error': f'Analysis failed: {str(e)}'
        }), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
