@echo off
echo ====================================
echo Verificando instalacao do PHP
echo ====================================
echo.

REM Tentar encontrar PHP no PATH
where php >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] PHP encontrado no PATH
    php -v
    echo.
    goto :start_server
)

REM Verificar XAMPP
if exist "C:\xampp\php\php.exe" (
    echo [OK] PHP encontrado no XAMPP
    set "PHP_PATH=C:\xampp\php\php.exe"
    "C:\xampp\php\php.exe" -v
    echo.
    goto :start_server
)

REM Verificar WAMP
if exist "C:\wamp64\bin\php\php8.2.0\php.exe" (
    echo [OK] PHP encontrado no WAMP
    set "PHP_PATH=C:\wamp64\bin\php\php8.2.0\php.exe"
    "%PHP_PATH%" -v
    echo.
    goto :start_server
)

if exist "C:\wamp\bin\php\php8.2.0\php.exe" (
    echo [OK] PHP encontrado no WAMP
    set "PHP_PATH=C:\wamp\bin\php\php8.2.0\php.exe"
    "%PHP_PATH%" -v
    echo.
    goto :start_server
)

REM PHP não encontrado
echo [ERRO] PHP nao foi encontrado!
echo.
echo Por favor, instale uma das opcoes:
echo 1. XAMPP: https://www.apachefriends.org/
echo 2. WAMP: https://www.wampserver.com/
echo 3. PHP standalone: https://windows.php.net/download/
echo.
echo Ou adicione o PHP ao PATH do sistema.
echo.
pause
exit /b 1

:start_server
echo ====================================
echo Iniciando Servidor PHP Backend
echo ====================================
echo.
echo API estara disponivel em:
echo   - Local: http://localhost:3000
echo   - Rede:  Use o IP da sua maquina + :3000
echo.
echo Instalador DB: http://localhost:3000/api/install.php
echo Teste API: http://localhost:3000/api/vehicles.php
echo.
echo Pressione Ctrl+C para parar o servidor
echo ====================================
echo.

cd /d "%~dp0"

if defined PHP_PATH (
    "%PHP_PATH%" -S 0.0.0.0:3000
) else (
    php -S 0.0.0.0:3000
)
