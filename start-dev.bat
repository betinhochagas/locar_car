@echo off
echo ====================================
echo Sistema de Gestao de Locadora - Iniciando...
echo ====================================
echo.
echo [1/2] Iniciando Backend PHP (porta 3000)...
start "PHP Backend" cmd /k "cd /d "%~dp0" && php -S localhost:3000"
timeout /t 2 /nobreak >nul
echo.
echo [2/2] Iniciando Frontend React (porta 8080)...
start "React Frontend" cmd /k "cd /d "%~dp0" && npm run dev"
echo.
echo ====================================
echo Servidores iniciados!
echo ====================================
echo Frontend: http://localhost:8080
echo Backend:  http://localhost:3000
echo ====================================
echo.
echo Pressione qualquer tecla para sair...
pause >nul
