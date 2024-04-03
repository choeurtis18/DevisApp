const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },

  name_socity: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  
  adress: { type: String, required: true },
  cp: { type: Number, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true }
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('User', UserSchema);
module.exports = User;