const User = require('../Models/Usermodel')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');



exports.login = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email })

        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                // Create token
                const token = jwt.sign({ user_id: user._id },process.env.JWT_SECRET, { expiresIn: "1d",})
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