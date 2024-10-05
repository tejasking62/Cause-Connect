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

// POST endpoint for user
app.post('/api/user', async (req, res) => {
    console.log(req.body);
    const newUser = new user(req.body);
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // POST endpoint for NPO 
app.post('/api/NPO', async (req, res) => {
    console.log(req.body);
    const newNPO = new NPO(req.body);
    try {
      const savedNPO = await newNPO.save();
      res.status(201).json(savedNPO);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // GET endpoint for user
  app.get('/api/user', async (req, res) => {
    try {
      const users = await user.find({});
      return res.status(200).send(users);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });
  
  // GET endpoint for NPO 
  app.get('/api/NPO', async (req, res) => {
    try {
      const npo = await NPO.find({});
      return res.status(200).send(npo);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });

// Start the server
app.listen(3000, () => console.log('Server listening on port 3000'));
