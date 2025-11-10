'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
    senha: { type: DataTypes.STRING, allowNull: false },
    perfil: { type: DataTypes.ENUM('admin','user'), defaultValue: 'user' }
  }, {
    tableName: 'Users',
    timestamps: true,
    underscored: false,
    hooks: {
      beforeCreate: async (user) => {
        if (user.senha) user.senha = await bcrypt.hash(user.senha, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed('senha')) user.senha = await bcrypt.hash(user.senha, 10);
      }
    }
  });

  User.associate = models => {
    User.hasMany(models.Project, { foreignKey: 'id_usuario', as: 'projects' });
  };

  // instance method to compare password
  User.prototype.comparePassword = function(password) {
    return bcrypt.compare(password, this.senha);
  };

  return User;
};
