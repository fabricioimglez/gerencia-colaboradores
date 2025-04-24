#!/bin/bash

# Abre primeiro terminal para o frontend
gnome-terminal -- bash -c "
echo 'Instalando dependências do frontend...';
npm install;
echo 'Iniciando Angular...';
ng serve;
exec bash
"

# Abre segundo terminal para o backend
gnome-terminal -- bash -c "
cd back-colaboradores;
echo 'Instalando dependências do backend...';
npm install;
echo 'Iniciando servidor Node.js...';
node server.js;
exec bash
"