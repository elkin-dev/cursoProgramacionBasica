let nombre = "";
nombre = prompt("Cuál es tu nombre?");
alert("Bienvenida " + nombre);
//1 es piedra, 2 es papel, 3 es tijera

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function eleccion(jugada) {
  let _resultado = "";
  if (jugada == 1) {
    _resultado = "Piedra 🪨";
  } else if (jugada == 2) {
    _resultado = "Papel 📋";
  } else if (jugada == 3) {
    _resultado = "Tijera ✂️";
  } else {
    _resultado = "Mal elegido";
  }
  return _resultado;
}

let min = 1;
let max = 3;

let jugador = 0;
let pc = 0;
let triunfos = 0;
let perdidas = 0;

while (triunfos < 3 && perdidas < 3) {
  pc = aleatorio(1, 3);
  jugador = prompt("Elige: 1. Piedra, 2. Papel, 3. Tijera");

  alert("Tu eliges: " + eleccion(jugador));
  alert("Pc elige: " + eleccion(pc));

  // COMBATE
  if (pc == jugador) {
    alert("EMPATE");
  } else if (
    (jugador == 1 && pc == 3) ||
    (jugador == 2 && pc == 1) ||
    (jugador == 3 && pc == 2)
  ) {
    alert("GANASTE");
    triunfos = triunfos + 1;
  } else {
    alert("PERDIDTES");
    perdidas = perdidas + 1;
  }
}
alert("Ganaste " + triunfos + " veces. Perdistes " + perdidas + " veces.");
