const mongoose = require('mongoose');
const Order = require('./Order');
const Service = require('./Service');

const ServiceOrdersSchema = mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  quantity: { type: Number, required: true },
});

const ServiceOrders = mongoose.model('ServiceOrders', ServiceOrdersSchema);
module.exports = ServiceOrders;
