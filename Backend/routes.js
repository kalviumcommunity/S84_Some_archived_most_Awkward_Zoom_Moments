const express = require("express");
const { body, validationResult } = require("express-validator"); // Importing validation tools
const router = express.Router();
const Moment = require("./models/Moment");

// Create a new Zoom moment
router.post(
  "/moments",
  [
    // Validation rules
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("created_by").notEmpty().withMessage("created_by is required"),
  ],
  async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, category, rating } = req.body;

      // Create and save the new moment
      const newMoment = new Moment({ title, description, category, rating });
      const savedMoment = await newMoment.save();

      res.status(201).json({ message: "Moment created successfully", moment: savedMoment });
    } catch (error) {
      console.error("Error creating moment:", error);
      res.status(500).json({ error: "Failed to create moment" });
    }
  }
);

// Read all moments
router.get("/moments", async (req, res) => {
  try {
    const moments = await Moment.find();
    res.status(200).json(moments);
  } catch (error) {
    console.error("Error fetching moments:", error);
    res.status(500).json({ error: "Failed to fetch moments" });
  }
});

// Read a single moment by ID
router.get("/moments/:id", async (req, res) => {
  try {
    const moment = await Moment.findById(req.params.id);
    if (!moment) {
      return res.status(404).json({ error: "Moment not found" });
    }
    res.status(200).json(moment);
  } catch (error) {
    console.error("Error fetching moment:", error);
    res.status(500).json({ error: "Failed to fetch moment" });
  }
});

router.get("/moments/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const moments = await Moment.find({ created_by: userId });

    if (moments.length === 0) {
      return res.status(404).json({ error: "No moments found for this user" });
    }

    res.status(200).json(moments);
  } catch (error) {
    console.error("Error fetching user moments:", error);
    res.status(500).json({ error: "Failed to fetch user moments" });
  }
});


// Update a moment by ID
router.put(
  "/moments/:id",
  [
    // Validation rules for update
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
  ],
  async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, category, rating } = req.body;

      const updatedMoment = await Moment.findByIdAndUpdate(
        req.params.id,
        { title, description, category, rating },
        { new: true, runValidators: true }
      );

      if (!updatedMoment) {
        return res.status(404).json({ error: "Moment not found" });
      }

      res.status(200).json({ message: "Moment updated successfully", moment: updatedMoment });
    } catch (error) {
      console.error("Error updating moment:", error);
      res.status(500).json({ error: "Failed to update moment" });
    }
  }
);

// Delete a moment by ID
router.delete("/moments/:id", async (req, res) => {
  try {
    const deletedMoment = await Moment.findByIdAndDelete(req.params.id);

    if (!deletedMoment) {
      return res.status(404).json({ error: "Moment not found" });
    }

    res.status(200).json({ message: "Moment deleted successfully" });
  } catch (error) {
    console.error("Error deleting moment:", error);
    res.status(500).json({ error: "Failed to delete moment" });
  }
});

module.exports = router;
