# Todo App

 A simple Todo application with user registration, authentication, and task management.  
Backend is built with Node.js + Express, PostgreSQL database, and Prisma ORM. Everything runs via Docker Compose.
 You can use added REST Client(```todo-app.rest```) for API requests.

---

## Features

- User registration and login
- CRUD operations for todos
- JWT authentication
- Prisma ORM for database access
- Dockerized for easy setup

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/sula7ne/todo-app-backend.git
cd todo-app-backend
```

### 2. Create environment variables

```bash
cp .env.example .env
```
Use your own environment variable for ```JWT_SECRET```

### 3. Start the application

```bash
docker compose up
```
This command will:
-	Build the Node.js application image
-	Start a PostgreSQL container
-	Run Prisma migrations automatically
-	Start the server on port 3000

### 4. Stop the application

```bash
docker compose down
```
This stops containers but keeps the database data

---

## API Endpoints
Authentication:
- POST /auth/register — register a new user
- POST /auth/login — login and receive JWT

Todos (JWT required):
- GET /todos — get all todos
- POST /todos — create a new todo
- PUT /todos/:id — update a todo
- DELETE /todos/:id — delete a todo
