import {CURRENT_USER} from '../constants'

function initial() {
  return null
}

function currentUserReducer(state, currentUser) {
  return currentUser
}

export default {
  initial,
  reducers: {
    [CURRENT_USER]: currentUserReducer
  }
}
