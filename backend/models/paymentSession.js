const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: [true, "sessionId for payment is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId is required"],
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: [true, "eventId is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
});

module.exports = mongoose.model("PaymentSchema", paymentSchema);
