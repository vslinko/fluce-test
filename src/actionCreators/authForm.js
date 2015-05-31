import {
  AUTH_FORM_USERNAME,
  AUTH_FORM_PASSWORD,
  AUTH_FORM_DISABLED,
  AUTH_FORM_ERROR,
  CURRENT_USER
} from '../constants'

function authFormUsername(fluce, username) {
  const {disabled} = fluce.stores.authForm

  if (disabled) return

  fluce.dispatch(AUTH_FORM_USERNAME, username)
}

function authFormPassword(fluce, username) {
  const {disabled} = fluce.stores.authForm

  if (disabled) return

  fluce.dispatch(AUTH_FORM_PASSWORD, username)
}

function authFormSubmit(fluce) {
  const {valid, disabled, data: {username}} = fluce.stores.authForm

  if (disabled) return

  if (!valid) {
    fluce.dispatch(AUTH_FORM_ERROR, new Error('Form is invalid'))
    return
  }

  fluce.dispatch(AUTH_FORM_DISABLED, true)
  fluce.dispatch(AUTH_FORM_ERROR, null)

  setTimeout(() => {
    if (Math.random() > 0.5) {
      fluce.dispatch(AUTH_FORM_ERROR, new Error('Invalid credentials'))
    } else {
      fluce.dispatch(CURRENT_USER, {username})
    }

    fluce.dispatch(AUTH_FORM_DISABLED, false)
  }, 1000)
}

export default {
  authFormUsername,
  authFormPassword,
  authFormSubmit
}
