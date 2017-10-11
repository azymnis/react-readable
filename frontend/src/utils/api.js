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
  return getUrlToJson(`${api}/categories`).then(res => res.categories)
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

export function createPost(post) {
  return updateWithData(`${api}/posts`, 'POST', post)
}

export function deletePost(id) {
  return updateWithData(`${api}/posts/${id}`, 'DELETE', {})
}

/**
 * This will return a promise of an object which has three keys:
 * posts, comments and categories. The value of posts is a map of postId to post.
 * Each post contains a list of all commentIds of all child comments
 * for that post. Similarly comments is a map of commentId to comment.
 * Categories is just a list of category objects.
 */
export function getInitialState() {
  return Promise.all([getAllPosts().then(posts =>
    Promise.all(posts.map(post =>
      getAllCommentsForPost(post.id).then(comments => {
        return { post, comments }
      })
    ))
  ), getAllCategories()]).then(resultsAndCategories => {
    const result = { posts: {}, comments: {}, categories: resultsAndCategories[1]}
    resultsAndCategories[0].forEach (({ post, comments }) => {
      const commentIds = comments.map(comment => comment.id)
      post.comments = commentIds
      result.posts[post.id] = post
      comments.forEach(comment => result.comments[comment.id] = comment)
    })
    return result
  })
}
