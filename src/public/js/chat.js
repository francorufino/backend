document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  const form = document.getElementById("chatForm");
  const input = document.getElementById("msgInput");
  const nomeInput = document.getElementById("nomeInput");
  const messages = document.getElementById("messages");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value && nomeInput.value) {
      const now = new Date().toLocaleString(); // ✅ adiciona data aqui
      const data = {
        user: nomeInput.value,
        message: input.value,
        createdAt: now,
      };
      socket.emit("chatMessage", data);
      console.log("MENSAGEM ENVIADA PELO SOCKET:");
      console.log(data);
      input.value = "";
    }
  });

  socket.on("chatMessage", function (msg) {
    console.log("PASSOU PELO SOCKET.ON CHAT MESSAGE NO FRONT:");
    console.log(msg);

    const item = document.createElement("li");
    item.innerHTML = `<strong>${msg.user}</strong>: ${msg.message} <em>(${
      msg.createdAt || ""
    })</em>`;
    if (messages) {
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    } else {
      console.error("ELEMENTO #messages NÃO ENCONTRADO");
    }
  });
});
