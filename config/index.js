/* eslint-disable import/no-dynamic-require */
const env = process.env.NODE_ENV || "dev";
const file = `./config.${env}`;
const config = require(file);

module.exports = config;
// import this index and use it for config
