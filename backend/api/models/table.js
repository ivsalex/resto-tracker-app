const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tableNumber: { type: String, required: true },
    capacity: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;