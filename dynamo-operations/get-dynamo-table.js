const AWS = require("aws-sdk");
const config = require("../config/config");

AWS.config.update({
  region: "us-west-2",
  endpoint: config.dynamo_endpoint,
});

const docClient = new AWS.DynamoDB.DocumentClient();

console.log("Getting test UFOs from DB");

const cityParams = {
  TableName: "ufos",
  Key: {
    Occurrence_Date_Time: "2020-04-09T16:00:00-07:00", // Partition
    Location_City: "North Stonington", // Sort
  },
};

docClient.get(cityParams, (err, data) => {
  if (err) console.log(err);
  else {
    console.log(`Getting with both keys ${JSON.stringify(data, null, 2)}`);
  }
});

const params = {
  TableName: "ufos",
  KeyConditionExpression: "#yr = :yyyy",
  ExpressionAttributeNames: {
    "#yr": "year",
  },
  ExpressionAttributeValues: {
    ":yyyy": 1985,
  },
};

docClient.query(params, (err, data) => {
  if (err) {
    console.error("Query error:", JSON.stringify(err, null, 2));
  } else {
    console.log("Query success");
    data.Items.forEach((item) => {
      console.log(`${item["Date / Time"]} ${item.City}`);
    });
  }
});
