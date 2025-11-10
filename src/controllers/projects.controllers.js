const { projects } = require('../models');
const { validationResult } = require('express-validator');
const { success, error } = require('../utils/response');

module.exports = {
  async create(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return error(res, errors.array(), 400);

      const { titulo, descricao } = req.body;
      const exists = await projects.findOne({ where: { titulo } });
      if (exists) return error(res, 'Projeto já cadastrado', 409);

      const user = await projects.create({ titulo, descricao });
      return success(res, { id: user.id, titulo: user.titulo,descricao: user.descricao }, 201);
    } catch (err) {
      console.error(err);
      return error(res, 'Erro ao criar projeto', 500);
    }
  },

  async list(req, res) {
    try {
      const users = await projects.findAll({ attributes: ['id','titulo','descricao','createdAt'] });
      return success(res, users);
    } catch (err) {
      console.error(err);
      return error(res);
    }
  },

  async getById(req, res) {
    try {
      const id = req.params.id;
      const user = await projects.findByPk(id, { attributes: ['id','titulo','descricao','createdAt'] });
      if (!user) return error(res, 'Projeto não encontrado', 404);
      return success(res, user);
    } catch (err) {
      console.error(err);
      return error(res);
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const { titulo,descricao } = req.body;
      const user = await projects.findByPk(id);
      if (!user) return error(res, 'Projeto não encontrado', 404);

      await user.update({ titulo,descricao });
      return success(res, { id: user.id, titulo:user.titulo,descricao:user.descricao});
    } catch (err) {
      console.error(err);
      return error(res);
    }
  },

  async remove(req, res) {
    try {
      const id = req.params.id;
      const user = await projects.findByPk(id);
      if (!user) return error(res, 'Projeto não encontrado', 404);

      // exclusão física:
      await user.destroy();
      return success(res, 'Projeto excluído com sucesso', 200);
    } catch (err) {
      console.error(err);
      return error(res);
    }
  }
};
