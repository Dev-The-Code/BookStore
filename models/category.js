var mongoose = require('mongoose');
var config = require('../config/config')
var uniqueValidator = require('mongoose-unique-validator');

var categorySchema = new mongoose.Schema({
  
});
categorySchema.plugin(uniqueValidator);
mongoose.model('category',categorySchema);
