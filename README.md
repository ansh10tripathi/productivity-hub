# 🚀 TaskFlow Pro – Full-Stack Productivity SaaS

A modern, production-ready task management web application with secure authentication, cloud database integration, and full deployment to the internet.

🌐 **Live Application:**  
Frontend → https://productivity-hub-blue.vercel.app  
Backend API → https://productivity-hub-swj0.onrender.com  

---

## ✨ Key Features

- 🔐 Secure JWT Authentication (Register / Login)
- ☁ MongoDB Atlas Cloud Database
- 📝 Create, Edit, Delete Tasks
- ✅ Mark Tasks as Complete
- 🔍 Search & Filter (All / Active / Completed)
- 🎯 Priority Levels (Low / Medium / High)
- 📅 Due Date Support
- 🌙 Dark Mode
- 🔄 Drag & Drop Reordering
- 🚀 Fully Deployed (Vercel + Render)

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- Framer Motion
- Axios
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- CORS Middleware
- Custom Error Handling

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Project Structure

```
productivity-hub/
│
├── client/              # Frontend (React + Vite)
│   ├── src/
│   └── package.json
│
├── server/              # Backend (Express + MongoDB)
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   └── package.json
│
└── README.md
```

---

## 🔐 Authentication Flow

1. User registers with email & password  
2. Password securely hashed  
3. JWT token generated  
4. Token stored client-side  
5. Protected routes validated via middleware  

---

## ⚙️ Environment Variables

### Backend (.env)

```
PORT=10000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
CLIENT_URL=your_frontend_url
```

### Frontend (.env)

```
VITE_API_URL=your_backend_url/api
```

---

## 🚀 Running Locally

### Install Dependencies
```bash
npm run install:all
```

### Configure Backend
```bash
cp server/.env.example server/.env
```

Update `.env` values.

### Run Backend
```bash
npm run dev:server
```

### Run Frontend (new terminal)
```bash
npm run dev:client
```

---

## 📡 REST API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`

### Todos (Protected)
- `GET /api/todos`
- `POST /api/todos`
- `PUT /api/todos/:id`
- `DELETE /api/todos/:id`
- `DELETE /api/todos/completed/all`
- `PATCH /api/todos/reorder`

---

## 🧠 What This Project Demonstrates

- Full-stack architecture design
- Cloud database integration
- JWT authentication implementation
- Production deployment workflow
- CORS configuration in real-world environment
- Environment variable management
- Debugging production issues

---

## 👨‍💻 Author

**Ansh Tripathi**  
BTech CSE (AI/ML)  
Full-Stack & AI Enthusiast 🚀  

---

## 📌 License

This project is licensed under the MIT License.