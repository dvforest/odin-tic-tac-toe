function GameBoard() {
    let board = [];
    let cells = 9;

    for (let i = 0; i < cells; i++) {
            board.push(Cell());
    }

    const getBoard = () => board;

    const addMark = (cell, player) => {
        if (!board[cell].getValue()) {
            board[cell].setValue(player);
        }   
    }

    const printBoard = () => {
        console.log(board[0].getValue(), board[1].getValue(), board[2].getValue());
        console.log(board[3].getValue(), board[4].getValue(), board[5].getValue());
        console.log(board[6].getValue(), board[7].getValue(), board[8].getValue());
    }

    return { getBoard, addMark, printBoard };
}

function Cell() {
    let value = "";

    const setValue = (player) => {
        value = player;
    };

    const getValue = () => value;

    return { setValue, getValue };
}

function TicTacToe( playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = GameBoard();

    const players = [
        {
            name: playerOneName,
            mark: "O"
        },
        {
            name: playerTwoName,
            mark: "X"
        }

    ];

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const printNewRound = () => {
        board.printBoard();
        console.log(`Active player is ${getActivePlayer().name}`);
    }

    const printWinner = () => {
        board.printBoard();
        console.log(`Winning player is ${getActivePlayer().name}`);
    }

    const checkWinner = () => {
        let winningRows = [
            [0, 1, 2], // Horizontal rows
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6], // Columns
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8], // Diagonals
            [2, 4, 6]
        ];

        // Fill temporary array with mark values (not Cell objects)
        const marks = board.getBoard().map((cell) => cell.getValue());

        for (let row of winningRows) {
            // Assign variables to current winning row indices
            let [a, b, c] = row;

            // Check that cells are not empty and have the same mark
            if (marks[a] && marks[a] === marks[b] && marks[b] === marks[c]) {
                return true;
            }
        }
        return false;
    }

    const playRound = (cell) => {
        board.addMark(cell, getActivePlayer().mark);
        if (checkWinner()){
            return;
        }
        switchActivePlayer();
        printNewRound();
    }

    // Print initial empty board
    printNewRound();

    return { 
        getActivePlayer,
        playRound,
        getBoard: board.getBoard,
        checkWinner
    };
};