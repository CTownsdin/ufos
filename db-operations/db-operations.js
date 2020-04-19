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
}

const db = {
  getAllUfos,
};

module.exports = db;
