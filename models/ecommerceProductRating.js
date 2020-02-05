var mongoose = require('mongoose');


var ecommerceProductRating = new mongoose.Schema({
    userId: { type: String },
    date: { type: String },
    time: { type: String },
    name: { type: String },
    email: { type: String },
    message: { type: String },
    productId: { type: String },
    rating: { type: Number },
    shopId: { type: String },
    averageRatingProduct: { type: Number },


});
mongoose.model('ecommercereview', ecommerceProductRating);