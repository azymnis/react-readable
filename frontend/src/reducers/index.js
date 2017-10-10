import { combineReducers } from 'redux'
import { INITIALIZE_STATE, UP_VOTE_POST, DOWN_VOTE_POST } from '../actions'

function posts(state = {}, action) {
  switch (action.type) {
    case INITIALIZE_STATE:
      return action.posts
    case UP_VOTE_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: state[action.id].voteScore + 1
        }
      }
    case DOWN_VOTE_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: state[action.id].voteScore - 1
        }
      }
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

function categories(state = [], action) {
  switch (action.type) {
    case INITIALIZE_STATE:
      return action.categories
    default:
      return state
  }
}

export default combineReducers({
  posts,
  comments,
  categories
})

