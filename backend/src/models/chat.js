module.exports = function(sequelize, DataTypes) {
  var Chat = sequelize.define('Chat', {
    title: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 64],
          msg: "should be from 1 to 64 symbols in length."
        }
      }
    },
    link: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4, 32],
          msg: "should be from 4 to 32 symbols in length or null."
        },
        correctLink: (value) => {
          if (!value.startsWith('@'))
            throw new Error('should start with @ .');
          if (!(/^@[a-z0-9_]+$/i.test(value)))
            throw new Error('only letters, numbers and lower dash are allowed.');
        },
        uniqueness: async (value) => {
          if(await Chat.findOne({ where: {link: value} }))
            throw new Error('should be unique.');
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Chat.belongsToMany(models.User, { through: 'ChatUser' });
        Chat.hasMany(models.Message);
      }
    }
  });
  return Chat;
};
