const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productsCollection = "products";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  status: Boolean,
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productsCollection, productSchema);

module.exports = productModel;
