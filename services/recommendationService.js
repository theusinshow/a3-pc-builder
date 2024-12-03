const db = require('../models/db');

exports.getRecommendations = async (budget, profile) => {
  if (budget < 500) {
    return { error: 'Orçamento insuficiente para montar uma configuração completa.' };
  }

  const validProfiles = [1, 2, 3, 4];
  if (!validProfiles.includes(profile)) {
    return { error: 'Perfil de uso inválido.' };
  }

  try {
    const [rows] = await db.query('SELECT * FROM components WHERE price <= ? ORDER BY performance DESC', [budget]);

    let totalCost = 0;
    const selectedComponents = [];

    // Selecionar componentes sem ultrapassar o orçamento
    for (const component of rows) {
      if (totalCost + component.price <= budget) {
        selectedComponents.push(component);
        totalCost += parseFloat(component.price);
      }
    }

    const remainingBudget = budget - totalCost;

    return {
      components: selectedComponents,
      totalCost: parseFloat(totalCost.toFixed(2)),
      remainingBudget: parseFloat(remainingBudget.toFixed(2)),
    };
  } catch (err) {
    console.error('Erro ao buscar componentes:', err);
    return { error: 'Erro ao buscar componentes.' };
  }
};
