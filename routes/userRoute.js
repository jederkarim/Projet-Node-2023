const express = require('express'); 
const router = express.Router();
const passport = require('passport');
const { addUser, getAllUsers, getOneUser, updateUser, deleteUser } = require('../controllers/userController');



router.post("/users"/*, passport.authenticate('bearer', { session: false })*/,addUser);
router.get('/users'/*, passport.authenticate('bearer', { session: false })*/,getAllUsers);
router.get('/users/:id'/*, passport.authenticate('bearer', { session: false })*/,getOneUser);
router.put('/users/:id'/*, passport.authenticate('bearer', { session: false })*/,updateUser);
router.delete('/users/:id'/*, passport.authenticate('bearer', { session: false })*/,deleteUser);



module.exports = router;