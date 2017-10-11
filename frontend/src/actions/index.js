import * as BackendAPI from '../utils/api.js'
import uuidv4 from 'uuid/v4'

// Global actions
export const INITIALIZE_STATE = "INITIALIZE_STATE"

export function initializeState({categories, posts, comments}) {
  return {
    type: INITIALIZE_STATE,
    posts,
    comments,
    categories
  }
}

export function fetchInitialState() {
  return dispatch => {
    BackendAPI.getInitialState().then(data =>
      dispatch(initializeState(data))
    )
  }
}

// Post actions
export const CREATE_POST    = "CREATE_POST"
export const DELETE_POST    = "DELETE_POST"
export const EDIT_POST      = "EDIT_POST"
export const UP_VOTE_POST   = "UP_VOTE_POST"
export const DOWN_VOTE_POST = "DOWN_VOTE_POST"

export function createPost({title, body, author, category}) {
  return dispatch => {
    const id = uuidv4()
    const timestamp = Date.now()
    const post = {id, timestamp, title, body, author, category}
    return BackendAPI.createPost(post).then(() =>
      dispatch({
        type: CREATE_POST,
        ...post
      })
    )
  }
}

export function deletePost(id) {
  return dispatch => {
    BackendAPI.deletePost(id).then(() =>
      dispatch({
        type: DELETE_POST,
        id
      })
    )
  }
}

export function editPost({id, title, body}) {
  return {
    type: EDIT_POST,
    id,
    title,
    body
  }
}

export function upVotePost(id) {
  return dispatch => {
    BackendAPI.upVotePost(id).then(() =>
      dispatch({
        type: UP_VOTE_POST,
        id
      })
    )
  }
}

export function downVotePost(id) {
  return dispatch => {
    BackendAPI.downVotePost(id).then(() =>
      dispatch({
        type: DOWN_VOTE_POST,
        id
      })
    )
  }
}

// Comment actions
export const CREATE_COMMENT    = "CREATE_COMMENT"
export const DELETE_COMMENT    = "DELETE_COMMENT"
export const EDIT_COMMENT      = "EDIT_COMMENT"
export const UP_VOTE_COMMENT   = "UP_VOTE_COMMENT"
export const DOWN_VOTE_COMMENT = "DOWN_VOTE_COMMENT"

export function createComment({id, timestamp, body, author, parentId}) {
  return {
    type: CREATE_COMMENT,
    id,
    timestamp,
    body,
    author,
    parentId
  }
}

export function deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    id
  }
}

export function editComment({id, title, body}) {
  return {
    type: EDIT_COMMENT,
    id,
    title,
    body
  }
}

export function upVoteComment(id) {
  return {
    type: UP_VOTE_COMMENT,
    id
  }
}

export function downVoteComment(id) {
  return {
    type: DOWN_VOTE_COMMENT,
    id
  }
}
