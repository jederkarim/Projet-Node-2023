const express = require('express');
const router = express.Router();
const authControler = require('../Controllers/authentification');


router.post("/login",authControler.login);

module.exports = router;