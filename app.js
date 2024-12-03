const express = require('express');
const bodyParser = require('body-parser');
const recommendationRoutes = require('./routes/recommendation'); // Rotas de recomendação

const app = express();
const PORT = 3000;

// Middleware para processar formulários e JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do motor de templates (EJS)
app.set('view engine', 'ejs');
app.set('views', './views');

// Servir arquivos estáticos (CSS, imagens, etc.)
app.use(express.static('public'));

// Rotas principais
app.get('/', (req, res) => {
  res.render('home'); // Renderiza a página "home.ejs"
});

app.get('/configuration', (req, res) => {
  res.render('configuration'); // Renderiza a página "configuration.ejs"
});

// Rotas de recomendação
app.use('/recommend', recommendationRoutes);

// Rota 404 para páginas não encontradas
app.use((req, res) => {
  res.status(404).render('404', { title: 'Página não encontrada' }); // Certifique-se de ter um arquivo "404.ejs"
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
