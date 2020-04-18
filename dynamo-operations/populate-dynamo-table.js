const AWS = require("aws-sdk");
const config = require("../config/config");

AWS.config.update({
  region: "us-west-2",
  endpoint: config.dynamo_endpoint,
});

const docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing test UFOs into DB");

const testUFOs = [
  {
    ID: "154/S154900.html",
    Date_Time: "4/9/20 16:00",
    City: "North Stonington",
    State: "CT",
    Shape: "Sphere",
    Duration: "3 Hours",
    Summary:
      "((HOAX??)) going to take out the garbage saw the ball of light flying towards me I ran back inside I thought I was going to be abducted",
    Posted_Date: "4/9/20",
  },
  {
    ID: "154/_TEST_ONLY.html",
    Date_Time: "4/10/20 18:00",
    City: "Seattle",
    State: "WA",
    Shape: "Rhombus",
    Duration: "1 Hours",
    Summary:
      "I was watching HBO Max, when this crazy light appeared outside my window...",
    Posted_Date: "4/19/20",
  },
];

testUFOs.forEach((ufo) => {
  const params = {
    TableName: "ufos",
    Item: ufo,
  };

  docClient.put(params, (err, data) => {
    if (err) {
      console.error(`Unable to add ufo ${JSON.stringify(err, null, 2)}`);
    } else {
      console.log("PutItem success", ufo.Date_Time, ufo.City, ufo.State);
    }
  });
});
