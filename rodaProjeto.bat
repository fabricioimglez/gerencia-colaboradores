@echo off
echo Iniciando o ambiente de desenvolvimento...

:: Abre o terminal para o frontend
start cmd /k "ng serve"

:: Abre outro terminal para o backend
start cmd /k "cd back-colaboradores && node server.js"

:: Espera alguns segundos e abre o navegador
timeout /t 3 /nobreak >nul
start http://localhost:4200/