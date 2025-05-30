@echo off
echo Iniciando o ambiente de desenvolvimento...

:: Instala dependências do frontend
echo Instalando dependências do frontend...
call npm install || goto :error

:: Instala dependências do backend
echo Instalando dependências do backend...
cd back-colaboradores
call npm install || goto :error
cd ..

:: Inicia os servidores em janelas separadas
echo Iniciando o frontend...
start cmd /k "ng serve"

echo Iniciando o backend...
start cmd /k "cd back-colaboradores && node server.js"

:: Aguarda alguns segundos e abre o navegador
timeout /t 5 /nobreak >nul
start http://localhost:4200/

goto :eof

:error
echo Algo deu errado durante a instalação. Verifique as mensagens acima.
pause