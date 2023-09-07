const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const { guard } = require('../middleware/permissions');

const OrdersController = require('../controllers/orders');

// Get all Orders Method
router.get('/', checkAuth, guard.check('get-all-orders'), OrdersController.orders_get_all);

// Create an Order Method
router.post('/', checkAuth, guard.check('create-order'), OrdersController.order_create);

// Get a specific Order Method
router.get('/:orderId', checkAuth, guard.check('get-one-order'), OrdersController.order_get_one);

// Modify an Order Method
router.patch('/:orderId', checkAuth, guard.check('update-order'), OrdersController.order_modify);

// Delete an Order Method
router.delete('/:orderId', checkAuth, guard.check('delete-order'), OrdersController.order_delete);

module.exports = router;