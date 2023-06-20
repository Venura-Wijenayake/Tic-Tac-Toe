/*----- constants -----*/
const COLOR_LOOKUP = {
	'1': 'black',
	'-1': 'white',
	'null': 'grey'
};

const PLAYER_LOOKUP = {
	'1': "X",
	'-1': "O"
};


/*----- Table of Win conditions ----*/
const winConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

/*----- app's state (variables) -----*/
let board, turn, winner;

/*----- cached element references -----*/
const message = document.querySelector('h1');
const resetButton = document.querySelector('button');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleMove);
resetButton.addEventListener('click', init);

/*----- functions -----*/
init();

// Initialize all state variables, then call render()
function init() {
	board = [null, null, null, null, null, null, null, null, null];
	turn = 1;
	winner = null;
	render();
}

function handleMove(event) {
	const idx = parseInt(event.target.id.replace('grid-', ''));

	if (isNaN(idx) || board[idx] || winner)
		return;
	// Update state (board, turn, winner, render())
	board[idx] = turn;
	turn *= -1;
	winner = getWinner();
	render();
}

function getWinner() {
	for (let i = 0; i < winConditions.length; i++) {
		if (Math.abs(board[winConditions[i][0]] +
			board[winConditions[i][1]] +
			board[winConditions[i][2]]) === 3)
			return board[winConditions[i][0]];
	}

	if (board.includes(null)) return null;
	return 'T';
}


function render() {
	renderBoard();
	renderMessage();
	resetButton.disabled = !winner;
}


function renderBoard() {
	board.forEach(function(sqVal, idx) {
		const squareEl = document.getElementById(`grid-${idx}`);
		squareEl.style.backgroundColor = COLOR_LOOKUP[sqVal];

		/* ------- Note
		I wanted to replace the colors 'black' and 'white' with an image of 'X' or 'O',
		But I have no idea how to do that right know, my guess was to use one of the following:

	 		Attempt 1
			const img = document.createElement("img");
			img.src = "Cross.png";

			Attempt 2
			squareEl.style.backgroundImage = "url('cross.png')";

		I need help with achieving this.

		*/

		// Hover effect
		squareEl.className = !sqVal ? 'avail' : '';
	});
}

function renderMessage() {
	if (winner === 'T') {
		message.innerHTML = "It's a tie!";
	} else if (winner) {
		message.innerHTML = `Congrats (<span style="color: ${COLOR_LOOKUP[winner]}">${PLAYER_LOOKUP[winner].toUpperCase()}</span>)!`;
	} else {
		message.innerHTML = `(<span style="color: ${COLOR_LOOKUP[turn]}">${PLAYER_LOOKUP[turn].toUpperCase()}</span>)'s Turn`;
	}
}