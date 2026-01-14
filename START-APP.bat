@echo off
echo Starting Xisekelo Safety Application...
echo.

echo [1/2] Starting Backend Server (Port 3003)...
start "Backend Server" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend Server (Port 3000)...
start "Frontend Server" cmd /k "npm run dev"

timeout /t 5 /nobreak >nul

echo.
echo ✅ Application Started!
echo.
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:3003
echo.
echo Press any key to open the application in your browser...
pause >nul

start http://localhost:3000

