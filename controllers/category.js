const mongoose = require('mongoose');
const Category = mongoose.model('categories')

const createCategory = async(req, res) => {
  const userId = req.user.userData._id;
  const date = new Date();
  const { category, color, typeBalance } = req.body.data;
  const amount = 0;
  const newCategory = new Category ({ userId, category, amount, typeBalance, color, date });

  const categoryData = await newCategory.save();

  try {
    res.status(201).send(categoryData)
  } catch (error) {
    console.log(error)
  }
};

const getCategory = async(req, res) => {
  const userId = req.user.userData._id;
  const category = await Category.find({ "userId": userId });
  res.send(category);
};

const deleteCategory = async(req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  res.send(category);
};

module.exports = {
  createCategory,
  getCategory,
  deleteCategory
};