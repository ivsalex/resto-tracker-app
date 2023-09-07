const mongoose = require('mongoose');

const Product = require('../models/product');

exports.products_get_all = async (req, res, next) => {
    try {
        const docs = await Product.find()
            .select('name price totalPrice _id type description weight image isReady');
        const response = {
            count: docs.length,
            products: docs
        };

        if (docs.length >= 0) {
            res.status(200).json(response);
        } else {
            res.status(404);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.products_create = async (req, res, next) => {
    try {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            type: req.body.type,
            image: req.body.image,
            description: req.body.description,
            weight: req.body.weight,
            isReady: req.body.isReady
        });

        const result = await product.save();

        console.log(result);
        res.status(200).json({
            message: 'Handling POST requests to /products',
            createdProduct: product
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};

exports.products_get_one = async (req, res, next) => {
    try {
        const id = req.params.productId;
        const doc = await Product.findById(id);

        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: 'No valid entry for that ID' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};

exports.products_modify = async (req, res, next) => {
    try {
        const id = req.params.productId;
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }

        const result = await Product.updateOne({ _id: id }, { $set: updateOps });

        console.log(result);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.products_delete = async (req, res, next) => {
    try {
        const id = req.params.productId;
        const result = await Product.deleteOne({ _id: id });

        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};