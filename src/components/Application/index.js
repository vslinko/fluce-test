import {element} from 'deku'
import fluce from '../../fluce'
import AuthForm from '../AuthForm'

function collectState() {
  return {currentUser: fluce.stores.currentUser}
}

function afterMount(component, el, setState) {
  fluce.subscribe(['currentUser'], () => {
    setState(collectState())
  })
}

function render({state: {currentUser}}) {
  return (
    <div>
      <AuthForm />
      {currentUser && <div>Welcome, {currentUser.username}!</div>}
    </div>
  )
}

export default {
  initialState: collectState,
  afterMount,
  render
}
