require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const productModel = require("../dao/products.model");

const seed = async () => {
  try {
    console.log("MONGO_URI carregada:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);

    const filePath = path.join(__dirname, "products_seed_final.json");
    const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    await productModel.insertMany(products);
    console.log("🌱 Produtos inseridos com sucesso no MongoDB!");
  } catch (error) {
    console.error("Erro ao inserir produtos:", error);
  } finally {
    mongoose.disconnect();
  }
};

seed();
