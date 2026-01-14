# Quick Fix: Can't Login

## Step 1: Check if servers are running

Run these commands:

```powershell
# Check backend (should show port 3003)
netstat -ano | findstr ":3003.*LISTENING"

# Check frontend (should show port 3000)
netstat -ano | findstr ":3000.*LISTENING"
```

## Step 2: Start everything

If servers aren't running:

```powershell
npm run dev
```

This starts both backend and frontend.

## Step 3: Test backend directly

```powershell
$body = @{ email = "molepok@mogaleintegrated.co.za"; password = "pass123" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3003/api/auth/login" -Method Post -Body $body -ContentType "application/json"
```

Should return your user data.

## Step 4: Check browser console

1. Open http://localhost:3000/auth
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Try to login
5. Look for error messages

## Common Issues:

### "Failed to fetch"
- Backend not running
- Fix: Start backend (`npm run dev`)

### "CORS policy"
- CORS blocked
- Fix: Restart backend

### "Expected JSON but got HTML"
- Wrong URL
- Fix: Check console shows correct URL

## Your Credentials:
- Email: molepok@mogaleintegrated.co.za
- Password: pass123

