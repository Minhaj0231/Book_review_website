const mongoose = require('mongoose')

const User = require('./user');

const Schema = mongoose.Schema;


const BookSchema = new Schema({

    bookId: {
        type: String,
        required: true
      },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      comments: [{type: String}]
      
})

module.exports = mongoose.model('Book',BookSchema);