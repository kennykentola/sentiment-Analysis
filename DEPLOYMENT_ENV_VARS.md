# 🚀 Deployment Environment Variables Guide

When deploying your applications to **Render** (Backend) and **Netlify** (Frontend), you must configure the exact environment variables listed below in their respective dashboards.

---

## 🟢 1. Render (FastAPI Backend)
When you create the Web Service in Render, navigate to the **Environment** tab and add the following keys.

| Key | Value to Copy / Paste |
|---|---|
| `APPWRITE_ENDPOINT` | `https://fra.cloud.appwrite.io/v1` |
| `APPWRITE_PROJECT_ID` | `sentiment` *(or your actual project ID)* |
| `APPWRITE_DB_ID` | `sentiment_db` |
| `APPWRITE_API_KEY` | *(Paste your very long Appwrite API Key here)* |
| `REDIS_URL` | *(Optional for now - only if you setup a Redis instance)* |

*Note: Render automatically uses the `render.yaml` file I created in your `backend/` folder to know how to install and start the server.*

---

## 🔵 2. Netlify (React Frontend)
When you connect your GitHub repository to Netlify, navigate to **Site Settings > Environment Variables** and add the following key.

| Key | Value to Copy / Paste |
|---|---|
| `VITE_APPWRITE_ENDPOINT` | `https://fra.cloud.appwrite.io/v1` |
| `VITE_APPWRITE_PROJECT_ID` | `sentiment` *(or your actual project ID)* |
| `VITE_API_URL` | *(Paste the final URL of your Render backend here, e.g. `https://sentiment-backend.onrender.com`)* |

*Note: The `netlify.toml` file in the frontend folder will automatically tell Netlify to run `npm run build` and route all traffic to `index.html`.*

---

## 🛑 Why did `seed_db.py` hang indefinitely?
The reason your terminal is hanging for minutes without output is a **known bug** in the official Appwrite Python SDK. Sometimes, when a Write operation occurs, the SDK loses the socket connection to `fra.cloud.appwrite.io` and hangs forever because it doesn't have a default timeout! 

**To safely bypass this bug:**
You can manually update the `Universities` table inside your Appwrite web console just by clicking "Add Document" and typing in a university name. The moment you add one, your dashboard will start populating!
