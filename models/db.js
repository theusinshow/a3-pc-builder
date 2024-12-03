const mysql = require('mysql2/promise');

// Configuração da conexão com o MySQL
const db = mysql.createPool({
  host: 'localhost',
  user: 'root', // Substitua pelo seu usuário do MySQL
  password: 'Matheus84757289', // Substitua pela sua senha do MySQL
  database: 'pc_builder', // Nome do banco de dados
  waitForConnections: true, // Aguarda conexões disponíveis
  connectionLimit: 10, // Limite máximo de conexões
  queueLimit: 0, // Sem limite de fila
});

// Testar a conexão ao banco de dados
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('Conexão com o banco de dados estabelecida!');
    connection.release(); // Libera a conexão para o pool
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  }
})();

module.exports = db;
