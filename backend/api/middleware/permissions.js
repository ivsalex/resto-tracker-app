const guard = require('express-jwt-permissions')({
    requestProperty: 'user',
    permissionsProperty: 'permissions'
});

const rolePermissions = {
    Admin: ['create-user', 'get-all-users', 'update-user', 'delete-user', 'create-product', 'delete-product', 'update-product', 'get-all-products',
        'create-table', 'get-all-tables', 'update-table', 'delete-table', 'get-one-table'],
    Waiter: ['create-order', 'get-one-order', 'get-all-orders', 'delete-order', 'login', 'update-order', 'get-all-products', 'get-all-tables',
        'get-one-table', 'update-table'],
    Barman: ['get-one-order', 'get-all-orders', 'login', 'update-order'],
    Chef: ['get-one-order', 'get-all-orders', 'login', 'update-order']
};

module.exports = {
    guard,
    rolePermissions
};