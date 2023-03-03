/**
 *
 * @param {DateTime} IOSDateTime e.g: 2021-06-05T18:09:45Z
 */
export const convertTimeToPeriod = (ISODateTime) => {
  const inputTime = new Date(ISODateTime).getTime();
  const now = new Date(Date.now()).getTime();

  const milliseconds = now - inputTime;
  const seconds = parseInt(milliseconds / 1000);
  const minutes = parseInt(seconds / 60);
  const hours = parseInt(minutes / 60);
  const days = parseInt(hours / 24);
  const weeks = parseInt(days / 7);
  const months = parseInt(days / 30);
  const years = parseInt(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }
  if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  if (minutes > 0) {
    return `${minutes} minutes${minutes > 1 ? "s" : ""} ago`;
  }
  if (seconds > 0) {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }

  return null;
};

/**
 * Symplify numbers greater than 1000 by putting SI symbols, K, M, B at the end
 * @param {number} number
 * @returns
 */
//export const simplifyLargeNumber = (number) => {
//  if (number < 1000) return number;

//  let million = Math.pow(10, 6);
//  let billion = Math.pow(10, 9);
//  let trillion = Math.pow(10, 12);
//  // thounsands
//  if (number < million) return `${Math.floor(number / 1000)}K`;
//  // millions
//  if (number < billion) return `${(number / million).toFixed(1)}M`;
//  // billions
//  if (number < trillion) return `${(number / billion).toFixed(1)}B`;
export const simplifyBigNumber = (value, precision = 2) => {
  const billion = value / 1000000000;
  const million = value / 1000000;
  const thousand = value / 1000;

  if (billion.toFixed(0) > 0) {
    return `${billion.toFixed(precision)}B`;
  }

  if (million.toFixed(0) > 0) {
    return `${million.toFixed(precision)}M`;
  }

  if (thousand.toFixed(0) > 0) {
    return `${thousand.toFixed(precision)}K`;
  }

  return value;
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// const case1 = "PT2H2M44S";
// const case2 = "PT3M4S";
// const case3 = "PT0M4S";
// const case4 = "PT2M";

export const getTimeFromDurationString = (durationStr) => {
  let second = durationStr.match(/\d+S/g)?.toString().slice(0, -1);
  let minute = durationStr.match(/\d+M/g)?.toString().slice(0, -1);
  let hour = durationStr.match(/\d+H/g)?.toString().slice(0, -1);

  let displaySecond, displayMinute, displayHour;

  if (second) {
    if (parseInt(second) < 10) {
      displaySecond = `0${second}`;
    } else {
      displaySecond = second;
    }
  } else {
    displaySecond = "00";
  }

  if (minute) {
    if (parseInt(minute) < 10) {
      displayMinute = `0${minute}`;
    } else {
      displayMinute = minute;
    }
  } else {
    displayMinute = "00";
  }

  if (hour) {
    if (parseInt(hour) < 10) {
      displayHour = `0${hour}`;
    }
  }

  let res = `${hour ? `${displayHour}:` : ""}${displayMinute}:${displaySecond}`;

  return res;
};
