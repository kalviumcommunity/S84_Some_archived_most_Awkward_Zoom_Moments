// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authRoutes = require('../authRoutes');
const cors = require("cors");
const sequelize = require('./db');

const app = express();
const port = process.env.PORT || 5000;

// ✅ Middleware first
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Update with your frontend URL
  credentials: true
}));
app.use(cookieParser());
app.use(session({
  secret: 'your_secret_key', // Replace with a real secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Routes
app.use('/api/auth', authRoutes);

// ✅ Connect to DB
mongoose.connect(process.env.MONGO_URI,)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Routes
const momentRoutes = require('./routes');
app.use('/api', momentRoutes);

sequelize.authenticate().then(() => {
  console.log('Connected to MySQL');
  app.listen(3000, () => console.log('Server running on port 3000'));
});

// ✅ Test Routes
app.get("/", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.json({ databaseStatus: dbStatus });
});
app.get("/ping", (req, res) => res.send("Pong"));

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
