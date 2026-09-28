require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes');

connectDB();

const app = express();

// Configurable CORS supporting Netlify production domain and local dev
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((u) => u.trim().replace(/\/+$/, ''))
  : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:4173'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server or requests without Origin header (e.g. mobile apps, curl)
      if (!origin) return callback(null, true);

      // In development or if CLIENT_URL is *, allow all
      if (
        process.env.NODE_ENV !== 'production' ||
        !process.env.CLIENT_URL ||
        process.env.CLIENT_URL === '*'
      ) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn(`Blocked by CORS policy: Origin ${origin}`);
      return callback(new Error(`Origin ${origin} not allowed by CORS policy`));
    },
    credentials: true,
  })
);

app.use(express.json());

// API Routes
app.use('/api', routes);

// Root & Health check endpoints for Render uptime probes
app.get('/', (req, res) => {
  res.send('Dev Studio API is running');
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  console.error('Server error:', err.message);
  res.status(status).json({
    message: status >= 500 && process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
