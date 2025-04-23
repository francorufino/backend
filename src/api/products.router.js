const express = require("express");
const router = express.Router();
const productModel = require("../dao/products.model");

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 9, category, sort, search } = req.query;

    let filter = {};
    if (category && category.trim() !== "") {
      filter.category = new RegExp(`^${category.trim()}$`, "i");
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" }; // busca parcial e case-insensitive
    }

    let sortOption = {};
    if (sort === "asc") sortOption.price = 1;
    if (sort === "desc") sortOption.price = -1;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortOption,
      lean: true,
    };

    const result = await productModel.paginate(filter, {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortOption,
      lean: true,
    });
    res.status(200).json(result);
  } catch (err) {
    console.error("Erro na rota /api/products:", err.message);
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
});
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/img/products"));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, description, stock } = req.body;
    const image = req.file ? `img/products/${req.file.filename}` : "";

    const newProduct = await productModel.create({
      name: name.trim(),
      price: parseFloat(price),
      category: category.trim().toLowerCase(),
      description: description.trim(),
      image,
      stock: parseInt(stock),
      status: parseInt(stock) > 0,
    });

    res.redirect("/products");
  } catch (err) {
    console.error("Erro ao adicionar produto com imagem:", err.message);
    res.status(500).send("Erro ao adicionar produto");
  }
});

module.exports = router;
