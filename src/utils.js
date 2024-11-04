const accurateTimer = (fn, time = 1000) => {
  let nextAt, timeout;
  nextAt = new Date().getTime() + time;

  const wrapper = () => {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
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
  let mult = 0.015 * game.total_big_number + 1;
  return mult;
};

const getEssenceMult = (game) => {
  let mult = 0.035 * game.total_essence + 1;
  return mult;
};

const getNumberPerSecond = (game) => {
  let autos = game.auto_numbers;
  const BASE_NPS = 10;
  let nps = autos * BASE_NPS * getBigNumberMult(game);
  return nps;
};

const getBigNumberPerSecond = (game) => {
  let autos = game.auto_big_numbers;
  const BASE_BNPS = 1;
  let bnps = autos * BASE_BNPS * getBigNumberMult(game);
  return bnps;
};

const getPrice = (obj, game) => {
  let price = Math.round((1.55 * game[obj]) + game[`${obj}_price`]);
  return price;
};

const getCompoundingPrice = (obj, game, amt, flag = false) => {
  let total = 0;
  for (let time = 0; time < amt; time++) {
    total += getPrice(obj, game, amt + time);
    if (flag) console.log(total);
  }
  return total;
};

class NumberFormatter {
  constructor() {
    this.endings = {
      long: [
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
        "Trigintillion",
      ],

      short: [
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
        "Tg",
      ],
    };
  }
  format(number, game, params = { decimals: 2 }) {
    if (game == null || game == "undefined") return;
    let num = {
      int: new Intl.NumberFormat().format(number.toFixed(number < 1000 ? params.decimals : 0)),
      decimals: params.decimals,
    };
    num.length = num.int.length;

    if (number < 999999) return num.int;

    let intarray = num.int.split(",");
    let finalarray = [intarray[0], intarray[1]];
    let intlength = intarray.length - finalarray[0].length;
    let ending = this.endings[game.number_endings][intlength];
    var finalnum = `${finalarray[0]}.${finalarray[1]} ${ending}`;

    return finalnum;
  }
}

numberformatter = new NumberFormatter();