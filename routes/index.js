const express = require('express');
const path = require('path');
const auth = require('http-auth');
const mongoose = require('mongoose');

const router = express.Router();
const passport = require('passport');
// const User = mongoose.model('Registration');
const jwt = require('jsonwebtoken');
// const authenticateToken = require('../config/auth')
const User = mongoose.model('User')



router.get('/', (req, res) => {
  res.send('It works!  http://localhost:3000/api');
});

router.post('/register', (req, res, next) => {
  let user = new User()   
  console.log('111111111111', req.body);
  user.username = req.body.user.username;
  user.email = req.body.user.email;
  console.log(`req.body.user.password===`, req.body.user.password)
  user.setPassword(req.body.user.password);

  return res.json({user: user});

});

module.exports = router;