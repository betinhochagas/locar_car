@echo off
setlocal enabledelayedexpansion

echo ====================================
echo Sistema de Gestao de Locadora - Setup Completo
echo ====================================
echo.

REM Verificar Node.js
echo [1/3] Verificando Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Instale em: https://nodejs.org/
    pause
    exit /b 1
)
node -v
echo.

REM Verificar PHP
echo [2/3] Verificando PHP...
set "PHP_PATH="

where php >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] PHP encontrado no PATH
    set "PHP_CMD=php"
    php -v
) else (
    if exist "C:\xampp\php\php.exe" (
        echo [OK] PHP encontrado no XAMPP
        set "PHP_CMD=C:\xampp\php\php.exe"
        "C:\xampp\php\php.exe" -v
    ) else if exist "C:\wamp64\bin\php\php8.2.0\php.exe" (
        echo [OK] PHP encontrado no WAMP
        set "PHP_CMD=C:\wamp64\bin\php\php8.2.0\php.exe"
        "!PHP_CMD!" -v
    ) else if exist "C:\wamp\bin\php\php8.2.0\php.exe" (
        echo [OK] PHP encontrado no WAMP
        set "PHP_CMD=C:\wamp\bin\php\php8.2.0\php.exe"
        "!PHP_CMD!" -v
    ) else (
        echo [ERRO] PHP nao encontrado!
        echo Por favor, instale XAMPP ou WAMP
        pause
        exit /b 1
    )
)
echo.

REM Verificar dependências Node
echo [3/3] Verificando dependencias Node.js...
if not exist "node_modules" (
    echo [AVISO] Dependencias nao instaladas. Instalando...
    call npm install
    echo.
)
echo.

echo ====================================
echo Iniciando Servidores
echo ====================================
echo.

REM Iniciar Backend PHP com 0.0.0.0 para aceitar conexoes da rede
echo [Backend] Iniciando na porta 3000...
echo           (Aceitando conexoes da rede local)
start "Locadora - Backend PHP" cmd /k "cd /d "%~dp0" && "!PHP_CMD!" -S 0.0.0.0:3000"
timeout /t 3 /nobreak >nul

REM Iniciar Frontend React
echo [Frontend] Iniciando na porta 8080...
start "Locadora - Frontend React" cmd /k "cd /d "%~dp0" && npm run dev"
timeout /t 2 /nobreak >nul

echo.
echo ====================================
echo Servidores Iniciados!
echo ====================================
echo.
echo 💻 ACESSO NO PC:
echo    Frontend:  http://localhost:8080
echo    API:       http://localhost:3000/api/vehicles.php
echo.

REM Detectar IP da rede para acesso no celular
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4"') do (
    set "ip=%%a"
    set "ip=!ip: =!"
    if "!ip:~0,3!"=="192" (
        echo 📱 ACESSO NO CELULAR (mesma WiFi):
        echo    Frontend:  http://!ip!:8080
        echo    API:       http://!ip!:3000/api/vehicles.php
        echo.
        goto :continue
    )
)
:continue

echo ====================================
echo.
echo ℹ️  IMPORTANTE:
echo    - Celular deve estar na mesma WiFi que o PC
echo    - Servidor aceita conexoes da rede local
echo    - Veiculos aparecem automaticamente
echo.
echo As janelas dos servidores foram abertas em abas separadas
echo Feche as abas para parar os servidores
echo.
pause
