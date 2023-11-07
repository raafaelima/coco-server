const Order = require('../models/order');
const Item = require('../models/item');
const orderService = require('../services/orderService');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        await orderService.createOrderWithItems(items);
        res.status(201).json();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Retrieve all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Retrieve an order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an order by ID
exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const updatedItems = req.body.items;
        const updatedOrder = await orderService.updateOrderWithItems(orderId, updatedItems);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndRemove(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
