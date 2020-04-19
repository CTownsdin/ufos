const moment = require("moment");

// Deal with normalizing different time formats
// handy: https://regex101.com/ enjoy!

function fixTime(input) {
  // "2016-07-04 21:00:00",
  // ^\d{4}-\d{1,2}-\d{1,2}\s\d{1,2}:\d{1,2}:\d{1,2}$
  if (/^\d{4}-\d{1,2}-\d{1,2}\s\d{1,2}:\d{1,2}:\d{1,2}$/.test(input)) {
    return moment(input, "YYYY-MM-DD HH:mm:ss").format();
  }

  // "2016-07-04 21:00",
  // ^\d{4}-\d{1,2}-\d{1,2}\s\d{1,2}:\d{1,2}$
  if (/^\d{4}-\d{1,2}-\d{1,2}\s\d{1,2}:\d{1,2}$/.test(input)) {
    return moment(input, "YYYY-MM-DD HH:mm").format();
  }

  // "4/15/16 22:15",
  // ^\d{1,2}\/\d{1,2}\/\d{2}\s\d{1,2}:\d{1,2}$
  if (/^\d{1,2}\/\d{1,2}\/\d{2}\s\d{1,2}:\d{1,2}$/.test(input)) {
    return moment(input, "MM-DD-YY HH:mm").format();
  }

  // "4/15/2020 22:15"
  // ^\d{1,2}\/\d{1,2}\/\d{4}\s\d{1,2}:\d{1,2}$
  if (/^\d{1,2}\/\d{1,2}\/\d{4}\s\d{1,2}:\d{1,2}$/.test(input)) {
    return moment(input, "MM-DD-YYYY HH:mm").format();
  }

  // "4/15/2020 22:15:00"
  // ^\d{1,2}\/\d{1,2}\/\d{4}\s\d{1,2}:\d{1,2}:\d{1,2}$
  if (/^\d{1,2}\/\d{1,2}\/\d{4}\s\d{1,2}:\d{1,2}:\d{1,2}$/.test(input)) {
    return moment(input, "MM-DD-YYYY HH:mm:ss").format();
  }

  // "11/13/16"
  // ^\d{1,2}\/\d{1,2}\/\d{2}$
  if (/^\d{1,2}\/\d{1,2}\/\d{2}$/.test(input)) {
    return moment(input, "MM-DD-YY").format();
  }

  // "11/13/2020"
  // ^\d{1,2}\/\d{1,2}\/\d{4}$
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(input)) {
    return moment(input, "MM-DD-YYYY").format();
  }

  console.error(`Unmatched Time Format: ${input}`);
  throw new Error(`Unmatched Time Format: ${input}`);
  // Note: Sometimes it is a location, and not a date. Bad Data.
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
