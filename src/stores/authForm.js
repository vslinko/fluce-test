import R from 'ramda'

function validate({username, password}) {
  return username.trim().length > 0 && password.trim().length > 0
}

function initial() {
  const data = {
    username: '',
    password: ''
  }

  return {
    data,
    valid: validate(data),
    disabled: false,
    error: null,
  }
}

function mergeData(state, changes) {
  const data = R.merge(state.data, changes)

  return R.merge(state, {
    data,
    valid: validate(data)
  })
}

function authFormUsername(state, username) {
  return mergeData(state, {username})
}

function authFormPassword(state, password) {
  return mergeData(state, {password})
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
