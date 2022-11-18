const Product = require("../model/products");
const mongoose = require("mongoose");
const Cloudinary = require("../util/cloudinary");

const getProducts = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;
  try {
    const product = await Product.find()
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skip);
    res.status(200).json({
      msg: "Successfully fetched all products!",
      result: {
        product,
      },
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server error!",
      err,
    });
  }
};
const addProducts = async (req, res) => {
  const slug = req.body.name.toLowerCase().split(" ").join("-");
  const user = req.user;
  if (user.role === "admin") {
    try {
      const image = await Cloudinary.upload(req.body.image, "products", {
        height: 600,
        width: 600,
      });
      const product = {
        ...req.body,
        category_id: mongoose.Types.ObjectId(req.body.category_id),
        slug,
        image,
      };
      const newProduct = await Product.create(product);
      return res.status(201).json({
        msg: "Successfully added!",
        result: {
          product: newProduct,
        },
      });
    } catch (err) {
      console.log(err);
      return res.json({
        msg: "Something went wrong!",
        err,
      });
    }
  } else {
    res.json({
      msg: "You are not authenticated!",
    });
  }
};

const editProduct = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id.trim());
  const { imageEdited, ...rest } = req.body;
  if (imageEdited) {
    const image = await Cloudinary.upload(req.body.image, "products", {
      height: 600,
      width: 600,
    });
    const product = {
      ...rest,
      slug,
      image,
    };
    const newProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    });
    return res.status(201).json({
      msg: "Product Updated Successfully!",
      result: {
        product: newProduct,
      },
    });
  } else {
    const product = await Product.findByIdAndUpdate(id, rest, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      msg: "Product Updated Successfully!",
      result: {
        product,
      },
    });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.json({
    msg: "Successfully deleted the product!",
    result: {
      product: deletedProduct,
    },
  });
};

const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.status(200).json({
      msg: "Successful",
      result: {
        product,
      },
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server error!",
      err,
    });
  }
};

//search products

const searchProducts = async (req, res) => {
  try {
    const searchParam = req.query.query;

    // const searchedProducts = await Product.find({tags:{$regex:`.*${searchParam}*.`, $options: "gim"}})
    // const searchedProducts = await Product.find({
    //   $text: { $search: searchParam },
    // });
    const searchedProducts = await Product.aggregate([
      {
        $search: {
          text: {
            query: searchParam,
            path: {
              wildcard: "*",
            },
          },
        },
      },
    ]);
    res.status(200).json({
      msg: "Successful",
      result: {
        product: searchedProducts,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server error!",
      err,
    });
  }
};

const getProductsByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const products = await Product.find({}).populate({
      path: "category",
      match: {
        name: { $eq: category },
      },
    });
    const filteredProducts = products.filter((prod) => prod.category);
    res.status(200).json({
      msg: "Successful",
      result: {
        product: filteredProducts,
      },
    });
  } catch (err) {
    res.json({
      msg: "Something went wrong!".err,
    });
  }
};

module.exports = {
  getProducts,
  addProducts,
  editProduct,
  deleteProduct,
  getSingleProduct,
  searchProducts,
  getProductsByCategory,
};
