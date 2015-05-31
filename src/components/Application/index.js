import createElement from '../../utilities/createElement'
import fluce from '../../fluce'
import AuthForm from '../AuthForm'
import Layout from '../Layout'
import createSmartComponent from '../../utilities/createSmartComponent'
import createFluceObserver from '../../utilities/createFluceObserver'

function collectState() {
  return {currentUser: fluce.stores.currentUser}
}

function render({currentUser}) {
  return (
    <Layout currentUser={currentUser}>
      <AuthForm />
    </Layout>
  )
}

const component = createSmartComponent('Application', {
  source: createFluceObserver(fluce, ['currentUser'], collectState),
  render
})

export default function Application() : ReactElement {
  return component()
}
