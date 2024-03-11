const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

// Initialize Tag model (table) by extending Sequelize's Model class
class Tag extends Model {}

// Define fields and rules for Tag model
Tag.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  tag_name: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "tag",
});

module.exports = Tag;
