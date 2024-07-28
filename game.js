function createGameBoard()
{
    let row1=["","",""];
    let row2=["","",""];
    let row3=["","",""];
    return {row1,row2,row3};
};
function createPlayer(name,mark,gameBoard)
{
    
    let choice=0
    const playTurn=()=>{
        choice=prompt(`Turn of ${name}`);
        if(choice==="1" || choice==="2" || choice==="3" )
            gameBoard.row1[choice-1]=mark;
        else if(choice==="4" || choice==="5" || choice==="6" )
            gameBoard.row2[choice-4]=mark;
        else if(choice==="7" || choice==="8" || choice==="9" )
            gameBoard.row3[choice-7]=mark;
        
        console.log(gameBoard);
        
    }
    const getTurn=()=>choice;
    return{name,mark,playTurn,getTurn};
}
function playGame()
{
    let gameBoard=createGameBoard();
    const player1=createPlayer("Uzair","x",gameBoard);
    const player2=createPlayer("Yahya","o",gameBoard);
    player1.playTurn();
    console.log(player1.getTurn());
    player2.playTurn();
    console.log(player2.getTurn());
    
}
playGame();