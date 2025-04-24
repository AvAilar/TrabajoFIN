// Simulación de base de datos en memoria
const DB = {
    productos: [
      { id: 1, nombre: "Paracetamol", precio: 2.5, stock: 20 },
      { id: 2, nombre: "Ibuprofeno", precio: 3.0, stock: 15 },
      { id: 3, nombre: "Omeprazol", precio: 1.8, stock: 10 },
      { id: 4, nombre: "Loratadina", precio: 2.0, stock: 25 },
      { id: 5, nombre: "Vitamina C", precio: 1.2, stock: 30 },
    ],
    carrito: []
  };
  
  function guardarEstado() {
    localStorage.setItem("DB", JSON.stringify(DB));
  }
  
  function cargarEstado() {
    const dbGuardado = localStorage.getItem("DB");
    if (dbGuardado) {
      const data = JSON.parse(dbGuardado);
      DB.productos = data.productos;
      DB.carrito = data.carrito;
    }
  }
  
  cargarEstado();
  