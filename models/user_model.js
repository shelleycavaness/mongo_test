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

module.exports = mongoose.model('Registration', registrationSchema);