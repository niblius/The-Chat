function setUserId() {
  return (hook) => {
    hook.params.UserId = hook.params.user.id;
  };
}

module.exports = setUserId;
