const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
  userId: String,
  description: String,
  amount: String,
  category: String,
  date: Date,
  typeBalance: String
});

mongoose.model('expenses', expenseSchema);