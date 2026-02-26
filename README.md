# TaskFlow Pro - Full-Stack To-Do List Web App

Modern, responsive, production-ready task management app with authentication, MongoDB persistence, drag-and-drop, filters, search, priority, due dates, dark mode, and smooth animations.

## Tech Stack

- **Frontend:** React + Vite
- **UI:** TailwindCSS + Lucide React + Framer Motion
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Auth:** JWT (register/login)

## Folder Structure

```bash
productivity-hub/
├── client/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── api.js
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       └── components/
│           ├── FilterBar.jsx
│           ├── Header.jsx
│           ├── TodoForm.jsx
│           ├── TodoItem.jsx
│           └── TodoList.jsx
├── server/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/db.js
│       ├── controllers/
│       │   ├── authController.js
│       │   └── todoController.js
│       ├── middleware/
│       │   ├── authMiddleware.js
│       │   └── errorMiddleware.js
│       ├── models/
│       │   ├── Todo.js
│       │   └── User.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   └── todoRoutes.js
│       └── utils/
│           ├── catchAsync.js
│           └── generateToken.js
├── package.json
└── README.md
```

## Installation & Run

1. **Install all dependencies**

```bash
npm run install:all
```

2. **Configure backend environment**

```bash
cp server/.env.example server/.env
```

Update `server/.env` values (`MONGO_URI`, `JWT_SECRET`, etc).

3. **Run backend**

```bash
npm run dev:server
```

4. **Run frontend (new terminal)**

```bash
npm run dev:client
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:5000/api`

## REST API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Todos (JWT required)
- `GET /api/todos`
- `POST /api/todos`
- `PUT /api/todos/:id`
- `DELETE /api/todos/:id`
- `DELETE /api/todos/completed/all`
- `PATCH /api/todos/reorder`

## Production Notes

- Set strict `CLIENT_URL` in backend env.
- Use secure MongoDB connection string.
- Use strong `JWT_SECRET`.
- Build frontend with `npm run build --prefix client`.
- Run backend with process manager (PM2, Docker, etc.).
