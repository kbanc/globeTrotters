const Report = require('../models/report.model');
const GoodReport = require('../models/data.model');
const User = require('../models/user.model');

exports.test =  function (req, res) {
    res.send("Hello Drake my old friend");
};

exports.create_user = async function (req, res, next){
       let newUser = User({
           username: req.body.username,
           password: req.body.password
       });
       newUser.save(function(err) {
           if (err){
               return next(err);
           }
           res.send({
               "code": 200,
               "Message": "New user created successfully"
           });
       })
};

async function search_user(name, password, res){
    try {
        await User.find({username: name})
            .then(data=>{
                console.log(data);
                if (data === undefined || data.length === 0){
                    console.log("This should be true");
                    let my_val = {
                        "code": 204,
                        "success":"User does not exist"
                    };
                    res.send(my_val);
                    return;
                }
                if (data[0].password !== password){
                    res.send ({
                        "code":204,
                        "success":"Username and password does not match"
                    });
                    return;
                }
                res.send( {
                    "code":200,
                    "success":"login successful"
                });
                return;
            })
            .catch(err =>{
                throw err;
            })
    } catch (e){
        console.error("Something went wrong: ", e);
        res.send({
            "code":400,
            "failed":"error occurred"
        });
        return;
    }
}
exports.get_auth = async function(req, res){
    await search_user(req.body.username, req.body.password, res);
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
        scene_context: req.body.scene_context,
        severity: req.body.severity
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
      datatype: req.body.datatype,
  });

  myReport.save(function(err) {
      if (err){
          return next(err);
      }
      res.send('Created an entry in the raw database');
  })
};