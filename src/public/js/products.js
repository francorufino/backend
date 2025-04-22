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
    if (category) url += `&category=${category}`;
    if (sort) url += `&sort=${sort}`;
    if (search) url += `&search=${search}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        productList.innerHTML = "";

        productList.style.display = "flex";
        productList.style.flexWrap = "wrap";
        productList.style.justifyContent = "center";
        productList.style.gap = "4px";

        data.docs.forEach((product) => {
          const item = document.createElement("div");
          item.style =
            "border: 1px solid #ccc; padding: 1rem; width: 200px; text-align: center;";

          const imagePath = product.image ? `/static/${product.image}` : "";

          item.innerHTML = `
            <img src="${imagePath}" alt="${
            product.name
          }" style="width:100%; height:auto; object-fit:cover; margin-bottom: 8px;" />
            <h3>${product.name}</h3>
            <p><strong>R$ ${product.price.toFixed(2)}</strong></p>
            <p><em>${product.category}</em></p>
            <p>${product.description}</p>
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

  loadProducts();
});
