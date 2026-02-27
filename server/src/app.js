import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';

const app = express();

/*
  🔥 Proper CORS Configuration
  - Allows frontend (5173) to communicate with backend (5000)
  - Enables Authorization header for JWT
  - Handles preflight requests correctly
*/
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Global error handler
app.use(errorMiddleware);

export default app;