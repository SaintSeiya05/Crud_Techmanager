const { tasks } = require('../models');
const { validationResult } = require('express-validator');
const { success, error } = require('../utils/response');

module.exports = {
  async create(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return error(res, errors.array(), 400);

      const { titulo } = req.body;
      const exists = await tasks.findOne({ where: { titulo} });
      if (exists) return error(res, 'Tarefa já cadastrado', 409);

      const user = await tasks.create({ titulo });
      return success(res, { id: user.id, titulo: user.titulo}, 201);
    } catch (err) {
      console.error(err);
      return error(res, 'Erro ao criar tarefa', 500);
    }
  },

  async list(req, res) {
    try {
      const users = await tasks.findAll({ attributes: ['id','titulo','createdAt'] });
      return success(res, users);
    } catch (err) {
      console.error(err);
      return error(res);
    }
  },

  async getById(req, res) {
    try {
      const id = req.params.id;
      const user = await tasks.findByPk(id, { attributes: ['id','titulo','createdAt'] });
      if (!user) return error(res, 'Tarefa não encontrado', 404);
      return success(res, user);
    } catch (err) {
      console.error(err);
      return error(res);
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const { titulo } = req.body;
      const user = await tasks.findByPk(id);
      if (!user) return error(res, 'Tarefa não encontrada', 404);

      await user.update({ titulo });
      return success(res, { id: user.id, titulo:user.titulo });
    } catch (err) {
      console.error(err);
      return error(res);
    }
  },

  async remove(req, res) {
    try {
      const id = req.params.id;
      const user = await tasks.findByPk(id);
      if (!user) return error(res, 'Tarefa não encontrada', 404);

      // exclusão física:
      await user.destroy();
      return success(res, 'Tarefa excluída com sucesso', 200);
    } catch (err) {
      console.error(err);
      return error(res);
    }
  }
};
