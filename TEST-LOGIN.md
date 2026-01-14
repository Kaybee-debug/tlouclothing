# Testing Login - Debug Steps

## 1. Open Browser Console (F12)

## 2. Try to Login

You should see these console messages:
- 🔐 Login request to: http://localhost:3003/api/auth/login
- 📧 Email: molepok@mogaleintegrated.co.za
- 📡 Response status: 200
- ✅ Login response: {user: {...}, token: "..."}
- ✅ Login successful!

## 3. If You See Errors:

### Error: "Failed to fetch"
- **Problem:** Backend not running
- **Fix:** Make sure backend is running on port 3003

### Error: "Expected JSON but got HTML"
- **Problem:** Wrong URL or backend not responding
- **Fix:** Check console shows correct URL

### Error: "CORS policy"
- **Problem:** CORS blocked
- **Fix:** Backend CORS should allow localhost:3000

## 4. Test Backend Directly

Open PowerShell and run:
```powershell
$body = @{ email = "molepok@mogaleintegrated.co.za"; password = "pass123" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3003/api/auth/login" -Method Post -Body $body -ContentType "application/json"
```

Should return:
```json
{
  "message": "Login successful",
  "user": {
    "id": "1",
    "name": "karabo",
    "email": "molepok@mogaleintegrated.co.za",
    "role": "customer"
  },
  "token": "..."
}
```

## 5. Credentials

- **Email:** molepok@mogaleintegrated.co.za
- **Password:** pass123

