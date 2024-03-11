// Importing necessary parts of the sequelize library
const { Model, DataTypes } = require("sequelize");

// Importing the database connection
const sequelize = require("../config/connection");

// Defining the Product model by extending Sequelize's Model class
class Product extends Model {}

// Setting up fields and validation rules for the Product model
Product.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true, // Validates that the value is a decimal
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10, // Sets a default value if none is provided
    validate: {
      isNumeric: true, // Validates that the value is numeric
    },
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "category", // References the 'category' model
      key: "id", // Specifically, the 'id' field of the 'category' model
    },
  },
}, {
  sequelize, // Database connection instance
  timestamps: false, // Disables automatic timestamp fields
  freezeTableName: true, // Prevents sequelize from renaming the table
  underscored: true, // Uses underscores instead of camelCase for field names
  modelName: "product", // Name of the model
});

module.exports = Product;
