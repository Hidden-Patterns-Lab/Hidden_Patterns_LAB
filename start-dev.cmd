@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo [Hidden Patterns Lab] Node.js 20.9 or newer is required.
  echo Download Node.js from https://nodejs.org/ and try again.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo [Hidden Patterns Lab] Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo Dependency installation failed.
    pause
    exit /b 1
  )
)

echo.
echo [Hidden Patterns Lab] Starting the development server...
echo Open http://localhost:3000 in your browser.
echo Press Ctrl+C to stop the server.
echo.

call npm run dev
endlocal
