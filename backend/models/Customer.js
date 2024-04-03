const mongoose = require('mongoose');
const User = require('./User');

const CustomerSchema = mongoose.Schema({
    name: { type: String, required: false },
    name_socity: { type: String, required: true },
    phone: { type: String, required: true },

    adress: { type: String, required: true },
    cp: { type: Number, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;