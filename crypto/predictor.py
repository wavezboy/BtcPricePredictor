import joblib
import pandas as pd
from sklearn.linear_model import LinearRegression
# from featureEngineer import ohlc_data

def load_model(filepath='crypto_model.pkl'):
    return joblib.load(filepath)

def predict_next_close(model:LinearRegression, df:pd.DataFrame):
    last_row = df.iloc[-1]
    X = last_row[['open', 'high', 'low', 'return']].values.reshape(1, -1)
    predicted_close = model.predict(X)[0]

    return predicted_close



model= load_model()

# print(predict_next_close(model=model, df=ohlc_data))