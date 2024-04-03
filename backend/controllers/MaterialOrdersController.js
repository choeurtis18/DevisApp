const MaterialOrders = require('../models/MaterialOrders');
const MaterialController = require('../controllers/MaterialController');
const OrderController = require('../controllers/OrderController');

exports.createMaterialOrders = async (materialOrderData) => {
  try {
    const materialOrders = new MaterialOrders(materialOrderData);
    await materialOrders.save();

    const materialResponse = await MaterialController.getOneMaterial(materialOrderData.material_id);
    const orderResponse = await OrderController.getOneOrder(materialOrderData.order_id);

    const material = materialResponse.material;
    const order = orderResponse.order;

    if (order && material) {
      const updatedCost = order.cost + (material.cost * materialOrderData.quantity);        
      await OrderController.updateOrder(order._id, { cost: updatedCost });
    } else {
      console.error("Material or Order not found during createMaterialOrders ", error);
      throw error;
    }

    return { status: 201, message: 'MaterialOrders saved successfully!' };
  } catch (error) {
    console.error("An error occurred while create MaterialOrders:", error);
    throw error;
  }
};

exports.getAllMaterialOrders = async () => {
  try {
    const materialOrders = await MaterialOrders.find();
    return { status: 200, materialOrders: materialOrders };
  } catch (error) {
    console.error("An error occurred while getAll MaterialOrders:", error);
    throw error;
  }
};

exports.getOneMaterialOrders = async (id) => {
  try {
    const materialOrders = await MaterialOrders.findById(id);
    if (!materialOrders) {
      throw new Error('MaterialOrders not found.');
    }
    return { status: 200, materialOrders: materialOrders };
  } catch (error) {
    console.error("An error occurred while getOne MaterialOrders:", error);
    throw error;
  }
};

exports.updateMaterialOrders = async (id, materialOrderData) => {
  try {
    const materialOrders = await MaterialOrders.findByIdAndUpdate(id, materialOrderData, { new: true });
    if (!materialOrders) {
      throw new Error('MaterialOrders not found.');
    }
    return { status: 200, message: 'MaterialOrders updated successfully!', materialOrders: materialOrders };
  } catch (error) {
    console.error("An error occurred while updating MaterialOrders:", error);
    throw error;
  }
};

exports.deleteMaterialOrders = async (id) => {
  try {
    const result = await MaterialOrders.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new Error('MaterialOrders not found.');
    }
    return { status: 200, message: 'Deleted MaterialOrders!' };
  } catch (error) {
    console.error("An error occurred while deleting MaterialOrders:", error);
    throw error;
  }
};
