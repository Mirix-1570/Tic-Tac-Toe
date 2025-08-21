const board = document.getElementById('board');
const cells = board.getElementsByClassName('cell');
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
let currentPlayer = 'X';
let juegoActivo = true;


if (juegoActivo) {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

for (let index = 0; index < cells.length; index++) {
    
    cells[index].addEventListener("click",function () {
        if (!juegoActivo) return;

        if (cells[index].textContent == '') {
            if (currentPlayer === 'X'){
                cells[index].textContent = currentPlayer
                currentPlayer = 'O'
            } else {
                cells[index].textContent = currentPlayer
                currentPlayer = 'X'
            }
        }
        

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
                    return;
                }
            }
        
        
    }
    revisarGanador();
    
    });
    
}


