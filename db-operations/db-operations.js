const AWS = require("aws-sdk");
const config = require("../config");

AWS.config.update({
  region: "us-west-2",
  endpoint: new AWS.Endpoint(config.dynamo_endpoint),
});

const docClient = new AWS.DynamoDB.DocumentClient();

async function getAllUfos() {
  const params = {
    TableName: "ufos",
  };

  try {
    const data = await docClient.scan(params).promise();
    return {
      statusCode: 200,
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      error: err,
    };
  }

  // TODO:
  // scan can retrieve a maximum of 1MB of data, get more...
  // if (typeof data.LastEvaluatedKey != "undefined") {
  //   console.log("Scanning for more...");
  //   params.ExclusiveStartKey = data.LastEvaluatedKey;
  //   docClient.scan(params, onScan);
  // }
}

// note: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html
async function getUfosByCity(city) {
  const params = {
    TableName: "ufos",
    IndexName: "City-index",
    ExpressionAttributeValues: {
      ":this_city": city,
    },
    KeyConditionExpression: "City = :this_city", // provide a specific value for the secondary index key.
  };

  try {
    const data = await docClient.query(params).promise();
    return {
      statusCode: 200,
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      error: err,
    };
  }
  // TODO: Clean up this error properly: (node:70296) UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
}

// NOTE: for FilterExpression, it's the same syntax as ConditionExpressions, which is found here...
// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.OperatorsAndFunctions.html
async function getUfosByTimestamp(timestamp) {
  const params = {
    TableName: "ufos",
    ExpressionAttributeValues: {
      ":this_time": timestamp,
    },
    KeyConditionExpression: "MomentTime = :this_time", // provide a specific value for the partition key.
    // TODO: Try begins_with() for searching for dates like... 2016-11-15
  };

  try {
    const data = await docClient.query(params).promise();
    return {
      statusCode: 200,
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      error: err,
    };
  }
}

const db = {
  getAllUfos,
  getUfosByCity,
  getUfosByTimestamp,
};

module.exports = db;
