const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/', (req, res) => {
  const { budget, profile } = req.body;

  const profilePriority = {
    1: ['GPU', 'CPU', 'RAM', 'Motherboard', 'Storage', 'PSU', 'Case'],
    2: ['CPU', 'RAM', 'Storage', 'GPU', 'Motherboard', 'PSU', 'Case'],
    3: ['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'PSU', 'Case'],
    4: ['CPU', 'RAM', 'Storage', 'Motherboard', 'PSU', 'Case'],
  };

  const priorities = profilePriority[profile] || ['CPU', 'GPU', 'RAM', 'Motherboard', 'Storage', 'PSU', 'Case'];

  const budgetDistributions = {
    1: { GPU: 0.35, CPU: 0.25, RAM: 0.15, Storage: 0.10, Motherboard: 0.10, PSU: 0.03, Case: 0.02 },
    2: { CPU: 0.40, GPU: 0.20, RAM: 0.15, Storage: 0.10, Motherboard: 0.10, PSU: 0.03, Case: 0.02 },
    3: { CPU: 0.40, GPU: 0.20, RAM: 0.15, Motherboard: 0.10, Storage: 0.10, PSU: 0.03, Case: 0.02 },
    4: { CPU: 0.40, GPU: 0.20, RAM: 0.15, Storage: 0.10, Motherboard: 0.10, PSU: 0.03, Case: 0.02 },
  };

  const budgetDistribution = budgetDistributions[profile] || budgetDistributions[4];
  let remainingBudget = Number(budget);
  const results = {};
  let totalCost = 0;

  const fetchComponent = (type, allocatedBudget, callback) => {
    const query = `
      SELECT * FROM components
      WHERE type = ? AND price <= ?
      ORDER BY performance DESC
      LIMIT 1
    `;
    db.query(query, [type, allocatedBudget], (err, result) => {
      if (err) callback(err);
      else {
        if (result.length > 0) {
          results[type] = result[0];
          const price = parseFloat(result[0].price);
          totalCost += price;
          remainingBudget -= price;
        }
        callback(null, remainingBudget);
      }
    });
  };

  const fetchAllComponents = (index, callback) => {
    if (index >= priorities.length || remainingBudget <= 0) return callback(null);

    const type = priorities[index];
    const allocatedBudget = remainingBudget * (budgetDistribution[type] || 0.1);

    fetchComponent(type, allocatedBudget, (err) => {
      if (err) return callback(err);
      fetchAllComponents(index + 1, callback);
    });
  };

  const optimizeComponents = (callback) => {
    const types = Object.keys(results);

    const optimizeNext = (index) => {
      if (index >= types.length || remainingBudget <= 0) return callback(null);

      const type = types[index];
      const currentPrice = parseFloat(results[type].price);

      const query = `
        SELECT * FROM components
        WHERE type = ? AND price > ? AND price <= ?
        ORDER BY performance DESC
        LIMIT 1
      `;
      db.query(query, [type, currentPrice, remainingBudget + currentPrice], (err, result) => {
        if (err) return callback(err);

        if (result.length > 0) {
          const newComponent = result[0];
          const newPrice = parseFloat(newComponent.price);
          remainingBudget = remainingBudget - (newPrice - currentPrice);
          totalCost = totalCost - currentPrice + newPrice;
          results[type] = newComponent;
        }
        optimizeNext(index + 1);
      });
    };

    optimizeNext(0);
  };

  fetchAllComponents(0, (err) => {
    if (err) {
      console.error('Erro ao buscar componentes essenciais:', err);
      return res.status(500).send('Erro no servidor');
    }

    optimizeComponents((err) => {
      if (err) {
        console.error('Erro ao otimizar componentes:', err);
        return res.status(500).send('Erro no servidor');
      }

      const selectedComponents = Object.values(results).map((component) => ({
        ...component,
        price: parseFloat(component.price),
      }));

      res.render('recommendation', { components: selectedComponents, totalCost, remainingBudget });
    });
  });
});

module.exports = router;
