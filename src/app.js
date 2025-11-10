const express = require('express');
const routes = require('./routes');
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => res.json({ success: true, message: 'TechManage API' }));

// optional: health check that tests DB
app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: 'ok', db: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

module.exports = app;
