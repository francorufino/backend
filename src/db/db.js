require("dotenv").config();
const mongoose = require("mongoose");
const connection = () => {
  return (module.exports = mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(
        "LAST DATE AND TIME OF CONNECTION WITH MONGO DB:" +
          new Date().toLocaleString()
      );
      console.log("ENTROU NA CONEXAO DO MONGOOSE DO APP.JS E DEU BOM:");
      console.log("MongoDB Connected!");
    })
    .catch((err) => {
      console.log("ENTROU NA CONEXAO DO MONGOOSE DO APP.JS E DEU RUIM:");
      console.log(err);
      process.exit(1);
    }));
};

module.exports = connection;
