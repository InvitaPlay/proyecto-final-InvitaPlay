document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-container");
  const cartList = document.getElementById("cart-list");
  const cartTotal = document.getElementById("cart-total");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  fetch("data/productos.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("col-md-4");
        div.innerHTML = `
          <div class="card mb-4 shadow-sm">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" />
            <div class="card-body">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text fw-bold">$${producto.precio}</p>
              <button class="btn btn-success add-to-cart" data-id="${producto.id}">Agregar al carrito</button>
              <a href="${producto.link}" target="_blank" class="btn btn-outline-primary mt-2">Ver Demo</a>
            </div>
          </div>
        `;
        container.appendChild(div);
      });

      document.querySelectorAll(".add-to-cart").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = parseInt(btn.dataset.id);
          const producto = data.find((p) => p.id === id);
          const existe = carrito.find((p) => p.id === id);
          if (existe) {
            existe.cantidad++;
          } else {
            carrito.push({ ...producto, cantidad: 1 });
          }
          actualizarCarrito();
        });
      });

      actualizarCarrito();
    });

  function actualizarCarrito() {
    cartList.innerHTML = "";
    let total = 0;
    carrito.forEach((p) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        <span>${p.nombre} x${p.cantidad}</span>
        <div>
          <span class="me-3">$${p.precio * p.cantidad}</span>
          <button class="btn btn-sm btn-danger remove-item" data-id="${p.id}">X</button>
        </div>
      `;
      cartList.appendChild(li);
      total += p.precio * p.cantidad;
    });
    cartTotal.textContent = total;
    localStorage.setItem("carrito", JSON.stringify(carrito));

    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id);
        carrito = carrito.filter((p) => p.id !== id);
        actualizarCarrito();
      });
    });
  }
  const reseñas = [
  { nombre: "María Guerro.", texto: "La invitación de cumpleaños es genial!" },
  { nombre: "Carlos Talamonti.", texto: "Excelente calidad y atención." }
];

const reviewsContainer = document.getElementById("reviews-container");
reseñas.forEach(r => {
  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = `
    <div class="card h-100 border-0 shadow-sm">
      <div class="card-body">
        <p class="card-text">"${r.texto}"</p>
        <h6 class="card-subtitle text-muted mt-2">– ${r.nombre}</h6>
      </div>
    </div>
  `;
  reviewsContainer.appendChild(div);
});


});
