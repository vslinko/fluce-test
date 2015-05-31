import React from 'react'
import R from 'ramda'

export default function createElement(element, props = {}, ...children) {
  if (typeof element === 'function') {
    return element(R.merge(props, {
      children: children.length > 1 ? children : children.shift()
    }))
  } else {
    return React.createElement(element, props, ...children)
  }
}
