const GameBoard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const renderBoard = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">
                ${square}
            </div>
            `
        });
        document.querySelector("#gameBoard").innerHTML = boardHTML;
    }

    return {
        renderBoard,
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
    }

    return {
        startGame,
    }
})();

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    Game.startGame();
});