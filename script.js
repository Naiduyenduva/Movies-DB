    let boxes = document.querySelectorAll(".game-box")
    let restartbtn = document.querySelector("#restart-game")
    let newGamebtn = document.querySelector("#new-game-button")
    let messageContainer = document.querySelector("#message-container")
    let gameMessage = document.querySelector("#game-message")

    let count = 0; //to know match is drawn
    let turnO = true;  //playerX, playerO

    const winPatterns = [
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [3,4,5],
        [6,7,8]
    ]

    boxes.forEach((box)=> {
        box.addEventListener("click",()=> {
            if(turnO) {
                box.innerText = "O"
                turnO = false
            }
            else {
                box.innerText = "X"
                turnO = true
            }
            box.disabled = true;
            count++;

            let isWinner = checkWinner();

            if(count === 9 && !isWinner) {
                gameDraw();
            }

        })
    })

    const gameDraw = () => {
        gameMessage.innerText = "Game was a draw";
        messageContainer.classList.remove("hide");
        disableBoxes();
    }

    const disableBoxes = () => {
        for(let box of boxes) {
            box.disabled = true;
        }
    }

    const enableBoxes = () => {
        for(let box of boxes) {
            box.disabled = false
            box.innerText = ""
        }
    }

    const showWinner = (winner) => {
        gameMessage.innerText = `congrats, winner is ${winner}`
        messageContainer.classList.remove("hide");
        disableBoxes();

    }

    const resetgame = () => {
        turnO = true;
        count = 0;
        enableBoxes();
        messageContainer.classList.add("hide");
    }

    const checkWinner = () => {
        for(let pattern of winPatterns) {
            let pos1val = boxes[pattern[0]].innerText;
            let pos2val = boxes[pattern[1]].innerText;
            let pos3val = boxes[pattern[2]].innerText;
    
            if(pos1val !== "" && pos2val !== "" && pos3val !== "") {
                if(pos1val === pos2val && pos2val === pos3val) {
                    showWinner(pos1val)
                    return true;
                }
            }
        }
        return false;
    }

newGamebtn.addEventListener("click",resetgame);
restartbtn.addEventListener("click",resetgame);