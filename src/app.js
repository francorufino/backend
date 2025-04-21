const express = require("express");
const connection = require("./db/db");
const handlebars = require("express-handlebars");
const path = require("path");
const pathView = path.join(`${__dirname}/views`);
const usersRouter = require("./routes/users.router");
const viewsRouter = require("./routes/views.route");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection();

const staticPath = path.join(`${__dirname}/../public`);
console.log("RETORNO DO STATIC PATH VINDO DO APP.JS:");
console.log(staticPath);

app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/users", usersRouter);
app.use("/static", express.static(staticPath));
app.use("/", viewsRouter);

app.get("/chat", (req, res) => {
  res.render("chat");
});

app.listen(3000, () => {
  console.log("EXPRESS SERVER RUNNING ON PORT 3000 - BROWSER");
});

module.exports = app;
