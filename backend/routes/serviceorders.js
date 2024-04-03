const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const serviceOrdersController = require('../controllers/ServiceOrdersController');

router.get('/', async (req, res) => {
    try {
        const result = await serviceOrdersController.getAllServiceOrders();
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while getting all service orders", error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const serviceOrderData = req.body;
        const result = await serviceOrdersController.createServiceOrders(serviceOrderData);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while creating the service order", error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await serviceOrdersController.getOneServiceOrders(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while getting the service order", error);
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const serviceOrderData = req.body;
        const result = await serviceOrdersController.updateServiceOrders(req.params.id, serviceOrderData);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while updating the service order", error);
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await serviceOrdersController.deleteServiceOrders(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while deleting the service order", error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
