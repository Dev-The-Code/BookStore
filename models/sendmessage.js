var mongoose = require('mongoose');


var sendMessage = new mongoose.Schema({
	name:{type:String},
	emailsender:{type:String},
	emailreciever:{type:String},
	message:{type:String},
	written:{type:String},
});
mongoose.model('sendmessage',sendMessage);