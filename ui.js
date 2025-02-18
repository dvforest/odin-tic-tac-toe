(function TicTacToeUI() {
    const game = TicTacToe();
    const message = document.querySelector(".game-message");
    const boardGrid = document.querySelector(".game-board");

    const updateScreen = () => {
        // Clear the grid
        boardGrid.innerHTML = "";

        // Get latest board and active player
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        // Display game message
        playerColor = activePlayer.mark === "X" ? "red-x" : "blue-o";
        message.innerHTML = `<span class="${playerColor}">${activePlayer.name}</span>'s turn.`

        // Render board
        board.forEach((cell, index) => {
            const cellButton = document.createElement("button");
            cellButton.textContent = cell.getValue();
            // Make hover active if empty
            if (!cellButton.textContent) {
                cellButton.classList.add("hover-active");
            }
            // Otherwise, assign the correct player color to the mark
            else {
                const mark = cell.getValue();
                cellButton.classList.add(
                    mark === "X" ? "red-x" : "blue-o"
                );
            }
            cellButton.classList.add("cell");
            cellButton.id = index;
            boardGrid.appendChild(cellButton);
        });
    }

    // Add event listener for the board
    const clickHandlerBoard = (e) => {
        const cell = e.target
        const id = cell.id;

        // Make sure a cell was clicked, not gap
        if (!id || cell.textContent !== "") {
            return
        }
        game.playRound(id);
        updateScreen();
    };
    boardGrid.addEventListener("click", clickHandlerBoard);

    //Initialize empty grid
    updateScreen();
})();