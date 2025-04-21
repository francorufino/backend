const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
  user: ObjectId,
  products: [
    {
      product: ObjectId,
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);
module.exports = cartsModel;
