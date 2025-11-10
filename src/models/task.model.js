'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('todo','in_progress','done'), defaultValue: 'todo' },
    prioridade: { type: DataTypes.ENUM('baixa','media','alta'), defaultValue: 'media' },
    id_projeto: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
  }, {
    tableName: 'Tasks',
    timestamps: true
  });

  Task.associate = models => {
    Task.belongsTo(models.Project, { foreignKey: 'id_projeto', as: 'project' });
  };

  return Task;
};
