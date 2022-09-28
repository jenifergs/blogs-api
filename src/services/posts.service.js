const { Op } = require('sequelize');
const { BlogPost } = require('../models');
const { Category } = require('../models');
const { PostCategory } = require('../models');
const { User } = require('../models');

const newPost = async (title, content, categoryIds, userId) => {
console.log(userId);
const post = await BlogPost.create({ title, content, userId });
await Promise.all(categoryIds.map(async (categoryI) => {
const category = await Category.findByPk(categoryI);
if (!category) {
throw new Error('"categoryIds" not found');
}
await PostCategory.create({ postId: post.id, categoryId: category.id });
return category;
}));
return post;
};

const getAllPosts = async () => {
const post = await BlogPost.findAll({
include: [
  { model: User,
    as: 'user', 
    attributes: { exclude: ['password'] },
  },
  {
    model: Category,
    as: 'categories',
    through: { attributes: [] },
  },
],

});
return post;
};

const getPostById = async (id) => {
const post = await BlogPost.findByPk(id, {
include: [
  { model: User,
    as: 'user', 
    attributes: { exclude: ['password'] },
  },
  {
    model: Category,
    as: 'categories',
    through: { attributes: [] },
  },
],
});
return post;
};

const updatePost = async (postId, title, content, userId) => {
  const post = await BlogPost.findByPk(postId, {
    include: [
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
    if (post && post.userId !== userId) {
      throw new Error('Unauthorized user');
    }
await post.update({ title, content });
return post;
};

const deletePost = async (postId, userId) => {
  const post = await BlogPost.findByPk(postId);
  if (!post) {
    return {
      code: 404,
      message: 'Post does not exist',
    };
  }
  if (post && post.userId !== userId) {
    return {
      code: 401,
      message: 'Unauthorized user',
    };
  }
  await post.destroy();
  return { code: 204 };
};

const include = [
  { model: User,
    as: 'user', 
    attributes: { exclude: ['password'] },
  },
  {
    model: Category,
    as: 'categories',
    through: { attributes: [] },
  },
];

const searchPost = async (q) => {
  const posts = await BlogPost.findAll({
    where: { title: { [Op.like]: `%${q}%` } },
    include,
  });

  const posts2 = await BlogPost.findAll({
    where: { content: { [Op.like]: `%${q}%` } },
    include,
  });
  
  return [...posts, ...posts2];
};

module.exports = { newPost, getAllPosts, getPostById, updatePost, deletePost, searchPost };