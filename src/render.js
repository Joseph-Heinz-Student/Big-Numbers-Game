const render = (game) =>{
    document.title = numberformat.format(Game.number,{sigfigs:6});
    statsDOM.innerHTML = `
    <b>Number</b>: ${numberformat.format(game.number,{sigfigs:6})}<br>
    <b>Big Number</b>: ${numberformat.format(game.big_number,{sigfigs:6})}<br>
    <b>Big Number Price</b>: ${numberformat.format(getPrice(game.big_number))} <strong>N</strong> <br>
    <b>Big Number Multiplier</b>: ${numberformat.format(getBigNumberMult(game),{sigfigs:6})}x<br>`;
    stats2DOM.innerHTML = `
    <b>Essence</b>: ${numberformat.format(game.essence,{sigfigs:6})}<br>
    <b>Essence cost</b>: ${numberformat.format(getPrice(game.essence))} <strong>BN</strong><br>
    <b>Auto Numberers</b>: ${game.auto_numbers} <br> 
    <b>Auto Numberer Price</b>: ${getPrice(game.auto_numbers)} <strong>E</strong><br>
    <b>Number Per Second</b>: ${getNumberPerSecond(game).toFixed(1)}<b>N</b>/s`;
    prestigeButtonDOM.innerHTML = `Prestige for ${numberformat.format(getEssenceMult(game),{sigfigs:6})} <strong>BIG NUMBER</strong>`;
    
    // show or hide the buy big number button 
    if(game.number >= getPrice(Game.big_number)){
        prestigeDIVDOM.style.display = "block";

        // show or hide the x10 buy big number button
        if(game.number >= getCompoundingPrice(Game.big_number, 10))prestige10ButtonDOM.style.display = "inline-block";
        else prestige10ButtonDOM.style.display = "none";

        //show or hide the x100 buy big number button
        if(game.number >= getCompoundingPrice(Game.big_number, 100))prestige100ButtonDOM.style.display = "inline-block";
        else prestige100ButtonDOM.style.display = "none";

    }else prestigeDIVDOM.style.display = "none";

    //show or hide the buy essence button 
    if(game.big_number >= getPrice(game.essence)){
        ascendDIVDOM.style.display = "block";

        //show or hide the x10 buy essence button
        if(game.big_number >= getCompoundingPrice(game.essence, 10)) ascend10ButtonDOM.style.display = "inline-block";
        else ascend10ButtonDOM.style.display = "none";

        //show or hide the x100 buy essence button
        if(game.big_number >= getCompoundingPrice(game.essence, 100)) ascend100ButtonDOM.style.display = "inline-block";
        else ascend100ButtonDOM.style.display = "none";

    }else ascendDIVDOM.style.display = "none";

    // show or hide the buy autonumberer button
    if(game.essence >= getPrice(game.auto_numbers)){
        autoNumberDIVDOM.style.display = "block";

        //show or hide the buy auto numberer x10 button
        if(game.essence >= getCompoundingPrice(game.auto_numbers, 10)) autoNumberButton10DOM.style.display = "inline-block";
        else autoNumberButton10DOM.style.display = "none";

        //show or hide the x100 buy auto numberer button
        if(game.essence >= getCompoundingPrice(game.auto_numbers, 100)) autoNumberButton100DOM.style.display = "inline-block";
        else autoNumberButton100DOM.style.display = "none";

    }else autoNumberDIVDOM.style.display = "none";

    titleDOM.innerHTML = `Big Numbers Game<br>version ${VERSION}<br>`;
}