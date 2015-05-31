import createElement from '../../utilities/createElement'
import fluce from '../../fluce'
import AuthForm from '../AuthForm'
import Layout from '../Layout'
import createSmartComponent from '../../utilities/createSmartComponent'
import createSubscription from '../../utilities/createSubscription'

function collectState() {
  return {currentUser: fluce.stores.currentUser}
}

function render({state: {currentUser}}) {
  return (
    <Layout currentUser={currentUser}>
      <AuthForm />
    </Layout>
  )
}

/* Application() : ReactElement */
export default createSmartComponent('Application', {
  collectState,
  subscription: createSubscription(fluce, ['currentUser']),
  render
})
