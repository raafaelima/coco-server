const Item = require('../models/item');
const itemChangeHistory = []

async function updateItemQuantities(items) {
    for (const itemReq of items) {
        const existingItem = await Item.findById(itemReq.itemId);

        validateItemUpdate(existingItem, itemReq)

        const updatedItem = new Item(existingItem);
        updatedItem.quantity -= itemReq.quantity;
        await updatedItem.save();

        itemChangeHistory.push({ existingItem, updatedItem });
    }
}

function validateItemUpdate(existingItem, updatedItem) {
    if (!existingItem) {
        throw new Error('Item not found');
    }

    if (existingItem.quantity < updatedItem.quantity) {
        throw new Error('Insufficient item quantity');
    }
}

async function calculateTotalPrice(items) {
    let total = 0;

    for (const itemData of items) {
        const existingItem = await Item.findById(itemData.itemId);
        total += existingItem.price * itemData.quantity;
    }

    return total.toFixed(2)
}

async function rollbackItemChanges() {
    for (const { originalItem, updatedItem } of itemChangeHistory) {
        const currentItemState = await Item.findById(updatedItem.itemId);
        currentItemState.quantity = originalItem.quantity;
        await currentItemState.save();
    }
}

module.exports = {
    updateItemQuantities,
    calculateTotalPrice,
    rollbackItemChanges
};