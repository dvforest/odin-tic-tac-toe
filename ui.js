gameContainer = document.querySelector(".round-container");

const WelcomeScreen = (function()   {
    let playerNames = ["Player One", "Player Two"]
    
    const init = () => {
        // Create HTML elements
        gameContainer.innerHTML = `
                <div class="game-logo">TIC-TAC-TOE</div>
                <div class="logo-subtitle">WEB EDITION</div>
                <input id="player-name-1" class="player-name" type="text" placeholder="${playerNames[0]}"></input>
                <div class="versus">VS</div>
                <input id="player-name-2" class="player-name" type="text" placeholder="${playerNames[1]}"></input>
                <button class="start-game-button">START GAME</button>
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
        boardGrid.addEventListener("click", clickBoard);

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

            // Only allow empty cells to have active hover style
            if (!cellButton.textContent) {
                cellButton.classList.add("hover-active");
                cellButton.addEventListener("mouseover", mouseoverCell);
                cellButton.addEventListener("mouseout", mouseoutCell);
            }
            cellButton.classList.add("cell");
            cellButton.id = index;
            boardGrid.appendChild(cellButton);
        });
    }

    // Handler for clicking on the board and adding marks
    const clickBoard = (e) => {
        const cell = e.target;
        const id = cell.id;

        // Make sure a cell was clicked
        if (!id) {
            return
        }

        // Play round with clicked cell id
        game.playRound(id);

        // Remove mouseover andevent on clicked cell
        cell.removeEventListener("mouseover", mouseoverCell);
        cell.removeEventListener("mouseout", mouseoutCell);

        // Check if game is over, else repeat a round
        if (game.isBoardFull() || game.getWinningRow()){
            EndScreen.init(game);
        } 
        else { update(); }
    };
    
    // Handler for previewing mark about to be placed
    const mouseoverCell = (e) => {
        const cell = e.target;
        const id = cell.id;
        const value = game.getBoard()[id].getValue();
        const mark = game.getActivePlayer().mark;
        if(!value){
            cell.textContent = mark;
            cell.classList.add("preview");
        }
    }

    // Handler for removing mark preview
    const mouseoutCell = (e) => {
        const cell = e.target;
        const id = cell.id;
        const value = game.getBoard()[id].getValue();
        if(!value){
            cell.textContent = "";
            cell.classList.remove("preview");
        }
    }

    return { init };
})();

const EndScreen = (function() {

    const displayDraw = () => {
        // Get elements
        const message = document.querySelector(".game-message");

        // Clear the area
        gameContainer.innerHTML = "";

        // Display draw message
        gameContainer.appendChild(message);
        message.innerHTML = `It's a <span>draw</span>!`
    };

    const displayWinner = (winner, game) => {
        const board = game.getBoard();
        const winningRow = game.getWinningRow();

        // Get elements
        const boardGrid = document.querySelector(".game-board");
        const message = document.querySelector(".game-message");

        // Clear the area
        gameContainer.innerHTML = "";
        boardGrid.innerHTML = "";

        // Create elements
        gameContainer.appendChild(message);
        gameContainer.appendChild(boardGrid);

        // Display winner message
        message.innerHTML = `<span>${winner}</span>'s the winner!`;

        // Render winning board
        board.forEach((cell, index) => {
            const cellButton = document.createElement("button");
            cellButton.textContent = cell.getValue();
            cellButton.classList.add("cell");
            if (winningRow.includes(index)){
                cellButton.classList.add("winner");
            } else {
                cellButton.classList.add("preview");
            }
            boardGrid.appendChild(cellButton);
        });
    };

    const addPlayButton = (game) => {
        const playAgainBtn = document.createElement("button");
        playAgainBtn.innerText = "PLAY AGAIN ?";
        playAgainBtn.classList.add("start-game-button", "play-again-button");
        playerNames = [game.getPlayers()[0].name, game.getPlayers()[1].name];
        playAgainBtn.addEventListener("click", () => GameScreen.init(playerNames));
        gameContainer.appendChild(playAgainBtn);
    };

    const init = (game) => {

        // Get winner
        const winner = game.getActivePlayer().name;

        // Display winner or draw screen
        if (game.isBoardFull()) {
            displayDraw();
        }
        else { displayWinner(winner, game); }
        
        // Add play again button
        addPlayButton(game);
    }

    return { init };
})();

WelcomeScreen.init();