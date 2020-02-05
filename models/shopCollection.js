var mongoose = require('mongoose');
var config = require('../config/config')
//var uniqueValidator = require('mongoose-unique-validator');

var shopCollection = new mongoose.Schema({
    bannerPhotoSrc: { type: String },
    gridImageSrc: { type: String },
    images: { type: Array },
    shopAddress: { type: String },
    shopCategories: { type: Array },
    shopCity: { type: String },
    shopDescription: { type: String },
    shopState: { type: String },
    shopTitle: { type: String },
    profileId: { type: String },
    userId: { type: String },
    shopPurpose: { type: String },
    shopLogo: { type: Array },
    percantageOfShop: { type: Number },
    accountTitle:{type: String},
    bankAddress:{type: String},
    bankName:{type: String},
    ibank:{type: String},
    swift:{type: String},

});
//categorySchema.plugin(uniqueValidator);
mongoose.model('shopCollection', shopCollection);