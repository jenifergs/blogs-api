const services = require('../services/login.service');

const signIn = async (req, res) => {
    const { email, password } = req.body;
    const token = await services.signIn(email, password);
    return res.status(200).json({ token });
};

const createUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const token = await services.createUser(displayName, email, password, image);
    return res.status(201).json({ token });
};

module.exports = { signIn, createUser };