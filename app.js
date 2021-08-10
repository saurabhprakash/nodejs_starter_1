const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

var fileupload = require("express-fileupload");
app.use(fileupload());

require('dotenv/config');

// Middleware
// app.use('/posts', () => {
//     console.log('This is a middleware running for posts.');
// });

// Import routes 
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

// Routes
app.get('/', (req, res) => {
    res.send('We are on home');
});

// Connect to database
mongoose.connect('mongodb://localhost:27017/myapp', 
    { useNewUrlParser: true }, 
    () => { console.log('connected to db');
});

// Listen to server
app.listen(3000);
