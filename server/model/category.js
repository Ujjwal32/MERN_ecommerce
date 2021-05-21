const mongoose = require('./index')
const Schema = mongoose.Schema;


const CategorySchema = new Schema({
    name: {
        type: String,
        rquired: true
    },
    items: {
        type: Number,
        default: 0
    }
},{timestamps: true});


const Category = mongoose.model('category',CategorySchema);
module.exports = Category;
