var mongoose = require('mongoose');
var config = require('../config/config')
//var uniqueValidator = require('mongoose-unique-validator');

var ecommercePayment = new mongoose.Schema({
  amount: { type: String },
  name: { type: String },
  email: { type: String },
  //token:{type:String},
  userId: { type: String },
  objectIds: { type: Array },
  currency: { type: String },
});
//categorySchema.plugin(uniqueValidator);
mongoose.model('ecommercepayment', ecommercePayment);
