const mongoose = require('mongoose');
const Expense = require('../models/Expense');
const Budget = require('../models/Budget');

// GET budget for user
const getBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({ userId: req.user.id });
    res.status(200).json(budget || { amount: 0 });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch budget', error: err.message });
  }
};

// POST or PUT budget (create or update)
const setBudget = async (req, res) => {
  const { amount, period = 'monthly', startDate = Date.now() } = req.body;

  if (amount == null || isNaN(amount)) {
    return res.status(400).json({ message: 'Valid amount is required' });
  }

  try {
    let budget = await Budget.findOne({ userId: req.user.id });

    if (budget) {
      budget.amount = amount;
      budget.period = period;
      budget.startDate = startDate;
      budget.updatedAt = Date.now();
      await budget.save();
      return res.status(200).json({ message: 'Budget updated', budget });
    }

    budget = new Budget({
      amount,
      period,
      startDate,
      userId: req.user.id,
    });

    await budget.save();
    res.status(201).json({ message: 'Budget created', budget });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save budget', error: err.message });
  }
};




const getBudgetExpenseSummary = async (req, res) => {
  try {
     const userId = new mongoose.Types.ObjectId(req.user.id);
    const budget = await Budget.findOne({ userId });

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    const startDate = new Date(budget.startDate);
    let endDate;

    switch (budget.period) {
      case 'weekly':
        endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 7);
        break;
      case 'monthly':
        endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case 'yearly':
        endDate = new Date(startDate);
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
      default:
        endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
    }

    const summary = await Expense.aggregate([
      {
        $match: {
          userId: userId,
          date: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    const total = summary.length > 0 ? summary[0].total : 0;

    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expenses summary', error: error.message });
  }
};







module.exports = {
  getBudget,
  setBudget,
  getBudgetExpenseSummary,
};
