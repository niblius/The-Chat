'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'users',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );

    queryInterface.changeColumn(
      'users',
      'password',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );
  },

  down: function (queryInterface, Sequelize) {

  }
};
