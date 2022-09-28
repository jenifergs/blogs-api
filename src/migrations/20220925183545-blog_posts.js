'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 await queryInterface.createTable('blog_posts', {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type:Sequelize.INTEGER
  },
  title:{
    type: Sequelize.STRING,
  },
  content:{
    type: Sequelize.STRING,
  },
  user_id:{
    type: Sequelize.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'user_id',
    refereces: {
      model: 'users', 
      key: 'id',
    }
  },
  published: {
    type: Sequelize.DATE,
  },
  updated: {
    type: Sequelize.DATE,
  },
 });
},

  down: async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('blog_posts');
  }
};
