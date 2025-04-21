const express = require("express");
const connection = require("./db/db");
const handlebars = require("express-handlebars");
const path = require("path");
const pathView = path.join(`${__dirname}/views`);
const usersRouter = require("./routes/users.router");
const viewsRouter = require("./routes/views.route");
const chatMessage = require("./models/chatmessage.model");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection();

const staticPath = path.join(__dirname, "public");
console.log("RETORNO DO STATIC PATH VINDO DO APP.JS:");
console.log(staticPath);

app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/users", usersRouter);
app.use("/static", express.static(staticPath));
app.use("/", viewsRouter);

app.get("/chat", async (req, res) => {
  const mensagens = await chatMessage.find().sort({ createdAt: 1 });
  res.render("chat", { mensagens });
});

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(
    "PASSOU PELO SOCKET IO.ON CONNECTION -> Novo usuário conectado no chat"
  );
  console.log(`Usuário conectado: ${socket.id}`);
  console.log(`DATA E HORA DA CONEXÃO: ${new Date().toLocaleString()}`);

  socket.on("chatMessage", async (msg) => {
    console.log("PASSOU PELO SOCKET.ON CHAT MESSAGE -> Mensagem recebida:");
    console.log(msg);

    await chatMessage.create({
      user: msg.user,
      message: msg.message,
    });

    io.emit("chatMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("PASSOU PELO SOCKET.ON DISCONNET: Usuário saiu do chat");
    console.log(`Usuário desconectado: ${socket.id}`);
    console.log(`DATA E HORA DA DESCONECT: ${new Date().toLocaleString()}`);
  });
});

server.listen(3000, () => {
  console.log("WEBSOCKET + EXPRESS RODANDO NA PORTA 3000");
});

module.exports = app;
