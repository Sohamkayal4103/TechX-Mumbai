require("dotenv").config();
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const { updateUserByParams } = require("./user");
const { updateAttendeesByParams } = require("./event");
const PaymentSchema = require("../models/paymentSession");

const createCheckoutSession = async (req, res) => {
  const { id, userId, price, name, description, image } = req.body;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: name,
            description: description,
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/Success/${id}`,
    cancel_url: "http://localhost:3000/events",
  });
  console.log(session);
  res.send({ url: session.url, id: session.id });
};

const storeSessionData = async (req, res) => {
  const { userId, eventId, sessionId, price } = req.body;
  console.log(userId);
  console.log(eventId);
  console.log(sessionId);
  console.log(price);
  const payment = await PaymentSchema.create({
    sessionId,
    userId,
    eventId,
    price,
  });
  if (payment) {
    res.status(201).json({
      status: true,
      id: payment._id,
      userId: payment.userId,
      eventId: payment.eventId,
      sessionId: payment.sessionId,
      price: payment.price,
    });
  } else {
    res.status(400).send({
      status: false,
      message: "Something went wrong",
    });
  }
};

const checkPaymentStatusAndReflect = async (req, res) => {
  console.log(req.body);
  const { checkoutSessionId, userId, eventId } = req.body;
  const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);
  console.log(session.payment_status);
  if (session.payment_status === "paid") {
    console.log("user has paid now");
    try {
      await updateAttendeesByParams(eventId, userId);
      await updateUserByParams(userId, eventId);
      res.send({
        status: true,
        message: "payment successful",
      });
    } catch (e) {
      console.log(e);
      res.send({
        status: false,
        message: "payment not successful",
      });
    }
  } else {
    console.log("Payment not done");
  }
};

const reflectPurchase = async () => {};

module.exports = {
  createCheckoutSession,
  checkPaymentStatusAndReflect,
  storeSessionData,
};
