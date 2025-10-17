const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load dashboard data
const loadDashboardData = () => {
  try {
    const dataPath = path.join(__dirname, '../data/dashboard.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    return { metrics: [], charts: [] };
  }
};

// Get dashboard metrics
router.get('/metrics', (req, res) => {
  try {
    const data = loadDashboardData();
    res.json(data.metrics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

// Get chart data
router.get('/charts', (req, res) => {
  try {
    const data = loadDashboardData();
    res.json(data.charts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chart data' });
  }
});

// Get recent activities
router.get('/activities', (req, res) => {
  try {
    const data = loadDashboardData();
    res.json(data.activities || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

module.exports = router;