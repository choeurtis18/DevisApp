const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
});

const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;