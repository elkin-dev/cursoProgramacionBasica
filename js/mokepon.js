
const sectionSelecciorAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')

const botonMascotaJugador = document.getElementById('btn-mascota')
const btnReiniciar = document.getElementById('btn-reiniciar')

const setcionMensajes = document.getElementById('resultado')
const ataquesJugador = document.getElementById('ataques-jugador')
const ataquesEnemigo = document.getElementById('ataques-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionSelecciorMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contedor-ataques')


let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let botones = []
let opcionMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let ataquesMokeponEnemigo
let ataquesMokepon
let indexAtaqueJugador
let indexAtaqueEnemigo
let btnFuego
let btnAgua
let btnTierra
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre
    this.foto = foto
    this.vida = vida
    this.ataques = []
  }
}

let hipodoge = new Mokepon("Hipodoge", '/assets/tipoAgua.png', 5)
let capipepo = new Mokepon("Capipepo", '/assets/tipoFuego.png', 5)
let ratigueya = new Mokepon("Ratigueya", '/assets/tipoTierra.png', 5)

hipodoge.ataques.push(
  { nombre: '💧', id: 'btn-agua' },
  { nombre: '💧', id: 'btn-agua' },
  { nombre: '💧', id: 'btn-agua' },
  { nombre: '🔥', id: 'btn-fuego' },
  { nombre: '🌱', id: 'btn-tierra' }
)

capipepo.ataques.push(
  { nombre: '🔥', id: 'btn-fuego' },
  { nombre: '🔥', id: 'btn-fuego' },
  { nombre: '🔥', id: 'btn-fuego' },
  { nombre: '💧', id: 'btn-agua' },
  { nombre: '🌱', id: 'btn-tierra' }
)

ratigueya.ataques.push(
  { nombre: '🌱', id: 'btn-tierra' },
  { nombre: '🌱', id: 'btn-tierra' },
  { nombre: '🌱', id: 'btn-tierra' },
  { nombre: '🔥', id: 'btn-fuego' },
  { nombre: '💧', id: 'btn-agua' }
)
//  Agregando los mokepones ya con sus ataques
mokepones.push(hipodoge, capipepo, ratigueya)


function iniciarJuego() {
  // Ocultando la seccion selecionar ataque
  sectionSelecciorAtaque.style.display = 'none'
  sectionReiniciar.style.display = 'none'

  mokepones.forEach(mokepon => {
    opcionMokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
    <label class="tarjeta-mokepon" for=${mokepon.nombre}>
      <p>${mokepon.nombre}</p>
      <img src=${mokepon.foto} alt=${mokepon.nombre} />
    </label>
  `
    contenedorTarjetas.innerHTML += opcionMokepones

    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')
  });



  botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

  btnReiniciar.addEventListener('click', reiniciarJuego)
}


function ataqueAleatorioEnemigo() {
  let _ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo - 1)
  if (_ataqueAleatorio == 0 || _ataqueAleatorio == 1) {
    ataqueEnemigo.push('FUEGO')
  } else if (_ataqueAleatorio == 3 || _ataqueAleatorio == 4) {
    ataqueEnemigo.push('AGUA')
  } else {
    ataqueEnemigo.push('TIERRA')
  }
  console.log(ataqueEnemigo);
  iniciarPelea()

}

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate()

  }
}

function crearMensaje(resultado) {
  let _nuevoAtaqueJugador = document.createElement('p')
  let _nuevoAtaqueEnemigo = document.createElement('p')

  setcionMensajes.innerHTML = resultado
  _nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
  _nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

  ataquesJugador.appendChild(_nuevoAtaqueJugador)
  ataquesEnemigo.appendChild(_nuevoAtaqueEnemigo)
}

function inedexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador]
  indexAtaqueEnemigo = ataqueEnemigo[enemigo]

}

function combate() {

  for (let i = 0; i < ataqueJugador.length; i++) {
    if (ataqueJugador[i] === ataqueEnemigo[i]) {
      inedexAmbosOponentes(i, i)
      crearMensaje('EMPATE')
    } else if (
      (ataqueJugador[i] == 'FUEGO' && ataqueEnemigo[i] == 'TIERRA') ||
      (ataqueJugador[i] == 'AGUA' && ataqueEnemigo[i] == 'FUEGO') ||
      (ataqueJugador[i] == 'TIERRA' && ataqueEnemigo[i] == 'AGUA')) {
      inedexAmbosOponentes(i, i)
      crearMensaje('GANASTE')
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador
    } else {
      inedexAmbosOponentes(i, i)
      crearMensaje('PERDISTE')
      victoriasEnemigo++
      spanVidasEnemigo.innerHTML = victoriasEnemigo
    }
  }

  //Revisar las vidas
  revisarVictorias()
}

function revisarVictorias() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal('Esto fue un EMPATE!!!')
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal('Felicitaciones! GANASTES 🥇')
  }
  else {
    crearMensajeFinal('Lo siento, PERDISTES 😭')
  }


}


function crearMensajeFinal(resuladoFinal) {
  setcionMensajes.innerHTML = resuladoFinal

  sectionReiniciar.style.display = 'block'
}


function seleccionarMascotaJugador() {
  sectionSelecciorMascota.style.display = 'none'
  // Mostrando esta seccion antes de operar el codigo de seleccionarMascotaJugador
  sectionSelecciorAtaque.style.display = 'flex'
  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id
    mascotaJugador = inputHipodoge.id
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id
    mascotaJugador = inputCapipepo.id
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id
    mascotaJugador = inputRatigueya.id
  } else {
    alert('Selecciona una mascota!!!')
  }
  extraerAtaques(mascotaJugador)
  seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador) {
  let ataques
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques
    }

  }
  mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `<button id=${ataque.id} class="btn-ataque BAtaque">${ataque.nombre}</button>`
    contenedorAtaques.innerHTML += ataquesMokepon
  })
  btnFuego = document.getElementById('btn-fuego')
  btnAgua = document.getElementById('btn-agua')
  btnTierra = document.getElementById('btn-tierra')
  // Selecciono todos los elementos del HTML que comparten las clase de BAtaques, guardandolos en el arreglo de botones
  botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaques() {
  botones.forEach(boton => {
    boton.addEventListener('click', (e) => {

      if (e.target.textContent === '🔥') {
        ataqueJugador.push('FUEGO')
        console.log(ataqueJugador);
        boton.style.background = '#d1ddffed';
        boton.disabled = true

      } else if (e.target.textContent === '💧') {
        ataqueJugador.push('AGUA')
        console.log(ataqueJugador);
        boton.style.background = '#d1ddffed'
        boton.disabled = true
      } else {
        ataqueJugador.push('TIERRA')
        console.log(ataqueJugador);
        boton.style.background = '#d1ddffed'
        boton.disabled = true
      }
      ataqueAleatorioEnemigo()
    })
  })

}

function seleccionarMascotaEnemigo() {
  let _mascotaAleatorio = aleatorio(0, mokepones.length - 1)

  spanMascotaEnemigo.innerHTML = mokepones[_mascotaAleatorio].nombre
  ataquesMokeponEnemigo = mokepones[_mascotaAleatorio].ataques
  secuenciaAtaques()
}

function reiniciarJuego() {
  location.reload()
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// Para ejecutar el js luego de que carge todo el codigo HTML dejandolo en el title del HTML
window.addEventListener("load", iniciarJuego)



