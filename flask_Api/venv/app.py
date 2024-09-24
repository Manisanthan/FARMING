from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS  # Import CORS

# Load the pre-trained model
model = pickle.load(open('../venv/rainfall_model.pkl', 'rb'))

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# State encoding (map state names to numeric values)
state_mapping = {
    'Andhra Pradesh': 0,
    'Arunachal Pradesh': 1,
    'Assam': 2,
    'Bihar': 3,
    'Chhattisgarh': 4,
    'Goa': 5,
    'Gujarat': 6,
    'Haryana': 7,
    'Himachal Pradesh': 8,
    'Jharkhand': 9,
    'Karnataka': 10,
    'Kerala': 11,
    'Madhya Pradesh': 12,
    'Maharashtra': 13,
    'Manipur': 14,
    'Meghalaya': 15,
    'Mizoram': 16,
    'Nagaland': 17,
    'Odisha': 18,
    'Punjab': 19,
    'Rajasthan': 20,
    'Sikkim': 21,
    'Tamil Nadu': 22,
    'Telangana': 23,
    'Tripura': 24,
    'Uttar Pradesh': 25,
    'Uttarakhand': 26,
    'West Bengal': 27
}

@app.route('/')
def home():
    return "Welcome to the Rainfall Prediction API!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Retrieve input data from the user
        year = int(request.json.get('year'))  # Get year from JSON body
        place = request.json.get('place')  # Get place from JSON body

        # Check if the state exists in the mapping
        if place not in state_mapping:
            return jsonify({'error': f"State '{place}' is not recognized. Please enter a valid state."})

        # Encode the state to its numeric value
        state_encoded = state_mapping[place]

        # Prepare input for the model as a 2D array
        input_query = np.array([[year, state_encoded]])

        # Make prediction using the model
        result = model.predict(input_query)[0]

        # Return the prediction result
        return jsonify({'year': year, 'state': place, 'predicted_rainfall': result})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':  # Corrected __name_ and _main_
    app.run(host='0.0.0.0', port=5000)
