# Basic Paytm Clone

## Project Description

A simple Paytm-like payment application built using React, Express, and MongoDB.  
It supports user authentication with JWT, protected routes, user search, balance display, and simulated money transfers using MongoDB transactions.  
All balances and transfers are mock and meant only for learning purposes.

---

## Technologies Used

### Frontend
- React  
- React Router DOM  
- Axios  
- TailwindCSS  

### Backend
- Node.js  
- Express  
- MongoDB  
- Mongoose  
- JWT (jsonwebtoken)  
- bcrypt  
- Zod  
- CORS  

---

## How to Run Locally

### 1. Clone the repository
```
git clone 
```
### 2. Go to the project directory
```
cd your-repo
```

### 3. Install backend dependencies
```
cd backend
npm install
```

### 4. Install frontend dependencies
```
cd ../frontend
npm install
```

### 5. Set up environment variables  
Create a `.env` file inside the backend folder:
```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
### 6. Run the backend
```
node index.js
```
### 7. Run the frontend
```
npm run dev
```

### 8. Open the app  
to open the app Visit:
```
http://localhost:5173
```
---