# Todo Backend - Calldesk Assignment

A RESTful API backend for a todo list application built with Node.js, Express, and MongoDB. This project includes user authentication, CRUD operations for todos, and proper security measures.

## 🚀 Features

- **User Authentication**: JWT-based authentication system
- **User Management**: User registration and login
- **Todo Operations**: Create, read, update, and delete todos
- **Security**: Helmet for security headers, CORS configuration, password hashing
- **Validation**: Input validation using express-validator
- **Database**: MongoDB with Mongoose ODM
- **Environment Configuration**: Support for development and production environments

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose 8.16.4
- **Authentication**: JSON Web Tokens (jsonwebtoken 9.0.2)
- **Password Hashing**: bcrypt 6.0.0
- **Validation**: express-validator 7.2.1
- **Security**: helmet 8.1.0, cors 2.8.5
- **Development**: nodemon 3.1.10

## 📁 Project Structure

```
todo_backend_calldesk/
├── config/
│   └── mongoDB.js          # Database connection configuration
├── controllers/
│   ├── auth.js             # Authentication controllers
│   └── todo.js             # Todo CRUD controllers
├── helpers/
│   ├── bcrypt.js           # Password hashing utilities
│   ├── jwt.js              # JWT token utilities
│   └── validation.js       # Validation helper
├── middlewares/
│   ├── bodyParser.js       # Body parser middleware
│   ├── error.js            # Error handling middleware
│   └── jwt.js              # JWT authentication middleware
├── models/
│   ├── todo.js             # Todo data model
│   └── user.js             # User data model
├── routes/
│   ├── auth.js             # Authentication routes
│   └── todo.js             # Todo routes
├── app.js                  # Main application file
├── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo_backend_calldesk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory based on `demo.env`:
   ```env
   SERVER_ENV="DEV"  # or "PROD" for production
   PORT=8080

   # JWT Configuration
   JWT_SECRET_KEY="your-super-secret-jwt-key"

   # MongoDB Configuration (for production)
   MONGO_DB_USERNAME="your-mongodb-username"
   MONGO_DB_PASSWORD="your-mongodb-password"
   ```

4. **Database Setup**
   - For development: Ensure MongoDB is running locally on `mongodb://localhost:27017/todo-app`
   - For production: Configure MongoDB Atlas credentials in the `.env` file

5. **Start the application**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:8080` (or your configured PORT).

## 📋 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /auth/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "data": {
    "user": {
      "id": "user_id",
      "email": "john@example.com",
      "fullName": "John Doe"
    }
  },
  "message": "Account created successfully."
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "data": {
    "user": {
      "id": "user_id",
      "email": "john@example.com",
      "fullName": "John Doe"
    },
    "accessToken": "jwt_token_here"
  },
  "message": "Login successfully."
}
```

### Todo Endpoints

All todo endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

#### Get All Todos
```http
GET /todo
```

**Response:**
```json
{
  "data": {
    "todos": [
      {
        "id": "todo_id",
        "todoContent": "Learn Node.js",
        "isDone": false,
        "todoOwner": "user_id",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  },
  "message": "Todos fetched successfully."
}
```

#### Create Todo
```http
POST /todo
Content-Type: application/json
Authorization: Bearer <token>

{
  "todoContent": "Learn Express.js"
}
```

#### Update Todo
```http
PUT /todo/:todoId
Content-Type: application/json
Authorization: Bearer <token>

{
  "todoContent": "Learn Express.js Advanced",
  "isDone": true
}
```

#### Delete Todo
```http
DELETE /todo/:todoId
Authorization: Bearer <token>
```

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with 10 salt rounds
- **JWT Authentication**: Secure token-based authentication with 1-day expiration
- **CORS Configuration**: Cross-origin resource sharing properly configured
- **Helmet**: Security headers for protection against common vulnerabilities
- **Input Validation**: Comprehensive validation using express-validator
- **Error Handling**: Centralized error handling middleware

## 🗃️ Database Schema

### User Model
```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  fullName: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Todo Model
```javascript
{
  todoContent: String (required),
  isDone: Boolean (default: false),
  todoOwner: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```


## 🚀 Deployment

### Environment Variables for Production

Set `SERVER_ENV=PROD` and configure:
- `MONGO_DB_USERNAME`: Your MongoDB Atlas username
- `MONGO_DB_PASSWORD`: Your MongoDB Atlas password
- `JWT_SECRET_KEY`: A strong secret key for JWT signing

### MongoDB Atlas Configuration

The production configuration connects to MongoDB Atlas with the connection string:
```
mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@todo-backend.pln1iiu.mongodb.net/todo-backend?retryWrites=true&w=majority&appName=todo-backend
```

## 👨‍💻 Author

**Yuvraj Gupta**

## 🐛 Known Issues

- Tests are not yet implemented
- Error responses could be more detailed
- API documentation could be enhanced with OpenAPI/Swagger
