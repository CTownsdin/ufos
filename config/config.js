var _ = require('lodash');
var env = process.env.NODE_ENV || 'dev';

module.exports = _.merge(
    require(__dirname + '/../config/env/all.js'),
    require(__dirname + '/../config/env/' + env + '.js') || {}
);
