const Report = require('../models/report.model');
const GoodReport = require('../models/data.model');

exports.test =  function (req, res) {
    res.send("Hello Drake my old friend");
};

exports.update_raw_data = function (req, res, next){
    try{
        Report.findOneAndUpdate(req.params.id, {$set: {
            processed: Boolean(req.body.processed)
        }}, function (err) {
            if (err) throw err;
            res.send('Raw Data Updated');
        });
    }catch (e) {
        console.log("Failed to update raw data with error: ", e);
        return next(e);
    }
};

exports.get_all_raw_data = function(req, res, next){
    try{
        Report.find({}, (err, data) => {
            if (err) throw err;
            res.send(data);
        })
    }catch (e) {
        console.log("Could not get raw data with error: ", e);
        return next(e);
    }
};

exports.get_all_good_data = function(req, res, next){
    try{
        GoodReport.find({}, (err, data) =>{
            if (err) throw err;
            res.send(data);
        })
    }catch (e) {
        console.log("Could not fetch data with error: ", e);
        return next(e);
    }
};

exports.create_good_report = function(req, res, next){
    let myReport = new GoodReport({
        image: req.body.image,
        tweet: req.body.tweet,
        metadata: {
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            data: req.body.data,
            date: req.body.date,
            location: req.body.location
        },
        disaster: req.body.disaster,
        datatype: req.body.datatype,
    });

    myReport.save(function(err) {
        if (err){
            return next(err);
        }
        res.send('Created an entry in the raw database');
    })
};


exports.create_raw_report = function(req, res, next){
  let myReport = new Report({
      image: req.body.image,
      tweet: req.body.tweet,
      metadata: {
          longitude: req.body.longitude,
          latitude: req.body.latitude,
          location: req.body.location,
          data: req.body.data,
          date: req.body.date
      },
      disaster: req.body.disaster,
      datatype: req.body.datatype,
  });

  myReport.save(function(err) {
      if (err){
          return next(err);
      }
      res.send('Created an entry in the raw database');
  })
};