const api = "http://localhost:3001"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

function updateWithData(url, method, body) {
  return fetch(url, {
   method,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => {
    if (res.ok) {
      return res.json()
    }
    throw new Error(`Backend api update failed for url: ${url}`)
  })
}

function getUrlToJson(url) {
  return fetch(url, { headers })
    .then(res => res.json())
}

export function getAllCategories() {
  return getUrlToJson(`${api}/categories`)
}

export function getAllPosts() {
  return getUrlToJson(`${api}/posts`)
}

export function getAllCommentsForPost(id) {
  return getUrlToJson(`${api}/posts/${id}/comments`)
}

export function upVotePost(id) {
  return updateWithData(`${api}/posts/${id}`, 'POST', {option: 'upVote'})
}

export function downVotePost(id) {
  return updateWithData(`${api}/posts/${id}`, 'POST', {option: 'downVote'})
}

/**
 * This will return a promise of an object which has two keys:
 * posts and comments. The value of posts is a map of postId to post.
 * Each post contains a list of all commentIds of all child comments
 * for that post. Similarly comments is a map of commentId to comment.
 */
export function getInitialState() {
  return getAllPosts().then(posts =>
    Promise.all(posts.map(post =>
      getAllCommentsForPost(post.id).then(comments => {
        return { post, comments }
      })
    ))
  ).then(resultList => {
    const result = { posts: {}, comments: {}}
    resultList.forEach (({ post, comments }) => {
      const commentIds = comments.map(comment => comment.id)
      post.comments = commentIds
      result.posts[post.id] = post
      comments.forEach(comment => result.comments[comment.id] = comment)
    })
    return result
  })
}
