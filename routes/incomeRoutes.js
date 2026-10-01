const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isauthenticated');
const {
  getAllIncome,
  addIncome,
  deleteIncome,
  sortIncome
} = require('../controllers/incomeController');

// Apply isAuthenticated to all income routes
router.use(isAuthenticated);

// @route   GET /api/income
router.get('/', getAllIncome);

// @route   POST /api/income
router.post('/', addIncome);

// @route   DELETE /api/income/:id
router.delete('/:id', deleteIncome);

// @route   GET /api/income/sort/:key
router.get('/sort/:key', sortIncome);

module.exports = router;

