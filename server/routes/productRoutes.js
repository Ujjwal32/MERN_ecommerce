const express = require("express");
const {
  getProductsByCategory,
  addProducts,
  getProducts,
  editProduct,
  deleteProduct,
  getSingleProduct,
  searchProducts,
} = require("../controllers/productController");
const router = express.Router();
const verifyUser = require("../middlewares/verifyUser");

router.route("/search").get(searchProducts);
router.route("/").get(getProducts).post(verifyUser, addProducts);

router
  .route("/:id")
  .get(getSingleProduct)
  .put(verifyUser, editProduct)
  .delete(verifyUser, deleteProduct);

router.route("/category/:category").get(getProductsByCategory);

module.exports = router;
