@echo off
echo ====================================
echo Iniciando Servidor PHP Backend
echo ====================================
echo.
echo API estara disponivel em:
echo   - Local: http://localhost:3000
echo   - Rede:  http://%COMPUTERNAME%:3000
echo.
cd /d "%~dp0"

REM Verificar se o PHP do XAMPP existe
if exist "C:\xampp\php\php.exe" (
    echo Usando PHP do XAMPP...
    "C:\xampp\php\php.exe" -S 0.0.0.0:3000 -t . router.php
) else (
    echo Usando PHP do sistema...
    php -S 0.0.0.0:3000 -t . router.php
)

pause
