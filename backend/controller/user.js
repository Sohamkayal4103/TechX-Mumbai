const event = require("../models/event");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const getUsers = async (req, res) => {
  res
    .status(200)
    .json(
      await User.find()
        .populate("attendedEvents")
        .populate("organizedEvents")
        .populate("speakeratEvents")
        .populate("volunteeredEvents")
    );
};

const addUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    image,
    volunteeredEvents,
    organizedEvents,
    speakeratEvents,
    attendedEvents,
  } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    //res.status(400);
    console.log("User already exist");
    return;
  }

  const user = await User.create({
    name,
    email,
    image,
    volunteeredEvents,
    organizedEvents,
    speakeratEvents,
    attendedEvents,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      volunteeredEvents: user.volunteeredEvents,
      organizedEvents: user.organizedEvents,
      speakeratEvents: user.speakeratEvents,
      attendedEvents: user.attendedEvents,
    });
  } else {
    res.status(400);
    console.log("Invalid user data");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updateUser = await User.findByIdAndUpdate(
    id,
    { $push: { attendedEvents: req.body.attendedEvents } },
    { new: true }
  );
  if (updateUser) {
    res.status(200).json(updateUser);
  } else {
    res.status(404);
    console.log("User not found");
  }
});

const updateUserByParams = asyncHandler(async (userId, eventId) => {
  const eventExists = await User.find({
    _id: userId,
    attendedEvents: eventId,
  });
  if (eventExists.length > 0) {
    console.log("event exists in array");
    return;
  }
  const updateUser = await User.findByIdAndUpdate(
    userId,
    { $push: { attendedEvents: eventId } },
    { new: true }
  );
  if (updateUser) {
    console.log("user updated");
    return true;
  } else {
    console.log("User not found");
    return false;
  }
});

const getUserfromemail = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    console.log("User not found");
  }
});

module.exports = {
  getUsers,
  addUser,
  getUserfromemail,
  updateUser,
  updateUserByParams,
};
