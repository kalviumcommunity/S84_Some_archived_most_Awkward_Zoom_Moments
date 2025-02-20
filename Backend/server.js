// Import the required modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;  // Set the port, default is 5000

// Middleware to parse JSON request bodies
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Home route displaying the database connection status
app.get("/", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.json({ databaseStatus: dbStatus });
});

// Route for pinging the server to check if it's working
app.get("/ping", (req, res) => {
  res.send("Pong");
});

// Example of a route for your Zoom moments feature
app.get("/moments", (req, res) => {
  // For now, we just send a placeholder response
  res.json({ message: "Here are some funny Zoom moments!" });
});

// Route for submitting a Zoom moment (example)
app.post("/submit-moment", (req, res) => {
  const { description, videoUrl } = req.body;  // Example of what you might send in the request body
  // In a real app, you'd save this to the database
  res.status(201).json({
    message: "Zoom moment submitted successfully!",
    data: { description, videoUrl }
  });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
