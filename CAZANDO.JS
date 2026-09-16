const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ==============================
// CONSTANTES
// ==============================

const ANCHO_GATO = 40;
const ALTO_GATO = 40;

const ANCHO_COMIDA = 24;
const ALTO_COMIDA = 24;

// ==============================
// VARIABLES
// ==============================

let gatoX = 180;
let gatoY = 130;

let comidaX = 60;
let comidaY = 140;

let puntaje = 0;
let tiempo = 10;

let intervalo = null;
let terminado = false;

// ==============================
// LIMPIAR CANVAS
// ==============================

function limpiarCanva() {
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}

// ==============================
// DIBUJAR GATO
// ==============================

function dibujarGato() {

    ctx.save();

    ctx.translate(gatoX, gatoY);

    // Cara
    ctx.fillStyle = "#ef9f36";

    ctx.fillRect(
        4,
        12,
        32,
        28
    );

    // Orejas
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

    // Ojos
    ctx.fillStyle = "#222222";

    ctx.fillRect(
        11,
        21,
        4,
        5
    );

    ctx.fillRect(
        25,
        21,
        4,
        5
    );

    // Nariz
    ctx.fillStyle = "#ce5770";

    ctx.fillRect(
        18,
        29,
        4,
        4
    );

    ctx.restore();
}

// ==============================
// DIBUJAR COMIDA
// ==============================

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

    // Parte verde de la comida
    ctx.fillStyle = "#367c36";

    ctx.fillRect(
        comidaX + 11,
        comidaY,
        4,
        7
    );
}

// ==============================
// DIBUJAR ESCENA
// ==============================

function dibujarEscena() {

    limpiarCanva();

    dibujarComida();

    dibujarGato();
}

// ==============================
// DETECTAR COLISIÓN
// ==============================

function hayColision() {

    return (
        gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY
    );
}

// ==============================
// COMPROBAR COLISIÓN
// ==============================

function detectarColision() {
  if (terminado || !hayColision()) return;

  puntaje = puntaje + 1;
  mostrarTexto("puntos", puntaje);

  if (puntaje >= 6) {
    // Elimina visualmente la última comida.
    limpiarCanva();
    dibujarGato();

    finalizarJuego("¡GANASTE! El gato comió 6 alimentos.");
    return;
  }

  reubicarComida();
  dibujarEscena();
}

// ==============================
// MOVER A LA IZQUIERDA
// ==============================

function moverIzquierda() {

    if (terminado) {
        return;
    }

    gatoX = Math.max(
        0,
        gatoX - 10
    );

    dibujarEscena();

    detectarColision();
}

// ==============================
// MOVER A LA DERECHA
// ==============================

function moverDerecha() {

    if (terminado) {
        return;
    }

    gatoX = Math.min(
        canvas.width - ANCHO_GATO,
        gatoX + 10
    );

    dibujarEscena();

    detectarColision();
}

// ==============================
// MOVER ARRIBA
// ==============================

function moverArriba() {

    if (terminado) {
        return;
    }

    gatoY = Math.max(
        0,
        gatoY - 10
    );

    dibujarEscena();

    detectarColision();
}

// ==============================
// MOVER ABAJO
// ==============================

function moverAbajo() {

    if (terminado) {
        return;
    }

    gatoY = Math.min(
        canvas.height - ALTO_GATO,
        gatoY + 10
    );

    dibujarEscena();

    detectarColision();
}

// ==============================
// BOTONES
// ==============================

document
    .getElementById("izquierda")
    .addEventListener(
        "click",
        moverIzquierda
    );

document
    .getElementById("derecha")
    .addEventListener(
        "click",
        moverDerecha
    );

document
    .getElementById("arriba")
    .addEventListener(
        "click",
        moverArriba
    );

document
    .getElementById("abajo")
    .addEventListener(
        "click",
        moverAbajo
    );

// ==============================
// HABILITAR BOTONES
// ==============================

document.getElementById("derecha").disabled = false;
document.getElementById("arriba").disabled = false;
document.getElementById("abajo").disabled = false;
document.getElementById("izquierda").disabled = false;

// ==============================
// FLECHAS DEL TECLADO
// ==============================

document.addEventListener(
    "keydown",
    function (evento) {

        const movimientos = {

            ArrowLeft: moverIzquierda,

            ArrowRight: moverDerecha,

            ArrowUp: moverArriba,

            ArrowDown: moverAbajo
        };

        const mover =
            movimientos[evento.key];

        if (mover) {

            evento.preventDefault();

            mover();
        }
    }
);

// ==============================
// MOSTRAR DATOS INICIALES
// ==============================

mostrarTexto(
    "puntos",
    puntaje
);

mostrarTexto(
    "tiempo",
    tiempo
);

// ==============================
// DIBUJAR JUEGO
// ==============================

dibujarEscena();
function reubicarComida() {
  // Selecciona una posición dentro del canvas.
  // Repite si la comida aparece tocando al gato.
  do {
    comidaX = generarAleatorio(
      0,
      canvas.width - ANCHO_COMIDA
    );

    comidaY = generarAleatorio(
      0,
      canvas.height - ALTO_COMIDA
    );
  } while (hayColision());
}
function restarTiempo() {
  if (terminado) return;

  tiempo = Math.max(0, tiempo - 1);
  mostrarTexto("tiempo", tiempo);

  if (tiempo === 0) {
    finalizarJuego("GAME OVER: se terminó el tiempo.");
  }
}
function finalizarJuego(texto) {
  if (terminado) return;

  terminado = true;

  clearInterval(intervalo);
  intervalo = null;

  mostrarTexto("mensaje", texto);
  alert(texto);
}
function reiniciar() {
  // Elimina cualquier intervalo anterior.
  clearInterval(intervalo);
  intervalo = null;

  puntaje = 0;
  tiempo = 10;
  terminado = false;

  gatoX = 180;
  gatoY = 130;

  comidaX = 60;
  comidaY = 140;

  mostrarTexto("puntos", puntaje);
  mostrarTexto("tiempo", tiempo);
  mostrarTexto("mensaje", "¡Atrapa la comida!");

  dibujarEscena();

  intervalo = setInterval(restarTiempo, 1000);
}

document.getElementById("reiniciar")
  .addEventListener("click", reiniciar);