const mongoose = require('mongoose');
const Income = mongoose.model('incomes');

const createIncome = async(req, res) => {
  const userId = req.user.userData._id;
  const { description, amount, category } = req.body.data;
  const date = new Date();
  const typeBalance = 'income';
  const newIncome = new Income ({ userId, description, amount, category, date, typeBalance });

  const income = await newIncome.save();

  try {
    res.status(201).send(income);
  } catch (error) {
    console.log(error);
  };
};

const getIncome = async(req, res) => {
  const userId = req.user.userData._id;
  const income = await Income.find({ "userId": userId })
  res.send(income);
};

const deleteIncome = async(req, res) => {
  const { id } = req.params;
  const income = await Income.findByIdAndDelete(id);
  res.send(income)
}

module.exports = {
  createIncome,
  getIncome,
  deleteIncome
};