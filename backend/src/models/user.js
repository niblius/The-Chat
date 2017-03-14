module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3,16],
          msg: "should be from 3 to 16 symbols in length."
        },
        isEmail: true,
        uniqueness: async (value) => {
          if(await User.findOne({ where: {login: value} }))
            throw new Error('should be unique.');
        }
      }
    },
    // TODO make password a virtual field and store encrypted value
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
           args: [8,30],
           msg: "should be from 8 to 30 symbols in length."
        },
        correctPassword: (value) => {
          if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/.test(value))
            throw new Error('should contain at least one lower case '
                           +'letter, one upper case letter, one number.');
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Chat, { through: 'ChatUser' });
        User.hasMany(models.Message);
      }
    }
  });
  return User;
};
