const AWS = require("aws-sdk");
const config = require("../config/config");

AWS.config.update({
  region: "us-west-2",
  endpoint: config.dynamo_endpoint,
});

const docClient = new AWS.DynamoDB.DocumentClient();

console.log("Getting test UFOs from DB");

const params = {
  TableName: "ufos",
  Key: {
    ID: "154/S154900.html",
  },
};

docClient.get(params, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(`success: ${JSON.stringify(data, null, 2)}`);
});
