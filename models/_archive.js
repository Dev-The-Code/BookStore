var mongoose = require('mongoose');
var config = require('../config/config');
var uniqueValidator = require('uniqueValidator');

var eventSchema = new mongoose.Schema({
	user_id:{type:String},
	organizername:{type:String},
	organizeremail:{type:String},
	organizernumber:{type:String},
	city:{type:String},
	eventcateogory:{type:String},
	eventtitle:{type:String},
	eventdiscription:{type:String},
	eventstartdate:{type:String},
	eventendtime:{type:String},
	eventstarttime:{type:String},
	eventendtime:{type:String},
	eventlocation:{type:String},
	insertmap:{type:Boolean},
	organizermodeofcontact:{type:String},
	eventimages:{type:Array},
	availibleticket:{type:String},
	ticketnotavailible:{type:Boolean},
	ticketsoldout:{type:Boolean},
	ticketprice:{type:String},
	ticketfree:{type:Boolean},
	eventpaymentmethod:{type:String},
	bannerSrc:{ type:String },
	coverPhotoSrc:{type:String},
	top:{type:String}

});
eventSchema.plugin('uniqueValidator');
mongoose.model('eventdatabase',eventSchema);
