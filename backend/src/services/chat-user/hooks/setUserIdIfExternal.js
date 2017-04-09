function setUserIdIfExternal() {
  return (hook) => {
    if (!hook.params.provider)
      return hook;

    hook.data.UserId = hook.params.user.id;
    return hook;
  };
}

module.exports = setUserIdIfExternal;
