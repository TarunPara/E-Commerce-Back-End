// Importing model classes
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Setting up model associations

// A Product belongs to a single Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});
// A Category can have multiple Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// A Product can have multiple Tags
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});

// A Tag can belong to multiple Products
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
