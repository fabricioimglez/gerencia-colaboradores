# GerenciaColaboradores

Projeto gerado utilizando [Angular CLI](https://github.com/angular/angular-cli) version 19.2.8.

# 📇 Gerência de Colaboradores

Uma aplicação completa para **gerenciar contatos de colaboradores**, feita com Angular no frontend e Node.js com NeDB no backend.

---

## ✨ Funcionalidades

- 🔐 Sistema de **login**
- 📋 **Listagem** de colaboradores **CRUD completo**
- 🗺️ localidade dos colaboradores **CRUD completo**
- 📞 Link direto para **WhatsApp Web**
- ✉️ Link direto para **enviar e-mail**
- 🌐 Backend Node.js com banco de dados local (NeDB)

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- [Angular 19](https://angular.io/)
- [@angular/material](https://material.angular.io/)
- [@angular/animations](https://angular.io/guide/animations)
- [@angular/cdk](https://material.angular.io/cdk)
- [Bootstrap 5](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [ngx-toastr](https://www.npmjs.com/package/ngx-toastr)
- [TypeScript 5.7](https://www.typescriptlang.org/)

### Backend
- [Node.js 22.14](https://nodejs.org/)
- [Express 5](https://expressjs.com/)
- [NeDB](https://github.com/louischatriot/nedb)
- [CORS](https://www.npmjs.com/package/cors)

---

## 🛠️ Tecnologias Utilizadas
gerencia-colaboradores/
├── src/                     # Frontend Angular
│   ├── app/
│       └──  pages/
│            └── home
│            └── lista
│            └── local
│            └── login
├── back-colaboradores/     # Backend Node.js + NeDB
│   ├── server.js
│   ├── routes
│       └── colaboradores.js
│       └── local.js
│       └── login.js
│   ├── dbColaboradores.js
│   ├── dbLocal.js
│   ├── dbUsuarios.js
│   ├── colaboradores.db
│   ├── locais.db
│   ├── usuarios.db
├── README.md

---

## 🧑‍💻 Como executar o projeto

### 🔧 1. Clone o repositório, em seguida

Opção 1: Execute o arquivo iniciarProjetoPrimeiraVez.bat caso seja a primeira vez que está iniciando o projeto, ou o arquivo rodaProjeto.bat caso já tenha executado o iniciarProjetoPrimeiraVez.bat anteriormente.

Opção 2: Execução manual: Dentro da pasta raiz do projeto, abra um console e execute o comando npm install, seguido de ng serve. Em seguida, em um segundo console, acesse a pasta back-colaboradores (que está dentro do projeto), execute o comando npm install e depois node server.js.

## 🚀 Acesso

Acesse em: [http://localhost:4200](http://localhost:4200)

> 🔐 **Login de demonstração:**  
> Usuário: `UserTeste`  
> Senha: `senha123`
