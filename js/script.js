/*----- constants -----*/
const PLAYERS = {
    '0': 'blank',
    '1': 'X',
    '-1': 'O'
}

/*----- state variables -----*/
let board;
let turn;
let winner;

/*----- cached elements  -----*/
const messageEl = document.querySelector('h1');

/*----- event listeners -----*/

/*----- functions -----*/
init()

function init() {
    board = [
        [1, -1, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    turn = 1;
    winner = null;
    render();
}

function render() {
    renderBoard();
    renderMessage();
    renderControls();
}

function renderBoard() {
    board.forEach(function(colArr, colIdx) {
        //  Iterate over the cells in the cur column (colArr)
        colArr.forEach(function(cellVal, rowIdx) {
            const cellId = `c${colIdx}r${rowIdx}`;
            const XcellEl = document.getElementById(`X${cellId}`);
            const OcellEl = document.getElementById(`O${cellId}`);
            if (cellVal === 1) {
                XcellEl.style.visibility = 'visible';
            } else if (cellVal === -1) {
                OcellEl.style.visibility = 'visible';
            } else {
                XcellEl.style.visibility = 'hidden'
                OcellEl.style.visibility = 'hidden';
            }
        })
    });
}

function renderMessage() {
    if (winner === 'T') {
        messageEl.innerText = "It's a Tie!!!";
    } else if (winner) {
        messageEl.innerHTML = `${PLAYERS[winner].toUpperCase()}</span> Wins!`;
        
    } else {
        //  Game is in play
        messageEl.innerHTML = `${PLAYERS[turn].toUpperCase()}</span>'s Turn`;
    }
}

function renderControls() {

}


