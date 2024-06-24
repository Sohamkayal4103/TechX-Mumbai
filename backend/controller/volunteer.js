const asyncHandler = require("express-async-handler");
const Volunteer = require("../models/volunteer");

const createVolunteer = asyncHandler(async (req, res) => {
  const { eventId, userId, answer1, answer2 } = req.body;
  console.log(req.body);

  const volunteer = await Volunteer.create({
    eventId: eventId,
    userId: userId,
    description: answer1,
    prevExp: answer2,
    isApproved: false,
  });

  if (volunteer) {
    res.status(201).json({
      _id: volunteer._id,
      eventId: volunteer.eventId,
      userId: volunteer.userId,
      answer1: volunteer.description,
      answer2: volunteer.prevExp,
      isApproved: volunteer.isApproved,
    });
  } else {
    res.status(400);
    console.log("Invalid user data");
  }
});

const getVolunteersByEventId = async (req, res) => {
  console.log(req.params.eventId);
  const volunteers = await Volunteer.find({ eventId: req.params.eventId });
  if (volunteers) {
    res.status(200).json(volunteers);
  } else {
    res.status(404);
    console.log("Volunteers not found");
  }
};

module.exports = { createVolunteer, getVolunteersByEventId };
