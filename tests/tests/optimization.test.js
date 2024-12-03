const optimizationService = require('../../services/optimizationService');

describe('Otimização de Componentes', () => {
  it('Deve melhorar os componentes com o orçamento restante', () => {
    const remainingBudget = 1000;
    const currentComponents = [
      { id: 1, name: 'Intel Core i5', price: 1200, performance: 80 },
    ];

    const optimizedComponents = optimizationService.optimize(currentComponents, remainingBudget);

    expect(optimizedComponents[0].performance).toBeGreaterThan(currentComponents[0].performance);
    expect(optimizedComponents[0].price).toBeLessThanOrEqual(currentComponents[0].price + remainingBudget);
  });
});
