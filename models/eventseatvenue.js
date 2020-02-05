var mongoose = require('mongoose');

var EventVenue = new mongoose.Schema({
    eventName:{type:String},
    seats:{type:Array}
});

mongoose.model('EventVenue',EventVenue);