const Service = require('../models/Service');

exports.createService = async (serviceData) => {
  try {
    const service = new Service(serviceData);
    await service.save();
    return { status: 201, message: 'Service saved successfully!' };
  } catch (error) {
    console.error("An error occurred while create the service:", error);
    throw error;
  }
};

exports.getAllServices = async () => {
  try {
    const services = await Service.find();
    return { status: 200, services: services };
  } catch (error) {
    console.error("An error occurred while getAll services:", error);
    throw error;
  }
};

exports.getOneService = async (id) => {
  try {
    const service = await Service.findById(id);
    if (!service) {
      throw new Error('Service not found.');
    }
    return { status: 200, service: service };
  } catch (error) {
    console.error("An error occurred while getOne service:", error);
    throw error;
  }
};

exports.updateService = async (id, serviceData) => {
  try {
    const service = await Service.findByIdAndUpdate(id, serviceData, { new: true });
    if (!service) {
      throw new Error('Service not found.');
    }
    return { status: 200, message: 'Service updated successfully!', service: service };
  } catch (error) {
    console.error("An error occurred while updating the service:", error);
    throw error;
  }
};

exports.deleteService = async (id) => {
  try {
    const result = await Service.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new Error('Service not found.');
    }
    return { status: 200, message: 'Deleted Service!' };
  } catch (error) {
    console.error("An error occurred while deleting the service:", error);
    throw error;
  }
};
