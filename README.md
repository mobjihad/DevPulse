# DevPulse

**Live URL:** [https://devpulse.mobjihad.com/](https://devpulse.mobjihad.com/)

DevPulse is a robust backend API service designed for issue tracking and management, featuring role-based access control for a secure workflow.

## Features

- **User Authentication:** Secure signup and login using JSON Web Tokens (JWT) and encrypted passwords (bcrypt).
- **Role-Based Access Control:** Differentiates between 'maintainer' and 'contributor' roles to restrict issue creation, modification, and deletion.
- **Issue Management:** Full CRUD (Create, Read, Update, Delete) operations for tracking software issues.
- **Global Error Handling:** Consistent and structured error responses.
- **Data Validation:** Input payload validation before modifying the database.

## Tech Stack

- **Framework:** Node.js with Express
- **Language:** TypeScript
- **Database:** PostgreSQL (pg)
- **Security:** jsonwebtoken, bcrypt, cors
- **Development Tools:** tsx, dotenv

## Database Schema Summary

The database uses PostgreSQL and consists of two primary tables:

### `users`
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR)
- `email` (VARCHAR, UNIQUE)
- `password` (VARCHAR, Encrypted)
- `role` (VARCHAR, default: 'contributor')
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### `issues`
- `id` (SERIAL PRIMARY KEY)
- `title` (VARCHAR)
- `description` (TEXT)
- `type` (VARCHAR)
- `status` (VARCHAR, default: 'open')
- `reporter_id` (INT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Setup Steps

1. **Clone the repository** and navigate to the project directory.
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   Create a `.env` file in the root directory based on the following template:
   ```env
   PORT=3000
   DATABASE_URL=postgres://your_user:your_password@localhost:5432/your_database
   JWT_SECRET=your_super_secret_key
   ```
4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:3000`.

## API Endpoint List

### General
- `GET /` - Health check. Returns API status.

### Authentication (`/api/auth`)
- `POST /api/auth/signup` - Register a new user.
- `POST /api/auth/login` - Authenticate user and return a JWT.

### Issues (`/api/issues`)
- `GET /api/issues` - Retrieve a list of all issues.
- `GET /api/issues/:id` - Retrieve a specific issue by its ID.
- `POST /api/issues` - Create a new issue *(Requires `maintainer` or `contributor` role)*.
- `PATCH /api/issues/:id` - Update an existing issue *(Requires `maintainer` or `contributor` role)*.
- `DELETE /api/issues/:id` - Delete an issue *(Requires `maintainer` role)*.
