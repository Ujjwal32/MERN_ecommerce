const Product = require('../model/products')
const path = require('path');
const Cloudinary = require('../util/cloudinary')


const getProducts = async (req,res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const skip = (page - 1) * limit
    try{
        const product = await Product.find().sort({ _id: 1 }).limit(limit).skip(skip);
        res.status(200).json({
            msg: 'Successfully fetched all products!',
            result:{
                product
            }
        })
    } catch(err){
        res.status(500).json({
            msg: "Internal Server error!",
            err
        })
    }
}
const addProducts = async (req,res) => {
    const slug = req.body.name.toLowerCase().split(' ').join('-')
    const user = req.user

    if(user.role === 'admin'){
        
        const image = await Cloudinary.upload(req.body.image, "products", {
            height: 600,
            width: 600,
          });
        const product = {
            ...req.body,
            slug,
            image
        }
        try{
            const newProduct = await Product.create(product)
            return res.status(201).json({
                msg: "Successfully added!",
                result: {
                    product: newProduct
                }
            })
        } catch(err){
            return res.json({
                msg: "Something went wrong!",
                err
            })
        }
    } else {
         res.json({
            msg: 'You are not authenticated!'
        })
    }

}

const editProduct = async (req,res) => {
    const id = req.params.id
    const product = await Product.findByIdAndUpdate( id, req.body, { new: true, runValidators: true })
    res.status(201).json({
        msg: 'Product Updated Successfully!',
        result: {
            product
        }
    })
}

const deleteProduct = async (req,res) => {
    const id = req.params.id
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.json({
        msg: 'Successfully deleted the product!',
        result: {
            product: deletedProduct
        }
    })
}

const getSingleProduct = async (req,res) => {
    const id = req.params.id
    try{
        const product = await Product.findById(id)
        res.status(200).json({
            msg: "Successful",
            result: {
                product
            }
        })
    } catch(err){
        res.status(500).json({
            msg: "Internal Server error!",
            err
        })
    }
}

module.exports = {
    getProducts,
    addProducts,
    editProduct,
    deleteProduct,
    getSingleProduct
}