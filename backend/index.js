const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const propertiesreader = require('properties-reader');
var properties = propertiesreader('mongodb.properties');
var mongodburl = properties.get('url');
console.log(mongodburl);

const app = express();

// Connect to MongoDB
mongoose.connect(mongodburl).then(() => console.log('Connected!'));

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const user = mongoose.model('user', userSchema);

const NPOSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const NPO = mongoose.model('NPO', NPOSchema);

//JSON parsing
app.use(bodyParser.json());

// Start the server
app.listen(3000, () => console.log('Server listening on port 3000'));
