const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// Middleware para JSON
app.use(express.json());

// Importa rotas
const userRoutes = require('./routes/users.routes');
const projectsRoutes = require('./routes/projects.routes');
const tasksRoutes = require('./routes/tasks.routes');
// Usa as rotas
app.use('/users', userRoutes);
app.use('/tasks', tasksRoutes);
app.use('/projects', projectsRoutes);
// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

