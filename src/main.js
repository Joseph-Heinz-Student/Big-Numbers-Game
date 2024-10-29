/*
    vars and lets are lowercase with underscores
    functions are lowercase with capitalizedSecondaryWords
    consts are CAPITALIZED
*/
const LS = localStorage;
const VERSION = "0.0.12-alpha";

class GAME {
    constructor(){
        this.number = 0;
        this.big_number = 0;
        this.big_number_price = 10;
        this.total_big_number = 0;
        this.TPS = 20;
        this.essence = 0;
        this.essence_price = 10;
        this.total_essence = 0;
        this.auto_numbers = 0;
        this.auto_numbers_price = 5;
        this.auto_big_numbers = 0;
        this.auto_big_numbers_price = 10;
        this.number_endings = "long";
    }
}

const save = (game) => {
    LS.gameSave = JSON.stringify(game);
};

const load = (game) => {
    if(LS){
        if(LS.gameSave !== null && LS.gameSave !== "undefined"){
            console.log(LS.gameSave);
            let gameSave = JSON.parse(LS.gameSave);
            for(let item in game){
                if(gameSave[item] == null){
                    gameSave[item] = game[item];
                }
            }
            game = gameSave;
        }
    }
    return game;
};

const reset = () => {
    Game = new GAME();
};

var Game = new GAME();

var gameLoop;

function tryload(){
    try{
        Game = load(Game);
    }
    catch{
        console.error("Load failed");
    }
    gameLoop = accurateTimer(() => {
        Game.number += getNumberPerSecond(Game) / Game.TPS;
        Game.big_number += getBigNumberPerSecond(Game) / Game.TPS;
        Game.total_big_number += getBigNumberPerSecond(Game) / Game.TPS;
        Game.number_endings = numberEndingsDOM.value;
        //Game.number = Math.round(Game.number);
        save(Game);
        render(Game);
    },1000/Game.TPS);
}

const prestige = (amt) => {
    let total = getCompoundingPrice("big_number", Game, amt);
    if(Game.number >= total){
        Game.number -= total;
        let num = Math.round(1 * getEssenceMult(Game)) * amt;
        Game.big_number += num;
        Game.total_big_number += num;
    }else alert(`Not enough NUMBER\nYou need ${numberformat.format(total)}`);
    return total;
};

const numberClick = () => {
    let num = Math.round(1 * getBigNumberMult(Game));
    Game.number += num;
};

const ascend = (amt) => {
    var total = getCompoundingPrice("essence", Game, amt);
    if(Game.big_number >= total){
        Game.big_number -= total;
        Game.essence += amt;
        Game.total_essence += amt;
    }else alert(`Not enough BIG NUMBER\nYou need ${numberformat.format(total)}`);
    return total;
};

const buyAutoNumber = (amt) => {
    var total = getCompoundingPrice("auto_numbers", Game, amt);
    if(Game.essence >= total){
        Game.essence -= total;
        Game.auto_numbers += amt;
    }else alert(`Not enough ESSENCE\nYou need: ${numberformat.format(total)}`);
    return total;
};

const buyAutoBigNumber = (amt) => {
    var total = getCompoundingPrice("auto_big_numbers", Game, amt);
    if(Game.essence >= total){
        Game.essence -= total;
        Game.auto_big_numbers += amt;
    }else alert(`Not enough ESSENCE\nYou need ${numberformat.format(total)}`);
}