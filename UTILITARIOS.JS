// Devuelve un número entero entre mínimo y máximo, incluidos.
function generarAleatorio(minimo, maximo) {
  return Math.floor(
    Math.random() * (maximo - minimo + 1)
  ) + minimo;
}

// Actualiza el texto de un elemento de la página.
function mostrarTexto(id, valor) {
  document.getElementById(id).textContent = valor;
}