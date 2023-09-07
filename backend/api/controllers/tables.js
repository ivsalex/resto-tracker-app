const mongoose = require('mongoose');

const Table = require('../models/table');

exports.tables_get_all = async (req, res, next) => {
    try {
        const docs = await Table.find()
            .select('_id tableNumber tableId capacity isAvailable orderId')
            .populate('orderId');

        const tables = docs.map(doc => ({
            _id: doc._id,
            tableNumber: doc.tableNumber,
            capacity: doc.capacity,
            isAvailable: doc.isAvailable,
            orderId: doc.orderId
        }));

        res.status(200).json({
            count: tables.length,
            tables: tables
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
};

exports.table_create = async (req, res, next) => {
    try {
        const checkedTable = await Table.find({ tableNumber: req.body.tableNumber });
        if (checkedTable.length >= 1) {
            return res.status(500).json({
                message: 'This table already exist!'
            });
        }

        const table = new Table({
            _id: new mongoose.Types.ObjectId(),
            tableNumber: req.body.tableNumber,
            capacity: req.body.capacity,
            isAvailable: req.body.isAvailable
        })

        const result = await table.save();

        console.log(result);
        res.status(201).json({
            message: 'Table created!',
            table: result
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.table_get_one = async (req, res, next) => {
    try {
        const id = req.params.tableId;
        const doc = await Table.findById(id);

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

exports.table_modify = async (req, res, next) => {
    try {
        const id = req.params.tableId;
        const checkedTable = await Table.findById({ _id: id });

        const updateOps = {};
        for (const ops of req.body) {
            if (ops.propName === 'isAvailable' && ops.value === checkedTable.isAvailable) {
                return res.status(400).json({
                    message: 'The table is already: ' + (checkedTable.isAvailable ? 'available' : 'unavailable')
                });
            }
            updateOps[ops.propName] = ops.value;
        }

        const result = await Table.updateOne({ _id: id }, { $set: updateOps });

        res.status(200).json({
            result: result,
            message: 'Table modified successfully!'
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.table_delete = async (req, res, next) => {
    try {
        const id = req.params.tableId;
        const checkedTable = await Table.findById({ _id: id });

        if (!checkedTable) {
            return res.status(404).json({
                message: 'Table not found!'
            })
        }

        const result = await Table.deleteOne({ _id: id });

        if (result.deletedCount === 1) {
            res.status(200).json({
                message: 'Table deleted!'
            })
        } else {
            res.status(500).json({
                message: 'Failed to delete Table!'
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};