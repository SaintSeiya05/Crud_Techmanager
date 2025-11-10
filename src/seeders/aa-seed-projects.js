'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query('SELECT id from Users;');
    const userRows = users[0];
    const userId = userRows.length ? userRows[0].id : 1;
    await queryInterface.bulkInsert('Projects', [
      { titulo: 'Portal Interno', descricao: 'Sistema para gestão interna', data_inicio: '2025-10-01', data_fim: '2025-12-31', id_usuario: userId, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Projects', null, {});
  }
};
