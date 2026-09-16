const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ANCHO_GATO = 40;
const ALTO_GATO = 40;

const ANCHO_COMIDA = 24;
const ALTO_COMIDA = 24;

let gatoX = 180;
let gatoY = 130;

let comidaX = 60;
let comidaY = 140;

let puntaje = 0;
let tiempo = 10;
let intervalo = null;
let terminado = false;

function limpiarCanva() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarGato() {
  ctx.save();
  ctx.translate(gatoX, gatoY);

  // Cara.
  ctx.fillStyle = "#ef9f36";
  ctx.fillRect(4, 12, 32, 28);

  // Orejas.
  ctx.beginPath();
  ctx.moveTo(4, 16);
  ctx.lineTo(4, 0);
  ctx.lineTo(17, 12);
  ctx.closePath();

  ctx.moveTo(23, 12);
  ctx.lineTo(36, 0);
  ctx.lineTo(36, 16);
  ctx.closePath();
  ctx.fill();

  // Ojos.
  ctx.fillStyle = "#222222";
  ctx.fillRect(11, 21, 4, 5);
  ctx.fillRect(25, 21, 4, 5);

  // Nariz.
  ctx.fillStyle = "#ce5770";
  ctx.fillRect(18, 29, 4, 4);

  ctx.restore();
}

function dibujarComida() {
  ctx.fillStyle = "#edcc22";
  ctx.beginPath();

  ctx.ellipse(
    comidaX + ANCHO_COMIDA / 2,
    comidaY + ALTO_COMIDA / 2,
    ANCHO_COMIDA / 2,
    ALTO_COMIDA / 2,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.fillStyle = "#367c36";
  ctx.fillRect(comidaX + 11, comidaY, 4, 7);
}

function dibujarEscena() {
  limpiarCanva();
  dibujarComida();
  dibujarGato();
}

function moverIzquierda() {
  if (terminado) return;

  gatoX = Math.max(0, gatoX - 10);

  limpiarCanva();
  dibujarGato();
  dibujarComida();
}

document.getElementById("izquierda")
  .addEventListener("click", moverIzquierda);

mostrarTexto("puntos", puntaje);
mostrarTexto("tiempo", tiempo);
dibujarEscena();
function moverDerecha() {
  if (terminado) return;

  gatoX = Math.min(
    canvas.width - ANCHO_GATO,
    gatoX + 10
  );

  dibujarEscena();
}

function moverArriba() {
  if (terminado) return;

  gatoY = Math.max(0, gatoY - 10);

  dibujarEscena();
}

function moverAbajo() {
  if (terminado) return;

  gatoY = Math.min(
    canvas.height - ALTO_GATO,
    gatoY + 10
  );

  dibujarEscena();
}

document.getElementById("derecha").disabled = false;
document.getElementById("arriba").disabled = false;
document.getElementById("abajo").disabled = false;

document.getElementById("derecha")
  .addEventListener("click", moverDerecha);

document.getElementById("arriba")
  .addEventListener("click", moverArriba);

document.getElementById("abajo")
  .addEventListener("click", moverAbajo);

// También permite utilizar las flechas del teclado.
document.addEventListener("keydown", function (evento) {
  const movimientos = {
    ArrowLeft: moverIzquierda,
    ArrowRight: moverDerecha,
    ArrowUp: moverArriba,
    ArrowDown: moverAbajo
  };

  const mover = movimientos[evento.key];

  if (mover) {
    evento.preventDefault();
    mover();
  }
});