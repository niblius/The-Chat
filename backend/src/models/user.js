module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        uniqueness: async (value) => {
          if(await User.findOne({ where: {email: value} }))
            throw new Error('should be unique.');
        }
      }
    },
    password: { type: DataTypes.STRING }
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Chat, { through: 'chatUser' });
        User.hasMany(models.Message);
        User.hasMany(models.ChatUser)
      }
    }
  });
  return User;
};
