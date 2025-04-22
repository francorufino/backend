document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalAmount = document.getElementById("total-amount");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((product, index) => {
      const subtotal = product.price * product.quantity;
      total += subtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.name}</td>
        <td>R$ ${product.price.toFixed(2)}</td>
        <td>${product.quantity}</td>
        <td>R$ ${subtotal.toFixed(2)}</td>
        <td>
          <button onclick="removeItem(${index})">Remover</button>
        </td>
      `;
      cartItemsContainer.appendChild(row);
    });

    totalAmount.textContent = `Total: R$ ${total.toFixed(2)}`;
  }

  window.removeItem = function (index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  renderCart();
});
