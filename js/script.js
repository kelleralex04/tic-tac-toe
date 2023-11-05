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
const playAgainBtn = document.querySelector('button');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', placeMarker)
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
init()

function init() {
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    turn = 1;
    winner = null;
    render();
}

function placeMarker(evt) {
    if (winner) {
        return
    }
    colIdx = parseInt(evt.target.getAttribute('id')[1]);
    rowIdx = parseInt(evt.target.getAttribute('id')[3]);
    board[colIdx][rowIdx] = turn;
    turn *= -1;
    if (board.some((row) => row.includes(0))) {
        winner = getWinner(colIdx, rowIdx);
    } else {
        if (getWinner(colIdx, rowIdx)) {
            winner = getWinner(colIdx, rowIdx);
        } else{
        winner = 'T';
        }
    }
    render();
}

function getWinner(colIdx, rowIdx) {
        return checkVerticalWin(colIdx, rowIdx) ||
        checkHorizontalWin(colIdx, rowIdx) ||
        checkDiagonalWinNESW(colIdx, rowIdx) ||
        checkDiagonalWinNWSE(colIdx, rowIdx);
}

function checkDiagonalWinNWSE(colIdx, rowIdx) {
    const adjCountNW = countAdjacent(colIdx, rowIdx, 1, -1);
    const adjCountSE = countAdjacent(colIdx, rowIdx, -1, 1);
    return (adjCountNW + adjCountSE) >= 2 ? board[colIdx][rowIdx] : null;
}

function checkDiagonalWinNESW(colIdx, rowIdx) {
    const adjCountNE = countAdjacent(colIdx, rowIdx, 1, 1);
    const adjCountSW = countAdjacent(colIdx, rowIdx, -1, -1);
    return (adjCountNE + adjCountSW) >= 2 ? board[colIdx][rowIdx] : null;
}

function checkHorizontalWin(colIdx, rowIdx) {
    const adjCountLeft = countAdjacent(colIdx, rowIdx, -1, 0);
    const adjCountRight = countAdjacent(colIdx, rowIdx, 1, 0);
    return (adjCountLeft + adjCountRight) >= 2 ? board[colIdx][rowIdx] : null;
}

function checkVerticalWin(colIdx, rowIdx) {
    const adjCountUp = countAdjacent(colIdx, rowIdx, 0, -1);
    const adjCountDown = countAdjacent(colIdx, rowIdx, 0, 1);
    return (adjCountUp + adjCountDown) >= 2 ? board[colIdx][rowIdx] : null;
}

function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
    //  Shortcut variable to the player value
    const player = board[colIdx][rowIdx];
    //  Track count of adjacent cells with the same player value
    let count = 0;
    //  Initialize new coordinates
    colIdx += colOffset;
    rowIdx += rowOffset;
    while(
        //  Ensure colIdx is within bounds of the board array
        board[colIdx] !== undefined &&
        board[colIdx][rowIdx] !== undefined &&
        board[colIdx][rowIdx] === player
    ) {
        count++;
        colIdx += colOffset;
        rowIdx += rowOffset;
    }
    return count
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
        messageEl.innerText = "It's a Tie!";
    } else if (winner) {
        messageEl.innerHTML = `${PLAYERS[winner].toUpperCase()}</span> Wins!`;
        
    } else {
        //  Game is in play
        messageEl.innerHTML = `${PLAYERS[turn].toUpperCase()}</span>'s Turn`;
    }
}

function renderControls() {
    playAgainBtn.style.visibility = winner ? 'visible': 'hidden';
}


