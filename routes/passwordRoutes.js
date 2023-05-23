const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');
const passwordController = require('../controllers/passwordController');

router.use(isAuthenticated);
router.get('/', isAuthenticated, passwordController.getPasswords);
router.post('/', isAuthenticated, passwordController.addPassword);
router.put('/:id', isAuthenticated, passwordController.updatePassword);
router.delete('/:id', isAuthenticated, passwordController.deletePassword);

module.exports = router;
