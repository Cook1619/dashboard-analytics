const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load users data
const loadUsersData = () => {
  try {
    const dataPath = path.join(__dirname, '../data/users.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error loading users data:', error);
    return [];
  }
};

// Get all users
router.get('/', (req, res) => {
  try {
    const users = loadUsersData();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/:id', (req, res) => {
  try {
    const users = loadUsersData();
    const user = users.find(u => u.id === parseInt(req.params.id));
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Get user stats
router.get('/stats/overview', (req, res) => {
  try {
    const users = loadUsersData();
    const stats = {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      newUsers: users.filter(u => {
        const joinDate = new Date(u.joinDate);
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        return joinDate > thirtyDaysAgo;
      }).length,
      premiumUsers: users.filter(u => u.plan === 'premium').length
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
});

module.exports = router;