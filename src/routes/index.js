const express = require('express');
const router = express.Router();

router.use('/users', require('./users.routes'));
router.use('/projects', require('./projects.routes'));
router.use('/tasks', require('./tasks.routes'));

module.exports = router;
