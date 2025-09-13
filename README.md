# Test Copilot App (React + Node.js + MongoDB)
> **Intentionally messy**: this app has bugs, code smells, and security flaws so your AI DevOps Co‑Pilot can find them.

## ⚠️ Safety
This code is for **local testing only**. It contains insecure patterns (hardcoded secrets, bad validation, eval, wide‑open CORS, NoSQL injection risks). **Do not deploy anywhere public.**

---

## 1) What this app is
- **Frontend**: React (Vite) under `/client`
- **Backend**: Node.js + Express + Mongoose under `/server`
- **Database**: MongoDB

The app lets you:
- Register/Login (JWT saved to localStorage — bad idea on purpose)
- Create simple "items" with titles/descriptions
- See items on a dashboard

There are intentional issues in both front & back so your copilot can detect them.

---

## 2) Setup (like you're 5 👶)

### A) Install tools (once)
- Install **Node.js 22** from nodejs.org
- Install **pnpm**: `npm i -g pnpm`
- Install **Docker Desktop** (or MongoDB locally)

### B) Start MongoDB (easiest with Docker)
```powershell
docker run -d --name mongo -p 27017:27017 mongo:6
```

### C) Make .env files
Copy the example file twice:

```powershell
cd test-copilot-app

# for server
Copy-Item .\.env.example .\server\.env

# for client
Copy-Item .\.env.example .\client\.env
```

> Keep only the relevant parts in each file if you want; defaults already work.

### D) Install deps
```powershell
# backend
cd .\server
pnpm install

# frontend
cd ..\client
pnpm install
```

### E) Run backend
```powershell
cd ..\server
pnpm dev
# Server prints: "Server listening on http://localhost:5000"
```

### F) Run frontend
```powershell
cd ..\client
pnpm dev
# Open the URL it prints (usually http://localhost:5173)
```

---

## 3) Use it (manual test)
1. Open frontend URL → click **Register** → make a user (e.g., alice / password123)
2. Login → this stores a token in localStorage (bad, but for demo)
3. Go to Dashboard → add an item
4. Refresh → see your item

---

## 4) Where the "bad stuff" lives (so scanners catch it)
### Backend
- `server/server.js`:
  - **CORS: "*"** (overly permissive)
  - **JWT secret** from `.env` or weak default
  - **/api/math?expr=...** uses **eval** (RCE risk)
  - **/api/exec?cmd=...** uses **child_process.exec** (RCE risk) — demo only
- `routes/items.js`:
  - **No input validation**
  - **No ownership checks** (users can read all items)
  - **Potential NoSQL injection** through loose query usage
- `models/User.js`:
  - Passwords stored **plaintext** (awful, on purpose)
- `middleware/auth.js`:
  - Minimal checks; no expiry/refresh

### Frontend
- `src/App.jsx`:
  - **Hardcoded API key string** (fake, for detection)
  - **Unused imports** and **console.log**
  - Stores **JWT in localStorage**
  - Uses **dangerouslySetInnerHTML** via `Dangerous` component
- `src/api.js`:
  - **Fetch via HTTP**
  - **No retries**, **no timeouts**

Use this app to run your copilot scans, policy engine, runner, and integrations.

---

## 5) Clean up
```powershell
# stop frontend/backend (Ctrl+C)
# stop Mongo container
docker stop mongo
docker rm mongo
```

## 6) Troubleshooting
- If Mongo connection fails: check Docker is running and `MONGO_URL` matches.
- If ports busy: change `PORT` in `server/.env` or `VITE_API_BASE` in `client/.env`.
- Windows PowerShell quote issues? Use double quotes `"` for JSON bodies.
