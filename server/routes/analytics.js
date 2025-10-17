const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load analytics data
const loadAnalyticsData = () => {
  try {
    const dataPath = path.join(__dirname, '../data/analytics.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error loading analytics data:', error);
    return { pageViews: [], revenue: [], conversions: [] };
  }
};

// Get page views data
router.get('/pageviews', (req, res) => {
  try {
    const data = loadAnalyticsData();
    res.json(data.pageViews || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch page views' });
  }
});

// Get revenue data
router.get('/revenue', (req, res) => {
  try {
    const data = loadAnalyticsData();
    res.json(data.revenue || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch revenue data' });
  }
});

// Get conversion data
router.get('/conversions', (req, res) => {
  try {
    const data = loadAnalyticsData();
    res.json(data.conversions || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversion data' });
  }
});

// Get analytics summary
router.get('/summary', (req, res) => {
  try {
    const data = loadAnalyticsData();
    
    const summary = {
      totalPageViews: data.pageViews?.reduce((sum, item) => sum + item.views, 0) || 0,
      totalRevenue: data.revenue?.reduce((sum, item) => sum + item.amount, 0) || 0,
      averageConversion: data.conversions?.length > 0 
        ? (data.conversions.reduce((sum, item) => sum + item.rate, 0) / data.conversions.length).toFixed(2)
        : 0,
      lastUpdated: new Date().toISOString()
    };
    
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics summary' });
  }
});

module.exports = router;