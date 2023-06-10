// Desc: Main entry point for the application
// import all the required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// import the .env file
require('dotenv').config();

// import data from .env file
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

// import the routes
const shortLinkRoutes = require('./routes/shortlink');

// cors options
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
}

// create an express app
const app = express();

// use cors middleware
app.use(cors(corsOptions));

// use the express.json() middleware to parse the request body
app.use(express.json());
// use the express.urlencoded() middleware to parse the request body
app.use(express.urlencoded({extended: true}));

// use the shortlink routes
app.use('/shortlinks', shortLinkRoutes);

// connect to the database and local server
mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
    });
})