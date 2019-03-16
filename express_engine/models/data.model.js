const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GoodReportSchema = new Schema({
    image: {type: String},
    tweet: {type: String},
    metadata: {
        longitude: {type: String},
        latitude: {type: String},
        data: {type: String},
        date: {type: Date, default: Date.now},
    },
    disaster: {type: String, required: true}, //disaster_type = flood/hurricane
    datatype: {type: String, required: true} // image or twitter
});

module.exports = mongoose.model('GoodReport', GoodReportSchema);