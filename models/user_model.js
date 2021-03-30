const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');

const registrationSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  passw:{
    type: String,
    trim: true
  }
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String, 
    lowercase: true, 
    unique: true, required: [true, "can't be blank"], 
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
    index: true
  },
  email: {
    type: String, 
    lowercase: true, 
    unique: true, 
    required: [true, "can't be blank"], 
    match: [/\S+@\S+\.\S+/, 'is invalid'], 
    index: true
  },
  hash: String,
  salt: String
}, {timestamps: true});

// Mongoose validators 
UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

// does this salt the password ?
UserSchema.methods.validPassword = (password) => {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

// Create a hashed password for model?
UserSchema.methods.setPassword = function(password){
  console.log(`called object`, password)
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};
//create a JWT in model
UserSchema.methods.generateJWT = () => {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

UserSchema.methods.toAuthJSON = () =>{
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
  
  };
};




// module.exports = mongoose.model('Registration', registrationSchema);

module.exports = mongoose.model('User', UserSchema);
