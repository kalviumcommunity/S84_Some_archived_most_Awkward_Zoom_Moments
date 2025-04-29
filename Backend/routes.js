const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Moment = require("../models/momentModel"); // Sequelize model
const User = require("../models/userModel");     // Sequelize model

// ✅ Create a new Moment
router.post(
  "/moments",
  [
 feat/sql-user-entity-relation
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("category").notEmpty().withMessage("Category is required"),

    // Validation rules
    body("title").notEmpty().trim().escape().withMessage("Title is required"),
    body("description").notEmpty().trim().escape().withMessage("Description is required"),
    body("category").notEmpty().trim().escape().withMessage("Category is required"),
 main
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("created_by").notEmpty().withMessage("created_by (userId) is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, description, category, rating, created_by } = req.body;

    try {
      const moment = await Moment.create({ title, description, category, rating, created_by });
      res.status(201).json({ message: "Moment created", moment });
    } catch (error) {
      console.error("Create error:", error);
      res.status(500).json({ error: "Server error while creating moment" });
    }
  }
);

// ✅ Get all Moments
router.get("/moments", async (req, res) => {
  try {
    const moments = await Moment.findAll({ include: [{ model: User, attributes: ["username"] }] });
    res.status(200).json(moments);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Server error while fetching moments" });
  }
});

// ✅ Get moment by ID
router.get("/moments/:id", async (req, res) => {
  try {
    const moment = await Moment.findByPk(req.params.id);
    if (!moment) return res.status(404).json({ error: "Moment not found" });
    res.status(200).json(moment);
  } catch (error) {
    console.error("Fetch by ID error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get moments by user ID
router.get("/moments/user/:userId", async (req, res) => {
  try {
    const moments = await Moment.findAll({ where: { created_by: req.params.userId } });
    if (!moments.length) return res.status(404).json({ error: "No moments found for this user" });
    res.status(200).json(moments);
  } catch (error) {
    console.error("User moments error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update a moment
router.put(
  "/moments/:id",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { title, description, category, rating } = req.body;
      const updated = await Moment.update(
        { title, description, category, rating },
        { where: { id: req.params.id } }
      );

      if (!updated[0]) return res.status(404).json({ error: "Moment not found" });

      const updatedMoment = await Moment.findByPk(req.params.id);
      res.status(200).json({ message: "Moment updated", moment: updatedMoment });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ error: "Server error while updating moment" });
    }
  }
);

// ✅ Delete a moment
router.delete("/moments/:id", async (req, res) => {
  try {
    const deleted = await Moment.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Moment not found" });
    res.status(200).json({ message: "Moment deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Server error while deleting moment" });
  }
});

module.exports = router;
