module.exports = function(sequelize, DataTypes) {
  var ChatUser = sequelize.define('ChatUser', {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    ChatId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Chat',
        key: 'id'
      }
    },
    role: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        ChatUser.belongsTo(models.Chat);
        ChatUser.belongsTo(models.User);
      }
    }
  });
  return ChatUser;
};
