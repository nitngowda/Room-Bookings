# User Management & Room Booking API

## 1. Setup Instructions

### Prerequisites
- **Node.js** (v16+ recommended)
- **PostgreSQL** (Ensure it is running)


### Installation Steps
1. **Clone the Repository:**
   ```sh
   git clone <repository-url>
   cd user-room-booking-api
   ```
2. **Install Dependencies:**
   ```sh
   npm install
   ```
3. **Configure Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add the following values:
     ```env
     DATABASE_URL=postgres://postgres:12345@localhost:5432/user_room_booking
     JWT_SECRET=2025
     ```
4. **Run Database Migrations:**
   ```sh
   npm run migrate
   ```
5. **Start the Application:**
   ```sh
   npm run start:dev
   ```
6. **Run Tests:**
   ```sh
   npm test
   ```

## 2. API Documentation

### Authentication
- **POST /auth/login** – Authenticate a user and retrieve JWT.
- **POST /auth/register** – Register a new user.

### Users
- **GET /users** – Retrieve all users (Admin only).
- **GET /users/:id** – Get user by ID.
- **PATCH /users/:id** – Update user information.
- **DELETE /users/:id** – Delete a user (Admin only).

### Rooms
- **POST /rooms** – Create a new room (Admin only).
- **GET /rooms** – Retrieve all rooms.
- **GET /rooms/:id** – Retrieve a specific room.
- **PATCH /rooms/:id** – Update room details.
- **DELETE /rooms/:id** – Delete a room (Admin only).

### Bookings
- **POST /bookings** – Create a new booking.
- **GET /bookings** – Retrieve all bookings (Admin only).
- **GET /bookings/:id** – Retrieve a specific booking.
- **DELETE /bookings/:id** – Cancel a booking.

## 3. Database Schema Design

### Tables
#### Users Table
| Column   | Type        | Constraints              |
|----------|------------|--------------------------|
| id       | UUID       | Primary Key              |
| email    | String     | Unique, Required         |
| password | String     | Hashed                   |
| role     | Enum       | ('Admin', 'User')        |

#### Rooms Table
| Column  | Type    | Constraints      |
|---------|--------|-----------------|
| id      | UUID   | Primary Key      |
| name    | String | Unique, Required |
| capacity | Int   | Required         |

#### Bookings Table
| Column     | Type    | Constraints              |
|------------|--------|--------------------------|
| id         | UUID   | Primary Key              |
| roomId     | UUID   | Foreign Key (Rooms)      |
| userId     | UUID   | Foreign Key (Users)      |
| startTime  | Date   | Required                 |
| endTime    | Date   | Required                 |

## 4. Architecture Overview

- **NestJS (Backend API)** - Provides structured, modular backend.
- **PostgreSQL + Sequelize ORM** - Manages database interactions.
- **JWT Authentication** - Secure authentication & role-based access.


## 5. Unit & Integration Tests

- **Unit Tests:** Cover individual services and controllers.
- **Integration Tests:** Validate API endpoints with real database interactions.
- **Run Tests:**
  ```sh
  npm test
  ```

## 6. Postman/Insomnia Collection

- A **Postman collection** with pre-configured API requests is provided.
- Import `postman_collection.json` into Postman/Insomnia to test APIs easily.

## 7. Deployment

- Use **Docker Compose** for easy containerization.
- Deploy on **Heroku, AWS, or DigitalOcean** using CI/CD pipelines.

---
**Project Completed & Ready for Deployment 🚀**

