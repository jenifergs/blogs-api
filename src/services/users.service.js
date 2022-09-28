const { User } = require('../models');

const getAllUsers = async () => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return users;
};

const getUserById = async (id) => {
    const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
    return user;
};

const deleteUser = async (id) => {
    await User.destroy({ where: { id } });
};

module.exports = { getAllUsers, getUserById, deleteUser };