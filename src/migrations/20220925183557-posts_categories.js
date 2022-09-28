'use strict';

module.exports = {
up: async (queryInterface, Sequelize) => {
await queryInterface.createTable('posts_categories', {
  post_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
        model:'blog_posts' 
    },
    onDelete: "CASCADE",
    primaryKey: true
  },
  category_id:{
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
        model:'categories' 
    },
    onDelete: "CASCADE",
    primaryKey: true
  }
});
},

down: async (queryInterface, Sequelize) => {

}
};
