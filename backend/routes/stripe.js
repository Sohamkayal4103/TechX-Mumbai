const express = require("express");
const app = express();
const router = express.Router();

const {
  createCheckoutSession,
  storeSessionData,
} = require("../controller/stripe");

router.route("/create-checkout-session").post(createCheckoutSession);
router.route("/storeStripeSession/").post(storeSessionData);

module.exports = router;
