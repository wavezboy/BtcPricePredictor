from fastapi import FastAPI
import uvicorn
from dataFetcher import fetch_crypto_data
from featureEngineer import calculate_ohlc
from predictor import load_model, predict_next_close

app = FastAPI()

model = load_model()

@app.get('/predict')
def get_prediction():
    latestData = fetch_crypto_data()
    ohlicData = calculate_ohlc(latestData)
    predictedClose =  predict_next_close(model=model ,df=ohlicData)
    return {"predicted_close": predictedClose}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)