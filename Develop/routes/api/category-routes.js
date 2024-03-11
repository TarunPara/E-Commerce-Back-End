const router = require('express').Router();
const { Category, Product } = require('../../models');

// Routes for `/api/categories` endpoint

// GET all categories with their associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single category by its ID with its associated products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      attributes: ['id', 'category_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT to update a category by its ID
router.put('/:id', async (req, res) => {
  try {
    const updateResult = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updateResult[0]) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    const updatedCategory = await Category.findByPk(req.params.id);
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a category by its ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Category.destroy({
      where: { id: req.params.id },
    });

    if (!result) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.json({ message: 'Category removed' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
