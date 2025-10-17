import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Chart as ChartJS, registerables } from 'chart.js';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Analytics from './pages/Analytics';

// Register Chart.js components
ChartJS.register(...registerables);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;