var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
	user_id: { type: String },
	city: { type: String },
	propertylocation: { type: String },
	propertyzipcode: { type: String },
	category: { type: String },
	housingtype: { type: String },
	postingtitle: { type: String },
	discription: { type: String },
	startdate: { type: String },
	starttime: { type: String },
	enddate: { type: String },
	endtime: { type: String },
	rent: { type: String },
	pricemode: { type: String },
	accomodates: { type: String },
	furnished: { type: String },
	Attachedbath: { type: Boolean },
	amenitiesinclude: { type: Array },
	vegetariansprefered: { type: String },
	smoking: { type: String },
	petfriendly: { type: String },
	imageurl: { type: Array },
	contactname: { type: String },
	contactemail: { type: String },
	contactnumber: { type: String },
	modeofcontact: { type: Array },
	profileId: { type: String },
	subCategory: { type: String },
	subSubCategory: { type: String },
	state: { type: String },
	posted: { type: String },
	beds: { type: String }
});

mongoose.model('roomdata', RoomSchema);