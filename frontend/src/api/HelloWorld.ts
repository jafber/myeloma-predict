export default async function helloWorld() {
  const res = await fetch("http://localhost:8000/", {
    headers: { "Content-Type": "application/json" },
  })
  if (!res.ok) throw new Error("Prediction failed")
  return await res.json()
}