const mongoose = require('mongoose');
const Order = require('./Order');
const Material = require('./Material');

const MaterialOrdersSchema = mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  material_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
  quantity: { type: Number, required: true },
});

const MaterialOrders = mongoose.model('MaterialOrders', MaterialOrdersSchema);
module.exports = MaterialOrders;
