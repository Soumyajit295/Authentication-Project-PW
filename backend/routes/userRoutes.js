const express = require('express');
const { home, signup, signin, getUser, logOut } = require('../controllers/userControllers');
const jwtAuth = require('../middleware/auth');

const router = express.Router();

// Ensure you pass functions directly, not as objects
router.get('/', home);
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/getuser', jwtAuth, getUser);  // jwtAuth is middleware, getUser is a handler
router.get('/signout', jwtAuth, logOut);  // jwtAuth is middleware, logOut is a handler

module.exports = router;
