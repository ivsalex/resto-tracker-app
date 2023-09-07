const mongoose = require('mongoose');

const Order = require('../models/order');
const Table = require('../models/table');
const Product = require('../models/product');

exports.orders_get_all = async (req, res, next) => {
    try {
        const docs = await Order.find()
            .select('_id tableId status orderItems createdAt totalPay tax isPaid quantity isReady')
            .populate({
                path: 'tableId',
                select: 'tableNumber'
            })
            .populate({
                path: 'orderItems.product',
                select: 'name description type price weight'
            });

        const orders = docs.map(doc => ({
            _id: doc._id,
            tableId: doc.tableId,
            tableNumber: doc.tableId?.tableNumber,
            status: doc.status,
            orderItems: doc.orderItems.map(item => ({
                product: {
                    _id: item.product?._id,
                    name: item.product?.name,
                    description: item.product?.description,
                    price: item.product?.price,
                    type: item.product?.type,
                    weight: item.product?.weight,
                },
                isReady: item.isReady,
                quantity: item.quantity,
                _id: item._id
            })),
            productsCount: doc.orderItems.length,
            createdAt: doc.createdAt,
            totalPay: doc.totalPay,
            tax: doc.tax,
            isPaid: doc.isPaid
        }));

        res.status(200).json({
            count: orders.length,
            orders: orders
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        });
    }
};

exports.order_create = async (req, res, next) => {
    const tableId = req.body.tableId;

    try {
        const table = await Table.findById(tableId);

        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }

        if (!table.isAvailable) {
            return res.status(400).json({
                message: 'The table is not available'
            });
        }

        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            tableId: req.body.tableId
        });

        table.isAvailable = false;
        await table.save();

        const result = await order.save();
        res.status(201).json({
            message: 'Order created!',
            order: result
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.order_get_one = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.orderId)
            .select('_id tableId status orderItems createdAt totalPay tax isPaid quantity isReady')
            .populate({
                path: 'tableId',
                select: 'tableNumber'
            })
            .populate({
                path: 'orderItems.product',
                select: 'name description type price'
            });

        if (!order) {
            return res.status(404).json({
                message: 'Order not found!'
            });
        }

        res.status(200).json({
            order: order
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
};

exports.order_modify = async (req, res, next) => {
    try {
        const id = req.params.orderId;
        const updateOps = req.body;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        for (const ops of updateOps) {
            console.log(ops.product);
            const index = order.orderItems.findIndex(item => item.product.equals(ops.product));

            if (index !== -1) {
                order.orderItems[index].quantity = ops.quantity;
            } else {
                order.orderItems.push({
                    product: ops.product,
                    quantity: ops.quantity
                });
            }
        }

        order.totalPay = await order.orderItems.reduce(async (asyncTotal, item) => {
            const product = await Product.findById(item.product);
            const productPrice = product.price;
            const itemTotal = productPrice * item.quantity;
            const total = await asyncTotal;
            return total + itemTotal;
        }, Promise.resolve(0));

        const result = await order.save();

        console.log(result);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.order_delete = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;

        const order = await Order.findById({ _id: orderId });
        if (!order) {
            return res.status(404).json({
                message: "Order not found!"
            });
        }

        const table = await Table.findById({ _id: order.tableId });
        if (!table) {
            return res.status(404).json({
                message: "Order not found!"
            });
        }

        const result = await Order.deleteOne({ _id: orderId });
        if (result.deletedCount === 1) {
            res.status(200).json({
                message: "Order deleted!",
            });
            table.isAvailable = true;
            await table.save();
        } else {
            res.status(500).json({
                message: "Failed to delete order.",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        });
    }
};