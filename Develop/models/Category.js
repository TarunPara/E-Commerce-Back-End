const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// Define Category model
class Category extends Model {}

// Initialize Category model with its columns and configuration
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false, // Disable timestamps for this model
    freezeTableName: true, // Prevent sequelize from renaming the table
    underscored: true, // Use underscores instead of camel-casing
    modelName: 'category', // Explicitly define model name
  }
);

module.exports = Category;
