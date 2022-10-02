const { User } = require('../models');

const validationDisplayName = (req, res, next) => {
    const { displayName } = req.body;

    if (!displayName || displayName.length < 8) {
     return res.status(400)
     .json({ message: '"displayName" length must be at least 8 characters long' });
    }
    next();
};

const validationEmail = (req, res, next) => {
    const { email } = req.body;
    const regex = /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const emailValid = regex.test(email);
    if (!emailValid) {
        return res.status(400)
        .json({ message: '"email" must be a valid email' });
    }
    next();
};

const validationPassword = (req, res, next) => {
    const { password } = req.body;
    if (!password || password.length < 6) {
        return res.status(400)
        .json({ message: '"password" length must be at least 6 characters long' });
    }
    next();
};

const emailExists = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
        return res.status(409)
        .json({ message: 'User already registered' });
    }
    next();
};

module.exports = { validationDisplayName, validationEmail, validationPassword, emailExists };