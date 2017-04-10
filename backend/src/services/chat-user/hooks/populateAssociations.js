const commonHooks = require('feathers-hooks-common');

module.exports = () => {
  return (hook) => {
    if (hook.type === 'before') {
      const db = hook.app.db;
      hook.params.sequelize = {
        include: [
          {
            model: db.Chat,
            include: [
              { model: db.Message },
              { model: db.User }
            ]
          }
        ]
      };
      return hook;
    } else {
      return commonHooks.populate({ schema })(hook) // TODO inefficient, use sequelize call
    }
  };
}

const schema = {
  include: [
    {
      service: 'chats',
      parentField: 'chatId',
      childField: 'id',
      nameAs: 'chat',
      include: [
        {
          service: 'messages',
          nameAs: 'messages',
          parentField: 'id',
          childField: 'chatId',
          asArray: true
        },
        {
          service: 'chat-users',
          nameAs: 'chatUsers',
          parentField: 'id',
          childField: 'chatId',
          asArray: true,
          include: [{
            service: 'users',
            nameAs: 'user',
            parentField: 'userId',
            childField: 'id'
          }]
        }
      ]
    },
  ]
};
