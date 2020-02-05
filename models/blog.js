var mongoose = require('mongoose');
var config = require('../config/config');


var blogSchema = new mongoose.Schema({
	maintitle:{type:String},
	subtitle:{type:String},
	image:{type:Array},
	description:{type:String},
});
mongoose.model('blogdata',blogSchema);
