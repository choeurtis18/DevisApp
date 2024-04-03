const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const serviceController = require('../controllers/ServiceController');

router.get('/', async (req, res) => {
    try {
        const result = await serviceController.getAllServices();
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while getting all services", error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const serviceData = req.body;
        const result = await serviceController.createService(serviceData);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while creating the service", error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await serviceController.getOneService(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while getting the service", error);
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const serviceData = req.body;
        const result = await serviceController.updateService(req.params.id, serviceData);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while updating the service", error);
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await serviceController.deleteService(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while deleting the service", error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
