const mongoose = require('mongoose');

const MaterialSchema = mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
});

const Material = mongoose.model('Material', MaterialSchema);
module.exports = Material;