const Company = require('../models/companymodel')
const Token = require('../Models/token');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring')
const bcrypt = require('bcryptjs');


exports.login = async (req, res, next) => {
    try {
        let company = await Company.findOne({ email: req.body.email })

        if (company) {
            const validPassword = await bcrypt.compare(req.body.password, company.password);
            if (validPassword) {
                const token = jwt.sign({ company_id: company._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
                res.status(200).json({ message: "Login sucessfully.", token: token });
            } else {
                res.status(400).json({ message: "E-mail or password is invalid." });
            }
        } else {
            res.status(400).json({ message: "E-mail or password is invalid." });

        }
    }
    catch (error) {
        console.log(error);
        next();
    }
}

exports.register = async (req, res, next) => {

    try {
        const verif = await Company.findOne({ email: req.body.email })
        if (verif) {
            res.status(400).send({ message: 'E-mail already in use.' })

        } else {
            const salt = await bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash;

            await Company.create(req.body)
            res.send({ message: "User created successfully." })

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'error serveur' })
    }
}




exports.forgotPassword = async (req, res) => {
    const company = await Company.findOne({ email: req.body.email });

    if (!company) {
        res.status(400).json({ message: "Company does not exist" });
    }
    else {

        const token = await Token.findOne({ companyId: company._id });
        if (token) {
            await token.deleteOne()
        };

        const resetToken = randomString.generate(30)
        const createdToken = await new Token({
            companyId: company._id,
            token: resetToken,
        }).save();
        //send mail
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });   
        const templatePath = path.resolve('./src/templates', 'resetPassword.html');
        const registerTemplate = fs.readFileSync(templatePath, { encoding: 'utf-8' })
        const render = ejs.render(registerTemplate, { name: company.companyName, link: `${process.env.PORT}/reset-password/${createdToken.token}` })
        const info = await transporter.sendMail({
            from: process.env.USER, // sender address
            to: `${company.email}`,
            subject: "Password reset",
            html: render
        });

        res.json({ message: 'Check your mailbox' })
    }
}

exports.resetPassword = async (req, res) => {
    let passwordResetToken = await Token.findOne({ token: req.body.token });
    if (!passwordResetToken) {
        res.status(400).json({ message: "Invalid or expired password reset link" });
    } else {
        const currentDate = new Date();
        const expireTime = new Date(passwordResetToken.createdAt)
        const diff = currentDate - expireTime
        const seconds = Math.floor(diff / 1000);
        if (seconds < 900) {
            const bcryptSalt = process.env.BCRYPT;
            const hash = await bcrypt.hash(req.body.password, Number(bcryptSalt));
            await User.updateOne(
                { _id: passwordResetToken.userId },
                { $set: { password: hash } },
                { new: true }
            );
            await passwordResetToken.deleteOne();
            res.status(200).json({ message: 'Successfully reseted' })
        } else {
            await passwordResetToken.deleteOne();
            res.status(401).json({ message: 'Invalid or expired password reset link' })
        }
    }
}

