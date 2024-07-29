function createGameBoard()
{
    let row=["","","","","","","","",""];
    return {row};
};
function createPlayer(name,mark,gameBoard)
{
    
    const playTurn=(playerSelection)=>{
        if(gameBoard.row[playerSelection-1]==="")
            gameBoard.row[playerSelection-1]=mark;
        else
            return -1;
        console.log(gameBoard);
        return 1;
    }
    const getTurn=()=>choice;
    return{name,mark,playTurn,getTurn};
}
function playGame()
{
    let result=0;
    let turnOfPlayer=false;
    let gameBoard=createGameBoard();
    const player1=createPlayer("Uzair","x",gameBoard);
    const player2=createPlayer("Yahya","o",gameBoard);
    let getResult=()=>{
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
    function playerTurn()
    {
        player1.playTurn();
        result=getResult();
        console.log("playerTurn "+player1.getTurn());
        player2.playTurn();
        result=getResult();
        if (result!==0)
        console.log("playerTurn "+player2.getTurn());
    }
    return{gameBoard,player1,player2,result,getResult,checkForDraw,turnOfPlayer};
    
};

function screenController()
{
    let start=playGame();
    console.log(start.gameBoard);
    let correct=0;
    let container=document.querySelector(".game-board");
    let playerSelectedBox=document.querySelectorAll("a");
    
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
            if(start.getResult()===1)
            {
                let winner=(start.turnOfPlayer===false) ? start.player1.name : start.player2.name
                alert(`Winner is ${winner}`);
                playerSelectedBox.forEach(item=> 
                    {
                        item.removeEventListener("click",handlePlayerSelection);
                    });
                const playAgain=document.createElement("button");
                playAgain.textContent="Play Again";
                container.appendChild(playAgain);

                playAgain.addEventListener("click",event=>
                {
                    playerSelectedBox.forEach(item=> 
                        {
                            item.textContent="";
                        });
                    playAgain.remove();
                    screenController();
                });
                
            }
            else if(start.checkForDraw()===true)
            {
                alert("draw");
            }
            start.turnOfPlayer=!start.turnOfPlayer;
        }
        console.log("turn of player "+start.turnOfPlayer);
        correct=0;
    }

    playerSelectedBox.forEach(item=> 
    {
        item.addEventListener("click",handlePlayerSelection);
    });
};

screenController();