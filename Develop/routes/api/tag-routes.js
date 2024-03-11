const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// Endpoint `/api/tags`

// GET all tags with associated Product data
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      attributes: ["id", "tag_name"],
      include: [{
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
      }],
    });
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single tag by ID with associated Product data
router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
      }],
    });
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new tag
router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT to update a tag by ID
router.put("/:id", async (req, res) => {
  try {
    const update = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (update[0] === 0) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json({ message: 'Tag updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a tag by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (deleted === 0) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json({ message: `Tag with id ${req.params.id} was removed from the database` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
