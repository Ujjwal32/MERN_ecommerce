const mongoose = require('./index')
const Schema = mongoose.Schema


const shippingSchema = new Schema({
    city: String,
    state: String,
    street: String,
    houseNo: String
},{_id: false})

const productSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity: {
        type: Number
    }
},{_id: false})
const OrderSchema = new Schema({
    deliveryStatus: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    products:[productSchema],
    payment:{
        type: String,
        default: 'unverified'
    },
    shippingDetails: shippingSchema,
    totalPrice: Number
},{timestamps: true})

const Order = mongoose.model('order',OrderSchema);
module.exports = Order;