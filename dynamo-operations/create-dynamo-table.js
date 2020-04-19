const AWS = require("aws-sdk");
const config = require("../config/config");

AWS.config.update({
  region: "us-west-2",
  endpoint: config.dynamo_endpoint,
});

// Reference: One UFO.
// {
//   "Date / Time": "1/26/16 01:26",
//   Country: "USA",
//   City: "Denver",
//   State: "CO",
//   Shape: "Unknown",
//   Summary:
//     "Is anyone else seeing this now?? I'm downtown Denver and I'm looking W \r\nabove the mountains. Really high up there are lights pulsating.",
//   lat: 39.7348381,
//   "lng\r": -104.965327,
// }
const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const params = {
  TableName: "ufos",
  KeySchema: [
    { AttributeName: "Date / Time", KeyType: "HASH" }, // Partition Key
    { AttributeName: "City", KeyType: "RANGE" }, // Sort Key
  ],
  AttributeDefinitions: [
    { AttributeName: "Date / Time", AttributeType: "S" },
    { AttributeName: "City", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};

dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
