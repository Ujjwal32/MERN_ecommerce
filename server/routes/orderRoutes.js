const express = require("express");
const {
  placeOrder,
  getOrder,
  paymentWithKhalti,
  getSingleOrder,
} = require("../controllers/orderController");
const verifyUser = require("../middlewares/verifyUser");

const router = express.Router();

router.route("/").get(verifyUser, getOrder).post(placeOrder);

router.route("/:id").get(getSingleOrder);

router.route("/payment").post(paymentWithKhalti);

module.exports = router;
