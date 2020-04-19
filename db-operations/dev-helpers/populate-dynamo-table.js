const AWS = require("aws-sdk");
const config = require("../../config");
const bigUfos = require("../../data/ufos");
const fixTime = require("../../helpers/fixTime");

AWS.config.update({
  region: "us-west-2",
  endpoint: config.dynamo_endpoint,
  // endpoint: "https://dynamodb.us-west-2.amazonaws.com",
});

const docClient = new AWS.DynamoDB.DocumentClient();
console.log("Importing test UFOs into DB");

bigUfos.forEach((ufo) => {
  const newUfo = ufo;
  newUfo.MomentTime = fixTime(ufo["Date / Time"]);

  // replace property "lng\r" with "lng"
  newUfo.lng = ufo["lng\r"];
  delete newUfo["lng\r"];

  const params = {
    TableName: "ufos",
    Item: newUfo,
  };

  docClient.put(params, (err, data) => {
    if (err) {
      console.error(`Unable to add ufo ${JSON.stringify(err, null, 2)}`);
      throw new Error(`Unable to add ufo ${JSON.stringify(err, null, 2)}`);
    } else {
      console.log(`Put Success: ${ufo.MomentTime} ${ufo.City}`);
    }
  });
});

// TODO: NOTE: We're loosing 4 of 500 on upload, this deserves investigation later.
