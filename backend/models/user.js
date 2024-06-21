const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  image: {
    type: String,
    required: false,
  },
  volunteeredEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: [],
      unique: true,
    },
  ],
  organizedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: [],
      unique: true,
    },
  ],

  speakeratEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: [],
      unique: true,
    },
  ],
  attendedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: [],
      unique: true,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
