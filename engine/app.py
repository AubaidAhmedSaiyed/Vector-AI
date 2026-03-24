from fastapi import FastAPI
from train import train_model
from forecast import forecast_demand

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Vector AI running"}

@app.post("/train/{store_id}")
def train(store_id: str):
    try:
        train_model(store_id)
        return {"status": "training complete"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/forecast/{store_id}/{sku_id}")
def forecast(store_id: str, sku_id: str):
    try:
        return forecast_demand(store_id, sku_id)
    except Exception as e:
        return {"error": str(e)}