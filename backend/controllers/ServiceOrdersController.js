const ServiceOrders = require('../models/ServiceOrders');
const ServiceController = require('../controllers/ServiceController');
const OrderController = require('../controllers/OrderController');

exports.createServiceOrders = async (serviceOrderData) => {
  try {
    const serviceOrders = new ServiceOrders(serviceOrderData);
    await serviceOrders.save();

    const serviceResponse = await ServiceController.getOneService(serviceOrderData.service_id);
    const orderResponse = await OrderController.getOneOrder(serviceOrderData.order_id);

    const service = serviceResponse.service;
    const order = orderResponse.order;

    if (order && service) {
      const updatedCost = order.cost + (service.cost * serviceOrderData.quantity);        
      await OrderController.updateOrder(order._id, { cost: updatedCost });
    } else {
      console.error("Service or Order not found during createServiceOrders ", error);
      throw error;
    }

    return { status: 201, message: 'ServiceOrders saved successfully!' };
  } catch (error) {
    console.error("An error occurred while create ServiceOrders:", error);
    throw error;
  }
};

exports.getAllServiceOrders = async () => {
  try {
    const serviceOrders = await ServiceOrders.find();
    return { status: 200, serviceOrders: serviceOrders };
  } catch (error) {
    console.error("An error occurred while getAll ServiceOrders:", error);
    throw error;
  }
};

exports.getOneServiceOrders = async (id) => {
  try {
    const serviceOrders = await ServiceOrders.findById(id);
    if (!serviceOrders) {
      throw new Error('ServiceOrders not found.');
    }
    return { status: 200, serviceOrders: serviceOrders };
  } catch (error) {
    console.error("An error occurred while getOne ServiceOrders:", error);
    throw error;
  }
};

exports.updateServiceOrders = async (id, serviceOrderData) => {
  try {
    const serviceOrders = await ServiceOrders.findByIdAndUpdate(id, serviceOrderData, { new: true });
    if (!serviceOrders) {
      throw new Error('ServiceOrders not found.');
    }
    return { status: 200, message: 'ServiceOrders updated successfully!', serviceOrders: serviceOrders };
  } catch (error) {
    console.error("An error occurred while updating ServiceOrders:", error);
    throw error;
  }
};

exports.deleteServiceOrders = async (id) => {
  try {
    const result = await ServiceOrders.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new Error('ServiceOrders not found.');
    }
    return { status: 200, message: 'Deleted ServiceOrders!' };
  } catch (error) {
    console.error("An error occurred while deleting ServiceOrders:", error);
    throw error;
  }
};
