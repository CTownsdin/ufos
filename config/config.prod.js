const cfg = require("./config.global");

cfg.name = "prod";
cfg.dynamo_endpoint = "https://dynamodb.us-west-2.amazonaws.com";

module.exports = cfg;
