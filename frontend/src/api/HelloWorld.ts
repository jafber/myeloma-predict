import { BACKEND_ROOT_URL } from "../config";

export default async function helloWorld() {
  const res = await fetch(BACKEND_ROOT_URL, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Prediction failed');
  return await res.json();
}
