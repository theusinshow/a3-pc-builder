const db = require('../../models/db');

jest.mock('../../models/db', () => ({
  query: jest.fn(), // Mock da função query
}));

describe('Consulta ao Banco de Dados', () => {
  it('Deve retornar componentes dentro do orçamento', async () => {
    const budget = 5000;

    // Simulação de resposta do banco de dados
    db.query.mockImplementation((sql, params, callback) => {
      callback(null, [{ id: 1, name: 'Intel Core i5', price: 1200 }]);
    });

    const result = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM components WHERE price <= ?', [budget], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    // Verificações
    expect(db.query).toHaveBeenCalledWith('SELECT * FROM components WHERE price <= ?', [budget], expect.any(Function));
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].price).toBeLessThanOrEqual(budget);
  });
});
