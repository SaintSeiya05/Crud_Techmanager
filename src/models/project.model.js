'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.TEXT, allowNull: true },
    data_inicio: { type: DataTypes.DATEONLY, allowNull: true },
    data_fim: { type: DataTypes.DATEONLY, allowNull: true },
    id_usuario: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
  }, {
    tableName: 'Projects',
    timestamps: true
  });

  Project.associate = models => {
    Project.belongsTo(models.User, { foreignKey: 'id_usuario', as: 'owner' });
    Project.hasMany(models.Task, { foreignKey: 'id_projeto', as: 'tasks' });
  };

  return Project;
};
