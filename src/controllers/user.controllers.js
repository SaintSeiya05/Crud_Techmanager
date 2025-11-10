const { User } = require('../models');
const { validationResult } = require('express-validator');
const { success, error } = require('../utils/response');

module.exports = {
  async create(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return error(res, errors.array(), 400);

      const { nome, email, senha, perfil } = req.body;
      const exists = await User.findOne({ where: { email } });
      if (exists) return error(res, 'E-mail já cadastrado', 409);

      const user = await User.create({ nome, email, senha, perfil });
      return success(res, { id: user.id, nome: user.nome, email: user.email, perfil: user.perfil }, 201);
    } catch (err) {
      console.error(err);
      return error(res, 'Erro ao criar usuário', 500);
    }
  },

   async list(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email', 'createdAt'] });
      return res.status(200).json({ success: true, data: users });
    } catch (err) {
      console.error('Erro buscar usuários:', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  },
  

  async getById(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id, { attributes: ['id','nome','email','createdAt'] });
      if (!user) return error(res, 'Usuário não encontrado', 404);
      return success(res, user);
    } catch (err) {
      console.error(err);
      return error(res);
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const { nome, email, senha } = req.body;
      const user = await User.findByPk(id);
      if (!user) return error(res, 'Usuário não encontrado', 404);

      await user.update({ nome, email, senha, perfil });
      return success(res, { id: user.id, nome: user.nome, email: user.email, perfil: user.perfil });
    } catch (err) {
      console.error(err);
      return error(res);
    }
  },

  async remove(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);
      if (!user) return error(res, 'Usuário não encontrado', 404);

      // exclusão física:
      await user.destroy();
      return success(res, 'Usuário excluído com sucesso', 200);
    } catch (err) {
      console.error(err);
      return error(res);
    }
  }
};
