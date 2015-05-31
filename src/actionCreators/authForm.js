import {
  AUTH_FORM_USERNAME,
  AUTH_FORM_PASSWORD,
  AUTH_FORM_DISABLED,
  AUTH_FORM_ERROR,
  CURRENT_USER
} from '../constants'
import authorize from '../api/authorize'

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
  const {valid, disabled, data: {username, password}} = fluce.stores.authForm

  if (disabled) return

  if (!valid) {
    fluce.dispatch(AUTH_FORM_ERROR, new Error('Form is invalid'))
    return
  }

  fluce.dispatch(AUTH_FORM_DISABLED, true)
  fluce.dispatch(AUTH_FORM_ERROR, null)

  authorize({username, password})
    .then(
      user => {
        fluce.dispatch(CURRENT_USER, user)
      },
      error => {
        fluce.dispatch(AUTH_FORM_ERROR, error)
      }
    )
    .then(
      () => {
        fluce.dispatch(AUTH_FORM_DISABLED, false)
      }
    );
}

export default {
  authFormUsername,
  authFormPassword,
  authFormSubmit
}
