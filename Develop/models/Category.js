const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// Define Category model
class Category extends Model {}


module.exports = Category;
