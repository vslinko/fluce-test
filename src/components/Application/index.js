import {element} from 'deku'
import fluce from '../../fluce'
import AuthForm from '../AuthForm'
import createSmartComponent from '../../utilities/createSmartComponent'
import createSubscription from '../../utilities/createSubscription'

function collectState() {
  return {currentUser: fluce.stores.currentUser}
}

function render({state: {currentUser}}) {
  return (
    <div>
      <AuthForm />
      {currentUser && <div>Welcome, {currentUser.username}!</div>}
    </div>
  )
}

export default createSmartComponent({
  collectState,
  subscription: createSubscription(fluce, ['currentUser']),
  render
})
