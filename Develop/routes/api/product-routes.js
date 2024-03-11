const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// Endpoint `/api/products`

// GET all products with their associated Categories and Tags
router.get("/", async (req, res) => {
  try {
    const productData = await Product.findAll({
      attributes: ["id", "product_name", "price", "stock", "category_id"],
      include: [
        {
          model: Tag,
          attributes: ["id", "tag_name"],
          through: ProductTag,
        },
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
      ],
    });
    res.json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single product by its ID with associated Categories and Tags
router.get("/:id", async (req, res) => {
  try {
    const specificProduct = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Tag,
          attributes: ["id", "tag_name"],
          through: ProductTag,
        },
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
      ],
    });
    if (!specificProduct) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.json(specificProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new product and its associated Tags
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return { product_id: product.id, tag_id };
      });
      await ProductTag.bulkCreate(productTagIdArr);
      res.status(200).json(product);
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT to update a product by its ID and its associated Tags
router.put("/:id", async (req, res) => {
  try {
    await Product.update(req.body, {
      where: { id: req.params.id },
    });

    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
    const productTagIds = productTags.map(({ tag_id }) => tag_id);

    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => ({ product_id: req.params.id, tag_id }));

    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);

    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a product by its ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByPk(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    
    await Product.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: `Product with id ${req.params.id} was removed from the database` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
