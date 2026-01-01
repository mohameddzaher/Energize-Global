

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './src/routes/auth.js';
import bookingRoutes from './src/routes/bookings.js';
import adminRoutes from './src/routes/admin.js';
import userRoutes from './src/routes/users.js';

dotenv.config();

const app = express();

/* =======================
   CORS CONFIG (IMPORTANT)
======================= */
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://elc-ksa.netlify.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

/* =======================
   BODY PARSER
======================= */
app.use(express.json());

/* =======================
   ROUTES
======================= */
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/users', userRoutes);

/* =======================
   BASIC ROUTE
======================= */
app.get('/', (req, res) => {
  res.json({
    message: 'Meeting Room Booking API is running with MongoDB Atlas!'
  });
});

/* =======================
   DATABASE
======================= */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

/* =======================
   SERVER
======================= */
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
});