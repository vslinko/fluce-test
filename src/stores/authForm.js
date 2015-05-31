import R from 'ramda'

function initial() {
  return {
    username: '',
    password: '',
    disabled: false,
    error: null,
  }
}

function authFormUsername(state, username) {
  return R.merge(state, {username})
}

function authFormPassword(state, password) {
  return R.merge(state, {password})
}

function authFormDisabled(state, disabled) {
  return R.merge(state, {disabled})
}

function authFormError(state, error) {
  return R.merge(state, {error})
}

export default {
  initial,
  reducers: {
    authFormUsername,
    authFormPassword,
    authFormDisabled,
    authFormError
  }
}
