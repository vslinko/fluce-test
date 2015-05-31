import {element} from 'deku'
import fluce from '../../fluce'

function collectState() {
  return fluce.stores.authForm
}

function afterMount(component, el, setState) {
  fluce.subscribe(['authForm'], () => {
    setState(collectState())
  })
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
          <input value={username} disabled={disabled} onKeyUp={handleUsernameChange} />
        </label>
        {username}
      </div>
      <div>
        <label>
          Password:
          <br />
          <input value={password} disabled={disabled} onKeyUp={handlePasswordChange} />
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

export default {
  initialState: collectState,
  afterMount,
  render
}
