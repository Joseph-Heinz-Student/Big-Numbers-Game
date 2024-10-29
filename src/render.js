const render = (game) =>{
    document.title = numberformatter.format(Game.number, game);
    statsDOM.innerHTML = `
    <b>Number</b>: ${numberformatter.format(game.number, game)}<br>
    <b>Big Number</b>: ${numberformatter.format(game.big_number, game)}<br>
    <b>Big Number Price</b>: ${numberformatter.format(getPrice(game.big_number, game), game)} <strong>N</strong> <br>
    <b>Big Number Multiplier</b>: ${numberformatter.format(getBigNumberMult(game), game)}<br>`;
    stats2DOM.innerHTML = `
    <b>Essence</b>: ${numberformatter.format(game.essence, game)}<br>
    <b>Essence cost</b>: ${numberformatter.format(getPrice(game.essence, game))} <strong>BN</strong><br>
    <b>Auto Numberers</b>: ${game.auto_numbers} <br> 
    <b>Auto Numberer Price</b>: ${getPrice(game.auto_numbers, game)} <strong>E</strong><br>
    <b>Number Per Second</b>: ${numberformatter.format(getNumberPerSecond(game),game)}<b>N</b>/s`;
    prestigeButtonDOM.innerHTML = `Prestige for ${numberformatter.format(getEssenceMult(game), game)} <strong>BIG NUMBER</strong>`;
    
    // show or hide the buy big number button 
    if(game.number >= getPrice(Game.big_number, game)){
        prestigeDIVDOM.style.display = "block";

        // show or hide the x10 buy big number button
        if(game.number >= getCompoundingPrice(Game.big_number, 10))prestige10ButtonDOM.style.display = "inline-block";
        else prestige10ButtonDOM.style.display = "none";

        //show or hide the x100 buy big number button
        if(game.number >= getCompoundingPrice(Game.big_number, 100))prestige100ButtonDOM.style.display = "inline-block";
        else prestige100ButtonDOM.style.display = "none";

    }else prestigeDIVDOM.style.display = "none";

    //show or hide the buy essence button 
    if(game.big_number >= getPrice(game.essence, game)){
        ascendDIVDOM.style.display = "block";

        //show or hide the x10 buy essence button
        if(game.big_number >= getCompoundingPrice(game.essence, 10)) ascend10ButtonDOM.style.display = "inline-block";
        else ascend10ButtonDOM.style.display = "none";

        //show or hide the x100 buy essence button
        if(game.big_number >= getCompoundingPrice(game.essence, 100)) ascend100ButtonDOM.style.display = "inline-block";
        else ascend100ButtonDOM.style.display = "none";

    }else ascendDIVDOM.style.display = "none";

    // show or hide the buy autonumberer button
    if(game.essence >= getPrice(game.auto_numbers, game)){
        autoNumberDIVDOM.style.display = "block";

        //show or hide the buy auto numberer x10 button
        if(game.essence >= getCompoundingPrice(game.auto_numbers, 10)) autoNumberButton10DOM.style.display = "inline-block";
        else autoNumberButton10DOM.style.display = "none";

        //show or hide the x100 buy auto numberer button
        if(game.essence >= getCompoundingPrice(game.auto_numbers, 100)) autoNumberButton100DOM.style.display = "inline-block";
        else autoNumberButton100DOM.style.display = "none";

    }else autoNumberDIVDOM.style.display = "none";

    if(game.essence >= getPrice(game.auto_big_numbers, game)){
        autoBigNumberDIVDOM.style.display = "block";

        //show or hide the buy auto numberer x10 button
        if(game.essence >= getCompoundingPrice(game.auto_big_numbers, 10)) autoBigNumberButton10DOM.style.display = "inline-block";
        else autoBigNumberButton10DOM.style.display = "none";

        //show or hide the x100 buy auto numberer button
        if(game.essence >= getCompoundingPrice(game.auto_big_numbers, 100)) autoBigNumberButton100DOM.style.display = "inline-block";
        else autoBigNumberButton100DOM.style.display = "none";

    }else autoBigNumberDIVDOM.style.display = "none";

    titleDOM.innerHTML = `Big Numbers Game<br>version ${VERSION}<br>`;
}