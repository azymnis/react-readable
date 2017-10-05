// Global actions
export const INITIALIZE_STATE = "INITIALIZE_STATE"

export function initializeState({categories, posts, comments}) {
  return {
    type: INITIALIZE_STATE,
    categories,
    posts,
    comments
  }
}

// Post actions
export const CREATE_POST    = "CREATE_POST"
export const DELETE_POST    = "DELETE_POST"
export const EDIT_POST      = "EDIT_POST"
export const UP_VOTE_POST   = "UP_VOTE_POST"
export const DOWN_VOTE_POST = "DOWN_VOTE_POST"

export function createPost({id, timestamp, title, body, author, category}) {
  return {
    type: CREATE_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category
  }
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id
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
  return {
    type: UP_VOTE_POST,
    id
  }
}

export function downVotePost(id) {
  return {
    type: DOWN_VOTE_POST,
    id
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
