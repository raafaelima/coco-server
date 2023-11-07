const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const orderSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  items: [
    {
      itemId: {
        type: String,
        ref: 'Item',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('Order', orderSchema);
