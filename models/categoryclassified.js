var mongoose = require('mongoose');
var config = require('../config/config');

var categoryclassifiedSchema = new mongoose.Schema({
	categoryandsubcategory:{type:Array},

});	
mongoose.model('categoryclassified',categoryclassifiedSchema);