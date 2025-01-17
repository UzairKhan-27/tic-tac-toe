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
    const player1=createPlayer("Player1","X",gameBoard);
    const player2=createPlayer("Player2","O",gameBoard);

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
    const div=document.createElement("div");
    const div_2=document.createElement("div");
    const body=document.querySelector(".container-bottom");
    const scoreBoard=document.querySelectorAll(".scores");
    const displayPlayerOneName=document.querySelector(".player1-display");
    const displayPlayerTwoName=document.querySelector(".player2-display");
    const displayPlayerOneScore=document.querySelector(".player1-score");
    const displayPlayerTwoScore=document.querySelector(".player2-score");
    const playAgain=document.createElement("button");
    const backButton=document.createElement("button");
    playAgain.textContent="Play Again";
    backButton.textContent="Main Menu";
    backButton.classList.add("main-menu");
    playAgain.classList.add("play-again");
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
        displayPlayerOneName.textContent=start.player1.name + " (" +start.player1.mark +")" ;
        displayPlayerTwoName.textContent=start.player2.name + " (" +start.player2.mark +")" ;
        scoreBoard[0].style.display="flex";
        scoreBoard[1].style.display="flex";
        console.log(start.player1.name);
        console.log(start.player2.name);
        container.style.display="grid";
        form.close();
        startGameButton.style.display="none";
    });
    
    let playerSelectedBox=document.querySelectorAll("a");
    let start=playGame();
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
                {
                    start.player1.incrementPlayerScore();
                    div.classList.add("result");
                    div.textContent=`Winner`;
                    scoreBoard[0].appendChild(div);
                }
                else if(winner===start.player2.name)
                {
                    start.player2.incrementPlayerScore();
                    div.classList.add("result");
                    div.textContent=`Winner`;
                    scoreBoard[1].appendChild(div);
                }
                // alert(`Winner is ${winner}`);
                playerSelectedBox.forEach(item=> 
                    {
                        item.removeEventListener("click",handlePlayerSelection);
                    });
                body.appendChild(playAgain);
                body.appendChild(backButton);
            }
            else if(start.checkForDraw()===true)
            {
                // alert("draw");
                playerSelectedBox.forEach(item=> 
                    {
                        item.removeEventListener("click",handlePlayerSelection);
                    });
                div.classList.add("result");
                div_2.classList.add("result");
                div.textContent=`Draw`;
                div_2.textContent=`Draw`;
                scoreBoard[0].appendChild(div);
                scoreBoard[1].appendChild(div_2);
                body.appendChild(playAgain);
                body.appendChild(backButton);
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
        backButton.remove();
        playerSelectedBox.forEach(item=> 
            {
                item.textContent="";
            });
        playAgain.remove();
        for(let i=0;i<9;i++)
            {
                start.gameBoard.row[i]="";
            }
        playerSelectedBox.forEach(item=> 
            {
                item.addEventListener("click",handlePlayerSelection);
            });
        correct=0;
        start.turnOfPlayer=false;
        div.remove();
        div_2.remove();
    });

    backButton.addEventListener("click",event=>{
        window.location.reload(true);
    })

};

screenController();