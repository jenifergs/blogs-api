const categorieService = require('../services/categories.service');

const createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name || name === '') {
        return res.status(400).json({ message: '"name" is required' });
    }
    const category = await categorieService.createCategory(name);
    return res.status(201).json(category);
};

const getAllCategories = async (_req, res) => {
    const categories = await categorieService.getAllCategories();
    return res.status(200).json(categories);
};
module.exports = { createCategory, getAllCategories };