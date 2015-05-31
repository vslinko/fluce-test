import React from 'react'

export default function createSmartComponent(displayName, {source, render}) {
  const subscriptions = {}

  function afterMount(component, el, setState) {
    const {id} = component

    subscriptions[id] = source.subscribeOnNext(state => {
      setState(state)
    })
  }

  function beforeUnmount(component, el) {
    const {id} = component

    subscriptions[id].dispose()
    delete subscriptions[id]
  }

  class Component extends React.Component {
    static displayName = displayName
    static id = 0

    constructor(props) {
      super(props)
      this.state = {}
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
