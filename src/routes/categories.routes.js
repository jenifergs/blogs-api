const express = require('express');
const categoriesController = require('../controller/categories.controller');
const { validationToken } = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', validationToken, categoriesController.createCategory);
router.get('/', validationToken, categoriesController.getAllCategories);

module.exports = router;