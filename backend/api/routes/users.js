const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const { guard } = require('../middleware/permissions');

const UsersController = require('../controllers/users');

//Get all Users method
router.get('/', checkAuth, guard.check('get-all-users'), UsersController.user_get_all);

//Login Method
router.post('/login', UsersController.user_login);

//Create an User method
router.post('/create', checkAuth, guard.check('create-user'), UsersController.user_create);

// Modify an User Method
router.patch('/:userId', guard.check('update-user'), UsersController.user_modify);

//Delete an User method
router.delete('/:userId', guard.check('delete-user'), UsersController.user_delete);

module.exports = router;