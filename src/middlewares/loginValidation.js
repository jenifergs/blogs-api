const { User } = require('../models');

const validation = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    next();
};

const validationValid = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
       return res.status(400).json({ message: 'Invalid fields' });
    }
    next();
};

module.exports = { validation, validationValid };