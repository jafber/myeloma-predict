from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from pydantic import BaseModel
from typing import Optional
from datetime import date, timedelta
from random import random

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def main():
    return {"message": "Hello World"}

@app.get("/healthz")
async def health_check():
    return "OK"


class PredictionRequest(BaseModel):
    serumFreeLightChainRatio: float
    mSpike: float
    creatinine: float
    age: float
    hemoglobin: Optional[float] = None
    boneMarrowPlasmaCells: Optional[float] = None
    labworkDate: Optional[date] = None


TIME_STEP_IN_DAYS = 60
RISK_POINTS_IN_FUTURE = 20

def introduce_noise(value: float, noise_level: float = 0.05) -> float:
    noise = (random() * 2 - 1) * noise_level * value
    return value + noise

@app.post("/mm_predict")
async def mm_predict(request: Request):
    body = await request.json()
    # Parse and validate the request body
    try:
        user_data = PredictionRequest(**body)
    except Exception as e:
        print("--------------------------------------")
        print("Error parsing request body: ", e)
        print("the body was: ", body)
        print("--------------------------------------")
        return {"error": str(e)}

    risk_assessements = []
    start_date = date.today()
    for i in range(RISK_POINTS_IN_FUTURE):
        future_date = start_date + timedelta(days=TIME_STEP_IN_DAYS * (i + 1))
        probability = random() * min(0.1 * i, 1.0)
        low = introduce_noise(probability * 0.8)
        high = introduce_noise(probability * 1.2)
        risk_assessements.append({"date": future_date.isoformat(), "probability": probability, "low": low, "high": high})

    return {
        "risk": risk_assessements,
        "riskScore": random(),
        "overallVerdict": "Low Risk",
        "detailedDescription": "Based on the provided parameters, the risk of progression is low",
    }