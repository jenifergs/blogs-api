const express = require('express');
const postController = require('../controller/posts.controller');
const { validationToken } = require('../middlewares/tokenValidation');
const { postsValidation } = require('../middlewares/postsValidation');

const router = express.Router();
router.post('/', postsValidation, validationToken, postController.createPost);

router.get('/', validationToken, postController.getAllPosts);

router.get('/search', validationToken, postController.searchPost);

router.get('/:id', validationToken, postController.getPostById);

router.put('/:id', validationToken, postController.updatePost);

router.delete('/:id', validationToken, postController.deletePost);

module.exports = router;