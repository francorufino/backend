document.addEventListener("DOMContentLoaded", () => {
  let page = 1;
  const limit = 9;

  const categorySelect = document.getElementById("category");
  const sortSelect = document.getElementById("sort");
  const searchInput = document.getElementById("search");
  const productList = document.getElementById("product-list");
  const currentPageLabel = document.getElementById("currentPage");

  function loadProducts() {
    const category = categorySelect.value;
    const sort = sortSelect.value;
    const search = searchInput.value;

    let url = `/api/products?page=${page}&limit=${limit}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    if (sort) url += `&sort=${sort}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let products = data.docs;

        // 1️⃣ PRIORIDADE para produtos com imagem diferente do placeholder
        products.sort((a, b) => {
          const imgA = a.image?.trim().toLowerCase();
          const imgB = b.image?.trim().toLowerCase();
          const isDefaultA = !imgA || imgA === "img/products/comingsoon.jpg";
          const isDefaultB = !imgB || imgB === "img/products/comingsoon.jpg";
          return isDefaultA - isDefaultB; // false < true, então vem antes
        });

        productList.innerHTML = "";

        productList.style.display = "flex";
        productList.style.flexWrap = "wrap";
        productList.style.justifyContent = "center";
        productList.style.gap = "4px";

        products.forEach((product) => {
          const item = document.createElement("div");
          item.style =
            "border: 1px solid #ccc; padding: 1rem; width: 200px; text-align: center; background: white;";

          const imagePath =
            product.image && product.image.trim()
              ? `/static/${product.image.trim()}`
              : `/static/img/products/comingsoon.jpg`;

          const isOutOfStock = product.stock <= 0;

          item.innerHTML = `
            <img src="${imagePath}" alt="${product.name}" 
              style="width:100%; height:auto; object-fit:cover; margin-bottom: 8px;" 
              onerror="this.onerror=null; this.src='/static/img/products/comingsoon.jpg';"
            />
            <h3>${product.name}</h3>
            <p><strong>R$ ${product.price.toFixed(2)}</strong></p>
            <p><em>${product.category}</em></p>
            <p>${product.description}</p>
            <label for="quantity-${product._id}">Quantidade:</label>
            <input type="number" id="quantity-${product._id}" data-id="${
            product._id
          }" min="1" value="1" style="width: 60px; margin-bottom: 8px;" ${
            isOutOfStock ? "disabled" : ""
          } />
            <button class="add-to-cart-btn" data-id="${
              product._id
            }" data-price="${product.price}" style="margin-top: 8px;" ${
            isOutOfStock ? "disabled" : ""
          }>
              ${isOutOfStock ? "Esgotado" : "Adicionar ao carrinho"}
            </button>
          `;

          productList.appendChild(item);
        });

        currentPageLabel.textContent = `Página ${data.page}`;
        document.getElementById("prevPage").disabled = !data.hasPrevPage;
        document.getElementById("nextPage").disabled = !data.hasNextPage;
      })
      .catch((err) => {
        productList.innerHTML = "<p>Erro ao carregar produtos</p>";
        console.error(err);
      });
  }

  categorySelect.addEventListener("change", () => {
    page = 1;
    loadProducts();
  });

  sortSelect.addEventListener("change", () => {
    page = 1;
    loadProducts();
  });

  searchInput.addEventListener("input", () => {
    page = 1;
    loadProducts();
  });

  document.getElementById("prevPage").addEventListener("click", () => {
    if (page > 1) {
      page--;
      loadProducts();
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    page++;
    loadProducts();
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn") && !e.target.disabled) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const productId = e.target.getAttribute("data-id");
      const price = parseFloat(e.target.getAttribute("data-price"));
      const quantityInput = document.querySelector(`#quantity-${productId}`);
      const quantity = parseInt(quantityInput.value) || 1;

      const productCard = e.target.closest("div");
      const productName = productCard.querySelector("h3").innerText;

      const existingProductIndex = cart.findIndex(
        (item) => item.id === productId
      );

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
        cart[existingProductIndex].total = (
          cart[existingProductIndex].quantity * price
        ).toFixed(2);
      } else {
        const newProduct = {
          id: productId,
          name: productName,
          quantity: quantity,
          price: price,
          total: (price * quantity).toFixed(2),
        };
        cart.push(newProduct);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("Carrinho atualizado:", cart);
      alert(`Adicionado ${quantity}x ${productName} ao carrinho!`);
    }
  });

  loadProducts();
});
