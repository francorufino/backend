const express = require("express");
const router = express.Router();
const productModel = require("../dao/products.model");

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, category, sort, search } = req.query;

    let filter = {};
    if (category) {
      filter.category = category;
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

    const result = await productModel.paginate(filter, options);
    res.status(200).json(result);
  } catch (err) {
    console.error("Erro na rota /api/products:", err.message);
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
});

module.exports = router;
