import React from 'react'

export default function createSmartComponent(displayName, {source, render}) {
  class Component extends React.Component {
    static displayName = displayName

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
      return render(this.state, this.props)
    }
  }

  return function(props = null) {
    return React.createElement(Component, props)
  }
}
