const moment = require("moment");

// Deal with normalizing different time formats
// handy: https://regex101.com/ enjoy!

// "2016-07-04 21:00:00",
// ^\d{4}-\d{1,2}-\d{1,2}\s\d{1,2}:\d{1,2}:\d{1,2}$

// "2016-07-04 21:00",
// ^\d{4}-\d{1,2}-\d{1,2}\s\d{1,2}:\d{1,2}$

// "4/15/16 22:15",
// ^\d{1,2}\/\d{1,2}\/\d{2}\s\d{1,2}:\d{1,2}$

// hypothetical 4th, just in case
// 4/15/2020 22:15
// ^\d{1,2}\/\d{1,2}\/\d{4}\s\d{1,2}:\d{1,2}$

// hypothetical 5th, just in case
// 4/15/2020 22:15:00
// ^\d{1,2}\/\d{1,2}\/\d{4}\s\d{1,2}:\d{1,2}:\d{1,2}$

function fixTime(input) {
  if (/^\d{4}-\d{1,2}-\d{1,2}\s\d{1,2}:\d{1,2}:\d{1,2}$/.test(input)) {
    return moment(input, "YYYY-MM-DD HH:mm:ss").format();
  }

  if (/^\d{4}-\d{1,2}-\d{1,2}\s\d{1,2}:\d{1,2}$/.test(input)) {
    return moment(input, "YYYY-MM-DD HH:mm").format();
  }

  if (/^\d{1,2}\/\d{1,2}\/\d{2}\s\d{1,2}:\d{1,2}$/.test(input)) {
    return moment(input, "MM-DD-YY HH:mm").format();
  }

  if (/^\d{1,2}\/\d{1,2}\/\d{4}\s\d{1,2}:\d{1,2}$/.test(input)) {
    return moment(input, "MM-DD-YYYY HH:mm").format();
  }

  if (/^\d{1,2}\/\d{1,2}\/\d{4}\s\d{1,2}:\d{1,2}:\d{1,2}$/.test(input)) {
    return moment(input, "MM-DD-YYYY HH:mm:ss").format();
  }

  console.error(`Unmatched Time Format: ${input}`);
  return "Invalid date"; // Note: Sometimes it is a location, and not a date. TODO: Do something?
}

module.exports = fixTime;

// quick and dirty testing
// TODO: replace this with a proper unit test

// console.log(fixTime("2016-07-04 21:00:00"));
// console.log(fixTime("2016-07-04 21:00"));
// console.log(fixTime("4/15/16 22:15"));
// console.log(fixTime("11/15/16 22:15"));
// console.log(fixTime("4/15/2020 22:15"));
// console.log(fixTime("4/15/2020 22:15:30"));
// console.log(fixTime("4/15/2020 22:15:00"));

// 2016-07-04T21:00:00-07:00
// 2016-07-04T21:00:00-07:00
// 2016-04-15T22:15:00-07:00
// 2016-11-15T22:15:00-08:00
// 2020-04-15T22:15:00-07:00
// 2020-04-15T22:15:30-07:00
// 2020-04-15T22:15:00-07:00
