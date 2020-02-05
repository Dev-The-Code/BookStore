var mongoose = require('mongoose');
var config = require('../config/config');
//var uniqueValidator = require('uniqueValidator');


var postclassifiedSchema = new mongoose.Schema({
	userid:{type:String},
	contactname:{type:String},
	contactemail:{type:String},
	contactnumber:{type:String},
	modeofcontact:{type:Array},
	delivery:{type:Array},
	address:{type:String},
	hideaddress:{type:Boolean},
	condition:{type:String},
	sizedimension:{type:Array},
	images:{type:Array},
	city:{type:String},
	state:{type:String},
	postingtype:{type:String},
	category:{type:String},
	title:{type:String},
	description:{type:String},
	price:{type:String},
	hideprice:{type:Boolean},
	modelmake:{type:String},
	modelnumber:{type:String},
	modelname:{type:String},
	subcategory:{type:String},
	subsubcategory:{type:String},
	streetaddress:{type:String},
	profileid:{type:String},
	posted:{type:String},

});

//postclassifiedSchema.plugin(uniqueValidator);
mongoose.model('postclassified',postclassifiedSchema);