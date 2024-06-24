const mongoose = require("mongoose");

const cfpSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  linkedin: {
    type: String,
    default: "",
  },
  twitter: {
    type: String,
    default: "",
  },
  otherLink: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("CFP", cfpSchema);
