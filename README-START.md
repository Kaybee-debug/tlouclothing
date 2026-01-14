# How to Start the Application

## Quick Start (Windows)

**Double-click `START-APP.bat`** - This will start both frontend and backend automatically!

## Manual Start

### Option 1: Two Terminal Windows

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Option 2: One Terminal (Background)

```bash
# Start backend in background
cd backend
start npm run dev

# Start frontend
npm run dev
```

## URLs

- **Frontend (Your App):** http://localhost:3000
- **Backend API:** http://localhost:3003

## Test Login

1. Go to: http://localhost:3000/auth
2. Use these credentials:
   - **Email:** molepok@mogaleintegrated.co.za
   - **Password:** pass123

## What's Running?

- **Frontend (Nuxt.js)** - Port 3000 - Your website/UI
- **Backend (Express)** - Port 3003 - API/Database

Both need to run at the same time!

