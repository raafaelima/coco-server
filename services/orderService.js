const Order = require('../models/order');
const itemService = require('../services/itemService');

async function createOrderWithItems(items) {
  try {
    const total = await itemService.calculateTotalPrice(items);
    const order = new Order({ items, total });

    await itemService.updateItemQuantities(items)
    await order.save()

  } catch (err) {
    itemService.rollbackItemChanges()
    throw err;
  }
}

async function updateOrderWithItems(orderId, updatedItems) {
  try {
    const updatedOrder = await Order.findById(orderId);

    if (!updatedOrder) {
      throw new Error('Order not found');
    }

    const updatedTotal = await itemService.calculateTotalPrice(updatedItems);

    updatedOrder.items = updatedItems;
    updatedOrder.total = updatedTotal;
    updatedOrder.date = new Date();

    await updateItemQuantities(updatedItems)
    await updatedOrder.save()

  } catch (err) {
    rollbackItemChanges(itemsRollback)
    throw err;
  }
}

module.exports = {
  createOrderWithItems,
  updateOrderWithItems
};