var mongoose = require('mongoose');

var EventTicketSchema = new mongoose.Schema({
    address: {type:String},
    city: {type:String},
    conEmail: {type:String},
    docId: {type: String},
    eBirdVal: {type:String},
    email: {type:String},
    eventId: {type:String},
    firstName: {type:String},
    hoNumber: {type:String},  
    lastName: {type:String},
    moNumber: {type:String},
    nTicketVal: {type: String},
    state: {type:String},
    total: {type:String},
    userId: {type:String},
    zipCode: {type:String},
    posted: {type:String},
    selectSeat: {type: Boolean},
    booked: {type: Array}
});

mongoose.model('EventTicketSchema',EventTicketSchema);