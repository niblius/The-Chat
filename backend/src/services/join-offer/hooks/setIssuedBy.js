module.exports = () => {
  return (hook) => {
    hook.data.issuedById = hook.params.user.id;
  };
}
