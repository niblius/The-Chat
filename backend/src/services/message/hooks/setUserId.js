function setUserId() {
  return (hook) => {
    if (hook.params.provider)
      hook.params.userId = hook.params.user.id;
  };
}

module.exports = setUserId;
