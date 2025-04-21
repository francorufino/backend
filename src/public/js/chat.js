document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  const form = document.getElementById("chatForm");
  const input = document.getElementById("msgInput");
  const nomeInput = document.getElementById("nomeInput");
  const messages = document.getElementById("messages");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value && nomeInput.value) {
      const data = {
        user: nomeInput.value,
        message: input.value,
      };
      socket.emit("chatMessage", data);
      input.value = "";
    }
  });

  socket.on("chatMessage", function (data) {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${data.nome}</strong>: ${data.mensagem}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
});
