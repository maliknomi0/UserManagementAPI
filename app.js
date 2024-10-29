const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();


const app = express();


app.use(morgan('dev'));


app.use(cors());

app.use(compression({ level: 7, threshold: 1024 * 10 }));

// Static files
app.use(express.static(path.join(__dirname, 'uploads')));

// Body parsing middleware
app.use(express.json({ limit: '1024mb' }));
app.use(express.urlencoded({
    limit: '1024mb',
    parameterLimit: 10000,
    extended: true,
}));


app.use('/api', require('./routes/api'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = app;
