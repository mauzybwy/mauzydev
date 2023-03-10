/*****************************************************************************
 * String Utils
 *****************************************************************************/
export const toTimestring = (num) => {
  if (num <= 0 || typeof(num) !== "number") {
    return "--:--:--";
  }
  
  var date = new Date(0);
  date.setSeconds(num); // specify value for SECONDS here
  var timeString = date.toISOString().substring(11, 19);
  return timeString;
}

export const strippedUrl = url => url.toLowerCase().replace(/(^\w+:|^)\/\//, '');

/*****************************************************************************
 * List Utils
 *****************************************************************************/
export const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
export const hasDuplicates = arr => findDuplicates(arr).length !== 0

/*****************************************************************************
 * Timing Utils
 *****************************************************************************/
export const setIntervalX = (callback, delay, repetitions) => {
  var x = 0;
  var intervalID = window.setInterval(() => {
    callback();

    if (++x === repetitions) {
      window.clearInterval(intervalID);
    }
  }, delay);
}

