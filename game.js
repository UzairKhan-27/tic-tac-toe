function createGameBoard()
{
    let row=["","","","","","","","",""];
    return {row};
};
function createPlayer(name,mark,gameBoard)
{
    
    let playerScore=0;
    let incrementPlayerScore=()=>playerScore++;
    let getPlayerScore=()=>playerScore;
    const playTurn=(playerSelection)=>{
        if(gameBoard.row[playerSelection-1]==="")
            gameBoard.row[playerSelection-1]=mark;
        else
            return -1;
        console.log(gameBoard);
        return 1;
    }
    const getTurn=()=>choice;
    return{name,mark,playTurn,getTurn,incrementPlayerScore,getPlayerScore,playerScore};
}
function playGame()
{
    let result=0;
    let turnOfPlayer=false;
    let gameBoard=createGameBoard();
    const player1=createPlayer("Player1","x",gameBoard);
    const player2=createPlayer("Player2","o",gameBoard);

    let checkForWinner=()=>{
        if((        gameBoard.row[0]===gameBoard.row[1] && gameBoard.row[0]===gameBoard.row[2] && gameBoard.row[0]!=="")
                || (gameBoard.row[3]===gameBoard.row[4] && gameBoard.row[3]===gameBoard.row[5] && gameBoard.row[3]!=="")
                || (gameBoard.row[6]===gameBoard.row[7] && gameBoard.row[6]===gameBoard.row[8] && gameBoard.row[6]!=="")

                || (gameBoard.row[0]===gameBoard.row[3] && gameBoard.row[0]===gameBoard.row[6] && gameBoard.row[0]!=="")
                || (gameBoard.row[1]===gameBoard.row[4] && gameBoard.row[1]===gameBoard.row[7] && gameBoard.row[1]!=="")
                || (gameBoard.row[2]===gameBoard.row[5] && gameBoard.row[2]===gameBoard.row[8] && gameBoard.row[2]!=="")

                || (gameBoard.row[0]===gameBoard.row[4] && gameBoard.row[0]===gameBoard.row[8] && gameBoard.row[0]!=="")
                || (gameBoard.row[2]===gameBoard.row[4] && gameBoard.row[2]===gameBoard.row[6] && gameBoard.row[2]!=="")
                )
            return 1;
        else
            return 0;
    };
    let checkForDraw=()=>{
        for(let i=0;i<9;i++)
        {
            if(gameBoard.row[i]==="")
                return false;
        }
        return true;
    }
    return{gameBoard,player1,player2,result,checkForWinner,checkForDraw,turnOfPlayer};
    
};

function screenController()
{
    let correct=0;
    let container=document.querySelector(".game-board");
    const displayPlayerOneScore=document.querySelector(".player1-score");
    const displayPlayerTwoScore=document.querySelector(".player2-score");
    let startGameButton=document.querySelector("#start-game");
    let submitFormButton=document.querySelector("#submit");
    let form=document.querySelector("dialog");
    startGameButton.addEventListener("click",event=>{
        form.showModal();
    });
    submitFormButton.addEventListener("click",event=>{
        let playerOneName=document.getElementById("player1-name").value;
        let playerTwoName=document.getElementById("player2-name").value;
        start.player1.name=playerOneName;
        start.player2.name=playerTwoName;
        console.log(start.player1.name);
        console.log(start.player2.name);
        container.style.display="grid";
        form.close();
    });
    
    let playerSelectedBox=document.querySelectorAll("a");
    let start=playGame();
    const playAgain=document.createElement("button");
    playAgain.textContent="Play Again";
    console.log(start.gameBoard);
    

    function handlePlayerSelection(event)
    {
        console.log(event.target.id);
        if(start.turnOfPlayer===false)
            correct=start.player1.playTurn(event.target.id);
        else
            correct=start.player2.playTurn(event.target.id);
        console.log(start.gameBoard);
        if(correct!==-1)
        {
            event.target.textContent=(start.turnOfPlayer===false) ? start.player1.mark : start.player2.mark;
            if(start.checkForWinner()===1)
            {
                let winner=(start.turnOfPlayer===false) ? start.player1.name : start.player2.name
                if(winner===start.player1.name)
                    start.player1.incrementPlayerScore();
                else if(winner===start.player2.name)
                    start.player2.incrementPlayerScore();
                alert(`Winner is ${winner}`);
                container.appendChild(playAgain);
            }
            else if(start.checkForDraw()===true)
            {
                alert("draw");
                container.appendChild(playAgain);
            }
            start.turnOfPlayer=!start.turnOfPlayer;
        }
        displayPlayerOneScore.textContent=start.player1.getPlayerScore();
        displayPlayerTwoScore.textContent=start.player2.getPlayerScore();
        correct=0;
    }

    playerSelectedBox.forEach(item=> 
    {
        item.addEventListener("click",handlePlayerSelection);
    });

    playAgain.addEventListener("click",event=>
        {
            playerSelectedBox.forEach(item=> 
                {
                    item.textContent="";
                });
            playAgain.remove();
            for(let i=0;i<9;i++)
                {
                    start.gameBoard.row[i]="";
                }
            correct=0;
            start.turnOfPlayer=false;
        });
};

screenController();