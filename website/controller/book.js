
const axios = require('axios');


exports.getSearchBook = (req,res,next) => {

    res.render('book/searchBook', {
        pageTitle: 'Search Book',
        csrfToken: req.csrfToken(),
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
                    csrfToken: req.csrfToken(),
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