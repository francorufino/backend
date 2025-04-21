const mongoose = require("mongoose");
const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  name: String,
  description: String,
  stock: Number,
  price: Number,
});

const productsModel = mongoose.model(productsCollection, productsSchema);
module.exports = productsModel;
