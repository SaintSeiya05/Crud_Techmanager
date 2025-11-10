'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    const hash = await bcrypt.hash('senha123', 10);
    await queryInterface.bulkInsert('Users', [
      { nome: 'Admin Tech', email: 'admin@techmanage.com', senha: hash, perfil: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Vitor Henrique', email: 'vitor@example.com', senha: hash, perfil: 'user', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
