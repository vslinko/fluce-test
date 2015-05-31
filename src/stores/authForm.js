import R from 'ramda'
import {
  AUTH_FORM_USERNAME,
  AUTH_FORM_PASSWORD,
  AUTH_FORM_DISABLED,
  AUTH_FORM_ERROR
} from '../constants'

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

function usernameReducer(state, username) {
  return mergeData(state, {username})
}

function passwordReducer(state, password) {
  return mergeData(state, {password})
}

function disabledReducer(state, disabled) {
  return R.merge(state, {disabled})
}

function errorReducer(state, error) {
  return R.merge(state, {error})
}

export default {
  initial,
  reducers: {
    [AUTH_FORM_USERNAME]: usernameReducer,
    [AUTH_FORM_PASSWORD]: passwordReducer,
    [AUTH_FORM_DISABLED]: disabledReducer,
    [AUTH_FORM_ERROR]: errorReducer
  }
}
