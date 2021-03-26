const mongoose = require('mongoose');

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

// module.exports = mongoose.model('Registration', registrationSchema);

module.exports = mongoose.model('User', UserSchema);
