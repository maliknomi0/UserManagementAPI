const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController');
const AuthGuard = require('../Middleware/AuthGuard');
const uploadController = require('../controller/uploadController');



// Auth Routes
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/user/edit', AuthGuard, AuthController.editUserProfile);
router.post('/change-password', AuthGuard, AuthController.changePassword);

// Upload Images
router.post('/upload', uploadController.uploadFile);

module.exports = router;
