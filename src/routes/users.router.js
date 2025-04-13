const express = require("express");
const uploader = require("../utils/multer");
const userModel = require("../models/users.model");

const router = express.Router();

let users = [];

router.get("/", async (req, res) => {
  try {
    console.log("entrou na rota get de users router");
    const users = await userModel.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log("entrou no catch da rota get do users.router.js");
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    console.log("entrou na rota get de users :uid router");
    const users = await userModel.findById(uid);
    return res.status(200).json(users);
  } catch (error) {
    console.log(
      "entrou no catch da rota get do users : uid do users.router.js"
    );
    return res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = req.body;
    const newUser = await userModel.create(user);
    console.log("PASSOU PELO TRY DO POST E CRIOU O USER:");
    console.log(newUser);
    return res.status(200).json(newUser);
  } catch (error) {
    console.log("PASSOU PELO CATCH DO POST E DEU ERRO AO CRIAR O USER:");
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.put("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(uid, user, {
      new: true
    });
    console.log("PASSOU PELO TRY DO PUT E ATUALIZOU O USER:");
    console.log(updatedUser);
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("PASSOU PELO CATCH DO PUT E DEU ERRO AO ATUALIZAR O USER:");
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// router.post("/", uploader.single("avatar"), (req, res) => {
//   if (!req.file) {
//     console.log("entrou na rota post do uploader single qdo nao tem o file:");
//     return res.status(400).send({ message: "Field avatar is required" });
//   }

//   console.log("se deu certo esse eh o arquivo q esta retornando:");
//   console.log(req.file);

//   let user = req.body;
//   user.profile = req.file.path;
//   users.push(user);
//   res.status(201).send({ message: user });
// });

module.exports = router;

// se eu quisesse por email:
// router.get("/:email", async (req, res) => {
//   try {
//     const { email } = req.params;
//     console.log("entrou na rota get de users :email router");
//     const users = await userModel.findById({ email: email });
//     return res.status(200).json(users);
//   } catch (error) {
//     console.log(
//       "entrou no catch da rota get do users : email do users.router.js"
//     );
//     return res.status(500).json({ message: error.message });
//   }
// });
// se vc for buscar por id E por email vc deve escrever assim no id e no email pq senao o mongo nao entende a diferenca, pra ele eh tudo a mesma coisa:
//router.get("/email/:email", async (req, res) => {
//router.get("/id/:uid", async (req, res) => {
//geralmente nao se busca por 2 coisas diferentes... ou se busca pelo id ou pelo email
