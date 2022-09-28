const jwt = require('jsonwebtoken');
const { User } = require('../models');

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

const signIn = async (email, userPassword) => {
    const { password, ...payload } = await User
    .findOne({ where: { email, password: userPassword } });
    const token = jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);
    return token;
};

const createUser = async (displayName, email, userPassword, image) => {
    const { password, ...payload } = await User
    .create({ displayName, email, password: userPassword, image });
    const token = jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);
    return token;
};

module.exports = { signIn, createUser };