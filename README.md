# 🎓 Sentiment Analysis System of Public Opinions on School Fees Hikes

An enterprise-grade, role-based SAAS platform designed to monitor, aggregate, and mathematically analyze public sentiment regarding university fee hikes in Nigeria. 

This platform empowers **Analysts**, **Researchers**, and **University Administrators** to gain real-time NLP insights from social media posts (Twitter, Facebook, Nairaland) concerning institutions like UNILAG, OAU, UI, ABU, and UNN.

## 🚀 Tech Stack
*   **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Recharts, React Query
*   **Backend:** Python, FastAPI, Uvicorn, VADER Sentiment (NLP)
*   **Database & Auth:** Appwrite (NoSQL, JWT, Role-Based Access Control, Secure Storage)

---

## 🛠️ Local Development Setup

To run this project locally, you will need to start both the Frontend and the Backend servers.

### 1. Prerequisites
*   Node.js (v18+)
*   Python (3.10+)
*   An active [Appwrite](https://appwrite.io/) Cloud or local instance.

### 2. Backend Setup (FastAPI)
The backend is responsible for data ingestion, NLP processing, and serving live analytics.

1. Open your terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (recommended):
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```
3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. **CRITICAL:** Ensure you are in the `backend/` folder (NOT inside `backend/app/`), then start the Uvicorn server:
   ```bash
   python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

### 3. Frontend Setup (React / Vite)
The frontend contains the interactive, role-based dashboards.

1. Open a *new* terminal window and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser to the local URL provided by Vite (usually `http://localhost:5173`).

---

## 🔐 System Architecture & Roles
The application leverages Appwrite's JWT and User Preferences architecture to dynamically render UI based on user roles:
*   `super_admin`: God-mode. Manages all users, views audit logs, and approves KYC documents.
*   `admin`: Oversees platform health, tracks high-risk institutions.
*   `analyst`: Accesses advanced NLP sentiment graphs and data filtering.
*   `researcher`: Requires ID verification (KYC). Accesses raw datasets and literature.
*   `viewer`: Standard public access with high-level KPI overviews.

## 🗄️ Database Seeding
To initialize the Appwrite Database with mock universities and NLP data, ensure your `.env` is configured and run:
```bash
cd backend
python scripts/seed_db.py
```
