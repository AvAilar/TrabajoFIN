function mostrarVentanaMonto() {
  document.getElementById("modalMonto").style.display = "flex";
}

function guardarMonto() {
  const monto = parseFloat(document.getElementById("inputMonto").value);
  if (isNaN(monto) || monto <= 0) {
    alert("Por favor, ingresa un monto válido.");
    return;
  }
  localStorage.setItem("montoIngresado", monto.toFixed(2));
  window.location.href = "pagina2.html";
}

  
  