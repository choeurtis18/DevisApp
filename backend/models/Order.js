const mongoose = require('mongoose');
const Customer = require('./Customer');

const OrderSchema = mongoose.Schema({
  devis_number: { type: Number, required: true },
  start_date: { type: Date, required: true },
  creation_date: { type: Date, required: true },
  update_date: { type: Date, required: true },
  days: { type: Number, required: true },
  tva: { type: Number, required: true },

  statut: { type: String, required: true },
  cost: { type: Number, required: false, default: 0 },

  type_of_work: { type: String, required: false },
  description: { type: String, required: true },

  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;