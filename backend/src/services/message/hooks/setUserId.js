function setUserId() {
  return (hook) => {
    if (hook.params.provider)
      hook.data.userId = hook.params.user.id;
  };
}

module.exports = setUserId;
