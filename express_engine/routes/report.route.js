var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const report_controller = require('../controllers/report.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', report_controller.test);
router.post('/create_raw_report', report_controller.create_raw_report);
router.post('/create_good_report', report_controller.create_good_report);
router.get('/get_all_raw_data', report_controller.get_all_raw_data);
router.get('/get_all_data', report_controller.get_all_good_data);
router.post('/update_raw_data', report_controller.update_raw_data);
router.post('/get_auth', report_controller.get_auth);
router.post('/create_user', report_controller.create_user);
router.get('/get_all_raw_tweet', report_controller.get_all_raw_tweet);

module.exports = router;