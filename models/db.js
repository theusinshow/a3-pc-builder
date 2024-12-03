const mysql = require('mysql2');

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Matheus84757289',
  database: 'pc_builder',
});

// Conectar ao banco de dados
(async () => {
  try {
    await db.connect();
    console.log('Conexão com o banco de dados estabelecida!');
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    // Use apenas console.error durante os testes em vez de process.exit(1)
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
})();

module.exports = db;
