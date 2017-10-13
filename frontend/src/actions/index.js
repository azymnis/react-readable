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
export const CREATE_POST     = "CREATE_POST"
export const DELETE_POST     = "DELETE_POST"
export const EDIT_POST       = "EDIT_POST"
export const UP_VOTE_POST    = "UP_VOTE_POST"
export const DOWN_VOTE_POST  = "DOWN_VOTE_POST"
export const OPEN_NEW_POST   = "OPEN_NEW_POST"
export const OPEN_EDIT_POST  = "OPEN_EDIT_POST"
export const CLOSE_POST_FORM = "CLOSE_POST_FORM"

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
    return BackendAPI.deletePost(id).then(() =>
      dispatch({
        type: DELETE_POST,
        id
      })
    )
  }
}

export function editPost({id, title, body}) {
  return dispatch => {
    return BackendAPI.updatePost({id, title, body}).then(() =>
      dispatch({
        type: EDIT_POST,
        id,
        title,
        body
      })
    )
  }
}

export function upVotePost(id) {
  return dispatch => {
    return BackendAPI.upVotePost(id).then(() =>
      dispatch({
        type: UP_VOTE_POST,
        id
      })
    )
  }
}

export function downVotePost(id) {
  return dispatch => {
    return BackendAPI.downVotePost(id).then(() =>
      dispatch({
        type: DOWN_VOTE_POST,
        id
      })
    )
  }
}

export function openNewPost() {
  return {
    type: OPEN_NEW_POST
  }
}

export function closePostForm() {
  return {
    type: CLOSE_POST_FORM
  }
}

export function openEditPost(id) {
  return {
    type: OPEN_EDIT_POST,
    id
  }
}

// Comment actions
export const CREATE_COMMENT    = "CREATE_COMMENT"
export const DELETE_COMMENT    = "DELETE_COMMENT"
export const EDIT_COMMENT      = "EDIT_COMMENT"
export const UP_VOTE_COMMENT   = "UP_VOTE_COMMENT"
export const DOWN_VOTE_COMMENT = "DOWN_VOTE_COMMENT"

export function createComment({body, author, parentId}) {
  return dispatch => {
    const id = uuidv4()
    const timestamp = Date.now()
    const comment = {id, timestamp, body, author, parentId }
    return BackendAPI.createComment(comment).then(() =>
      dispatch({
        type: CREATE_COMMENT,
        ...comment
      })
    )
  }
}

export function deleteComment(id) {
  return dispatch => {
    return BackendAPI.deleteComment(id).then(() =>
      dispatch({
        type: DELETE_COMMENT,
        id
      })
    )
  }
}

export function editComment({id, body}) {
  return dispatch => {
    const timestamp = Date.now()
    return BackendAPI.updateComment({id, body, timestamp}).then(() =>
      dispatch({
        type: EDIT_COMMENT,
        id,
        body,
        timestamp
      })
    )
  }
}

export function upVoteComment(id) {
  return dispatch => {
    return BackendAPI.upVoteComment(id).then(() =>
      dispatch({
        type: UP_VOTE_COMMENT,
        id
      })
    )
  }
}

export function downVoteComment(id) {
  return dispatch => {
    return BackendAPI.downVoteComment(id).then(() =>
      dispatch({
        type: DOWN_VOTE_COMMENT,
        id
      })
    )
  }
}
