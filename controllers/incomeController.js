const Income = require('../models/Income');

// @desc    Get all income records for the logged-in user
const getAllIncome = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Add new income for the logged-in user
const addIncome = async (req, res) => {
  const { amount, category, date, description } = req.body;

  if (!amount || !category) {
    return res.status(400).json({ message: 'Amount and category are required' });
  }

  const newIncome = new Income({
    amount,
    category,
    date: date || Date.now(),
    description,
    userId: req.user.id
  });

  try {
    const savedIncome = await newIncome.save();
    res.status(201).json(savedIncome);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete an income record belonging to the logged-in user
const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    await Income.findByIdAndDelete(income._id);

    res.json({ message: 'Income deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get sorted income for the user by key
const sortIncome = async (req, res) => {
  const key = req.params.key;
  const validKeys = ['amount', 'date', 'category'];

  if (!validKeys.includes(key)) {
    return res.status(400).json({ message: 'Invalid sort key' });
  }

  try {
    const sorted = await Income.find({ userId: req.user.id }).sort({ [key]: 1 });
    res.json(sorted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllIncome,
  addIncome,
  deleteIncome,
  sortIncome
};
