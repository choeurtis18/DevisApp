const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const materialOrdersController = require('../controllers/MaterialOrdersController');

router.get('/', async (req, res) => {
    try {
        const result = await materialOrdersController.getAllMaterialOrders();
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while getting all material orders", error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const materialOrderData = req.body;
        const result = await materialOrdersController.createMaterialOrders(materialOrderData);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while creating the material order", error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await materialOrdersController.getOneMaterialOrders(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while getting the material order", error);
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const materialOrderData = req.body;
        const result = await materialOrdersController.updateMaterialOrders(req.params.id, materialOrderData);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while updating the material order", error);
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await materialOrdersController.deleteMaterialOrders(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while deleting the material order", error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
