const container = document.getElementById('mainContainer');

const gridItems = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const fireworksContainer = document.querySelector('.overlay');

let currentPlayer = "X";
let currentPlayerContainer = document.getElementById('currentPlayer');

let gameState = ["", "", "", "", "", "", "", "", ""];

let haveWinner = false;
let draw = false;

const containerOverlay = document.querySelector('.overlay');
const fireworks = new Fireworks(containerOverlay)
fireworks.setOptions({ width: 50, intensity: 16.39, delay: { min: 10, max: 100 }, brightness: { min: 50, max: 100 }, decay: { min: 0.0010, max: 0.0113 }, hue: { min: 0, max: 360 }, explosion: 20})

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));


function handleCellClick(cell) {
    const clickedCell = cell.target;

    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );

    if (gameState[clickedCellIndex] !== "" || haveWinner == true) {
        return;
    }

    changeGridText(gameState, clickedCellIndex, currentPlayer, clickedCell);

    checkResults();
    
    checkWinner(haveWinner);

    changePlayer(haveWinner);

    checkDraw();

}

function changeGridText(gameState, clickedCellIndex, currentPlayer, clickedCell)
{
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = `<p>${currentPlayer}</p>`;;
}


function changePlayer(haveWinner)
{
    if(haveWinner)
    {
        currentPlayerContainer.textContent = `Player ${currentPlayer} WINS!`;
    }
    else
    {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        currentPlayerContainer.textContent = `Current player: ${currentPlayer}`;
    }
}

function checkResults()
{
    for(let i = 0; i <= 7; i++)
    {
        const winCombination = winningCombinations[i];
        let a = gameState[winCombination[0]];
        let b = gameState[winCombination[1]];
        let c = gameState[winCombination[2]];

        if(a === '' || b === '' || c === '')
        {
            continue;
        }
        if(a === b && b === c)
        {
            haveWinner = true;
            break;
        }
    }
}

function checkWinner(haveWinner)
{
    if(haveWinner)
    {
        console.log(currentPlayer);
        fireworks.start();
        setTimeout(() => {fireworks.stop()}, 5000);
        currentPlayerContainer.classList.toggle('winner');
        currentPlayerContainer.textContent = "Winner!";
    }
}

function checkDraw()
{
    const result = gameState.every(element => {
        if (element != "") {
          return true;
        }
    });

    console.log(result, haveWinner);
    if(result === true && haveWinner === false)
    {
        currentPlayerContainer.textContent = `Draw :(`;
    }
}

function restartGame() {
    fireworks.stop();
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayerContainer.textContent = `Current player: ${currentPlayer}`;
    currentPlayerContainer.classList.remove('winner');

    document.querySelectorAll('.cell').forEach(cell => cell.textContent = "");
    haveWinner = false;
}

resetBtn.addEventListener('click', () => {
    restartGame();
});
