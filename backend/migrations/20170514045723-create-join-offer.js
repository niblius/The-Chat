module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('joinOffer', {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      chatId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      issuedById: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('joinOffer');
  }
};
