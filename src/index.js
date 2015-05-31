import {element, tree, render} from 'deku'
import fluce from './fluce'
import Application from './components/Application'

document.addEventListener('DOMContentLoaded', () => {
  render(
    tree(Application()),
    document.getElementById('application')
  )
})
