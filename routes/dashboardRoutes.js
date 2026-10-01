const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isauthenticated');
const { getFullDashboard } = require('../controllers/dashboardController');

router.use(isAuthenticated);

router.get('/', getFullDashboard);

module.exports = router;
