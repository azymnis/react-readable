const api = "http://localhost:3001"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
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
