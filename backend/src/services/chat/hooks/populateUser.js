function populateUser() => {
  return (hook) => {
    hook.params.sequelize = {
      include: [{ all: true }]
    }
  };
}

module.exports = populateUser;
