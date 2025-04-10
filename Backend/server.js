// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// ✅ Middleware first
app.use(express.json());
app.use(cors());

// ✅ Connect to DB
mongoose.connect(process.env.MONGO_URI,)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Routes
const momentRoutes = require('./routes');
app.use('/api', momentRoutes);

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
