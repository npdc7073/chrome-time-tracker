const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: String,
  url: String,
  hostname: String,
  startTime: Date,
  endTime: Date,
  duration: Number,
  productive: Boolean,
});

module.exports = mongoose.model("Activity", activitySchema);
