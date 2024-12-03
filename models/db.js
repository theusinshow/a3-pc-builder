const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Matheus84757289',
  database: 'pc_builder',
});

(async () => {
  try {
    await db.connect();
    console.log('Conexão com o banco de dados estabelecida!');
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1); // Só encerra se não estiver no ambiente de teste
    }
  }
})();

module.exports = db;
