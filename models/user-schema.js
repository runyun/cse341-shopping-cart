const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String
},
{ versionKey: false }
);

const user = mongoose.model('User', userSchema);

module.exports = user;