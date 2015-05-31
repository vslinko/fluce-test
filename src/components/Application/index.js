import createElement from '../../utilities/createElement'
import fluce from '../../fluce'
import AuthForm from '../AuthForm'
import Layout from '../Layout'
import createSmartComponent from '../../utilities/createSmartComponent'
import createFluceObserver from '../../utilities/createFluceObserver'

function collectState() {
  return {currentUser: fluce.stores.currentUser}
}

export function DumbApplication({currentUser}) {
  return (
    <Layout currentUser={currentUser}>
      <AuthForm />
    </Layout>
  )
}

const component = createSmartComponent({
  source: createFluceObserver(fluce, ['currentUser'], collectState),
  component: function SmartApplication(props) {
    return <DumbApplication {...props} />
  }
})

export default function Application() : ReactElement {
  return component()
}
