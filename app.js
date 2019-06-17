const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const questionsRoutes = require('./routes/questions');

const app = express();

mongoose.connect('mongodb+srv://dbUser:' + process.env.MONGO_ATLAS_PW + '@cluster0-478hj.mongodb.net/tracker?retryWrites=true&w=majority', { useNewUrlParser: true})
    .then(() => {
        console.log('Connected')
    })
    .catch(() => {
        console.log('Not connected')
    });

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api/user', userRoutes);
app.use('/api/questions', questionsRoutes);

module.exports = app;