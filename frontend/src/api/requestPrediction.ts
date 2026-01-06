import { BACKEND_ROOT_URL } from "../config";
import type { FormDataType } from "../pages/Calculator/PredictionResult";

export default async function requestPrediction(data: FormDataType) {
  const res = await fetch(`${BACKEND_ROOT_URL}/mm_predict`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Prediction failed');
  const parsed = await res.json();
  if (parsed.error) {
    throw new Error(parsed.error);
  }
  return parsed;
}
