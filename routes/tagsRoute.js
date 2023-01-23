const express = require('express');
const router = express.Router();
const passport = require('passport');
const { addTag, getAllTags, getOneTag, updateTag, deleteTag } = require('../controllers/tagsController');

router.post("/tags"/*, passport.authenticate('bearer', { session: false })*/,addTag);
router.get('/tags', passport.authenticate('bearer', { session: false }), getAllTags);
router.get('/tags/:id', passport.authenticate('bearer', { session: false }),getOneTag);
router.put('/tags/:id', passport.authenticate('bearer', { session: false }),updateTag);
router.delete('/tags/:id', passport.authenticate('bearer', { session: false }),deleteTag);



module.exports = router;