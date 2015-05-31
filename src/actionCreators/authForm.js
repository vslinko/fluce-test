function authFormUsername(fluce, username) {
  const {disabled} = fluce.stores.authForm

  if (disabled) return

  fluce.dispatch('authFormUsername', username)
}

function authFormPassword(fluce, username) {
  const {disabled} = fluce.stores.authForm

  if (disabled) return

  fluce.dispatch('authFormPassword', username)
}

function authFormSubmit(fluce) {
  const {valid, disabled, data: {username}} = fluce.stores.authForm

  if (disabled) return

  if (!valid) {
    fluce.dispatch('authFormError', new Error('Form is invalid'))
    return
  }

  fluce.dispatch('authFormDisabled', true)
  fluce.dispatch('authFormError', null)

  setTimeout(() => {
    if (Math.random() > 0.5) {
      fluce.dispatch('authFormError', new Error('Invalid credentials'))
    } else {
      fluce.dispatch('currentUser', {username})
    }

    fluce.dispatch('authFormDisabled', false)
  }, 1000)
}

export default {
  authFormUsername,
  authFormPassword,
  authFormSubmit
}
