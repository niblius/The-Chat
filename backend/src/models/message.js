module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    body: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    ChatId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Message.belongsTo(models.User);
        Message.belongsTo(models.Chat);
      }
    }
  });
  return Message;
};
