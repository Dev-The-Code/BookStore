var mongoose = require('mongoose');
var config = require('../config/config');

var profileSchema = new mongoose.Schema({
	user_id:{type:String},
	description:{type:String},
	email:{type:String},
	facebooklink:{type:String},
	twitterlink:{type:String},
	googlelink:{type:String},
	linkdin:{type:String},
	location:{type:String},
	name:{type:String},
	phone:{type:String},
	imageurl:{type:String},
	blockprofile:{type:Boolean},
	verifiedprofile:{type:Boolean},
})

mongoose.model('profiledatabase',profileSchema);
