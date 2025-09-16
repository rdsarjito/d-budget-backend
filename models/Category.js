const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  userId: String,
  category: String,
  amount: Number,
  typeBalance: String,
  color: String,
  date: Date,
});

mongoose.model('categories', categorySchema);