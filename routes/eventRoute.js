const express = require('express');
const router = express.Router();
const passport = require('passport');
const { addEvent, getAllEvents, getOneEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const upload = require('../middlewares/upload')



router.post('/events', /*[passport.authenticate('bearer', { session: false }), upload.single('picture') ],*/addEvent);
router.get('/events',/* passport.authenticate('bearer', { session: false }),*/getAllEvents);
router.get('/events/:id',/* passport.authenticate('bearer', { session: false }),*/getOneEvent);
router.put('/events/:id',/* [passport.authenticate('bearer', { session: false }), upload.single('picture')],*/updateEvent);
router.delete('/events/:id',/* passport.authenticate('bearer', { session: false }),*/deleteEvent);



module.exports = router;