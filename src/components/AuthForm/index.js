import createElement from '../../utilities/createElement'
import fluce from '../../fluce'
import createSmartComponent from '../../utilities/createSmartComponent'
import createFluceObserver from '../../utilities/createFluceObserver'

type FieldProps = {label: string, note: string, children: ReactElement}

function Field(props : FieldProps) : ReactElement {
  const {label, note, children} = props

  return (
    <div>
      <label>
        {label}
        <br />
        {children}
      </label>
      &nbsp;
      {note}
    </div>
  )
}

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

function render({data: {username, password}, valid, disabled, error}) {
  return (
    <form onSubmit={handleSubmit}>
      <Field label="Username" note={username}>
        <input value={username} disabled={disabled} onChange={handleUsernameChange} />
      </Field>
      <Field label="Password" note={password}>
        <input value={password} disabled={disabled} onChange={handlePasswordChange} />
      </Field>
      <div>
        <button disabled={disabled}>Authorize</button>
      </div>
      {error && <div>{error.message}</div>}
    </form>
  )
}

const component = createSmartComponent('AuthForm', {
  source: createFluceObserver(fluce, ['authForm'], collectState),
  render
});

export default function AuthForm() : ReactElement {
  return component()
}
