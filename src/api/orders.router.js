const express = require("express");
const router = express.Router();

// rota temporária só pra não quebrar o app
router.get("/", (req, res) => {
  res.send("Orders endpoint está funcionando (placeholder)");
});

module.exports = router;
