import R from 'ramda'

export default function createSmartComponent({collectState, subscription, render}) {
  const unsubscribers = {};

  return {
    initialState: collectState,

    afterMount(component, el, setState) {
      const {id} = component

      unsubscribers[id] = subscription(() => {
        setState(collectState())
      })
    },

    beforeUnmount(component, el) {
      const {id} = component

      unsubscribers[id]()
      delete unsubscribers[id]
    },

    render
  }
}
