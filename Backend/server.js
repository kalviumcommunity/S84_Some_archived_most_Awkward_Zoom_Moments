// Import required modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define Mongoose Schema and Model
const momentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  videoUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Moment = mongoose.model("Moment", momentSchema);

// Home route displaying database connection status
app.get("/", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.json({ databaseStatus: dbStatus });
});

// Route to check if the server is working
app.get("/ping", (req, res) => {
  res.send("Pong");
});

// ✅ Create a new Zoom moment (POST)
app.post("/api/moments", async (req, res) => {
  try {
    const { title, description, category, rating, videoUrl } = req.body;
    const newMoment = new Moment({ title, description, category, rating, videoUrl });
    await newMoment.save();
    res.status(201).json({ message: "Moment created successfully!", moment: newMoment });
  } catch (error) {
    res.status(500).json({ error: "Failed to create moment" });
  }
});

// ✅ Get all Zoom moments (GET)
app.get("/api/moments", async (req, res) => {
  try {
    const moments = await Moment.find();
    res.json(moments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch moments" });
  }
});

// ✅ Update a specific moment (PUT)
app.put("/api/moments/:id", async (req, res) => {
  try {
    const updatedMoment = await Moment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMoment) return res.status(404).json({ error: "Moment not found" });
    res.json({ message: "Moment updated successfully!", moment: updatedMoment });
  } catch (error) {
    res.status(500).json({ error: "Failed to update moment" });
  }
});

// ✅ Delete a specific moment (DELETE)
app.delete("/api/moments/:id", async (req, res) => {
  try {
    const deletedMoment = await Moment.findByIdAndDelete(req.params.id);
    if (!deletedMoment) return res.status(404).json({ error: "Moment not found" });
    res.json({ message: "Moment deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete moment" });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
