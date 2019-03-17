const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GoodReportSchema = new Schema({
    image: {type: String},
    tweet: {type: String},
    metadata: {
        longitude: {type: String},
        latitude: {type: String},
        location: {type: String},
        data: {type: String},
        date: {type: Date, default: Date.now},
    },
    disaster: {type: String}, //disaster_type = flood/hurricane
    datatype: {type: String}, // image or twitter
    scene_context: [{type: String}],
    severity: {type: Number}
});

module.exports = mongoose.model('GoodReport', GoodReportSchema);