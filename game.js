function createGameBoard()
{
    let row=["","","","","","","","",""];
    return {row};
};
function createPlayer(name,mark,gameBoard)
{
    
    let choice=0
    const playTurn=()=>{
        choice=prompt(`Turn of ${name}`);
        if(gameBoard.row[choice-1]==="")
            gameBoard.row[choice-1]=mark;
        else
            playTurn();
        console.log(gameBoard);
        
    }
    const getTurn=()=>choice;
    return{name,mark,playTurn,getTurn};
}
function playGame()
{
    let result=0;
    let gameBoard=createGameBoard();
    const player1=createPlayer("Uzair","x",gameBoard);
    const player2=createPlayer("Yahya","o",gameBoard);
    while(result===0)
    {
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
        player1.playTurn();
        result=getResult();
        if (result!==0)
            break;
        console.log(player1.getTurn());
        player2.playTurn();
        result=getResult();
        if (result!==0)
            break;
        console.log(player2.getTurn());
    }
    return{gameBoard};
    
}
let start=playGame();
console.log(start.gameBoard);