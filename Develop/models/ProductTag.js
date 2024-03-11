const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the ProductTag model extending Sequelize's Model class
class ProductTag extends Model {}

// Initialize ProductTag model with column definitions and configurations
ProductTag.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'product', // References the 'product' model
      key: 'id', // Specifies the 'id' column in the 'product' model
    },
  },
  tag_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'tag', // References the 'tag' model
      key: 'id', // Specifies the 'id' column in the 'tag' model
    },
  },
}, {
  sequelize, // Database connection instance
  timestamps: false, // Disables automatic timestamp fields
  freezeTableName: true, // Prevents Sequelize from renaming the table
  underscored: true, // Uses underscores instead of camelCasing for column names
  modelName: 'product_tag', // Sets the model name
});

module.exports = ProductTag;
