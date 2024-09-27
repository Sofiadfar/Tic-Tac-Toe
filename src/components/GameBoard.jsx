import React from "react"
function GameBoard({gameBoard,setSelectedPlayer}) {

  return (
    <ol id='game-board'>
   {gameBoard.map((row,rowIndex)=> 
    <li key={rowIndex}><ol>{row.map((col,colIndex)=> 
     <li key={colIndex}><button onClick={()=> setSelectedPlayer(rowIndex,colIndex)}  disabled={gameBoard[rowIndex][colIndex]!==null}>{col}</button></li>)}</ol></li>)}

    </ol>
  )
}

export default GameBoard
