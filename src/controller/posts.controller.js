const services = require('../services/posts.service');

const createPost = async (req, res) => {
const { title, content, categoryIds } = req.body;
const { id } = req.user.dataValues;

try {
    const post = await services.newPost(title, content, categoryIds, id);
return res.status(201).json(post);
} catch (error) {
    return res.status(400).json({ message: error.message });
}
};

const getAllPosts = async (_req, res) => {
const posts = await services.getAllPosts();
return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
const { id } = req.params;
const post = await services.getPostById(id);
if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
}
return res.status(200).json(post);
};

const updatePost = async (req, res) => {
const { id: postID } = req.params;
const { id: userID } = req.user.dataValues;

const { title, content } = req.body;
if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
}
try {
  const post = await services.updatePost(postID, title, content, userID);
  return res.status(200).json(post);
} catch (error) {
  return res.status(401).json({ message: error.message });
}
};

const deletePost = async (req, res) => {
const { id: postID } = req.params;
const { id: userID } = req.user.dataValues;
const postDelet = await services.deletePost(postID, userID);

if (postDelet.code === 404) {
  return res.status(postDelet.code).json({ message: postDelet.message });
}
if (postDelet.code === 401) {
  return res.status(postDelet.code).json({ message: postDelet.message });
}
return res.status(postDelet.code).end();
};

const searchPost = async (req, res) => {
const { q } = req.query;
const posts = await services.searchPost(q);
return res.status(200).json(posts);
};
module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost, searchPost };