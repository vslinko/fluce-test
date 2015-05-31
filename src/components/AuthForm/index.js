import R from 'ramda'
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

function collectState() {
  return R.merge(fluce.stores.authForm, {
    onSubmit: handleSubmit,
    onUsernameChange: handleUsernameChange,
    onPasswordChange: handlePasswordChange
  })
}

type AuthFormProps = {
  data: {username: string, password: string},
  valid: boolean,
  disabled: boolean,
  error: ?Error,
  onSubmit: (event: Event) => void,
  onUsernameChange: (event: Event) => void,
  onPasswordChange: (event: Event) => void
}

export function AuthForm(props: AuthFormProps) : ReactElement {
  const {data: {username, password}, valid, disabled, error} = props
  const {onSubmit, onUsernameChange, onPasswordChange} = props

  return (
    <form onSubmit={onSubmit}>
      <Field label="Username" note={username}>
        <input value={username} disabled={disabled} onChange={onUsernameChange} />
      </Field>
      <Field label="Password" note={password}>
        <input value={password} disabled={disabled} onChange={onPasswordChange} />
      </Field>
      <div>
        <button disabled={disabled}>Authorize</button>
      </div>
      {error && <div>{error.message}</div>}
    </form>
  )
}

export default createSmartComponent({
  source: createFluceObserver(fluce, ['authForm'], collectState),
  component: AuthForm
});
