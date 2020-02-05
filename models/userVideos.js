var mongoose = require('mongoose');
var config = require('../config/config');

var videoSchema = new mongoose.Schema({
	title:{type:String},
	description:{type:String},
	videoLink:{type:Array},
	thumbnailImageLink:{ type:String },
	tags:{ type:Array },
	category:{type:String}
});
mongoose.model('customData',videoSchema);
