const express = require('express');
const userController = require('../controller/users.controller');
const controller = require('../controller/login.controller');
const { validationDisplayName, validationPassword,
    validationEmail, emailExists } = require('../middlewares/userValidation');
const { validationToken } = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', validationDisplayName, validationEmail,
emailExists, validationPassword, controller.createUser);
router.get('/', validationToken, userController.getAllUsers);
router.get('/:id', validationToken, userController.getUserById);
router.delete('/me', validationToken, userController.deleteUser);

module.exports = router;