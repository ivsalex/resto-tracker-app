const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
    status: { type: String, enum: ['pending', 'inProgress', 'completed'], default: 'pending' },
    orderItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            specialInstructions: { type: String },
            quantity: { type: Number, default: 0 },
            isReady: { type: Boolean, default: false },
            default: {}
        },
    ],
    createdAt: { type: Date, default: Date.now },
    totalPay: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    isPaid: { type: Boolean, default: false }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
