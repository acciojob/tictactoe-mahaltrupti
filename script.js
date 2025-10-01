//your JS code here. If required.
const submitBtn = document.getElementById('submit');
const playerForm = document.getElementById('player-form');
const gameBoard = document.getElementById('game-board');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let player1 = '';
let player2 = '';
let currentPlayer = '';
let gameState = Array(9).fill('');

const winningConditions = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
];

submitBtn.addEventListener('click', () => {
    player1 = document.getElementById('player-1').value.trim();
    player2 = document.getElementById('player-2').value.trim();

    if(player1 && player2){
        playerForm.style.display = 'none';
        gameBoard.style.display = 'block';
        currentPlayer = player1;
        messageDiv.textContent = `${currentPlayer}, you're up!`;

        // Add event listeners here, after the game board is displayed
        cells.forEach(cell => cell.addEventListener('click', handleClick));
    } else {
        alert("Please enter both player names.");
    }
});

function checkWinner() {
    for(let condition of winningConditions){
        const [a,b,c] = condition;
        if(gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]){
            return true;
        }
    }
    return false;
}
function handleClick(e) {
    const id = e.target.id - 1; // convert to 0-based index
    console.log(`Cell clicked: ${id}, Current Player: ${currentPlayer}`); // Log clicked cell and current player

    if (gameState[id] === '') {
        gameState[id] = currentPlayer === player1 ? 'X' : 'O';
        e.target.textContent = gameState[id];
        console.log(`Game State: ${gameState}`); // Log the game state after the move

        if (checkWinner()) {
            messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
            cells.forEach(cell => cell.removeEventListener('click', handleClick));
        } else if (!gameState.includes('')) {
            messageDiv.textContent = `It's a tie!`;
        } else {
            // Switch player
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            messageDiv.textContent = `${currentPlayer}, you're up!`;
        }
    }
}

