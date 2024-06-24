const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  description: {
    type: String,
    required: true,
  },
  prevExp: {
    type: String,
    default: "",
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Volunteer", volunteerSchema);
