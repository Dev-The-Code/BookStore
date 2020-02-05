var mongoose = require('mongoose');


var blogReviews = new mongoose.Schema({
	objId:{type:String},
	user:{type:String},
	comm:{type:String},
	userImg:{type:String},
	userId:{type:String},
	written:{type:String},
});
mongoose.model('blogReviews',blogReviews);