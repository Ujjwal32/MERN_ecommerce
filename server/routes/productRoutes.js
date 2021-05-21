const express = require('express');
const { addProducts, getProducts, editProduct, deleteProduct, getSingleProduct } = require('../controllers/productController');
const router = express.Router();
const verifyUser = require('../middlewares/verifyUser')


router
    .route('/')
    .get(getProducts)
    .post(verifyUser,addProducts)

router
    .route('/:id')
    .get(getSingleProduct)
    .put(verifyUser,editProduct)
    .delete(verifyUser,deleteProduct)


module.exports = router;