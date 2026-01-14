# Debug Login Issue

## The Problem
Login is failing even though backend API works.

## Quick Fix Steps

### 1. Check Browser Console (F12)
Open Developer Tools → Console tab

You should see:
```
🔐 Login request to: http://localhost:3003/api/auth/login
📧 Email: molepok@mogaleintegrated.co.za
📡 Response status: 200
✅ Login successful!
```

### 2. If You See Errors:

**Error: "Failed to fetch"**
- Backend not running
- Fix: Restart backend (`cd backend && npm run dev`)

**Error: "CORS policy"**
- CORS blocked
- Fix: Backend needs restart with new CORS settings

**Error: "Expected JSON but got HTML"**
- Wrong URL or backend not responding
- Fix: Check backend is on port 3003

### 3. Test Backend Directly
```powershell
$body = @{ email = "molepok@mogaleintegrated.co.za"; password = "pass123" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3003/api/auth/login" -Method Post -Body $body -ContentType "application/json"
```

### 4. Restart Everything
1. Stop backend (Ctrl+C)
2. Stop frontend (Ctrl+C)
3. Restart backend: `cd backend && npm run dev`
4. Restart frontend: `npm run dev`
5. Try login again

### 5. Check Network Tab
In browser DevTools → Network tab:
- Look for request to `http://localhost:3003/api/auth/login`
- Check status code (should be 200)
- Check response (should be JSON with user data)

## Credentials
- Email: molepok@mogaleintegrated.co.za
- Password: pass123

