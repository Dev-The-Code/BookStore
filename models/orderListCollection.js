var mongoose = require('mongoose');

var orderListCollection = new mongoose.Schema({
    cartCount: { type: Number },
    images: { type: Array },
    objectId: { type: String },
    price: { type: String },
    productId: { type: String },
    productName: { type: String },
    profileId: { type: String },
    shopId: { type: String },
    shopName: { type: String },
    user_Id: { type: String },
});
//categorySchema.plugin(uniqueValidator);
mongoose.model('orderListCollection', orderListCollection);