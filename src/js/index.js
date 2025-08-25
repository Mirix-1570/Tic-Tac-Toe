// Llama del html al tablero
const board = document.getElementById('board');
const cells = board.getElementsByClassName('cell');
const btnReiniciar = document.getElementById('btnReiniciar');

// Define las combinaciones ganadoras
const combinacionesGanadoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Declara quien es el jugador
const playerComputer = 'O';
const playerHuman = 'X';

// Estadísticas
let movimientosX = 0;
let movimientosO = 0;
let empates = parseInt(localStorage.getItem('empates')) || 0;
let contadorX = parseInt(localStorage.getItem('victoriasX')) || 0;
let contadorO = parseInt(localStorage.getItem('victoriasO')) || 0;

// Partida en curso
let juegoActivo = true;

// Función para actualizar las estadísticas en html
function actualizarEstadísticas() {
    document.getElementById('victoriasX').textContent = contadorX;
    document.getElementById('derrotasX').textContent = contadorO;
    document.getElementById('movimientosX').textContent = movimientosX;
    document.getElementById('victoriasO').textContent = contadorO;
    document.getElementById('derrotasO').textContent = contadorX;
    document.getElementById('movimientosO').textContent = movimientosO;
    document.getElementById('empates').textContent = empates;
}

// Llama a la funcion para mostrar los valores al cargar la pagina
actualizarEstadísticas();

// Función para revisar ganador o empate
function revisarGanador() {
    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        const combinacion = combinacionesGanadoras[i];
        const celdaA = cells[combinacion[0]];
        const celdaB = cells[combinacion[1]];
        const celdaC = cells[combinacion[2]];

        if (
            celdaA.textContent !== "" &&
            celdaA.textContent === celdaB.textContent &&
            celdaA.textContent === celdaC.textContent
        ) {
            juegoActivo = false;
            if (celdaA.textContent === playerHuman) {
                contadorX++;
                localStorage.setItem('victoriasX', contadorX);
                alert('¡Ganaste!');
            } else {
                contadorO++;
                localStorage.setItem('victoriasO', contadorO);
                alert('¡Perdiste!');
            }
            actualizarEstadísticas();
            location.reload();
            return true;
        }
    }
    // Empate
    if ([...cells].every(cell => cell.textContent !== "")) {
        empates++;
        localStorage.setItem('empates', empates);
        alert('Empate');
        juegoActivo = false;
        actualizarEstadísticas();
        location.reload();
        return true;
    }
    return false;
}

// Función para la jugada de la máquina
function jugadaMaquina() {
    if (!juegoActivo) return;
    let vacias = [];
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === "") vacias.push(i);
    }
    if (vacias.length === 0) return;
    const randomCell = vacias[Math.floor(Math.random() * vacias.length)];
    cells[randomCell].textContent = playerComputer;
    movimientosO++;
    actualizarEstadísticas();
    revisarGanador();
}

// Evento click para cada celda (jugador humano)
for (let index = 0; index < cells.length; index++) {
    cells[index].addEventListener("click", function () {
        if (!juegoActivo) return;
        if (cells[index].textContent !== "") return;

        cells[index].textContent = playerHuman;
        movimientosX++;
        actualizarEstadísticas();

        // Si no hay ganador ni empate, juega la máquina
        if (!revisarGanador()) {
            setTimeout(jugadaMaquina, 500);
        }
    });
}

// Botón para reiniciar el tablero (sin recargar la página)
btnReiniciar.addEventListener('click', function () {
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
    }
    juegoActivo = true;
    movimientosX = 0;
    movimientosO = 0;
    actualizarEstadísticas();
});

