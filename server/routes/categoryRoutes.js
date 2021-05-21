const express = require('express')
const router = express.Router()
const { getAllCategories, updateCategory, addCategory, deleteCategory } = require('../controllers/categoryController')

router
    .route('/')
    .get(getAllCategories)
    .post(addCategory)

router
    .route('/:id')
    .put(updateCategory)
    .delete(deleteCategory)

    module.exports = router