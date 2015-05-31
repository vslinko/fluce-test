function authFormUsername(fluce, username) {
  if (fluce.stores.authForm.disabled) return

  fluce.dispatch('authFormUsername', username)
}

function authFormPassword(fluce, username) {
  if (fluce.stores.authForm.disabled) return

  fluce.dispatch('authFormPassword', username)
}

function authFormSubmit(fluce) {
  if (!fluce.stores.authForm.valid) {
    fluce.dispatch('authFormError', new Error('Form is invalid'))
    return
  }

  if (fluce.stores.authForm.disabled) return

  fluce.dispatch('authFormDisabled', true)
  fluce.dispatch('authFormError', null)

  setTimeout(() => {
    if (Math.random() > 0.5) {
      fluce.dispatch('authFormError', new Error('Invalid credentials'))
    } else {
      fluce.dispatch('currentUser', {username: fluce.stores.authForm.data.username})
    }

    fluce.dispatch('authFormDisabled', false)
  }, 1000)
}

export default {
  authFormUsername,
  authFormPassword,
  authFormSubmit
}
