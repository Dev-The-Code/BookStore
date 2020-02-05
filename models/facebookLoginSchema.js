var mongoose = require('mongoose');
var config = require('../config/config');
var uniqueValidator = require('mongoose-unique-validator');


var facebookSchema = new mongoose.Schema({
	email:{type: String, index: true, unique: true, required: true,uniqueCaseInsensitive: true },
	name:{type:String},
	password:{type:String},


});
facebookSchema.plugin(uniqueValidator);
mongoose.model('facebookdatabase',facebookSchema);
