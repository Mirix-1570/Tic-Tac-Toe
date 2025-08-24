

//Llama del html al tablero
const board = document.getElementById('board');

//Llama del html las casillas
const cells = board.getElementsByClassName('cell');
console.log(cells);


//Llama del html al boton de reiniciar
const btnReiniciar = document.getElementById('btnReiniciar');

//Define las combinaciones ganadoras
const combinacionesGanadoras = [
    // Horizontales
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Verticales
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonales
    [0, 4, 8],
    [2, 4, 6]
];

//Declara quien es el jugador
const playerComputer = 'O';
const playerHuman = 'X';
let currentPlayer = playerHuman;


//Partida en curso
let juegoActivo = true;

//Declara contadores de victorias por jugador
let contadorX = parseInt(localStorage.getItem('victoriasX')) || 0;
let contadorO = parseInt(localStorage.getItem('victoriasO')) || 0;

//Funcion del boton reiniciar
function reiniciarPagina() {
    location.reload();
}
//Llamado de la funcion del boton reiniciar
btnReiniciar.addEventListener('click', reiniciarPagina);

//Condicional de partida en curso
if (juegoActivo) {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

//Recorrido de celdas
for (let index = 0; index < cells.length; index++) {
    
    //click con condicional para definir que pasa al darle click a la celda
    cells[index].addEventListener("click",function () {
        if (!juegoActivo) return;

        cells[index].textContent = playerHuman

        function revisarGanador() {
            for (let i = 0; i < combinacionesGanadoras.length; i++) {
            const combinacion = combinacionesGanadoras[i];

            const celdaA = cells[combinacion[0]];
            const celdaB = cells[combinacion[1]];
            const celdaC = cells[combinacion[2]];

                if (celdaA.textContent !== "" &&
                    celdaA.textContent === celdaB.textContent &&
                    celdaA.textContent === celdaC.textContent) {
                    
                    alert(`¡El jugador ${celdaA.textContent} ha ganado!`);
                    juegoActivo = false;
                    location.reload();
                    return;
                }
            }
        
        
    }
    revisarGanador();

    
        
       function checkCells() {
        let isempty = false
        while(!isempty){
            const randomcell = Math.floor(Math.random() * 9);
            if (cells[randomcell].textContent === "") {
            cells[randomcell].textContent = playerComputer
            isempty = true
       }
       }
        }

    setTimeout(
        function () {
            checkCells();
        }, 1000
    )

    });
    
}


