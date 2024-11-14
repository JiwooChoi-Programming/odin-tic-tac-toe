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
    }

    return {
        renderBoard,
        update,
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
        GameBoard.update(index, players[currentPlayerIndex].mark);

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    return {
        startGame,
        handleClick,
    }
})();

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    Game.startGame();
});