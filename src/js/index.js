const board = document.getElementById('board');
const cells = board.getElementsByClassName('cell');
let currentPlayer = 'X';

console.log(cells.length)

for (let index = 0; index < cells.length; index++) {
    
    cells[index].addEventListener("click",function () {
        
        if (cells[index].textContent == '') {
            if (currentPlayer === 'X'){
                cells[index].textContent = currentPlayer
                currentPlayer = 'O'
            } else {
                cells[index].textContent = currentPlayer
                currentPlayer = 'X'
            }
        }
        
    });
    
}