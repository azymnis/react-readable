import { combineReducers } from 'redux'
import { INITIALIZE_STATE } from '../actions'

function posts(state = {}, action) {
  switch (action.type) {
    case INITIALIZE_STATE:
      return action.posts
    default:
      return state
  }
}

function comments(state = {}, action) {
  switch (action.type) {
    case INITIALIZE_STATE:
      return action.comments
    default:
      return state
  }
}

export default combineReducers({
  posts,
  comments,
})

