// *** Cases du Morpion Coté HTML
let cells = document.querySelectorAll(".cell")
const overlay = document.querySelector(".overlay")



let board = Array(9).fill("");
let gameIsPlayable = true

let currentPlayer = "X"


function handleClick(event) {
    // *** Extraire l'id de la case cliquee
    const id = event.target.dataset.id

    // *** Condition de non jouabilité
    if (!gameIsPlayable || board[id] !== "") return;




    // *** Affiche le X ou le O Selon le joueur courent
    event.target.textContent = currentPlayer
    board[id] = currentPlayer

    // *** Verifier si on a un gain 
    if (checkForWin()) {
        showMessage(`Le joueur ${currentPlayer} a gagné ;)`)
        gameIsPlayable = false
    }
    // ** Si on a un match nul``
    else if (!board.includes("")) {
        showMessage(`Match nul`)
        gameIsPlayable = false
    }
    //*** sinon  Change de joueur courent de x vers o etc

    else {
        currentPlayer = currentPlayer === "X" ? "O" : "X"
    }


    function showMessage(message) {
        overlay.style.display = "flex"
        overlay.querySelector('h1').textContent = message
    }





}



function checkForWin() {
    // *** Combinaison gagnante du jeu

    const combs = [
        // *** Ligne 1
        [0, 1, 2],
        // *** Ligne 2
        [3, 4, 5],
        // *** Ligne 3
        [6, 7, 8],

        // ** Col 1
        [0, 3, 6],
        // ** Col 2
        [1, 4, 7],
        // ** Col 3
        [2, 5, 8],

        // *** Diag 1
        [0, 4, 8],
        // *** Diag 1
        [2, 4, 6]
    ]

    return combs.some(comb => {
        const [a, b, c] = comb
        return board[a] && board[a] === board[b] && board[b] === board[c]
    })

}

function resetGame() {
    gameIsPlayable = true
    overlay.style.display = "none"
    board = Array(9).fill("")
    cells.forEach(cell => cell.textContent = "")
}


// *** Fonction qui demarre le jeu
function initGame() {
    // ** Ajout d'un ecouteur d'event (click)
    overlay.querySelector('button').addEventListener('click', resetGame)
    cells.forEach(cell => cell.addEventListener("click", handleClick))
}
initGame()
