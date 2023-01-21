// Para ejecutar el js luego de que carge todo el codigo HTML dejandolo en el title del HTML
window.addEventListener("load", iniciarJuego)
let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego() {
  // Ocultando la seccion selecionar ataque
  let _sectionSelecciorAtaque = document.getElementById('seleccionar-ataque')
  _sectionSelecciorAtaque.style.display = 'none'

  let _sectionReiniciar = document.getElementById('reiniciar')
  _sectionReiniciar.style.display = 'none'

  let _botonMascotaJugador = document.getElementById('btn-mascota')
  _botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

  let _btnFuego = document.getElementById('btn-fuego')
  _btnFuego.addEventListener('click', ataqueFuego)
  let _btnAgua = document.getElementById('btn-agua')
  _btnAgua.addEventListener('click', ataqueAgua)
  let _btnTierra = document.getElementById('btn-tierra')
  _btnTierra.addEventListener('click', ataqueTierra)

  let _btnReiniciar = document.getElementById('btn-reiniciar')
  _btnReiniciar.addEventListener('click', reiniciarJuego)
}

function ataqueFuego() {
  ataqueJugador = 'FUEGO'
  ataqueAleatorioEnemigo()
}
function ataqueAgua() {
  ataqueJugador = 'AGUA'
  ataqueAleatorioEnemigo()
}
function ataqueTierra() {
  ataqueJugador = 'TIERRA'
  ataqueAleatorioEnemigo()
} 

function ataqueAleatorioEnemigo() {
  let _ataqueAleatorio = aleatorio(1, 3)

  if (_ataqueAleatorio == 1) {
    ataqueEnemigo = 'FUEGO'
  } else if (_ataqueAleatorio == 2) {
    ataqueEnemigo = 'AGUA'
  } else {
    ataqueEnemigo = 'TIERRA'
  }
  combate()

}

function crearMensaje(resultadoCombate) {
  let _setcionMensajes = document.getElementById('mensajes')
  let _parrafo = document.createElement('p')
  _parrafo.innerHTML = 'Tu mascota ataco con ' + ataqueJugador + ' la mascota del enemigo ataco con ' + ataqueEnemigo + ' - ' + resultadoCombate
  _setcionMensajes.appendChild(_parrafo)


}

function combate() {
  let _spanVidasJugador = document.getElementById('vidas-jugador')
  let _spanVidasEnemigo = document.getElementById('vidas-enemigo')

  if (ataqueJugador == ataqueEnemigo) {
    crearMensaje('EMPATE')
    _spanVidasEnemigo.innerHTML = vidasEnemigo
    _spanVidasJugador.innerHTML = vidasJugador
  } else if (
    (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') ||
    (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') ||
    (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA')
  ) {
    crearMensaje('GANASTE')
    vidasEnemigo--
    _spanVidasEnemigo.innerHTML = vidasEnemigo
  } else {
    crearMensaje('PERDISTE')
    vidasJugador--
    _spanVidasJugador.innerHTML = vidasJugador

  }
  //Revisar las vidas
  revisarVidas()
}

function revisarVidas() {
  if (vidasEnemigo == 0) {
    crearMensajeFinal('Felicitaciones! GANASTES 🥇')
  } else if (vidasJugador == 0) {
    crearMensajeFinal('Lo siento, PERDISTES 😭')
  }
}

function crearMensajeFinal(resuladoFinal) {
  let _setcionMensajes = document.getElementById('mensajes')
  let _parrafo = document.createElement('p')
  _parrafo.innerHTML = resuladoFinal
  _setcionMensajes.appendChild(_parrafo)

  let _btnFuego = document.getElementById('btn-fuego')
  _btnFuego.disabled = true
  let _btnAgua = document.getElementById('btn-agua')
  _btnAgua.disabled = true
  let _btnTierra = document.getElementById('btn-tierra')
  _btnTierra.disabled = true
  let _sectionReiniciar = document.getElementById('reiniciar')
  _sectionReiniciar.style.display = 'block'
}


function seleccionarMascotaJugador() {
  let _sectionSelecciorMascota = document.getElementById('seleccionar-mascota')
  _sectionSelecciorMascota.style.display = 'none'

  // Mostrando esta seccion antes de operar el codigo de seleccionarMascotaJugador
  let _sectionSelecciorAtaque = document.getElementById('seleccionar-ataque')
  _sectionSelecciorAtaque.style.display = 'block'

  let _inputHipodoge = document.getElementById('hipodoge')
  let _inputCapipepo = document.getElementById('capipepo')
  let _inputRatigueya = document.getElementById('ratigueya')
  let _spanMascotaJugador = document.getElementById('mascota-jugador')

  if (_inputHipodoge.checked) {
    _spanMascotaJugador.innerHTML = 'Hipodoge'
  } else if (_inputCapipepo.checked) {
    _spanMascotaJugador.innerHTML = 'Capipepo'
  } else if (_inputRatigueya.checked) {
    _spanMascotaJugador.innerHTML = 'Ratigueya'
  } else {
    alert('No ha seleccionado una mascota!!!')
  }
  seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
  let _mascotaAleatorio = aleatorio(1, 3)
  let _spanMascotaEnemigo = document.getElementById('mascota-enemigo')

  if (_mascotaAleatorio == 1) {
    _spanMascotaEnemigo.innerHTML = 'Hipodoge'
  } else if (_mascotaAleatorio == 2) {
    _spanMascotaEnemigo.innerHTML = 'Capipepo'
  } else {
    _spanMascotaEnemigo.innerHTML = 'Ratigueya'
  }
}

function reiniciarJuego() {
  location.reload()
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}




