gameContainer = document.querySelector(".round-container");

const WelcomeScreen = (function()   {
    let playerNames = ["Player One", "Player Two"]
    
    const init = () => {
        // Create HTML elements
        gameContainer.innerHTML = `
            <div class="welcome-container">
                <div class="game-logo">TIC-TAC-TOE</div>
                <div class="logo-subtitle">WEB EDITION</div>
                <input id="player-name-1" class="player-name" type="text" placeholder="${playerNames[0]}"></input>
                <div class="versus">VS</div>
                <input id="player-name-2" class="player-name" type="text" placeholder="${playerNames[1]}"></input>
                <button class="start-game-button">START GAME</button>
            </div>
        `;
        // Create event listener
        const startButton = document.querySelector(".start-game-button");
        startButton.addEventListener("click", startGame);
        }

    const startGame = (e) => {
        // Update player names with inputs
        const input1 = document.getElementById("player-name-1").value;
        const input2 = document.getElementById("player-name-2").value;
        if (input1){
            playerNames[0] = input1;
        }
        if (input2){
            playerNames[1] = input2;
        }
        GameScreen.init(playerNames);
    }

    return { init };
})();

const GameScreen = (function() {
    let game;

    const init = (playerNames) => {
        game = TicTacToe(playerNames);

        // Create HTML elements
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

        update();
    };

    const update = () => {

        // Get elements
        const message = document.querySelector(".game-message");
        const boardGrid = document.querySelector(".game-board");

        // Clear the grid
        boardGrid.innerHTML = "";
        
        // Get current board and active player
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

    // Handler checking which cell was clicked
    const clickHandlerBoard = (e) => {
        const cell = e.target;
        const id = cell.id;

        // Make sure a cell was clicked, then play round
        if (!id || cell.textContent !== "") {
            return
        }
        game.playRound(id);

        // Check is there is a winner
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
    
    // Handler previewing the mark about to be placed
    const mouseoverHandlerBoard = (e) => {
        const activePlayer = game.getActivePlayer().mark;
    }

    return { init };
})();

WelcomeScreen.init();