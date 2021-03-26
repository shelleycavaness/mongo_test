const express = require('express');
const path = require('path');
const auth = require('http-auth');
const mongoose = require('mongoose');

const router = express.Router();
const passport = require('passport');
// const User = mongoose.model('Registration');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User')

router.get('/', (req, res) => {
  res.send('It works!  http://localhost:3000/api');
});

router.post('/register', (req, res, next) => {
  let user = new User()   

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  // user.setPassword(req.body.user.passw);

  // res.json( { "User": "req.body.user.username" });
  console.log(req.body);

  return res.json(req.body);
});

module.exports = router;