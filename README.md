## Myeloma-Predict

Myeloma-predict is an interactive calculator to visualize the risk of developing multiple myeloma (a type of blood cancer) based on key biomarkers and individual genetic predisposition. See it in action at [myeloma-predict.jan-berndt.de](https://myeloma-predict.jan-berndt.de)!

### Quick Start

1. Run `docker compose up --build`.
2. Run `docker compose ps`. The containers for backend and frontend should show "healthy" status.
3. That's it! You are now running the production-grade app under [http://localhost:5173](http://localhost:5173).

## Local Development Setup

### Tech Stack Overview

- `frontend`: React + Typescript web app. Is built into a simple static HTML page using Vite.
- `backend`: FastAPI Python server. Exposes a JSON REST API to run the multiple myeloma prediction model.

### Frontend

To run the website on [http://localhost:5173](http://localhost:5173):

```
cd frontend
npm install
npm run dev
```

### Backend

**Note: scikit-survival requires ecos requires visual c++**

To run the API on [http://localhost:8000](http://localhost:8000):

```
cd backend
python3 -m venv .venv
source .venv/bin/activate # or on windows: source .venv/Scripts/activate
pip install -r requirements.txt
fastapi dev main.py
```

## Deployment to Coolify

This app is deployed to https://myeloma-predict.jan-berndt.de/ using [Coolify](https://coolify.io/), a self-hosted platform for serving web applications.
To deploy, simply:

- Create a new application from https://github.com/jafber/myeloma-predict
- Choose `docker-compose-coolify.yml` for the deployment
- Assign `https://myeloma-predict.jan-berndt.de` to the frontend container and `https://myeloma-predict.jan-berndt.de:8000/api` to the backend

---

Developed in 2025 by [Jan Berndt](https://jan-berndt.de) and [Daniel Cermann](https://dcermann.de) for the course _Biomedical Data Types and Analyses_ led by Prof. Bernard Renard at HPI. Inspired by the [PANGEA-SMM Calculator](https://www.pangeamodels.org/). This project uses the [MIT License](LICENSE).
