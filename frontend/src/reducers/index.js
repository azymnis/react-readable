import { combineReducers } from 'redux'
import {
  INITIALIZE_STATE,
  UP_VOTE_POST,
  DOWN_VOTE_POST,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  OPEN_NEW_POST,
  OPEN_EDIT_POST,
  CLOSE_POST_FORM,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  CREATE_COMMENT } from '../actions'
import { routerReducer } from 'react-router-redux'


function posts(state = {}, action) {
  const {id, timestamp, title, body, author, category} = action
  switch (action.type) {
    case INITIALIZE_STATE:
      return action.posts
    case CREATE_POST:
      return {
        ...state,
        [id]: {
          id,
          timestamp,
          title,
          body,
          author,
          category,
          deleted: false,
          voteScore: 1,
          comments: []
        }
      }
    case EDIT_POST:
      return {
        ...state,
        [id]: {
          ...state[id],
          title,
          body
        }
      }
    case DELETE_POST:
      return {
        ...state,
        [id]: {
          ...state[id],
          deleted: true
        }
      }
    case UP_VOTE_POST:
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: state[id].voteScore + 1
        }
      }
    case DOWN_VOTE_POST:
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: state[id].voteScore - 1
        }
      }
    case CREATE_COMMENT:
      return {
        ...state,
        [action.parentId]: {
          ...state[action.parentId],
          comments: state[action.parentId].comments.concat([action.id])
        }
      }
    default:
      return state
  }
}

function comments(state = {}, action) {
  const { id, body, timestamp, author, parentId } = action
  switch (action.type) {
    case INITIALIZE_STATE:
      return action.comments
    case UP_VOTE_COMMENT:
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: state[id].voteScore + 1
        }
      }
    case DOWN_VOTE_COMMENT:
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: state[id].voteScore - 1
        }
      }
    case DELETE_COMMENT:
      return {
        ...state,
        [id]: {
          ...state[id],
          deleted: true
        }
      }
    case EDIT_COMMENT:
      return {
        ...state,
        [id]: {
          ...state[id],
          body,
          timestamp
        }
      }
    case DELETE_POST:
      const newState = Object.keys(state)
        .reduce((obj, key) => {
          obj[key] = state[key]
          return obj
        }, {})
      Object.keys(newState).forEach(key => {
        if (newState[key].parentId === id) {
          newState[key].parentDeleted = true
        }
      })
      return newState
    case CREATE_COMMENT:
      return {
        ...state,
        [id]: {
          id,
          timestamp,
          body,
          author,
          parentId,
          voteScore: 1,
          deleted: false
        }
      }
    default:
      return state
  }
}

function postForm(state = {}, action) {
  switch (action.type) {
    case OPEN_NEW_POST:
      return {
        modalOpen: true,
        newPost: true,
      }
    case OPEN_EDIT_POST:
      return {
        modalOpen: true,
        newPost: false,
        postId: action.id
      }
    case CLOSE_POST_FORM:
      return {
        modalOpen: false
      }
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
  categories,
  postForm,
  router: routerReducer
})

