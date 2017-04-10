const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);

module.exports = function() {
  const app = this;
  const config = app.get('db-settings');
  let db = {};

  const sequelize = new Sequelize(config.database, config.username,
    config.password, config);

  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
      const model = sequelize['import'](path.join(__dirname, file));
      let name = model.name;
      name = name.charAt(0).toUpperCase() + name.slice(1);
      db[name] = model;
    });

  Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  app.db = db;
}
