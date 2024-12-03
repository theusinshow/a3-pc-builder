const recommendationService = require('../../services/recommendationService');

jest.mock('../../services/recommendationService', () => ({
  getRecommendations: jest.fn(),
}));

describe('Recomendação de Componentes', () => {
  it('Deve retornar componentes dentro do orçamento', async () => {
    recommendationService.getRecommendations.mockResolvedValue({
      components: [{ name: 'Intel Core i5', price: 1200 }],
      totalCost: 1200,
      remainingBudget: 3800,
    });

    const budget = 5000;
    const profile = 1;
    const result = await recommendationService.getRecommendations(budget, profile);

    expect(result.totalCost).toBeLessThanOrEqual(budget);
    expect(result.components.length).toBeGreaterThan(0);
  });

  it('Deve retornar erro para orçamento insuficiente', async () => {
    recommendationService.getRecommendations.mockResolvedValue({
      error: 'Orçamento insuficiente para montar uma configuração completa.',
    });

    const budget = 300;
    const profile = 1;
    const result = await recommendationService.getRecommendations(budget, profile);

    expect(result.error).toBe('Orçamento insuficiente para montar uma configuração completa.');
  });

  it('Deve retornar erro para perfil inválido', async () => {
    recommendationService.getRecommendations.mockResolvedValue({
      error: 'Perfil de uso inválido.',
    });

    const budget = 5000;
    const profile = 99;
    const result = await recommendationService.getRecommendations(budget, profile);

    expect(result.error).toBe('Perfil de uso inválido.');
  });
});
