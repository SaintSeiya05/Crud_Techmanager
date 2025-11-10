const express = require('express');
const router = express.Router();
const userController = require('../controllers/projects.controllers');
const { userCreateValidation } = require('../middlewares/validation.middleware');

router.post('/', userCreateValidation, userController.create);
router.get('/', userController.list);
router.get('/:id', userController.getById);
router.put('/:id', userCreateValidation, userController.update);
router.delete('/:id', userController.remove);

module.exports = router;
