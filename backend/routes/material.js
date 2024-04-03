const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const materialController = require('../controllers/MaterialController');

router.get('/', async (req, res) => {
    try {
        const result = await materialController.getAllMaterials();
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while getting all materials", error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const materialData = req.body;
        const result = await materialController.createMaterial(materialData);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while creating the material", error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await materialController.getOneMaterial(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while getting the material", error);
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const materialData = req.body;
        const result = await materialController.updateMaterial(req.params.id, materialData);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while updating the material", error);
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await materialController.deleteMaterial(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("An error occurred while deleting the material", error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
