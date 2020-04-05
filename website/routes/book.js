const express = require('express');
const router = express.Router();

const {check, body } =  require("express-validator"); 

const isAuth = require('../middleware/is_auth');

const bookController = require('../controller/book');

router.get('/searchBook', bookController.getSearchBook );

router.post('/searchBook',
[check('bookName').isLength({min:1}).withMessage("Please type something before searching")],
bookController.postSearchBook );
router.post('/addBook', isAuth, bookController.postAddBook)


router.get('/bookDetails/:bookId', bookController.getBookDetails)



module.exports = router;