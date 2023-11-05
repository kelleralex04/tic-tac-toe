/*----- constants -----*/
//  initialize constants for winner message
const PLAYERS = {
    '1': 'X',
    '-1': 'O'
}

/*----- state variables -----*/
//  initialize state vars
let board;
let turn;
let winner;

/*----- cached elements  -----*/
//  cache header for messages and play again button
const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');

/*----- event listeners -----*/
//  add event listener for marker placement and play again button
//  when board is clicked, marker is placed
document.getElementById('board').addEventListener('click', placeMarker)
//  when play again button is clicked, init function is called and board is reset
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
//  start page by initializing board
init()

//  define init function: sets up blank board, makes X first, sets winner as null, renders new board
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

//  define place marker function
function placeMarker(evt) {
    //  once game is won, prevents more piece placement until game reset
    if (winner) {
        return
    }
    //  find board coordinates from click target
    colIdx = parseInt(evt.target.getAttribute('id')[1]);
    rowIdx = parseInt(evt.target.getAttribute('id')[3]);
    //  guard: if board already has piece, do not place a new one
    if (board[colIdx][rowIdx] !== 0) {
        return
    }
    //  set board to X or 0
    board[colIdx][rowIdx] = turn;
    //  change turn
    turn *= -1;
    //  run winner check
    winner = getWinner(colIdx, rowIdx);
    //  if the board is full and there is no winner, set winner to tie
    if (!board.some((row) => row.includes(0)) && !winner) {
        winner = 'T';
    }
    //  render new piece placement
    render();
}

//  define get winner function with all directional checks
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

//  define adjacent count function
function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
    //  shortcut variable to the player value
    const player = board[colIdx][rowIdx];
    //  track count of adjacent cells with the same player value
    let count = 0;
    //  initialize new coordinates
    colIdx += colOffset;
    rowIdx += rowOffset;
    while(
        //  ensure coordinates are within the bounds of the board array
        board[colIdx] !== undefined &&
        board[colIdx][rowIdx] !== undefined &&
        board[colIdx][rowIdx] === player
    ) {
        //  increase count and initialize new coordinates
        count++;
        colIdx += colOffset;
        rowIdx += rowOffset;
    }
    //  return count to the check win functions
    return count
}

//  define render function for board, win and turn message, and play again button
function render() {
    renderBoard();
    renderMessage();
    renderControls();
}

//  define render board function
function renderBoard() {
    //  loop through board array
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cellVal, rowIdx) {
            //  initialize shortcuts to marker elements
            const cellId = `c${colIdx}r${rowIdx}`;
            const XcellEl = document.getElementById(`X${cellId}`);
            const OcellEl = document.getElementById(`O${cellId}`);
            //  if board array is one place X, if -1 place O, otherwise pieces stay hidden
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

//  define render function for win/tie and turn message
function renderMessage() {
    if (winner === 'T') {
        messageEl.innerText = "It's a Tie!";
    } else if (winner) {
        messageEl.innerHTML = `${PLAYERS[winner].toUpperCase()}</span> Wins!`;
        
    } else {
        messageEl.innerHTML = `${PLAYERS[turn].toUpperCase()}</span>'s Turn`;
    }
}

//  define play again button function
function renderControls() {
    //  once winner is defined, button becomes visible
    playAgainBtn.style.visibility = winner ? 'visible': 'hidden';
}


