const render = (game) =>{
    statsDOM.innerHTML = `Number: ${numberformat.format(game.number,{sigfigs:3})} | Big Number: ${numberformat.format(game.big_number,{sigfigs:3})} | Big Number Price: ${numberformat.format(getBigNumberPrice(game))}`;
    if(game.number >= getBigNumberPrice(game)){
        prestigeButtonDOM.style.display = "inline-block";
    }else{
        prestigeButtonDOM.style.display = "none";
    }
}