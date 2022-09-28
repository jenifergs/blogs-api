const postCategoryModel = (sequelize, DataTypes) => {
const PostCategory = sequelize.define('PostCategory', {
  postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  },
  categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  },
}, {
  tableName: 'posts_categories',
  underscored: true,
  timestamps: false,
});
PostCategory.associate = (models) => {
  models.BlogPost.belongsToMany(models.Category, {
    through: PostCategory,
    foreignKey: 'post_id',
    as: 'categories',
  });

  models.Category.belongsToMany(models.BlogPost, {
    through: PostCategory,
    foreignKey: 'category_id',
    as: 'blogPosts',
  });
}
return PostCategory;
};

module.exports = postCategoryModel;