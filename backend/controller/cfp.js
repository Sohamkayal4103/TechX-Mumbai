const CFP = require("../models/cfp");
const asyncHandler = require("express-async-handler");

const getCFPs = async (req, res) => {
  res.status(200).json(await CFP.find().populate("eventId").populate("userId"));
};

const getCFPById = async (req, res) => {
  const cfp = await CFP.findById(req.params.id);
  if (cfp) {
    res.status(200).json(cfp);
  } else {
    res.status(404);
    console.log("CFP not found");
  }
};

const getCFPByEventId = async (req, res) => {
  const cfp = await CFP.find({ eventId: req.params.id }).populate("userId");
  if (cfp) {
    res.status(200).json(cfp);
  } else {
    res.status(404);
    console.log("CFP not found");
  }
};

const createCFP = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    isApproved,
    userId,
    eventId,
    linkedin,
    twitter,
    otherLink,
  } = req.body;
  console.log(req.body);
  // if (!isApproved) isApproved = false;
  const cfp = await CFP.create({
    title,
    description,
    isApproved,
    userId,
    eventId,
    linkedin,
    twitter,
    otherLink,
  });

  if (cfp) {
    res.status(201).json({
      _id: cfp._id,
      title: cfp.title,
      description: cfp.description,
      isApproved: cfp.isApproved,
      userId: cfp.userId,
      eventId: cfp.eventId,
      linkedin: cfp.linkedin,
      twitter: cfp.twitter,
      otherLink: cfp.otherLink,
    });
  } else {
    res.status(400);
    console.log("Invalid CFP data");
  }
});

module.exports = { getCFPs, getCFPById, createCFP, getCFPByEventId };
