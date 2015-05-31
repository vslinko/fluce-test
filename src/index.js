import React from 'react'
import Application from './components/Application'

document.addEventListener('DOMContentLoaded', () => {
  React.render(
    Application(),
    document.getElementById('application')
  )
})
