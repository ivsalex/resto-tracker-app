const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const { guard } = require('../middleware/permissions');

const ProductsController = require('../controllers/products');

// Get all Products Method
router.get('/', checkAuth, guard.check('get-all-products'), ProductsController.products_get_all);

// Create a Product Method
router.post('/', checkAuth, guard.check('create-product'), ProductsController.products_create);

// Get a specific Product Method
router.get('/:productId', checkAuth, guard.check('get-one-product'), ProductsController.products_get_one);

// Modify a Product Method
router.patch('/:productId', checkAuth, guard.check('update-product'), ProductsController.products_modify);

// Delete a Product Method
router.delete('/:productId', checkAuth, guard.check('delete-product'), ProductsController.products_delete);

module.exports = router;