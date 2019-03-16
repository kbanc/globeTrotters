var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const report_controller = require('../controllers/report.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', report_controller.test);

module.exports = router;