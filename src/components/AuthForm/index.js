import React from 'react'
import fluce from '../../fluce'
import createSmartComponent from '../../utilities/createSmartComponent'
import createSubscription from '../../utilities/createSubscription'

function collectState() {
  return fluce.stores.authForm
}

function handleUsernameChange(event) {
  fluce.actions.authFormUsername(event.target.value)
}

function handlePasswordChange(event) {
  fluce.actions.authFormPassword(event.target.value)
}

function handleSubmit(event) {
  event.preventDefault()
  fluce.actions.authFormSubmit()
}

function render({state: {username, password, disabled, error}}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <br />
          <input value={username} disabled={disabled} onChange={handleUsernameChange} />
        </label>
        {username}
      </div>
      <div>
        <label>
          Password:
          <br />
          <input value={password} disabled={disabled} onChange={handlePasswordChange} />
        </label>
        {password}
      </div>
      <div>
        <button disabled={disabled}>Authorize</button>
      </div>
      {error && <div>{error.message}</div>}
    </form>
  )
}

export default createSmartComponent({
  collectState,
  subscription: createSubscription(fluce, ['authForm']),
  render
});
