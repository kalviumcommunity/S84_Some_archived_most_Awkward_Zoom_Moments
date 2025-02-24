const express = require("express");
const router = express.Router();
const Moment = require("./models/Moment");

// Create a new Zoom moment
router.post("/", async (req, res) => {
  try {
    const { title, description, category, rating } = req.body;
    const newMoment = new Moment({ title, description, category, rating });
    await newMoment.save();
    res.status(201).json(newMoment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create moment" });
  }
});

// Read all moments
router.get("/", async (req, res) => {
  try {
    const moments = await Moment.find();
    res.json(moments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch moments" });
  }
});

// Update a moment by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedMoment = await Moment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMoment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update moment" });
  }
});

// Delete a moment by ID
router.delete("/:id", async (req, res) => {
  try {
    await Moment.findByIdAndDelete(req.params.id);
    res.json({ message: "Moment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete moment" });
  }
});

module.exports = router;
