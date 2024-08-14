from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib
import pandas as pd
# from featureEngineer import ohlc_data

def train_model(ohlc_data: pd.DataFrame):
    # print(ohlc_data.shape)
    
    # Extract features (X) and target (y)
    X = ohlc_data[['open', 'high', 'low', 'return']].values  # Extract all rows for these columns
    y = ohlc_data[''].shift(-1).dropna().values  # Target is the shifted 'return'
    
    # To ensure the lengths match after the shift and dropna
    X = X[:-1]  # Remove the last row in X to match the length of y after shifting

   
    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train the model
    model = LinearRegression()
    model.fit(X_train, y_train)

    # Evaluate the model
    print(f'Model R^2 score: {model.score(X_test, y_test)}')
    return model

def save_model(model, filepath='crypto_model.pkl'):
    joblib.dump(model, filepath)

# Train and save the model
# model = train_model(ohlc_data)
# save_model(model)
