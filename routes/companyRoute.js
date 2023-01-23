const express = require('express'); 
const router = express.Router();
const passport = require('passport');
const upload = require('../middlewares/upload')
const { getAllCompany, getOneCompany, deleteCompany, addCompany, updateCompany } = require('../controllers/companyController');



router.post('/company'/*, [passport.authenticate('bearer', { session: false }), upload.single('picture') ]*/,addCompany);
router.get('/company'/*, passport.authenticate('bearer', { session: false })*/,getAllCompany);
router.get('/company/:id'/*, passport.authenticate('bearer', { session: false })*/,getOneCompany);
router.put('/company/:id'/*, [passport.authenticate('bearer', { session: false }), upload.single('picture')]*/,updateCompany);
router.delete('/company/:id'/*, passport.authenticate('bearer', { session: false })*/,deleteCompany);



module.exports = router;