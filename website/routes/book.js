const express = require('express');
const router = express.Router();


const bookController = require('../controller/book');

router.get('/searchBook',bookController.getSearchBook );

router.post('/searchBook',bookController.postSearchBook );






module.exports = router;