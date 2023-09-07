const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const { guard } = require('../middleware/permissions');

const TablesController = require('../controllers/tables');

// Get all Tables Method
router.get('/', checkAuth, guard.check('get-all-tables'), TablesController.tables_get_all);

// Create a Table Method
router.post('/', checkAuth, guard.check('create-table'), TablesController.table_create);

// Get a specific Table Method
router.get('/:tableId', checkAuth, guard.check('get-one-table'), TablesController.table_get_one);

// Modify a Table Method
router.patch('/:tableId', checkAuth, guard.check('update-table'), TablesController.table_modify);

// Delete a Table Method
router.delete('/:tableId', checkAuth, guard.check('delete-table'), TablesController.table_delete);

module.exports = router;