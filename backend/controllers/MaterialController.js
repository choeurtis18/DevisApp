const Material = require('../models/Material');
const MaterialOrders = require('../models/MaterialOrders');

exports.createMaterial = async (materialData) => {
  try {
    const material = new Material(
      {name: materialData.materialDetails.name, 
        cost: materialData.materialDetails.cost, }
    );
    await material.save();

    const materialOrder = new MaterialOrders(
      {order_id: materialData.orderId, 
        material_id: material, 
        quantity: materialData.materialDetails.quantity}
    );
    await materialOrder.save();

    return { status: 201, message: 'Material saved successfully!' };
  } catch (error) {
    console.error("An error occurred while create the material:", error);
    throw error;
  }
};

exports.getAllMaterials = async () => {
  try {
    const materials = await Material.find();
    return { status: 200, materials: materials };
  } catch (error) {
    console.error("An error occurred while getAll materials:", error);
    throw error;
  }
};

exports.getOneMaterial = async (id) => {
  try {
    const material = await Material.findById(id);
    if (!material) {
      throw new Error('Material not found.');
    }
    return { status: 200, material: material };
  } catch (error) {
    console.error("An error occurred while getOne material:", error);
    throw error;
  }
};

exports.updateMaterial = async (id, materialData) => {
  try {
    const material = await Material.findByIdAndUpdate(id, materialData, { new: true });
    if (!material) {
      throw new Error('Material not found.');
    }
    return { status: 200, message: 'Material updated successfully!', material: material };
  } catch (error) {
    console.error("An error occurred while updating the material:", error);
    throw error;
  }
};

exports.deleteMaterial = async (id) => {
  try {
    const result = await Material.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new Error('Material not found.');
    }
    return { status: 200, message: 'Deleted Material!' };
  } catch (error) {
    console.error("An error occurred while deleting the material:", error);
    throw error;
  }
};