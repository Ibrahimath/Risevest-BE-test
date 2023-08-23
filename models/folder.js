'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Folder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Folder.init({
    folderName: DataTypes.STRING,
    email: DataTypes.STRING,
    folder_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Folder',
  });
  return Folder;
};