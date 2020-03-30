
const axios = require('axios');

const Book = require('../models/book');

exports.getSearchBook = (req,res,next) => {

    res.render('book/searchBook', {
        pageTitle: 'Search Book',
        bookdata: '',
        oldInput: {
        bookName: ''
        
        }
       
      });

};

exports.postSearchBook = (req,res,next) => {
    
    const  bookName = req.body. bookName;

    try{
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookName}&langRestrict=en`, 
        
        )
               .then(data => {

                // console.log(data.data.items)
                res.render('book/searchBook', {
                    pageTitle: 'Search Book',
                    bookdata: data.data.items,
                    oldInput: {
                        bookName: bookName
                        
                    }
                   
                  });


               })
               .catch(err => res.send(err));
     }
     catch(err){
        console.error("GG", err);
     }


   
    
    
};

exports.postAddBook =  (req,res,next) => {
    
    const  bookId = req.body.id;
    console.log("abc");
    console.log(bookId);


    const book = new Book({
        bookId : bookId,
        user : req.session.user
    })

   book.save()
   
    


    res.render('home/index', { pageTitle: 'Express' });
};