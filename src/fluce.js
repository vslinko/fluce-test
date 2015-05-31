import createFluce from 'fluce/create-fluce'
import * as stores from './stores'
import * as actionCreators from './actionCreators'

const fluce = createFluce()

Object.keys(stores).forEach(storeName => {
  const store = stores[storeName]

  fluce.addStore(storeName, store)
})

Object.keys(actionCreators).forEach(actionCreatorsGroupName => {
  const actionCreatorsGroup = actionCreators[actionCreatorsGroupName]

  Object.keys(actionCreatorsGroup).forEach(actionCreatorName => {
    const actionCreator = actionCreatorsGroup[actionCreatorName]

    fluce.addActionCreator(actionCreatorName, fluce => payload => actionCreator(fluce, payload))
  })
})

export default fluce
