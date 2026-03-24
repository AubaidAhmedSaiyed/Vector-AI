import pandas as pd
import joblib
import os
from xgboost import XGBRegressor

def train_model(store_id):
    file_path = f"data/store_{store_id}.csv"
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Data for store {store_id} not found")

    df = pd.read_csv(file_path)
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values('date')

    skus = df['sku_id'].unique()
    os.makedirs("models", exist_ok=True)

    for sku in skus:
        sku_df = df[df['sku_id'] == sku].set_index('date')
        weekly = sku_df['sales'].resample('W').sum()

        data = pd.DataFrame()
        data['y'] = weekly
        data['lag1'] = data['y'].shift(1)
        data['lag2'] = data['y'].shift(2)
        data['lag3'] = data['y'].shift(3)
        data['rolling3'] = data['y'].rolling(3).mean()
        data['week'] = data.index.isocalendar().week.astype(int)
        data = data.dropna()

        if len(data) < 10:
            print(f"Not enough data for {sku}")
            continue

        X = data[['lag1', 'lag2', 'lag3', 'rolling3', 'week']]
        y = data['y']

        model = XGBRegressor(n_estimators=100, learning_rate=0.1)
        model.fit(X, y)

        model_path = f"models/{store_id}_{sku}.pkl"
        joblib.dump(model, model_path)
        print(f"Trained model for {sku}")