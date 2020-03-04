const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const User = require('../models/user');

exports.signup = async (req, res) => {
    const { email } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
        return res.status(403).json({ error: 'invalid credentials' });
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ message: 'signup success, please login' });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: 'invalid credentials'
            });
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'invalid credentials'
            });
        }
        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET
        );
        res.cookie('t', token, { expire: new Date() + 9999 });
        const { _id, name, email } = user;
        return res.json({ token, user: { _id, email, name } });
    });
};

exports.signout = (req, res) => {
    res.clearCookie('t');
    return res.json({ message: 'signout success' });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});
