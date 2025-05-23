const mongoose = require("mongoose");
Moment.belongsTo(User, { foreignKey: 'created_by' });
User.hasMany(Moment, { foreignKey: 'created_by' });

const momentSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  category: String,
  cringeLevel: Number,
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Make sure you have a User model
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Moment", momentSchema);
