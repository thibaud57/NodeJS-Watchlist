const mongoose = require('mongoose');

//schema model for the db according to the form
let schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    year: {
        type: String,
        required: true,

    },
    movieLength: {
        type: String,
        required: true,

    },
    genre: {
        type: String,
        required: true,

    },
    synopsis: {
        type: String,
        required: true,

    }
});

const movieDB = mongoose.model('movieDB', schema);

module.exports = movieDB;