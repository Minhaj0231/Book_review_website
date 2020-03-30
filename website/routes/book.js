const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/is_auth');

const bookController = require('../controller/book');

router.get('/searchBook', bookController.getSearchBook );

router.post('/searchBook', bookController.postSearchBook );
router.post('/addBook', isAuth, bookController.postAddBook)






module.exports = router;