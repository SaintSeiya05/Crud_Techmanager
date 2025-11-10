const { body } = require('express-validator');

exports.userCreateValidation = [
  body('nome').notEmpty().withMessage('nome é obrigatório'),
  body('email').isEmail().withMessage('email inválido'),
  body('senha').isLength({ min: 6 }).withMessage('senha deve ter ao menos 6 caracteres'),
  body('perfil').optional().isIn(['admin','user'])
];

exports.projectCreateValidation = [
  body('titulo').notEmpty().withMessage('titulo é obrigatório'),
  body('id_usuario').isInt().withMessage('id_usuario deve ser inteiro')
];

exports.taskCreateValidation = [
  body('titulo').notEmpty().withMessage('titulo é obrigatório'),
  body('id_projeto').isInt().withMessage('id_projeto deve ser inteiro')
];
