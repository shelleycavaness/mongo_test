const express = require('express');
const path = require('path');
const auth = require('http-auth');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const User = mongoose.model('Registration');

router.get('/', (req, res) => {
  res.send('It works!');
});

router.post('/', (req, res) => {
  console.log(req.body);
  let user = new User()   

  res.json( { title: 'Registration form' });
});

module.exports = router;