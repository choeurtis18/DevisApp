const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userController = require('../controllers/UserController');

router.get('/', async (req, res) => {
    try {
      const result = await userController.getAllUsers();
      res.status(result.status).json(result);
    } catch (error) {
      console.error("An error occurred while get all user", error);
      res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
      const userData = req.body;
      const result = await userController.createUser(userData);
      res.status(result.status).json(result);
    } catch (error) {
      console.error("An error occurred while creating the user", error);
      res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
      const result = await userController.getOneUser(req.params.id);
      res.status(result.status).json(result);
    } catch (error) {
      console.error("An error occurred while get user", error);
      res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const userData = req.body;
        const result = await userController.updateUser(req.params.id, userData);
        res.status(result.status).json(result);
    } catch (error) {
      console.error("An error occurred while update user", error);
      res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await userController.deleteUser(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
      console.error("An error occurred while delete user", error);
      res.status(400).json({ error: error.message });
    }
});

router.post('/signup', async (req, res) => {
  try {
    const result = await userController.signup(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await loginController.login(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

module.exports = router;