let productoActual = null;

window.onload = () => {
  const monto = localStorage.getItem("montoIngresado") || "0.00";
  document.getElementById("montoMostrado").textContent = `S/ ${monto}`;
  renderizarProductos();
  renderizarCarrito();
};

function renderizarProductos() {
  const contenedor = document.getElementById("listaProductos");
  contenedor.innerHTML = "";

  DB.productos.forEach(producto => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Stock: ${producto.stock}</p>
      <p>Precio: S/ ${producto.precio.toFixed(2)}</p>
      <button onclick="mostrarModal(${producto.id})">Agregar</button>
    `;
    contenedor.appendChild(div);
  });
}

function mostrarModal(id) {
  productoActual = DB.productos.find(p => p.id === id);
  if (productoActual.stock <= 0) {
    alert("Sin stock disponible.");
    return;
  }

  document.getElementById("modalNombre").textContent = productoActual.nombre;
  document.getElementById("cantidad").value = 1;
  actualizarPrecioTotal();
  document.getElementById("modalProducto").style.display = "flex";
}

function actualizarPrecioTotal() {
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const total = cantidad * productoActual.precio;
  document.getElementById("precioTotal").textContent = total.toFixed(2);
}

function confirmarAgregar() {
  const cantidad = parseInt(document.getElementById("cantidad").value);
  if (cantidad > productoActual.stock) {
    alert("No hay suficiente stock.");
    return;
  }

  // Actualizar stock y carrito
  productoActual.stock -= cantidad;
  DB.carrito.push({
    id: productoActual.id,
    nombre: productoActual.nombre,
    cantidad,
    precio: productoActual.precio,
    total: (cantidad * productoActual.precio).toFixed(2)
  });

  guardarEstado();
  renderizarProductos();
  renderizarCarrito();
  document.getElementById("modalProducto").style.display = "none";
}

function renderizarCarrito() {
  const lista = document.getElementById("carritoLista");
  lista.innerHTML = "";

  if (DB.carrito.length === 0) {
    document.getElementById("carritoSeccion").style.display = "none";
    return;
  }

  DB.carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.cantidad} x ${item.nombre} = S/ ${item.total} 
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
    lista.appendChild(li);
  });

  document.getElementById("carritoSeccion").style.display = "block";
}

function eliminarDelCarrito(index) {
  const item = DB.carrito[index];
  const producto = DB.productos.find(p => p.id === item.id);
  producto.stock += item.cantidad;
  DB.carrito.splice(index, 1);

  guardarEstado();
  renderizarProductos();
  renderizarCarrito();
}

function confirmarPedido() {
  const totalPedido = DB.carrito.reduce((sum, item) => sum + parseFloat(item.total), 0);
  let monto = parseFloat(localStorage.getItem("montoIngresado") || "0");

  if (totalPedido > monto) {
    alert("Monto insuficiente.");
    return;
  }

  monto -= totalPedido;
  localStorage.setItem("montoIngresado", monto.toFixed(2));
  document.getElementById("montoMostrado").textContent = `S/ ${monto.toFixed(2)}`;

  alert("Pedido confirmado. ¡Gracias!");
  DB.carrito = [];
  guardarEstado();
  renderizarCarrito();
}

