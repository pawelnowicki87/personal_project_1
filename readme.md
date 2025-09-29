# Hospital Appointment Scheduler

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Run Instructions](#setup--run-instructions)
- [Database Schema (ERD)](#database-schema-erd)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
    - [POST /register](#post-register)
    - [POST /login](#post-login)
    - [POST /logout](#post-logout)
  - [Patients](#patients)
    - [GET /patients](#get-patients)
    - [GET /patients/:id](#get-patientsid)
    - [POST /patients](#post-patients)
    - [PUT /patients/:id](#put-patientsid)
    - [DELETE /patients/:id](#delete-patientsid)
  - [Doctors](#doctors)
    - [GET /doctors](#get-doctors)
    - [GET /doctors/:id](#get-doctorsid)
    - [POST /doctors](#post-doctors)
    - [PUT /doctors/:id](#put-doctorsid)
    - [DELETE /doctors/:id](#delete-doctorsid)
  - [Appointments](#appointments)
    - [GET /appointments](#get-appointments)
    - [POST /appointments](#post-appointments)
    - [DELETE /appointments/:id](#delete-appointmentsid)
- [Running Tests](#running-tests)
- [Docker Commands](#docker-commands)
- [Access Database from Docker](#access-database-from-docker)

## Project Overview

This is a **Node.js backend application** for managing hospital appointments, patients, doctors, and scheduling.  
It was built as part of the **Node.js-2025-01 Personal Project** and implements:

- User authentication (built from scratch)
- PostgreSQL database with complete schema and relationships
- Docker containerization for one-command startup
- Redis integration for session management
- REST API for user registration, login, logout, and protected routes
- Unit tests with >50% coverage

---

## Tech Stack

- **Node.js** – Backend runtime
- **Express.js** – Web framework
- **PostgreSQL** – Main relational database
- **Redis** – Session and cache storage
- **Docker & Docker Compose** – Container orchestration
- **bcrypt** – Password hashing
- **pg** – PostgreSQL client
- **UUID** – Session token generation
- **Jest + Supertest** – Unit testing

---

## Features

- **Custom Authentication** – Register, login, logout with hashed passwords
- **Session Tokens (JWT-like)** – Generated manually and stored in Redis
- **Hospital Domain** – Patients, doctors, appointments, availability
- **Scheduling Logic** – Prevents overlapping appointments
- **One-Command Startup** – Everything runs with `docker compose up --build`
- **Unit Tests** – Coverage > 80%

---

## Project Structure
```
personal_project_1/
├─ src/
│  ├─ config/
│  │  ├─ db.js
│  │  ├─ redis.js
│  │  └─ wait-for-db.js
│  ├─ middleware/
│  │  └─ auth.js
│  ├─ routes/
│  │  ├─ auth.js
│  │  └─ homepage.js
│  ├─ services/
│  │  ├─ sessionService.js
│  │  └─ utils/
│  │     └─ token.js
│  └─ app.js
│
├─ db/
│  ├─ schema.sql
│  ├─ init.js
│  └─ run_migrations.js
│
├─ tests/
│  ├─ auth.test.js
│  └─ homepage.test.js
│
├─ docs/
│  └─ erd-diagram.png
│
├─ coverage/
│
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
├─ package-lock.json
├─ .env
└─ README.md
```

## Setup & Run Instructions

### 1. Clone the repository

```
git clone https://github.com/pawelnowicki87/personal_project_1.git
cd personal_project_1
```
2. Create a .env file
Create a .env file in the root directory with the following variables:
```
env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=secret
POSTGRES_DB=hospital_db
POSTGRES_HOST=db
POSTGRES_PORT=5432

REDIS_HOST=redis
REDIS_PORT=6379
```

3. Start the project with Docker
```
docker compose up --build
```

This will start:
PostgreSQL database
Redis server
Node.js Backend

Backend will be available at:
http://localhost:3000

## First Run on a New Machine

If this is the first time you or someone else is running the project:
Clone the repository and create the .env file as above.
Start the containers with:
```
docker compose up --build
```
The backend will automatically:
Wait for the PostgreSQL database to be ready
Run the schema and migrations
Seed the database with demo data
Start the API server

Run tests (optional):
```
docker compose run --rm backend-tests
```

## 🗄️ Database Schema (ERD)
Below is the entity-relationship diagram of the database:

![ERD Diagram](./docs/erd-diagram.png)

Database Tables Overview
Table	Description
| Table Name             | Description                                                   |
|------------------------|---------------------------------------------------------------|
| **users**             | Stores registered users with email and hashed password        |
| **patient**           | Contains patient details such as name, email, and phone number|
| **specialization**    | List of available medical specializations                     |
| **doctor**           | Stores doctors and their associated specialization             |
| **doctor_availability** | Weekly schedule of each doctor (days, hours, availability)   |
| **appointment**      | Appointment records linking patient, doctor, date, and time    |

## API Endpoints
### Authentication
POST /register
POST /login
POST /logout

| Method | Endpoint       | Description                         | Success Code | Error Code |
| ------ | -------------- | ----------------------------------- | ------------ | ---------- |
| POST   | /register | Registers a new user                | 201          | 400        |
| POST   | /login    | Logs in and returns a session token | 200          | 401        |
| POST   | /logout   | Logs out and invalidates the token  | 200          | 401        |

POST /register

Request Body:
```
{
  "email": "user@example.com",
  "password": "mypassword"
}
```

Response:
```
{
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```
POST /login

Request Body:
```
{
  "email": "user@example.com",
  "password": "mypassword"
}
```

Response:
```
{
  "token": "a1b2c3d4-5678-90ab-cdef-1234567890"
}
```
### Patients (/patients)
GET /patients
GET /patients/:id
POST /patients
PUT /patients/:id
DELETE /patients/:id

| Method | Endpoint      | Description                      | Success Code | Error Code |
| ------ | ------------- | -------------------------------- | ------------ | ---------- |
| GET    | /patients     | Returns all patients             | 200          | 404        |
| GET    | /patients/:id | Returns a specific patient by ID | 200          | 404        |
| POST   | /patients     | Creates a new patient            | 201          | 400        |
| PUT    | /patients/:id | Updates an existing patient      | 200          | 400        |
| DELETE | /patients/:id | Deletes a patient                | 200          | 404        |

POST /patients

Request Body:
```
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "123456789"
}
```

Response:
```
{
  "patient_id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "123456789"
}
```

### Doctors (/doctors)
GET /doctors
GET /doctors/:id
POST /doctors
PUT /doctors/:id
DELETE /doctors/:id

| Method | Endpoint     | Description                     | Success Code | Error Code |
| ------ | ------------ | ------------------------------- | ------------ | ---------- |
| GET    | /doctors     | Returns all doctors             | 200          | 404        |
| GET    | /doctors/:id | Returns a specific doctor by ID | 200          | 404        |
| POST   | /doctors     | Creates a new doctor            | 201          | 400        |
| PUT    | /doctors/:id | Updates an existing doctor      | 200          | 400        |
| DELETE | /doctors/:id | Deletes a doctor                | 200          | 404        |


### Doctor Availability (/availability)
GET /availability/:doctorId
POST /availability/:doctorId
PUT /availability/:doctorId
DELETE /availability/:doctorId

| Method | Endpoint                | Description                       | Success Code | Error Code |
| ------ | ----------------------- | --------------------------------- | ------------ | ---------- |
| GET    | /availability/:doctorId | Returns availability of a doctor  | 200          | 404        |
| POST   | /availability/:doctorId | Creates availability for a doctor | 201          | 400        |
| PUT    | /availability/:doctorId | Updates a doctor's availability   | 200          | 400        |
| DELETE | /availability/:doctorId | Deletes a doctor's availability   | 200          | 404        |


### Appointments  (/appointments)
GET /appointments
GET /appointments/:id
POST /appointments
PUT /appointments/:id
DELETE /appointments/:id

| Method | Endpoint          | Description                           | Success Code | Error Code |
| ------ | ----------------- | ------------------------------------- | ------------ | ---------- |
| GET    | /appointments     | Returns all appointments              | 200          | 404        |
| GET    | /appointments/:id | Returns appointment details by ID     | 200          | 404        |
| POST   | /appointments     | Creates a new appointment             | 201          | 400        |
| PUT    | /appointments/:id | Updates an existing appointment (TBD) | 200          | 400        |
| DELETE | /appointments/:id | Cancels (deletes) an appointment      | 200          | 404        |

POST /appointments

Request Body:
```
{
  "patient_id": 1,
  "doctor_id": 2,
  "startTime": "2025-12-20T10:00:00Z",
  "endTime": "2025-12-20T11:00:00Z"
}
```

Response:
```
{
  "appointment_id": 5,
  "status": "scheduled",
  "patient_id": 1,
  "doctor_id": 2,
  "start_time": "10:00:00",
  "end_time": "11:00:00"
}
```
### Homepage (/)
GET /
| Method | Endpoint | Description               | Success Code | Error Code |
| ------ | -------- | ------------------------- | ------------ | ---------- |
| GET    | /        | Returns a welcome message | 200          | 401        |

GET /

Response:
```
{
  "message": "Hello user 1, welcome to homepage!"
}
```

## Authentication Flow
Register – User is created with a hashed password

Login – Valid credentials return a session token

Access protected routes – Send Authorization: Bearer <token> header

Logout – Session is deleted from Redis

🧪 Running Tests
The project includes unit tests with Jest and Supertest.

▶️ Run tests inside Docker:
bash
docker exec -it hospital_backend npm test
✅ This will:

Run all tests

Generate a coverage report (/coverage/index.html)

Ensure database and Redis connections are active

Current coverage: ~81.25%

## 🐳 Docker Commands
Start project:
```
docker compose up --build
```

Stop project:
```
docker compose down --volumes
```

Inspect database tables:
```
docker exec -it hospital_db psql -U postgres -d hospital_db -c "\dt"
```

Query data (example):
```
docker exec -it hospital_db psql -U postgres -d hospital_db -c "SELECT * FROM users;"
```

## 📜 Access Database from Docker
You can connect to the PostgreSQL database running inside Docker directly:
```
docker exec -it hospital_db psql -U postgres -d hospital_db
```

Then run SQL commands like:
```
SELECT * FROM users;
```
Author: Paweł Nowicki – Node.js Backend Developer (Solvd Laba 2025)