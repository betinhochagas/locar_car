@echo off
setlocal enabledelayedexpansion

echo ====================================
echo RV Car Solutions - Inicializacao
echo Versao Completa com Verificacao
echo ====================================
echo.

REM Verificar se MySQL esta rodando
echo [1/4] Verificando MySQL...
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [OK] MySQL esta rodando
) else (
    echo [AVISO] MySQL nao esta rodando!
    echo.
    echo ╔════════════════════════════════════════════════════════════════╗
    echo ║  IMPORTANTE: MySQL nao foi detectado!                          ║
    echo ║                                                                ║
    echo ║  Por favor:                                                    ║
    echo ║  1. Abra o XAMPP Control Panel                                 ║
    echo ║  2. Clique em "Start" no MySQL                                 ║
    echo ║  3. Aguarde ficar verde (Running)                              ║
    echo ║  4. Execute este script novamente                              ║
    echo ╚════════════════════════════════════════════════════════════════╝
    echo.
    echo Deseja tentar iniciar o MySQL automaticamente? (S/N)
    set /p resposta="> "
    
    if /i "!resposta!"=="S" (
        echo.
        echo Tentando iniciar MySQL...
        if exist "C:\xampp\mysql_start.bat" (
            call "C:\xampp\mysql_start.bat"
            timeout /t 5 /nobreak >nul
        ) else if exist "C:\xampp\mysql\bin\mysqld.exe" (
            echo Execute manualmente no XAMPP Control Panel
        ) else (
            echo XAMPP nao encontrado no caminho padrao
        )
    ) else (
        echo.
        echo Inicie o MySQL manualmente e execute este script novamente.
        pause
        exit /b 1
    )
)
echo.

REM Verificar Node.js
echo [2/4] Verificando Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Instale em: https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION%
echo.

REM Verificar PHP
echo [3/4] Verificando PHP...
set "PHP_CMD="

where php >nul 2>&1
if %errorlevel% == 0 (
    set "PHP_CMD=php"
    for /f "tokens=*" %%i in ('php -v ^| findstr /C:"PHP"') do set PHP_VERSION=%%i
    echo [OK] PHP encontrado no PATH
) else (
    if exist "C:\xampp\php\php.exe" (
        set "PHP_CMD=C:\xampp\php\php.exe"
        for /f "tokens=*" %%i in ('"C:\xampp\php\php.exe" -v ^| findstr /C:"PHP"') do set PHP_VERSION=%%i
        echo [OK] PHP encontrado no XAMPP
    ) else (
        echo [ERRO] PHP nao encontrado!
        pause
        exit /b 1
    )
)
echo %PHP_VERSION%
echo.

REM Verificar dependências
echo [4/4] Verificando dependencias...
if not exist "node_modules" (
    echo [AVISO] Instalando dependencias...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERRO] Falha ao instalar dependencias
        pause
        exit /b 1
    )
)
echo [OK] Dependencias instaladas
echo.

echo ====================================
echo Iniciando Servidores
echo ====================================
echo.

REM Iniciar Backend PHP com 0.0.0.0 para aceitar rede
echo [Backend] Iniciando PHP na porta 3000...
echo           Aguarde...
start "RV Car - Backend PHP" cmd /k "cd /d "%~dp0" && echo Backend iniciado na porta 3000 && "%PHP_CMD%" -S 0.0.0.0:3000"
timeout /t 4 /nobreak >nul

REM Iniciar Frontend React
echo [Frontend] Iniciando React...
echo            Aguarde...
start "RV Car - Frontend React" cmd /k "cd /d "%~dp0" && npm run dev"
timeout /t 3 /nobreak >nul

echo.
echo ====================================
echo ✅ Servidores Iniciados com Sucesso!
echo ====================================
echo.
echo 💻 ACESSO NO PC:
echo    Frontend:  http://localhost:8080
echo    API:       http://localhost:3000/api/vehicles.php
echo.

REM Detectar IP da rede
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4"') do (
    set "ip=%%a"
    set "ip=!ip: =!"
    if "!ip:~0,3!"=="192" (
        echo 📱 ACESSO NO CELULAR (mesma WiFi):
        echo    Frontend:  http://!ip!:8080
        echo    API:       http://!ip!:3000/api/vehicles.php
        echo.
        goto :ip_found
    )
)
:ip_found

echo ====================================
echo.
echo ℹ️  INFORMACOES:
echo.
echo ✅ MySQL:     Rodando
echo ✅ PHP:       Porta 3000 (aceita rede local)
echo ✅ Frontend:  Porta 8080
echo.
echo 📋 PROXIMOS PASSOS:
echo    1. Aguarde 10-15 segundos para tudo carregar
echo    2. Acesse: http://localhost:8080
echo    3. Os veiculos devem aparecer
echo.
echo 💡 DICA:
echo    - As janelas dos servidores estao abertas
echo    - Feche-as para parar os servidores
echo    - Nao feche o XAMPP (MySQL precisa continuar)
echo.
echo ====================================
echo.
pause
