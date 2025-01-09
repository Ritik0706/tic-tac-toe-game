let currentPlayer = 'X';
let moves = 0;
let winner = false;

const cells = document.querySelectorAll('.cell');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const startGameBtn = document.getElementById('startGame');
const gameBoard = document.getElementById('gameBoard');
const winnerPopup = document.getElementById('winnerPopup');
const drawPopup = document.getElementById('drawPopup');
const winnerText = document.getElementById('winnerText');
const restartBtns = document.querySelectorAll('#restartBtn');

startGameBtn.addEventListener('click', () => {
    if (player1Input.value === '' || player2Input.value === '') {
        alert('Please enter player names!');
    } else {
        gameBoard.classList.remove('hidden');
        playerForm.classList.add('hidden');
    }
});

restartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        resetGame();
    });
});

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!cell.textContent && !winner) {
            cell.textContent = currentPlayer;
            moves++;

            if (checkWinner()) {
                showWinner(currentPlayer === 'X' ? player1Input.value : player2Input.value);
            } else if (moves === 9) {
                showDraw();
            } else {
                togglePlayer();
            }
        }
    });
});

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombos.some(combo => {
        return combo.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function showWinner(player) {
    winner = true;
    winnerText.textContent = `${player} wins!`;
    winnerPopup.style.display = 'block';
    winnerCraker.style.display = 'block';
}

function showDraw() {
    drawPopup.style.display = 'block';
}

function resetGame() {
    currentPlayer = 'X';
    moves = 0;
    winner = false;
    cells.forEach(cell => {
        cell.textContent = '';
    });
    winnerPopup.style.display = 'none';
    winnerCraker.style.display = 'none';
    drawPopup.style.display = 'none';
    gameBoard.classList.add('hidden');
    playerForm.classList.remove('hidden');
    player1Input.value = '';
    player2Input.value = '';
}


document.addEventListener('DOMContentLoaded', function () {
    // Select the "Play Again" button by its ID
    var restartBtn = document.getElementById('restartBtn');

    // Listen for the keydown event on the entire document
    document.addEventListener('keydown', function (event) {
        // Check if the Enter key was pressed
        if (event.key === 'Enter' || event.keyCode === 13) {
            // "Click" the restart button programmatically
            restartBtn.click();
        }
    });
});
