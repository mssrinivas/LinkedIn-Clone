var mongoose = require('mongoose');
var config = require('../constants/constants');
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URI);

module.exports = {mongoose};
