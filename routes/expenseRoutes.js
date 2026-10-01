const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isauthenticated');
const {
  getAllExpenses,
  addExpense,
  deleteExpense,
  sortExpenses
} = require('../controllers/expenseController');

// Auth required for all
router.use(isAuthenticated);

// Routes
router.get('/', getAllExpenses);
router.post('/', addExpense);
router.delete('/:id', deleteExpense);
router.get('/sort/:key', sortExpenses);

module.exports = router;

