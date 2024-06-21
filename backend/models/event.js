const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
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
  time: {
    type: String,
  },
  date: {
    type: String,
  },
  image: {
    type: String,
  },
  mode: {
    type: String,
    enum: ["Online", "In-Person"],
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  location: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  speakerApplications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  speakers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
      unique: true,
    },
  ],
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
      unique: true,
    },
  ],
  volunteers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
      unique: true,
    },
  ],

  tickets: {
    type: Number,
    required: true,
  },

  volunteersApplications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
      unique: true,
    },
  ],
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  domain: {
    type: String,
    enum: [
      "AI-ML",
      "Blockchain",
      "Devops",
      "Cyber Security",
      "Web development",
      "Mobile development",
      "Cloud Computing",
      "Game Development",
      "Other",
    ],
  },
});

module.exports = mongoose.model("Event", eventSchema);
