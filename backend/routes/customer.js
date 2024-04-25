const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const customerController = require('../controllers/CustomerController');

router.get('/', async (req, res) => {
    try {
        const result = await customerController.getAllCustomers();
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while getting all customers:", error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const customerData = req.body.customerDetails;
        const result = await customerController.createCustomer(customerData);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while creating the customer:", error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await customerController.getOneCustomer(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while getting the customer:", error);
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const customerData = req.body.customerDetails;
        const result = await customerController.updateCustomer(req.params.id, customerData);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while updating the customer:", error);
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await customerController.deleteCustomer(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while deleting the customer:", error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
