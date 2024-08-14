import requests
import pandas as pd

def fetch_crypto_data(crypto_id='bitcoin', vs_currency='usd'):
    url = f'https://api.coingecko.com/api/v3/coins/{crypto_id}/market_chart'
    params = {
        'vs_currency': vs_currency,
        'days': '30',  # Fetch data for the last 30 days
        # 'interval': 'hourly'  # Use 'daily' interval for daily data
    }
    response = requests.get(url, params=params)
    
    # Check if the request was successful
    if response.status_code != 200:
        raise Exception(f"API request failed with status code {response.status_code}: {response.text}")
    
    data = response.json()
    prices = data['prices']  # List of [timestamp, price]
    
    # Convert to DataFrame
    df = pd.DataFrame(prices, columns=['timestamp', 'price'])
    df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
    return df

# # Fetch the data
# crypto_data = fetch_crypto_data()
