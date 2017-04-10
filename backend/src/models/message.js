module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('message', {
    body: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    chatId: DataTypes.INTEGER
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
