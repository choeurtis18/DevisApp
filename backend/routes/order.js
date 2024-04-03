const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const orderController = require('../controllers/OrderController');

router.get('/', async (req, res) => {
    try {
        const result = await orderController.getAllOrder();
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while getting all orders", error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const orderData = req.body;
        const result = await orderController.createOrder(orderData);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while creating the order", error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await orderController.getOneOrder(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while getting the order", error);
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const orderData = req.body;
        const result = await orderController.updateOrder(req.params.id, orderData);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while updating the order", error);
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await orderController.deleteOrder(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while deleting the order", error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id/materials', async (req, res) => {
    try {
        const result = await orderController.getMateriel(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while getting materials for the order", error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id/services', async (req, res) => {
    try {
        const result = await orderController.getService(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while getting services for the order", error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;