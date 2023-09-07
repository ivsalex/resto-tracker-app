const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number, default: 0 },
    type: { type: String, enum: ['Drinks', 'Pizza', 'Pasta', 'Burgers', 'Sides', 'Soup', 'Desserts'], required: true },
    image: { type: String, required: true },
    description: { type: String },
    weight: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;