var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
    user_id: { type: String },
    profileId: { type: String },
    compDescription: { type: String },
    compEmail: { type: String },
    compName: { type: String },
    email: { type: String },
    experience: { type: String },
    jobCat: { type: String },
    city: { type: String },
    state: { type: String },
    jobDescription: { type: String },
    jobTitle: { type: String },
    jobType: { type: String },
    location: { type: String },
    salary: { type: String },
    faceBook: { type: String },
    LinkdIn: { type: String },
    Google: { type: String },
    Website: { type: String },
    Tagline: { type: String },
    arr_url: { type: Array },
    posted: { type: String },
});

mongoose.model('jobschema', JobSchema);