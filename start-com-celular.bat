@echo off
setlocal enabledelayedexpansion

echo ====================================
echo RV Car Solutions - Iniciando
echo Versao com Acesso via Rede Local
echo ====================================
echo.

REM Detectar IP da rede local
echo [1/4] Detectando IP da rede...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4"') do (
    set "ip=%%a"
    set "ip=!ip: =!"
    if "!ip:~0,3!"=="192" (
        set "LOCAL_IP=!ip!"
        goto :found_ip
    )
)

:found_ip
if not defined LOCAL_IP (
    echo [AVISO] Nao foi possivel detectar IP automaticamente
    set "LOCAL_IP=192.168.15.163"
    echo Usando IP padrao: %LOCAL_IP%
) else (
    echo [OK] IP detectado: %LOCAL_IP%
)
echo.

REM Verificar PHP
echo [2/4] Verificando PHP...
set "PHP_CMD="

where php >nul 2>&1
if %errorlevel% == 0 (
    set "PHP_CMD=php"
) else if exist "C:\xampp\php\php.exe" (
    set "PHP_CMD=C:\xampp\php\php.exe"
) else (
    echo [ERRO] PHP nao encontrado!
    pause
    exit /b 1
)
echo [OK] PHP encontrado
echo.

REM Verificar Node.js
echo [3/4] Verificando Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    pause
    exit /b 1
)
echo [OK] Node.js encontrado
echo.

echo [4/4] Iniciando servidores...
echo.

REM Iniciar Backend PHP com 0.0.0.0 para aceitar conexoes da rede
echo [Backend] Iniciando PHP na porta 3000...
echo           Aceitando conexoes de toda a rede local
start "RV Car - Backend PHP" cmd /k "cd /d "%~dp0" && "%PHP_CMD%" -S 0.0.0.0:3000"
timeout /t 3 /nobreak >nul

REM Iniciar Frontend React
echo [Frontend] Iniciando React...
start "RV Car - Frontend React" cmd /k "cd /d "%~dp0" && npm run dev"
timeout /t 3 /nobreak >nul

echo.
echo ====================================
echo Servidores Iniciados!
echo ====================================
echo.
echo 💻 ACESSO NO PC:
echo    Frontend:  http://localhost:8081
echo    API:       http://localhost:3000/api/vehicles.php
echo.
echo 📱 ACESSO NO CELULAR (mesma WiFi):
echo    Frontend:  http://%LOCAL_IP%:8081
echo    API:       http://%LOCAL_IP%:3000/api/vehicles.php
echo.
echo ====================================
echo.
echo 💡 IMPORTANTE:
echo    1. Celular deve estar na mesma WiFi
echo    2. Firewall pode bloquear - veja ACESSO-CELULAR.md
echo    3. Use o IP acima no celular
echo.
echo ⚠️  Se o IP estiver errado, atualize o .env.local
echo.
echo As janelas dos servidores foram abertas
echo Feche-as para parar os servidores
echo.
pause
