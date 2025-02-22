gameContainer = document.querySelector(".round-container");

const PlayerSelectScreen = () => {
    let state = "incomplete";
    let player1 = "Player One";
    let player2 = "Player Two"

    const setComplete = () => {
        state = "complete";
    }

    const isComplete = () => state === "complete";

    const getPlayerNames = () => [player1, player2];

    const clickHandlerReady = (e) => {
        player1 = document.getElementById("player-name-1").value;
        player2 = document.getElementById("player-name-2").value;
        setComplete();
    }

    // Create elements and events
    gameContainer.innerHTML = `
        <div class="game-logo">Tic-Tac-Toe</div>
        <div class="game-message">Who's playing?</div>
        <input id="player-name-1" class="player-name" type="text" placeholder="${player1}"></input>
        <input id="player-name-2" class="player-name" type="text" placeholder="${player2}"></input>
        <button class="ready-btn">Ready!</button>
    `;

    const readyButton = document.querySelector(".ready-btn");
    readyButton.addEventListener("click", clickHandlerReady);

    return { isComplete, getPlayerNames };
};

const GameScreen = (playerNames) => {

    const game = TicTacToe(playerNames[0], playerNames[1]);

    const update = () => {

        // Get elements
        const message = document.querySelector(".game-message");
        const boardGrid = document.querySelector(".game-board");

        // Clear the grid
        boardGrid.innerHTML = "";
        
        // Get latest board and active player
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        // Display game message
        message.innerHTML = `<span>${activePlayer.name}</span>'s turn.`

        // Render board
        board.forEach((cell, index) => {
            const cellButton = document.createElement("button");
            cellButton.textContent = cell.getValue();
            // Make hover active if empty
            if (!cellButton.textContent) {
                cellButton.classList.add("hover-active");
            }
            cellButton.classList.add("cell");
            cellButton.id = index;
            boardGrid.appendChild(cellButton);
        });
    }

    // Handler to check which cell was clicked
    const clickHandlerBoard = (e) => {
        const cell = e.target;
        const id = cell.id;

        // Make sure a cell was clicked (no gap), then play a round
        if (!id || cell.textContent !== "") {
            return
        }
        game.playRound(id);

        // Check for a winner
        if (game.checkWinner()){
            const winner = game.getActivePlayer().name;
            const message = document.querySelector(".game-message");
            message.innerHTML = `<span>${winner}</span>'s the winner!`;
            
            // Remove board event
            document.querySelector(".game-board").removeEventListener("click", clickHandlerBoard);
        } else { 
            update();
        }
    };
    
    // Handler to preview which mark is going to be placed
    const mouseoverHandlerBoard = (e) => {
        const activePlayer = game.getActivePlayer().mark;
    }
    
    // Create elements
    gameContainer.innerHTML = `
    <div class="game-message"></div>
    <div class="square-container">
    <div class="game-board"></div>
    </div>
    `;
    
    // Add events
    const boardGrid = document.querySelector(".game-board");
    boardGrid.addEventListener("click", clickHandlerBoard);
    boardGrid.addEventListener("mouseover", mouseoverHandlerBoard);

    // Update once to initialize emptry grid
    update();
}

const mainLoop = () => {
    const playerSelectScreen = PlayerSelectScreen();

    const intervalId = setInterval(() => {
        if (playerSelectScreen.isComplete()) {
            clearInterval(intervalId);
            const gameScreen = GameScreen(playerSelectScreen.getPlayerNames());
        }
    }, 100);
};
mainLoop();