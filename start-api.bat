@echo off
echo ====================================
echo Iniciando Servidor PHP Backend
echo ====================================
echo.
echo API estara disponivel em: http://localhost:3000
echo.
cd /d "%~dp0"
php -S localhost:3000
