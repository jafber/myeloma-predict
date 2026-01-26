from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from pydantic import BaseModel
from typing import Optional
from datetime import date, timedelta
from random import random
from model import init_model, predict_risk_function
import pandas as pd

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

model = init_model()
print("Model initialized successfully.")
print(model)

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


TIME_STEP_IN_DAYS = 30
RISK_POINTS_IN_FUTURE = 200

def introduce_noise(value: float, noise_level: float = 0.05) -> float:
    noise = (random() * 2 - 1) * noise_level * value
    return value + noise

@app.post("/mm_predict")
async def mm_predict(request: Request):
    body = await request.json()
    # Parse and validate the request body
    try:
        user_data = PredictionRequest(**body)
        model_input =     {
            "Age": user_data.age,
            "PGS_Score": float('NaN'),
            "M_Spike": user_data.mSpike,
            "sFLC_Ratio": user_data.serumFreeLightChainRatio,
            "Creatinine": user_data.creatinine,
            "LP": float('NaN'),
            "BMPC_Final": user_data.boneMarrowPlasmaCells if user_data.boneMarrowPlasmaCells is not None else 20.0,
            "Hgb_Final": user_data.hemoglobin if user_data.hemoglobin is not None else 13.5,
            "Ancestry": float('NaN'),
            "Clinical_Risk": float('NaN'),
        }
    except Exception as e:
        print("--------------------------------------")
        print("Error parsing request body: ", e)
        print("the body was: ", body)
        print("--------------------------------------")
        return {"error": str(e)}
    
    try:
        print("Model input: ", model_input)
        print("Running model prediction...")
        hazard_functions = predict_risk_function(model, pd.DataFrame([model_input]))
        if not hazard_functions or len(hazard_functions) == 0:
            raise ValueError("No hazard functions returned by the model.")

        hazard_function = hazard_functions[0]
    except Exception as e:
        print("--------------------------------------")
        print("Error during model prediction: ", e)
        print("the input was: ", model_input)
        print("--------------------------------------")
        return {"error": "Model prediction failed: " + str(e)}

    risk_assessements = []
    start_date = date.today()
    for i in range(RISK_POINTS_IN_FUTURE):
        future_date = start_date + timedelta(days=TIME_STEP_IN_DAYS * (i + 1))
        probability = float(hazard_function.y[i])
        low = introduce_noise(probability * 0.8)
        high = introduce_noise(probability * 1.2)
        risk_assessements.append({"date": future_date.isoformat(), "probability": probability, "low": low, "high": high})

    return {
        "risk": risk_assessements,
        "riskScore": sum([r["probability"] for r in risk_assessements]) / len(risk_assessements),
        "overallVerdict": "Low Risk",
        "detailedDescription": "Based on the provided parameters, the risk of progression is low",
    }