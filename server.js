const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/db/connection');
const controller = require('./server/controller/controller');

const app = express();

//getting the port from config.env file
dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080;

//mogo connection
connectDB();

//request parse to body-parser
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

//load the assets files
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'views')));

// routes
app.get('/', (req, res) => {
        res.sendFile(__dirname + '/views/index.html');
})

app.get('/movies-:id', (req, res) => {
    res.sendFile(__dirname + '/views/movie.html');
})


app.get('/add-movie', (req, res) => {
    res.sendFile(__dirname + '/views/add_movie.html');
})

app.get('/update:id', (req, res) => {
    res.sendFile(__dirname + '/views/update_movie.html');
})

//API
app.get('/api/movies', controller.find);
app.get('/api/movies/:id', controller.findId);
app.post('/api/movies', controller.create);
app.put('/api/movies/:id', controller.update);
app.delete('/api/movies/:id', controller.delete);


app.listen(PORT, () => {
    console.log('Running on http://localhost:' + PORT);
})
