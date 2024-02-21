const accurateTimer = (fn, time = 1000) => {
    // nextAt is the value for the next time the timer should fire.
    // timeout holds the timeoutID so the timer can be stopped.
    let nextAt, timeout;
    // Initilzes nextAt as now + the time in milliseconds you pass
    // to accurateTimer.
    nextAt = new Date().getTime() + time;
   
    // This function schedules the next function call.
    const wrapper = () => {
      // The next function call is always calculated from when the
      // timer started.
      nextAt += time;
      // this is where the next setTimeout is adjusted to keep the
      //time accurate.
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      // the function passed to accurateTimer is called.
      fn();
    };
   
    // this function stops the timer.
    const cancel = () => clearTimeout(timeout);
   
    // the first function call is scheduled.
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
   
    // the cancel function is returned so it can be called outside
    // accurateTimer.
    return { cancel };
};

const getBigNumberMult = (game) => {
  let mult = (0.035*game.big_number)+1;
  return mult;
};

const getEssenceMult = (game) => {
  let mult = (0.035*game.essence)+1;
  return mult;
};

const getNumberPerSecond = (game) => {
  let autos = game.auto_numbers;
  const BASE_NPS = 1;
  let nps = (autos * BASE_NPS) * getBigNumberMult(game);
  return nps;
}

const getPrice = (obj) => {
  let price = Math.round(1.55*obj+1);
  return price;
};

const getCompoundingPrice = (obj, amt) => {
  let total = 0;
  for(let time = 0; time < amt; time++){
    total += getPrice(obj+time);
  }
  return total;
}

class NumberFormatter {
  constructor(){
    this.endings = {
      "long" : [
        "Thousand",
        "Million",
        "Billion",
        "Trillion",
        "Quadrillion",
        "Quintillion",
        "Sextillion",
        "Septillion",
        "Octillion",
        "Nonillion",
        "Decillion",
        "Undecillion",
        "Duodecillion",
        "Tredecillion",
        "Quattourdecillion",
        "Sexdecillion",
        "Septendecillion",
        "Octodecillion",
        "Novemdecillion",
        "Vigintillion",
        "Unvigintillion",
        "Duovigintillion",
        "Trevigintillion",
        "Quattuorvigintillion",
        "Quinvigintillion",
        "Sexvigintillion",
        "Septenvigintillion",
        "Octovigintillion",
        "Novemvigintillion",
        "Trigintillion"
      ],

      "short" : [
        "K",
        "M",
        "B",
        "T",
        "Qa",
        "Qi",
        "Sx",
        "Sp",
        "Oc",
        "No",
        "Dc",
        "UDc",
        "Ddc",
        "Tdc",
        "Qadc",
        "Qidc",
        "Sxdc",
        "Spdc",
        "Ocdc",
        "Nmdc",
        "Vg",
        "Uvg",
        "Dvg",
        "Tvg",
        "Qavg",
        "Qivg",
        "Sxvg",
        "Spvg",
        "Ocvg",
        "Nmvg",
        "Tg"
      ]
    }
  }
  format (number, game, params = {decimals:3}) {
    let num = {
      "int" : new Intl.NumberFormat().format(number.toFixed(0)),
      "decimals" : params.decimals
    };
    num.length = num.int.length;

    if(number < 999999) return num.int;

    let intarray = num.int.split(",");
    let finalarray = [intarray[0], intarray[1]];
    let intlength = finalarray.length - 1;
    let ending = this.endings[game.number_endings][intlength];
    var finalnum = `${finalarray[0]}.${finalarray[1]} ${ending}`;

    return finalnum;
  }
}

numberformatter = new NumberFormatter();