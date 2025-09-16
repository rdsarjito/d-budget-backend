const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  picture: String,
  name: String
});

mongoose.model('users', userSchema);