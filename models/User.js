var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config/config')
var uniqueValidator = require('mongoose-unique-validator');


var UserSchema = new mongoose.Schema({
  username: {type: String },
  email:    {type: String, index: true, unique: true, required: true,uniqueCaseInsensitive: true },
 	hash: String,
  	salt: String,
  InsertedDate:Array,
  password:{ type:String },
  subscribe: {type: Boolean ,  default: false },
  status:   {type: Boolean ,  default: false },
  blocked: {type:Boolean , default:false},
  randomno: {type: String},
  loginvia:{type: String},
  profileId:{type:String},
  resetPasswordToken: {type: String},
  resetPasswordExpires: {type: String},
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    exp: parseInt(expiry.getTime() / 1000),
  }, "+PakJazba*123H"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};
UserSchema.plugin(uniqueValidator);
mongoose.model('User', UserSchema);