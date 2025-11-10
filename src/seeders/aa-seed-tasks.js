'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    const projects = await queryInterface.sequelize.query('SELECT id from Projects;');
    const projectRows = projects[0];
    const projectId = projectRows.length ? projectRows[0].id : 1;
    await queryInterface.bulkInsert('Tasks', [
      { titulo: 'Criar modelagem', status: 'done', prioridade: 'alta', id_projeto: projectId, createdAt: new Date(), updatedAt: new Date() },
      { titulo: 'Implementar endpoints', status: 'in_progress', prioridade: 'alta', id_projeto: projectId, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
