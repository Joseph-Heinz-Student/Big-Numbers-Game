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

const getBigNumberPrice = (game) => {
  let price = Math.round((1.55*game.big_number)+1);
  return price;
};

const getBigNumberMult = (game) => {
  let mult = (0.015*game.big_number)+1;
  return mult;
};

const getEssenceCost = (game) => {
  let price = Math.round(1.55*game.essence+1);
  return price;
};

const getEssenceMult = (game) => {
  let mult = (0.015*game.essence)+1;
  return mult;
};

const getAutoNumberCost = (game) => {
  let price = Math.round(1.55*game.auto_numbers+1);
  return price;
};

const getNumberPerSecond = (game) => {
  let autos = game.auto_numbers;
  const BASE_NPS = 0.1;
  let nps = (autos * BASE_NPS);
  return nps;
}