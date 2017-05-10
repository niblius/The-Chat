function cannotSetKey() {
  return (hook) => {
    hook.data.id = null;
  };
}

module.exports = cannotSetKey;
