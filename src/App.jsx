import reactImg from "./assets/react.svg";
import Players from "./components/Players";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNER_COMBINATION } from "./database/data";
import GameOver from "./components/GameOver";




const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];
const PLAYERS = {
  X: "Player1",
  O: "Player2",
};


function  deriveActivePlayerDetector(gameTurns){
  let playerDetected = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player==='X'){
    playerDetected="O";
  }  
  return playerDetected;
}

function deriveGameBoard(gameTurns) {
  const gameBoard = [...INITIAL_GAME_BOARD.map(row => [...row])];
  if (gameTurns.length > 0) {
    for (const gameTurn of gameTurns) {
      const { square, player } = gameTurn;
      const { row, col } = square;
      gameBoard[row][col] = player;
    }
  }
  return gameBoard;
}

function deriveWinner(players, gameBoard) {
  let winner = null;
  for (const combination of WINNER_COMBINATION) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];
    if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = players[firstSquare];
    }
  }
  return winner;
}

function deriveDraw(gameTurns, winner) {
  let draw = null;
  draw = gameTurns.length === 9 && !winner;
  return draw;
}


function App() {
  const [gameTurns,setGameTurns]= useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayerDetector(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(players, gameBoard);
  const draw = deriveDraw(gameTurns, winner);


 function playerHandler(symbol, name) {
    setPlayers(prevPlayers => {
      return ({ ...prevPlayers, [symbol]: name });
    });
  }
function rematchHandler(){
  setGameTurns([]);
}

function selectActivePlayerHandler(rowIndex, colIndex) {
  setGameTurns((prevGameTurn) => {
    let currentPlayer = deriveActivePlayerDetector(prevGameTurn);
    const updatedGameTurn = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevGameTurn];
    return updatedGameTurn;
  });
}
 
  return (
    <>
      <header>
        <img src={reactImg}/>
        <h1>React Tic-Tac-Toe</h1>
      </header>       
      <main id="game-container">
        <ol id="players" className="highlight-player" > 
         <Players name="Player1" symbol="X"  isActive={activePlayer==="X"}  playerHandler={playerHandler}  />
         <Players name="Player2" symbol ="O" isActive={activePlayer==="O"}  playerHandler={playerHandler} />
        </ol>
      
       {(winner || draw)&&<GameOver winner={winner} onRematch = {rematchHandler} />}
       <GameBoard gameBoard={gameBoard} setSelectedPlayer={selectActivePlayerHandler} />
      </main>
      <Log gameTurns={gameTurns}/>
    </>
  );
}

export default App;





