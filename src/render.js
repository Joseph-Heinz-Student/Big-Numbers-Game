const render = (game) =>{
    statsDOM.innerHTML = `Number: ${numberformat.format(game.number,{sigfigs:3})} | Big Number: ${numberformat.format(game.big_number,{sigfigs:3})} | Big Number Price: ${numberformat.format(getBigNumberPrice(game))} <strong>N</strong> | Big Number Multiplier: ${numberformat.format(getBigNumberMult(game),{sigfigs:4})}`;
    stats2DOM.innerHTML = `Essence: ${numberformat.format(game.essence,{sigfigs:3})} | Essence cost: ${numberformat.format(getEssenceCost(game))} <strong>BN</strong>`;
    prestigeButtonDOM.innerHTML = `Prestige for ${numberformat.format(getEssenceMult(game),{sigfigs:3})} <strong>BIG NUMBER</strong>`;
    if(game.number >= getBigNumberPrice(game)){
        prestigeButtonDOM.style.display = "inline-block";
    }else{
        prestigeButtonDOM.style.display = "none";
    }
    if(game.big_number >= getEssenceCost(game)){
        ascendButtonDOM.style.display = "block";
    }else{
        ascendButtonDOM.style.display = "none";
    }
    titleDOM.innerHTML = `Big Numbers Game<br>version ${VERSION}<br>`;
}