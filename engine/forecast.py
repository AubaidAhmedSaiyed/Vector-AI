import pandas as pd
import joblib
import os

# Define the features exactly as used in training
FEATURES = ['lag1', 'lag2', 'lag3', 'rolling3', 'week']

def forecast_demand(store_id, sku_id):
    model_path = f"models/{store_id}_{sku_id}.pkl"
    if not os.path.exists(model_path):
        return {"error": f"Model for SKU {sku_id} not found"}

    model = joblib.load(model_path)

    file_path = f"data/store_{store_id}.csv"
    if not os.path.exists(file_path):
        return {"error": f"Data for store {store_id} not found"}

    df = pd.read_csv(file_path)
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values('date')

    sku_df = df[df['sku_id'] == sku_id].set_index('date')
    weekly = sku_df['sales'].resample('W').sum()

    # last 3 weeks
    last_values = weekly.tail(3).values.tolist()
    while len(last_values) < 3:
        last_values.insert(0, 0)  # pad if not enough weeks

    lag1, lag2, lag3 = last_values[-1], last_values[-2], last_values[-3]

    predictions = []
    current_week = pd.Timestamp.now().isocalendar().week

    for i in range(4):  # forecast next 4 weeks
        rolling3 = (lag1 + lag2 + lag3) / 3
        week = (current_week + i) % 52

        # Use DataFrame with column names to ensure correct feature mapping
        X_df = pd.DataFrame([[lag1, lag2, lag3, rolling3, week]], columns=FEATURES)
        pred = max(0, int(model.predict(X_df)[0]))
        predictions.append(pred)

        # shift lags
        lag3, lag2, lag1 = lag2, lag1, pred

    return {"sku": sku_id, "forecast": predictions}