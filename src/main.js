/*
    vars and lets are lowercase with underscores
    functions are lowercase with capitalizedSecondaryWords
    consts are CAPITALIZED
*/
const LS = localStorage;
const VERSION = "0.0.9-alpha";

class GAME {
    constructor(){
        this.number = 0;
        this.big_number = 0;
        this.TPS = 20;
        this.essence = 0;
        this.auto_numbers = 0;
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
        //Game.number = Math.round(Game.number);
        save(Game);
        render(Game);
    },1000/Game.TPS);
}

const prestige = (amt) => {
    let total = getCompoundingPrice(Game.big_number, amt);
    if(Game.number >= total){
        Game.number -= total;
        let num = Math.round(1 * getEssenceMult(Game)) * amt;
        Game.big_number += num;
    }else alert(`Not enough NUMBER\nYou need ${numberformat.format(total)}`);
    return total;
};

const numberClick = () => {
    let num = Math.round(1 * getBigNumberMult(Game));
    Game.number += num;
};

const ascend = (amt) => {
    var total = getCompoundingPrice(Game.essence, amt);
    if(Game.big_number >= total){
        Game.big_number -= total;
        Game.essence++;
    }else alert(`Not enough BIG NUMBER\nYou need ${numberformat.format(total)}`);
    return total;
};

const buyAutoNumber = (amt) => {
    var total = getCompoundingPrice(Game.auto_numbers, amt);
    if(Game.essence >= total){
        Game.essence -= total;
        Game.auto_numbers++;
    }else alert(`Not enough ESSENCE\nYou need: ${numberformat.format(total)}`);
    return total;
};