const services = require('../services/users.service');

const getAllUsers = async (_req, res) => {
    const users = await services.getAllUsers();
    return res.status(200).json(users);
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await services.getUserById(id);
    if (!user) { 
      return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id: userID } = req.user.dataValues;
  await services.deleteUser(userID);
    return res.status(204).end();
};

module.exports = { getAllUsers, getUserById, deleteUser };