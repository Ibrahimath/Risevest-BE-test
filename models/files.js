'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Files extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Files.init({
    file_id: DataTypes.UUID,
    email: DataTypes.STRING,
    filePath: DataTypes.STRING,
    safe: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Files',
  });
  return Files;
};