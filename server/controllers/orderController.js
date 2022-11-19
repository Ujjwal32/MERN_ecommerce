const Order = require("../model/order");
const axios = require("axios");
const mongoose = require("mongoose");

const getOrder = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;
  try {
    const orders = await Order.find()
      .populate({
        path: "products",
        populate: {
          path: "product",
          model: "product",
          select: "name price image",
        },
      })
      .populate("user", "name email")
      .limit(limit)
      .skip(skip);
    res.json({
      msg: "Successfully fetched orders!",
      results: {
        orders,
      },
    });
  } catch (err) {
    console.log(err);
    res.json({
      err,
    });
  }
};

const getSingleOrder = async (req, res) => {
  const userId = req.params.id;

  try {
    const order = await Order.find({
      user: userId,
      deliveryStatus: false,
    }).populate({
      path: "products",
      populate: {
        path: "product",
        model: "product",
        select: "name price image",
      },
    });

    res.json({
      msg: "Successfully fetched order!",
      order,
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: "Error!",
      error: err,
    });
  }
};

const placeOrder = async (req, res) => {
  try {
    const newOrder = await Order.create({ ...req.body });
    res.status(201).json({
      msg: "Successfully placed order!",
      result: {
        order: newOrder,
        // user: req.user
      },
    });
  } catch (err) {
    res.json({
      msg: "Error",
      error: err,
    });
  }
};

const paymentWithKhalti = async (req, res) => {
  const { token, amount } = req.body;
  console.log({ token, amount });
  let data = {
    token: token,
    amount: amount,
  };

  let config = {
    headers: {
      Authorization: "Key test_secret_key_de9bae976bf94bbeb8fcc7b3d1e394ae",
    },
  };

  axios
    .post("https://khalti.com/api/v2/payment/verify/", data, config)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json({ msg: error });
    });
};

const getOrderInfo = async (req, res) => {
  try {
    const totalOrders = await Order.count();
  } catch (err) {}
};

module.exports = {
  getOrder,
  getSingleOrder,
  placeOrder,
  paymentWithKhalti,
};
