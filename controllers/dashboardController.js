const Income = require('../models/Income');
const Expense = require('../models/Expense');
const Budget = require('../models/Budget');
const mongoose = require('mongoose');

const getFullDashboard = async (req, res) => {
  try {
    //const userId = req.user.id;
    const userId = new mongoose.Types.ObjectId(req.user.id);

    // 1. Total Income
    const incomeAgg = await Income.aggregate([
      { $match: { userId } },
      { $group: { _id: null, totalIncome: { $sum: '$amount' } } }
    ]);

    const totalIncome = incomeAgg[0]?.totalIncome || 0;

    // 2. Total Expense
    const expenseAgg = await Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: null, totalExpense: { $sum: '$amount' } } }
    ]);

    const totalExpense = expenseAgg[0]?.totalExpense || 0;

    const netBalance = totalIncome - totalExpense;

    // 3. Budget Info
    const budget = await Budget.findOne({ userId });

    let budgetAmount = 0;
    let budgetPeriod = 'monthly';
    let startDate = null;
    let budgetStatus = null;

    if (budget) {
      budgetAmount = budget.amount;
      budgetPeriod = budget.period || 'monthly';
      startDate = budget.startDate;

      if (totalExpense > budgetAmount) {
        budgetStatus = {
          status: 'overspent',
          amount: totalExpense - budgetAmount
        };
      } else {
        budgetStatus = {
          status: 'underspent',
          amount: budgetAmount - totalExpense
        };
      }
    }

    // 4. Recent 5 Expenses
    const recentExpenses = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(5)
      .select('title amount category date');

    // 5. Monthly income vs expense for last 6 months
    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    const [monthlyIncome, monthlyExpense] = await Promise.all([
      Income.aggregate([
        { $match: { userId, date: { $gte: sixMonthsAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
            total: { $sum: '$amount' }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      Expense.aggregate([
        { $match: { userId, date: { $gte: sixMonthsAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
            total: { $sum: '$amount' }
          }
        },
        { $sort: { _id: 1 } }
      ])
    ]);

    // Combine monthly trend
    const trend = {};
    monthlyIncome.forEach(i => (trend[i._id] = { income: i.total, expense: 0 }));
    monthlyExpense.forEach(e => {
      if (!trend[e._id]) trend[e._id] = { income: 0, expense: e.total };
      else trend[e._id].expense = e.total;
    });

    const monthlyTrend = Object.keys(trend).map(month => ({
      month,
      income: trend[month].income,
      expense: trend[month].expense
    }));

    res.status(200).json({
      summary: { totalIncome, totalExpense, netBalance },
      budget: {
        amount: budgetAmount,
        period: budgetPeriod,
        startDate
      },
      budgetStatus,
      recentExpenses,
      monthlyTrend
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load dashboard', error: err.message });
  }
};

module.exports={getFullDashboard};