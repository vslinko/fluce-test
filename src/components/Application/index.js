import createElement from '../../utilities/createElement'
import fluce from '../../fluce'
import AuthForm from '../AuthForm'
import Layout from '../Layout'
import createSmartComponent from '../../utilities/createSmartComponent'
import createFluceObserver from '../../utilities/createFluceObserver'

function collectState() {
  return {currentUser: fluce.stores.currentUser}
}

type ApplicationProps = {currentUser: mixed}

export function Application(props: ApplicationProps) : ReactElement {
  const {currentUser} = props

  return (
    <Layout currentUser={currentUser}>
      <AuthForm />
    </Layout>
  )
}

export default createSmartComponent({
  source: createFluceObserver(fluce, ['currentUser'], collectState),
  component: Application
})
