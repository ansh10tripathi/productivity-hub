import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

import errorMiddleware from './middleware/errorMiddleware.js';

const app = express();

/*
  🔥 Proper CORS Configuration
  - Allows frontend (5173 or production) to communicate with backend
  - Enables Authorization header for JWT
  - Handles preflight requests correctly
*/
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// ======================
// 🔐 API Routes
// ======================

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/ai", aiRoutes); 

// ======================
// Global Error Handler
// ======================

app.use(errorMiddleware);

export default app;