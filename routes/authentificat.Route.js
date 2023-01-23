const express = require('express');
const { login, register } = require('../controllers/authentification');
const router = express.Router();


router.post("/login",login);
router.post("/register",register);
// router.post('/forgotpassword',forgotPassword);
// router.post('/resetpassword',resetPassword);


module.exports = router;



