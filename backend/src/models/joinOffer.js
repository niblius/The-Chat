module.exports = function(sequelize, DataTypes) {
  var JoinOffer = sequelize.define('joinOffer', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    chatId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Chat',
        key: 'id'
      }
    },
    issuedById: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        JoinOffer.belongsTo(models.Chat);
        JoinOffer.belongsTo(models.User);
        JoinOffer.belongsTo(models.User, {
          as: 'issuedBy',
          foreignKey: 'issuedById'
        });
      }
    }
  });
  return JoinOffer;
};
