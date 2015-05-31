import {element} from 'deku'

export default function createSmartComponent({collectState, subscription, render}) {
  const unsubscribers = {}

  function afterMount(component, el, setState) {
    const {id} = component

    unsubscribers[id] = subscription(() => {
      setState(collectState())
    })
  }

  function beforeUnmount(component, el) {
    const {id} = component

    unsubscribers[id]()
    delete unsubscribers[id]
  }

  return function(props) {
    return element({
      initialState: collectState,
      afterMount,
      beforeUnmount,
      render
    }, props)
  }
}
