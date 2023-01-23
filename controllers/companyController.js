const Company = require('../models/companymodel')
const bcrypt = require("bcryptjs");



exports.addCompany = async (req, res) => {
    try {
        const verif = await Company.findOne({ email: req.body.email })
        if (verif) {
            res.status(400).send({ message: 'E-mail already in use.' })

        } else {
            const salt = await bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash;

            await Company.create(req.body)     
            res.send({message: "User created successfully."})

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'error serveur' })
    }
}

exports.getAllCompany = async (req, res, next) => {
    try {
        let company = await Company.find()
        res.send(company);
    } catch (error) {
        res.status(500).json({ message: error.message || 'error serveur' });
        next();
    }
};

exports.getOneCompany = async (req, res, next) => {
    try {
        let company = await Company.findById(req.params.id)
        res.send(company);
    } catch (error) {
        res.status(500).json({ message: error.message || 'error serveur' });
        next();
    }
};

exports.updateCompany = async (req, res, next) => {
    try {
        const verif = await Company.findOne({ email: req.body.email })
        if (verif) {
            res.status(400).send({ message: 'E-mail exists' })
        }
        else {
            if( req.body.password != ""){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }else{
                delete  req.body.password;
            }
            await Company.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.send({ message: 'User has been updated.' })
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'error serveur' });
        next();
    }
};

exports.deleteCompany = async (req, res, next) => {
    try {
        let user = await Company.findByIdAndRemove(req.params.id);
        res.send({message: 'User has been deleted successfully.'});
    } catch (error) {
        res.status(500).json({ message: error.message || 'error serveur' });
        next();
    }
};
