from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
import traceback

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the dataset and preprocess it (this assumes both rainfall and yield data are available)
data = pd.read_csv('crop.csv')  # Adjust the path accordingly

# Encode categorical variables
label_encoders = {}
for column in ['Crop', 'Season', 'State']:
    le = LabelEncoder()
    data[column] = le.fit_transform(data[column])
    label_encoders[column] = le

# Features for rainfall and yield predictions
X_rainfall = data.drop(columns=['Annual_Rainfall'])
y_rainfall = data['Annual_Rainfall']

X_yield = data[['Crop_Year', 'State', 'Annual_Rainfall', 'Crop', 'Fertilizer', 'Pesticide']]
y_yield = data['Yield']

# Train models for both rainfall and yield
X_train_rainfall, X_test_rainfall, y_train_rainfall, y_test_rainfall = train_test_split(
    X_rainfall, y_rainfall, test_size=0.2, random_state=42
)
rf_model_rainfall = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model_rainfall.fit(X_train_rainfall, y_train_rainfall)

X_train_yield, X_test_yield, y_train_yield, y_test_yield = train_test_split(
    X_yield, y_yield, test_size=0.2, random_state=42
)
rf_model_yield = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model_yield.fit(X_train_yield, y_train_yield)


# Function to predict rainfall
def predict_rainfall(year, state):
    crop_encoded = X_rainfall['Crop'].mode()[0]
    season_encoded = X_rainfall['Season'].mode()[0]
    area_mean = X_rainfall['Area'].mean()
    production_mean = X_rainfall['Production'].mean()
    fertilizer_mean = X_rainfall['Fertilizer'].mean()
    pesticide_mean = X_rainfall['Pesticide'].mean()
    yield_mean = X_rainfall['Yield'].mean()

    state_encoded = label_encoders['State'].transform([state])[0]

    input_data = pd.DataFrame({
        'Crop': [crop_encoded],
        'Crop_Year': [year],
        'Season': [season_encoded],
        'State': [state_encoded],
        'Area': [area_mean],
        'Production': [production_mean],
        'Fertilizer': [fertilizer_mean],
        'Pesticide': [pesticide_mean],
        'Yield': [yield_mean]
    })

    predicted_rainfall = rf_model_rainfall.predict(input_data)[0]
    return round(predicted_rainfall, 2) 


# Function to predict yield
def predict_yield(year, state, crop,rainfall, fertilizer, pesticide):
    state_encoded = label_encoders['State'].transform([state])[0]
    crop_encoded = label_encoders['Crop'].transform([crop])[0]

    input_data = pd.DataFrame({
        'Crop_Year': [year],
        'State': [state_encoded],
        'Annual_Rainfall': [rainfall],
        'Crop': [crop_encoded],
        'Fertilizer': [fertilizer],
        'Pesticide': [pesticide]
    })

    predicted_yield = rf_model_yield.predict(input_data)[0]
    return round(predicted_yield, 2)


@app.route('/')
def home():
    return "Flask API is running!"


@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Debugging log: check if we received data
        if data is None:
            return jsonify({'error': 'No JSON data received'}), 400

        print(f"Received data: {data}")

        year = int(data.get('year'))
        state = str(data.get('place'))

        # Check if request is for rainfall or yield prediction
        if 'crop' in data and 'fertilizer' in data and 'pesticide' in data:
            crop = str(data.get('crop'))
            fertilizer = float(data.get('fertilizer'))
            pesticide = float(data.get('pesticide'))

            rainfall=predict_rainfall(year, state)

            prediction = predict_yield(year, state, crop,rainfall, fertilizer, pesticide)
            return jsonify({'prediction': prediction, 'type': 'yield'}), 200
        else:
            prediction = predict_rainfall(year, state)
            return jsonify({'prediction': prediction, 'type': 'rainfall'}), 200

    except Exception as e:
        traceback.print_exc()  # Print error to server log for debugging
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
