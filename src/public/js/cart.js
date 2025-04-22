document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalAmount = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkout-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
      totalAmount.textContent = "0.00";
      return;
    }

    cart.forEach((product, index) => {
      const subtotal = product.price * product.quantity;
      total += subtotal;

      const row = document.createElement("div");
      row.style =
        "display: flex; justify-content: space-between; border-bottom: 1px solid #ccc; padding: 1rem 0;";
      row.innerHTML = `
        <div>
          <h3>${product.name}</h3>
          <p><strong>Preço unitário:</strong> R$ ${parseFloat(
            product.price
          ).toFixed(2)}</p>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <button class="decrease" data-index="${index}">-</button>
            <span class="quantity" id="qty-${index}">${product.quantity}</span>
            <button class="increase" data-index="${index}">+</button>
          </div>
        </div>
        <div>
          <p><strong>Subtotal:</strong> R$ <span class="subtotal" id="subtotal-${index}">${subtotal.toFixed(
        2
      )}</span></p>
          <button onclick="removeItem(${index})">Remover</button>
        </div>
      `;
      cartItemsContainer.appendChild(row);
    });

    totalAmount.textContent = total.toFixed(2);
    updateCartStorage();
  }

  window.removeItem = function (index) {
    cart.splice(index, 1);
    renderCart();
  };

  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("increase")) {
      const index = parseInt(e.target.dataset.index);
      cart[index].quantity++;
    } else if (e.target.classList.contains("decrease")) {
      const index = parseInt(e.target.dataset.index);
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      }
    }
    renderCart();
  });

  checkoutBtn.addEventListener("click", async () => {
    if (cart.length === 0) return alert("Seu carrinho está vazio!");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });

      if (response.ok) {
        alert("Compra finalizada com sucesso!");
        localStorage.removeItem("cart");
        cart = [];
        renderCart();
      } else {
        alert("Erro ao finalizar a compra.");
      }
    } catch (err) {
      console.error("Erro na finalização:", err);
      alert("Ocorreu um erro ao finalizar a compra.");
    }
  });

  renderCart();
});
