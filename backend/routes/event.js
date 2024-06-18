const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });
const router = express.Router();

const {
  getEvents,
  getEventById,
  createEvent,
  updateEventApproval,
  updateAttendees,
} = require("../controller/event");

router.route("/").get(getEvents);
router.route("/:id").get(getEventById);
router.route("/add").post(upload.single("image"), createEvent);
router.route("/approval/:id").put(updateEventApproval);
router.route("/attendees/:id").put(updateAttendees);

module.exports = router;
