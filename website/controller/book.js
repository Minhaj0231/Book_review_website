
const axios = require('axios');

const { validationResult } = require('express-validator');

const Book = require('../models/book');

exports.getSearchBook = (req,res,next) => {

    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }

    res.render('book/searchBook', {
        pageTitle: 'Search Book',
        bookdata: '',
        oldInput: {
        bookName: '',
              
        },
        errorMessage: message,
       
      });

};

exports.postSearchBook = (req,res,next) => {
    
    const  bookName = req.body.bookName;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        res.redirect('/book/searchBook');
    }

    try{
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookName}&langRestrict=en`, 
        
        )
               .then(data => {
                   

                
                res.render('book/searchBook', {
                    pageTitle: 'Search Book',
                    bookdata: data.data.items,
                    oldInput: {
                        bookName: bookName
                        
                    },
                    errorMessage: null,
                   
                  });


               })
               .catch(err => res.send(err));
     }
     catch(err){
        console.error("error", err);
     }


   
    
    
};

exports.postAddBook =  (req,res,next) => {
    
    const  bookId = req.body.id;
    

    Book.findOne({bookId: bookId})
        .then(result =>{
            
            if( result === null){

                const book = new Book({
                    bookId : bookId,
                    user : req.session.user
                })
            
                book.save()
                res.redirect(`/book/bookDetails/${bookId}`);

            }

            else{
                req.flash('error', 'This Book added before to review');
                res.redirect(`/book/searchBook`);
               
            }

            console.log(result)
        }).catch(err =>{
            console.log(err)
        });


    
    
};




exports.getBookDetails =   (req,res,next) => {

    bookId = req.params.bookId
 
      try{
        axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`, 
        
        )
               .then(data => {
                    

                    let desc = data.data.volumeInfo.description;

                    desc = desc.replace(/<[^>]*>?/gm, '');
                
                res.render('book/bookDetails', {
                    pageTitle: 'BookDetails',
                    desc: desc,
                    bookdata: data.data,
                                      
                  });


               })
               .catch(err => res.send(err));
     }
     catch(err){
        console.error("error", err);
     }


};
        