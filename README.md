## Tech Stack Overview

- `frontend`: Vite + React + Typescript web app. Gets built into a simple static HTML page.
- `backend`: FastAPI Python server. Offers a simple JSON REST API to run the multiple myeloma prediction model.

## Setup For Local Development

### Frontend

To run the website on [http://localhost:5173](http://localhost:5173):

```
cd frontend
npm install
npm run dev
```

### Backend

To run the API on [http://localhost:8000](http://localhost:8000):

```
cd backend
python3 -m venv .venv
source .venv/bin/activate # or on windows: source .venv/Scripts/activate
pip install -r requirements.txt
fastapi dev main.py
```
