from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Engine running"}

@app.get("/forecast/{store_id}/{sku_id}")
def forecast(store_id: str, sku_id: str):
    return {
        "store": store_id,
        "sku": sku_id,
        "forecast": [100, 120, 110, 130]
    }