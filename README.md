<br />

<div align="center">
  <h1>Backend Project - Coderhouse</h1>
   <br/>
  <div>
    <img height="30px" alt="Express" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" />
    <img height="30px" alt="Socket.io" src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101" />
      <img height="30px" alt="Mongo" src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" />
  </div>
    <br/>
</div>

## 🔎 About

Backend project for Coderhouse.

## 🚀 Ejecution

Steps to install and run the project:

1. Clone the project
   ```sh
   git clone https://github.com/diaslucia/proyecto-backend
   ```
2. Open your current directory project
   ```sh
   cd proyecto-backend
   ```
3. Install the libraries
   ```sh
   npm install
   ```
4. Ejecute the app

   ```sh
   npm run dev
   ```

## 📂 Structure

The file structure is:

- middleware: to store middleware used in routes to verify requests.
- routes: to store all different routes for endpoints.
- views: to store handlebars.
- public: to store styles and js used to manage handlebars.
- dao/managers: to store mongoose data managers.
- dao/models: to store mongoose data models.
