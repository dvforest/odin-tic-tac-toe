function GameBoard() {``
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

    const getValues = () => {
        let values = [];
        for(i = 0; i < cells; i++){
            values.push(board[i].getValue());
        }
        return values;
    }

    return { getBoard, addMark, getValues}
}

function Cell() {
    let value = "";

    const setValue = (player) => {
        value = player;
    };

    const getValue = () => value;

    return { setValue, getValue };
}

function TicTacToe(playerNames) {
    const board = GameBoard();

    const players = [
        {
            name: playerNames[0],
            mark: "O"
        },
        {
            name: playerNames[1],
            mark: "X"
        }

    ];

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getWinningRow = () => {
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
                return row;
            }
        }
        return null;
    }

    const isBoardFull = () => {
        const values = board.getValues();
            return !values.includes("");
    }

    const getPlayers = () => players;

    const playRound = (cell) => {
        board.addMark(cell, getActivePlayer().mark);
        switchActivePlayer();
    }

    return { 
        getActivePlayer,
        playRound,
        getBoard: board.getBoard,
        getWinningRow,
        getPlayers,
        isBoardFull
    };
};