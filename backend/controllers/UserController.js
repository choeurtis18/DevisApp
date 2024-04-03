const User = require('../models/User');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

exports.createUser = async (userData) => {
  try {
    const user = new User({
      ...userData
    });
    await user.save();
    return { status: 201, message: 'User saved successfully!', user:user };
  } catch (error) {
    console.error("An error occurred while saving createUser:", error);
    throw error;
  }
};

exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return { status: 201, message: 'getUsers Ok!', users: users };
  } catch (error) {
    console.error("An error occurred while we getUser", error);
    throw error;
  }
};

exports.getOneUser = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    return { status: 201, message: 'Get User '+id, user: user };
  } catch (error) {
    console.error("An error occurred while we getOneUser", error);
    throw error;
  }
};

exports.updateUser = async (id, userData) => {
  try {
    await User.updateOne({_id: id}, { ...userData, _id: id });
    return { status: 201, message: 'Get User '+id, user: user };
  } catch (error) {
    console.error("An error occurred while we updateUser", error);
    throw error;
  }
};

exports.deleteUser = async (id) => {
  try {
    await User.deleteOne({_id: id});
    return { status: 201, message: 'Delete User '+id};
  } catch (error) {
    console.error("An error occurred while we deleteUser", error);
    throw error;
  }
};

exports.signup = async (userData) => {
  try {
    const hash = await bcrypt.hash(userData.password, 10);
    const user = new User({
      email: userData.email,
      password: hash,

      name_socity: userData.name_socity,
      name: userData.name,
      phone: userData.phone,
      
      adress: userData.adress,
      cp: userData.cp,
      city: userData.city,
      country: userData.country
    });
    await user.save();
    return { status: 201, message: 'User created!', user: user };
  } catch (error) {
    console.error("An error occurred while creating the user", error);
    throw error;
  }
};

exports.login = async (userData) => {
  try {
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      throw { status: 401, message: 'User not found!' };
    }
    
    const valid = await bcrypt.compare(userData.password, user.password);
    if (!valid) {
      throw { status: 401, message: 'User/Password Incorrect!' };
    }
    
    const token = jwt.sign(
      { userId: user._id },
      'RANDOM_TOKEN_SECRET',
      { expiresIn: '24h' }
    );
    
    return { status: 200, data: {userId: user._id, token: token} };
  } catch (error) {
    if (error.status) {
      throw error;
    } else {
      console.error("An error occurred during login", error);
      throw { status: 500, message: 'An error occurred during login.' };
    }
  }
};
