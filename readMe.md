# Entrega Final Backend III

## Descripción
Proyecto final del curso Backend III de Coderhouse.  
Es una API REST para gestión de usuarios, con autenticación, documentación Swagger y conexión a MongoDB Atlas.

## Tecnologías
- Node.js
- Express
- MongoDB + Mongoose
- Swagger
- Docker
- Jest / Supertest

## Instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/MCarbonetti/Entrega-Final-Backend-III.git

   
## Instalar dependencias
npm install

## Crear un archivo .env en la raíz con:
MONGO_URI=tu_cadena_de_conexion
PORT=3000

## Ejecución local
npm start

## Ejecución en modo desarrollo
npm run dev

## Uso con Docker
## Construir imagen:
docker build -t entrega-final .

## Ejecutar contenedor:
docker run -p 3000:3000 --env-file .env entrega-final

## Endpoints principales
GET /users → Lista de usuarios

POST /users → Crear usuario

GET /users/:id → Obtener usuario por ID

PUT /users/:id → Actualizar usuario

DELETE /users/:id → Eliminar usuario

## Documentación Swagger
Disponible en:

http://localhost:3000/api-docs

## Tests
Ejecutar:
npm test

## Autor
Matías Carbonetti


