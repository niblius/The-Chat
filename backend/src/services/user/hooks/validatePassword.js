function validatePassword() {
  return (hook) => {
    if (hook.data.password && hook.data.password.length < 8) {
      throw new Error(
        "Password should be more or equal than 8 symbols in length.");
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/.test(hook.data.password)) {
      throw new Error(
        'Password should contain at least one lower case '
      + 'letter, one upper case letter and one number.');
    }
  };
}

function validatePasswordIfAny() {
  return (hook) => {
    if(hook.data.password)
      validatePassword()(hook);
  };
}

module.exports = { validatePassword, validatePasswordIfAny }
