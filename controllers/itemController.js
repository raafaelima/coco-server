const Item = require('../models/item');

// Create a new item
exports.createItem = async (req, res) => {
    try {
        const item = new Item({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity
        });
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Retrieve all items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an item by ID
exports.updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(404).json({ message: 'Item not found' });
    }
};

// Delete an item by ID
exports.deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndRemove(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(404).json({ message: 'Item not found' });
    }
};
