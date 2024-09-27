import { useState } from "react"
export default function Players({name,symbol,isActive, playerHandler}){

    const [isEditing,setIsEditing]= useState(false);
   const [player,setPlayer]= useState(name);


   function saveHandler(e) {
    setPlayer(e.target.value); 
    playerHandler(symbol, e.target.value);
}

   let playerTile= <span className="player-name">{player}</span>; 
   if(isEditing){
      playerTile =<input type="text" className="player-name" value={player} 
       onChange={saveHandler} />;
   }


    function clcikHandler(){
     setIsEditing((prevIsEditing)=> !prevIsEditing);
   
     
    }
 return(
      <li className={isActive?"active" : undefined}>     
             {playerTile}
            <span className="player-symbol">{symbol}</span>
            <button onClick={clcikHandler}>{isEditing ? 'save': 'Edit'}</button>
        </li>
   
 )
}