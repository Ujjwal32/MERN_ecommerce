const mongoose = require("./index");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    descriptions: String,
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    stock: {
      type: String,
      required: true,
    },
    tags: String,
    slug: String,
  },
  { timestamps: true }
);
// ProductSchema.createIndexes({ tags: "text", name: "text" });
const Product = mongoose.model("product", ProductSchema);
Product.createIndexes({ tags: "text", name: "text" });
module.exports = Product;
