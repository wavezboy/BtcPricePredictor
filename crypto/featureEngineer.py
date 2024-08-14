import pandas as pd
# from dataFetcher import crypto_data
def calculate_ohlc(df:pd.DataFrame, interval= '30min'):
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df.set_index('timestamp', inplace=True)
    
    # Resample to the desired interval and calculate OHLC
    ohlc = df['price'].resample(interval).ohlc()
    
    # Calculate the 'return' feature
    ohlc['return'] = ohlc['close'].pct_change(fill_method=None)
    ohlc['return'] = ohlc['return'] * 100 
    
    # Drop rows with NaN values
    ohlc.dropna(inplace=True)
    
    return ohlc



# ohlc_data = calculate_ohlc(crypto_data)
