var mongoose = require('mongoose');

var JobAppliedSchema = new mongoose.Schema({
	senFirName: {type:String},
    senLastName: {type:String},
    senEmail: {type:String},
    senCV: {type:String},
    senMsg: {type:String},
    resEmail: {type:String},
    appliedOn: {type:String},
    jobId: {type:String}
});

mongoose.model('jobApplied', JobAppliedSchema);
