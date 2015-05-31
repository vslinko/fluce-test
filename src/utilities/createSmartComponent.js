import React from 'react'
import R from 'ramda'

export default function createSmartComponent({source, component, displayName}) {
  class Component extends React.Component {
    static displayName = component.name || component.displayName || displayName

    constructor(props) {
      super(props)
      this.state = {}
    }

    componentWillMount() {
      this.subscription = source.subscribeOnNext(state => {
        this.setState(state)
      })
    }

    componentWillUnmount() {
      this.subscription.dispose()
    }

    render() {
      return component(R.merge(this.props, this.state))
    }
  }

  return function(props = null) {
    return React.createElement(Component, props)
  }
}
