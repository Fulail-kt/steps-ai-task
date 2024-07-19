
# Doctor Account Management System

This project implements a system for managing doctor accounts, uploading PDF files, and linking doctor profiles with patient profiles.

## Features

- Doctor Registration and Login
- User/patient Registration and Login
- PDF Upload by Doctors
- Linking Doctors with Patients
- Profile page
- Search 

## Technology Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT

## Prerequisites

- Node.js
- MySQL

## Installation


2. Clone the repository
   ```bash
   git clone https://github.com/Fulail-kt/steps-ai-task.git

   cd steps-ai-task
   ```
2. Install dependencies
   ```bash
   yarn add
   ```

3. Set up the database
   - Create a MySQL database.
   - Update the `.env` file with your database credentials and JWT secret.

4. Run Prisma migrations to set up the database schema
   ```bash
   npx prisma migrate dev --name init
   ```

## Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Doctor {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  specialty String
  pdfs      PDF[]
  role      String   @default("doctor")
  patients  Patient[]
}

model Patient {
  id       Int      @id @default(autoincrement())
  name     String
  email    String   @unique
  password String
  role     String   @default("user")
  doctors  Doctor[]
}

model PDF {
  id         Int      @id @default(autoincrement())
  doctorId   Int
  filePath   String
  uploadDate DateTime @default(now())
  doctor     Doctor   @relation(fields: [doctorId], references: [id])
}
```

## Running the Application

1. Start the backend server
   ```bash
   yarn dev
   ```

2. Start the frontend server
   ```bash
   yarn dev
   ```

## API Endpoints

### Auth Routes
- `POST /register`: Register a new doctor
- `POST /login`: Login a doctor

### Doctor Routes
- `GET /get-doctors`: Retrieve all doctors
- `GET /get-doctor/:id`: Retrieve a specific doctor by ID
- `POST /link-patient`: Link a patient to a doctor (requires JWT token)
- `POST /upload/:id`: Upload a PDF for a doctor (requires JWT token)

### Patient Routes
- `GET /get-patient/:id`: Retrieve a specific patient by ID

## Folder Structure

- `controllers`: Contains the controller logic for handling requests.
- `middleware`: Contains the authentication middleware.
- `routes`: Defines the routes for the application.
- `prisma`: Contains the Prisma schema and migration files.
- `pages`: Next.js pages for the frontend.

## Environment Variables

Create a `.env` file in the root directory of your project with the following content:

```env
Backend 

  DATABASE_URL="mysql connect url"
  JWT_SECRET="your secret"
  PORT="4000"

Frontend

  NEXT_PUBLIC_BASE_URL="http://localhost:4000/api/v1/"
```

## API Documentation

[Doctor-management](https://docs.google.com/document/d/1Vck4mxbkoCj_wBruOcy0JwEz-494YugIBLOjMtMyCEE/edit?usp=sharing)

## License

This project is licensed under the MIT License.
```