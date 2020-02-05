var mongoose = require('mongoose');
var config = require('../config/config');
//var uniqueValidator = require('uniqueValidator'); 

var businessSchema = new mongoose.Schema({
	user_id:{type:String},
	businessname:{type:String},
	businessnumber:{type:String},
	firstname:{type:String},
	lastname:{type:String},
	businessemailid:{type:String},
	city:{type:String},
	state:{type:String},
	zipcode:{type:String},
	businessaddress:{type:String},
	address:{type:String},
	businessownername:{type:String},
	businessemail:{type:String},
	businesscategory:{type:String},
	description:{type:String},
	businessImages:{type:Array},
	openingTime:{type:String},
    closingTime:{type:String},
    socialFaceBook:{type:String},
    socialGoogle:{type:String},
    socialLinkIn:{type:String},
    profileId:{type:String},
    posted:{type:String}
});
//businessSchema.plugin(uniqueValidator);
mongoose.model('business',businessSchema);