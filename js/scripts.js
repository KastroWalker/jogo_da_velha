let x = document.querySelector(".x");
let o = document.querySelector(".o");
let boxes = document.querySelectorAll(".box");
let buttons = document.querySelectorAll("#buttons-container button");
let messageContainer = document.querySelector("#message");
let messageText = document.querySelector("#message p");
let secondPlayer;

// contador de jogadas
let player1 = 0;
let player2 = 0;

let boxesValues = [];

boxes.forEach(element => {
    boxesValues.push(element);

    element.addEventListener("click", function () {
        let el = checkPlayer(player1, player2);

        if (this.childNodes.length == 0) {
            let cloneEl = el.cloneNode(true);

            this.appendChild(cloneEl);

            if (player1 == player2) {
                player1++;

                if (secondPlayer == "btn-computer") {
                    computerPlay();
                    player2++;
                }
            } else {
                player2++;
            }

            checkWinCondition(boxesValues);
        }
    });
});

buttons.forEach(button => {
    button.addEventListener("click", function () {
        secondPlayer = this.getAttribute("id");

        buttons.forEach(btn => {
            btn.style.display = "none";
        });

        setTimeout(() => {
            let container = document.querySelector("#div-main");
            container.classList.remove("hide");
        }, 500);
    });
});

function checkPlayer(p1, p2) {
    if (p1 == p2) {
        el = x;
    } else {
        el = o;
    }

    return el;
}

function checkWinCondition(box) {
    // horizontal
    checkSequence(box[0], box[1], box[2]);
    checkSequence(box[3], box[4], box[5]);
    checkSequence(box[6], box[7], box[8]);

    // vertical
    checkSequence(box[0], box[3], box[6]);
    checkSequence(box[1], box[4], box[7]);
    checkSequence(box[2], box[5], box[8]);

    // diagonal
    checkSequence(box[0], box[4], box[8]);
    checkSequence(box[2], box[4], box[6]);

    // velha
    let counter = 0;

    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].childNodes[0] != undefined) {
            counter++
        }
    }

    if (counter == 9) {
        declareWinner("v");
    }
}

function checkSequence(b1, b2, b3) {
    if (b1.childNodes.length > 0 && b2.childNodes.length > 0 && b3.childNodes.length > 0) {
        let b7Child = b1.childNodes[0].className;
        let b8Child = b2.childNodes[0].className;
        let b9Child = b3.childNodes[0].className;

        if (b7Child == "x" && b8Child == "x" && b9Child == "x") {
            declareWinner("x");
        } else if (b7Child == "o" && b8Child == "o" && b9Child == "o") {
            declareWinner("o");
        }
    }
}

function declareWinner(winner) {
    let scoreboardX = document.querySelector("#scoreboard-1");
    let scoreboardO = document.querySelector("#scoreboard-2");
    let msg = "";

    if (winner == "x") {
        scoreboardX.textContent = parseInt(scoreboardX.textContent) + 1;
        messageText.style.backgroundColor = "rgba(0, 255, 0, 0.8)";
        msg = "Jogador 1 ganhou!";
    } else if (winner == "o") {
        scoreboardO.textContent = parseInt(scoreboardO.textContent) + 1;
        messageText.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
        msg = "Jogador 2 ganhou!";
    } else {
        messageText.style.backgroundColor = "rgba(255, 255, 0, 0.8)";
        msg = "Deu Velha!"
    }

    messageText.innerHTML = msg;
    messageContainer.classList.remove("hide");

    setTimeout(() => {
        messageContainer.classList.add("hide");
    }, 3000);

    player1 = 0;
    player2 = 0;

    let boxesToRemove = document.querySelectorAll(".box div");

    boxesToRemove.forEach(box => {
        box.parentNode.removeChild(box);
    });
}

function computerPlay() {
    let cloneO = o.cloneNode(true);
    counter = 0;
    filled = 0;

    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        
        let randomNumber = Math.floor(Math.random() * 5);
    
        if (box.childNodes[0] == undefined) {
            if (randomNumber <= 1) {
                box.appendChild(cloneO);
                counter++;
                break;
            }
        } else {
            filled++;
        }
    }

    if (counter == 0 && filled < 9) {
        computerPlay();
    }
}