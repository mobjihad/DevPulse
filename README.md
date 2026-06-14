# DevPulse

DevPulse is a backend API service designed for issue tracking and management. It is built with Node.js, Express, and TypeScript, utilizing PostgreSQL as its primary database. The system is built around a secure, role-based architecture to manage access to issues effectively.

## How the System Works

### 1. Authentication & Authorization
The system uses JSON Web Tokens (JWT) for secure authentication. Passwords are encrypted using `bcrypt` before being stored in the database. 
Users interact with the system under specific roles which dictate their permissions:
- **General Users (Unauthenticated)**: Can view issues but cannot modify or create them.
- **Contributors**: Authenticated users who have the ability to create new issues and update the issues they have permission to modify.
- **Maintainers**: Elevated users who have full control over the issue lifecycle, including the ability to delete issues.

### 2. Issue Management
The core functionality revolves around the `Issue` entity. The API provides a comprehensive set of operations (CRUD) to interact with issues:
- **Creation & Modification**: Contributors and maintainers can submit new issues and patch existing ones. The system validates the incoming data before applying updates.
- **Retrieval**: Issues can be fetched individually by their unique ID or as a comprehensive list. 
- **Deletion**: Strict controls ensure that only maintainers can permanently remove an issue from the system.

### 3. Middleware & Validation
The application employs several middleware layers to ensure security and data integrity:
- **Global Error Handling**: Catches and formats errors consistently across the application.
- **Role-Based Guards**: Specific middleware functions (e.g., `authorisedUser`, `authorisedMaintainer`) intercept requests to restricted routes to verify the user's role and JWT validity.
- **Data Validation**: Ensures that patches and creation payloads contain the correct data types and required fields before reaching the database controllers.

## API Endpoints

### General
- `GET /` - Health check. Returns API status and basic endpoints info.

### Authentication (`/api/auth`)
- `POST /api/auth/signup` - Register a new user.
- `POST /api/auth/login` - Authenticate a user and receive a JWT.

### Issues (`/api/issues`)
- `GET /api/issues` - Retrieve a list of all issues.
- `GET /api/issues/:id` - Retrieve a specific issue by its ID.
- `POST /api/issues` - Create a new issue. *(Requires authentication: `maintainer` or `contributor` role)*
- `PATCH /api/issues/:id` - Update an existing issue. *(Requires authentication: `maintainer` or `contributor` role)*
- `DELETE /api/issues/:id` - Delete an issue. *(Requires authentication: `maintainer` role)*

## Tech Stack

- **Framework**: Express
- **Language**: TypeScript
- **Database**: PostgreSQL (pg)
- **Security**: jsonwebtoken, bcrypt, cors
