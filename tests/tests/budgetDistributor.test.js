const budgetDistributor = require('/Users/Matheus/Desktop/A3G/pc-builder/services/budgetDistributor');

describe('Distribuição de Orçamento', () => {
  it('Deve distribuir o orçamento corretamente para Jogos', () => {
    const budget = 5000;
    const profile = 1; // Jogos

    const result = budgetDistributor.distributeBudget(budget, profile);

    expect(result.GPU).toBeCloseTo(1750); // 35% do orçamento
    expect(result.CPU).toBeCloseTo(1250); // 25% do orçamento
    expect(result.RAM).toBeCloseTo(750);  // 15% do orçamento
    expect(result.Storage).toBeCloseTo(500); // 10% do orçamento
    expect(result.Motherboard).toBeCloseTo(500); // 10% do orçamento
    expect(result.PSU).toBeCloseTo(150); // 3% do orçamento
    expect(result.Case).toBeCloseTo(100); // 2% do orçamento
  });

  it('Deve retornar orçamento vazio para perfil inválido', () => {
    const budget = 5000;
    const profile = 99; // Perfil inválido

    const result = budgetDistributor.distributeBudget(budget, profile);

    expect(result).toEqual({});
  });
});
