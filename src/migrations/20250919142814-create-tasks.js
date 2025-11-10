'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      titulo: { type: Sequelize.STRING, allowNull: false },
      status: { type: Sequelize.ENUM('todo','in_progress','done'), defaultValue: 'todo' },
      prioridade: { type: Sequelize.ENUM('baixa','media','alta'), defaultValue: 'media' },
      id_projeto: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'Projects', key: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};
