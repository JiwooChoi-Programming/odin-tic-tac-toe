const GameBoard = (() => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    const renderBoard = () => {
        let boardHTML = "";
        gameBoard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">
                ${square}
            </div>
            `
        });

        document.querySelector("#gameBoard").innerHTML = boardHTML;

        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", Game.handleClick);
        });
    }

    const update = (index, value) => {
        gameBoard[index] = value;
        renderBoard();
    };

    const getGameBoard = () => gameBoard;

    return {
        renderBoard,
        update,
        getGameBoard,
    }
})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const startGame = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ]

        currentPlayerIndex = 0;
        gameOver = false;
        GameBoard.renderBoard();
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", handleClick);
        });
    }

    const handleClick = (event) => {
        let index = parseInt(event.target.id.split("-")[1]);
        if (GameBoard.getGameBoard()[index] !== "") {
            return;
        }

        GameBoard.update(index, players[currentPlayerIndex].mark);

        if (checkForWin(GameBoard.getGameBoard(), players[currentPlayerIndex].mark)) {
            gameOver = true;
            alert(`${players[currentPlayerIndex].name} won!`);
        } else if (checkForTie(GameBoard.getGameBoard())) {
            gameOver = true;
            alert("It's a tie!");
        };

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            GameBoard.update(i, "");
        }
        GameBoard.renderBoard();
    }

    return {
        startGame,
        restart,
        handleClick
    }
})();

function checkForWin(board) {
    const winningCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < winningCondition.length; i++) {
        const [a, b, c] = winningCondition[i];
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkForTie(board) {
    return board.every(cell => cell !== "");
}

const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
    Game.restart();
})

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    Game.startGame();
});