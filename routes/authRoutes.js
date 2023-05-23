const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/authMiddleware');
// Registration route
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/Frontend/home.html');
//   });

router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

router.get('/logout', authController.logout);
module.exports = router;
