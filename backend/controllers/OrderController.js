const Order = require('../models/Order');
const MaterialOrders = require('../models/MaterialOrders');
const Material = require('../controllers/MaterialController');
const ServiceOrders = require('../models/ServiceOrders');
const Service = require('../controllers/ServiceController');

exports.createOrder = async (orderData) => {
  try {
    const order = new Order(orderData);
    await order.save();
    return { status: 201, message: 'Order saved successfully!' };
  } catch (error) {
    console.error("An error occurred while create the order:", error);
    throw error;
  }
};

exports.getAllOrder = async () => {
  try {
    const orders = await Order.find();
    return { status: 200, orders: orders };
  } catch (error) {
    console.error("An error occurred while getAll orders:", error);
    throw error;
  }
};

exports.getOneOrder = async (id) => {
  try {
    const order = await Order.findById(id);
    if (!order) {
      throw new Error('Order not found.');
    }
    return { status: 200, order: order };
  } catch (error) {
    console.error("An error occurred while getOne order:", error);
    throw error;
  }
};

exports.updateOrder = async (id, orderData) => {
  try {
    const order = await Order.findByIdAndUpdate(id, orderData, { new: true });
    if (!order) {
      throw new Error('Order not found.');
    }
    return { status: 200, message: 'Order updated successfully!', order: order };
  } catch (error) {
    console.error("An error occurred while updating the order:", error);
    throw error;
  }
};

exports.deleteOrder = async (id) => {
  try {
    const result = await Order.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new Error('Order not found.');
    }
    return { status: 200, message: 'Order deleted successfully!' };
  } catch (error) {
    console.error("An error occurred while deleting the order:", error);
    throw error;
  }
};

exports.getMateriel = async (orderId) => {
  try {
    const order = await this.getOneOrder(orderId).order;
    if (!order) throw new Error('Order not found.');

    const materialsOrder = await MaterialOrders.find({ order_id: order._id });
    const materialIds = materialsOrder.map(mo => mo.material_id);
    const materials = await Material.getOneMaterial(materialIds.random()).material;

    if (materials) {
      const materialsWithQuantity = materials.map(material => {
        const found = materialsOrder.find(mo => String(mo.material_id) === String(material._id));
        return { ...material.toObject(), quantity: found ? found.quantity : 0 };
      });   
      
      return { status: 200, materials: materialsWithQuantity };
    } else {
      console.error("An error occurred while get materials in OrderController", error);
    }
  } catch (error) {
    console.error("An error occurred while getting materials for the order:", error);
    throw error;
  }
};

exports.getService = async (orderId) => {
  try {
    const order = await this.getOneOrder(orderId).order;
    if (!order) throw new Error('Order not found.');

    const servicesOrder = await ServiceOrders.find({ order_id: order._id });
    const serviceIds = servicesOrder.map(so => so.service_id);
    const services = await Service.getOneService(serviceIds.random());

    if (services) {
      const servicesWithQuantity = services.map(service => {
        const found = servicesOrder.find(so => String(so.service_id) === String(service._id));
        return { ...service.toObject(), quantity: found ? found.quantity : 0 };
      });   
      
      return { status: 200, services: servicesWithQuantity };
    } else {
      console.error("An error occurred while get materials in OrderController", error);
    }
  } catch (error) {
    console.error("An error occurred while getting services for the order:", error);
    throw error;
  }
};

