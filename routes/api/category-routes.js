const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const allCategories = await Category.findAll({
    
    });
    res.status(200).json(allCategories);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
try {
  const categoryID = await Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id' ]
      }
    ],
  });
  res.status(200).json(categoryID);
} catch (err) {
  res.status(500).json(err)
}
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body, {
      include: [
        {
          model: Product, 
          attributes:  ['id', 'product_name', 'price', 'stock', 'category_id' ]
        }
      ],
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
        where: { id: req.params.id }
      }
    );
    res.status(201).json(updateCategory)
  } catch (err){
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: "Category not Found"});
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
