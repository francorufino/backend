const express = require("express");
const router = express.Router();
const productModel = require("../dao/products.model");

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 9, category, sort, search } = req.query;

    let filter = {};

    // Filtro por categoria (case insensitive)
    if (category) {
      filter.category = new RegExp(`^${category}$`, "i"); // usa regex para ignorar maiúsculas/minúsculas
    }

    // Filtro por nome com busca parcial
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // Opções de ordenação
    let sortOption = {};
    if (sort === "asc") sortOption.price = 1;
    if (sort === "desc") sortOption.price = -1;

    // Paginação
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
