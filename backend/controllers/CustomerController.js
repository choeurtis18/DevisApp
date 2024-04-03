const Customer = require('../models/Customer');

exports.createCustomer = async (customerData) => {
  try {
    const customer = new Customer({
      ...customerData 
    });
    await customer.save();
    return { status: 201, message: 'Customer saved successfully!' };
  } catch (error) {
    console.error("An error occurred while create the Customer:", error);
    throw error; 
  }
};

exports.getAllCustomers = async () => {
  try {
    const customers = await Customer.find();
    return { status: 200, message: 'Customers fetched successfully!', customers: customers };
  } catch (error) {
    console.error("An error occurred while getAll customers:", error);
    throw error;
  }
};

exports.getOneCustomer = async (id) => {
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return { status: 404, message: 'Customer not found.' };
    }
    return { status: 200, message: 'Customer fetched successfully.', customer: customer };
  } catch (error) {
    console.error("An error occurred while getOne customer:", error);
    throw error;
  }
};

exports.updateCustomer = async (id, customerData) => {
  try {
    const customer = await Customer.findByIdAndUpdate(id, customerData, { new: true });
    if (!customer) {
      return { status: 404, message: 'Customer not found for update.' };
    }
    return { status: 200, message: 'Customer updated successfully.', customer: customer };
  } catch (error) {
    console.error("An error occurred while updating the customer:", error);
    throw error;
  }
};

exports.deleteCustomer = async (id) => {
  try {
    const result = await Customer.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return { status: 404, message: 'Customer not found for deletion.' };
    }
    return { status: 200, message: 'Customer deleted successfully.' };
  } catch (error) {
    console.error("An error occurred while deleting the customer:", error);
    throw error;
  }
};

