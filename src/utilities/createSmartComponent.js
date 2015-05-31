import React from 'react'

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

  class Component extends React.Component {
    static id = 0

    constructor(props) {
      super(props)
      this.state = collectState()
    }

    componentWillMount() {
      this.id = Component.id++
      afterMount({id: this.id}, null, ::this.setState)
    }

    componentWillUnmount() {
      beforeUnmount({id: this.id}, null)
    }

    render() {
      return render({state: this.state, props: this.props, id: this.id}, ::this.setState)
    }
  }

  return function(props) {
    return React.createElement(Component, props)
  }
}
