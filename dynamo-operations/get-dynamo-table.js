const AWS = require("aws-sdk");
const config = require("../config/config");

AWS.config.update({
  region: "us-west-2",
  endpoint: config.dynamo_endpoint,
});

const docClient = new AWS.DynamoDB.DocumentClient();

console.log("Getting test UFOs from DB");

// const params = {
//   TableName: "ufos",
//   Key: {
//     ID: "154/S154900.html",
//   },
// };

// docClient.get(params, (err, data) => {
//   if (err) console.log(err, err.stack);
//   else console.log(`success: ${JSON.stringify(data, null, 2)}`);
// });

// GET where the city is Seattle.
// GET Needs BOTH
const cityParams = {
  TableName: "ufos",
  Key: {
    Occurrence_Date_Time: "2020-04-09T16:00:00-07:00", // Partition
    Location_City: "North Stonington", // Sort
  }, // get needs BOTH keys.
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

docClient.query(params, function (err, data) {
  if (err) {
    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
  } else {
    console.log("Query succeeded.");
    data.Items.forEach(function (item) {
      console.log(" -", item.year + ": " + item.title);
    });
  }
});
