const mongoose = require('./index')
const Schema = mongoose

const ShippingDetails = new Schema({
    state: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    street:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},{timestamps: true});

const Shipping = mongoose.model('shipping_details',ShippingDetails);
module.exports = Shipping