var express = require('express');
var router = express.Router();

const indexControllor = require('../controller/index')
/* GET home page. */
router.get('/',indexControllor.getIndex);

module.exports = router;
