const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isauthenticated');
const { getBudget, setBudget,getBudgetExpenseSummary } = require('../controllers/budgetController');

// Require authentication for all budget routes
router.use(isAuthenticated);

// Get current user's budget
router.get('/', getBudget);

// Create or update budget
router.post('/', setBudget);

router.get('/expenses-summary',getBudgetExpenseSummary);

module.exports = router;
