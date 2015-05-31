import React from 'react'
import createElement from './utilities/createElement'
import Application from './components/Application'

document.addEventListener('DOMContentLoaded', () => {
  React.render(
    <Application />,
    document.getElementById('application')
  )
})
