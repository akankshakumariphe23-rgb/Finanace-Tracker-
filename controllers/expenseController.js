const Expense = require('../models/Expense');

// GET all expenses for user
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST add new expense
const addExpense = async (req, res) => {
  const { amount, category, date, description } = req.body;

  if (!amount || !category) {
    return res.status(400).json({ message: 'Amount and category are required' });
  }

  const newExpense = new Expense({
    amount,
    category,
    date: date || Date.now(),
    description,
    userId: req.user.id
  });

  try {
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE expense by ID
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await Expense.findByIdAndDelete(expense._id);

    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SORT expenses by key
const sortExpenses = async (req, res) => {
  const key = req.params.key;
  const validKeys = ['amount', 'date', 'category'];

  if (!validKeys.includes(key)) {
    return res.status(400).json({ message: 'Invalid sort key' });
  }

  try {
    const sortedExpenses = await Expense.find({ userId: req.user.id }).sort({ [key]: 1 });
    res.json(sortedExpenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllExpenses,
  addExpense,
  deleteExpense,
  sortExpenses
};
