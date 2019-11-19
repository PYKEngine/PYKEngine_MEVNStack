import { http } from './HttpService'

export function createPost(post) {
  return http().post('/posts', post)
}

export function getAllPosts() {
  return http().get('/posts')
}

export function getPostById(id) {
  return http().get(`/posts/${id}`)
}

export function deletePost(id) {
  return http().delete(`/posts/${id}`)
}

export function likePost(id) {
  return http().put(`/posts/like/${id}`)
}

export function unlikePost(id) {
  return http().put(`/posts/unlike/${id}`)
}

export function commentPost(id, comment) {
  return http().post(`/posts/comment/${id}`, comment)
}

export function deleteCommentPost(id, comment_Id) {
  return http().delete(`/posts/comment/${id}/${comment_Id}`)
}
