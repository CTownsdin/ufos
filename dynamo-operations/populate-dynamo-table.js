const AWS = require("aws-sdk");
const moment = require("moment");
const config = require("../config/config");
const bigUfos = require("../data/ufos");

AWS.config.update({
  region: "us-west-2",
  endpoint: "https://dynamodb.us-west-2.amazonaws.com",
});

const docClient = new AWS.DynamoDB.DocumentClient();
console.log("Importing test UFOs into DB");

bigUfos.slice(0, 3).forEach((ufo) => {
  const newUfo = ufo;

  newUfo["Date / Time"] = moment(
    ufo.Occurrence_Date_Time,
    "MM-DD-YY HH:mm"
  ).format();

  const params = {
    TableName: "ufos",
    Item: newUfo,
  };

  docClient.put(params, (err, data) => {
    if (err) {
      console.error(`Unable to add ufo ${JSON.stringify(err, null, 2)}`);
    } else {
      console.log(`PutItem success: ${ufo["Date / Time"]} ${ufo.City}`);
    }
  });
});
