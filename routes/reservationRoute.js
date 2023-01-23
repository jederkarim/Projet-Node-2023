const express = require('express');
const { addReservation } = require('../controllers/reservationController');
const router = express.Router();

router.post('/reservation',addReservation);


module.exports = router;