const express = require("express");
const {
  createVolunteer,
  getVolunteersByEventId,
} = require("../controller/volunteer");
const router = express.Router();

router.route("/add").post(createVolunteer);
router.route("/:eventId").get(getVolunteersByEventId);

module.exports = router;
