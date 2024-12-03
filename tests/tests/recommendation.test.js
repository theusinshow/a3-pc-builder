const recommendationService = require('/Users/Matheus/Desktop/A3G/pc-builder/services/recommendationService');

describe('Recomendação de Componentes', () => {
  it('Deve retornar componentes dentro do orçamento', async () => {
    const budget = 5000;
    const profile = 1;

    const result = await recommendationService.getRecommendations(budget, profile);

    expect(result.totalCost).toBeLessThanOrEqual(budget);
    expect(result.components.length).toBeGreaterThan(0);
    expect(result.remainingBudget).toBeGreaterThanOrEqual(0);
  });

  it('Deve retornar erro para orçamento insuficiente', async () => {
    const budget = 100;
    const profile = 1;

    const result = await recommendationService.getRecommendations(budget, profile);

    expect(result.error).toBe('Orçamento insuficiente para montar uma configuração completa.');
  });

  it('Deve retornar erro para perfil inválido', async () => {
    const budget = 5000;
    const profile = 99;

    const result = await recommendationService.getRecommendations(budget, profile);

    expect(result.error).toBe('Perfil de uso inválido.');
  });
});
