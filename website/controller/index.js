const Book = require('../models/book');

const axios = require('axios');

exports.getIndex = (req, res,next) => {
    
    
    Book.find({}).then( books =>{

       let promises = []

        var bookdetails =Array();
       
        

       
       books.forEach( book => {
           
        promises.push( axios.get(`https://www.googleapis.com/books/v1/volumes/${book.bookId}`))
    })

    axios.all(promises).then(
        results=> {
            results.forEach( 
                data =>{
                    bookdetails.push(data.data)
                }
            )

            console.log(bookdetails)

            return res.render('home/index', { pageTitle: 'Express',
        bookDetails: bookdetails
        })

            
       }).catch(err=>console.log(err));

         
       
    }

    
        
    ).catch(err=>console.log(err));
    

}