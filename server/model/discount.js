const mongoose = require('./index')
const Schema = mongoose.Schema;

const DiscountSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description: String,
    discount_percent:{
        type: Number,
        required: true
    },
    active:{
        type: Boolean,
        required: true
    }
}, {timestamps: true});

const Discount = mongoose.model('discount',DiscountSchema);
module.exports = Discount;