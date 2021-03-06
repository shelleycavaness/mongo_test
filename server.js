const express = require('express')
///if you dont put the model befor app it breaks !!!
require('./models/user_model');

const app = express()
const port = process.env.PORT || "3000";
// const port = 3000  
const bodyParser = require('body-parser')
const routes = require('./routes/index');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true //added to get rid of DeprecationWarning
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

// app.use(express.json());
// parse application/json
app.use(bodyParser.json())
app.use('/api', routes);



const server = app.listen(port, () => {
  console.log(`Express is running on port ${server.address().port}`);
});

module.exports = app;
