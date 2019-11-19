import { http } from './HttpService'

export function getUserProfile() {
  return http().get('/profile/me');
}

export function editUserProfile(profile) {
  return http().post('/profile', profile);
}

export function getAllUsers() {
  return http().get('/profile');
}

export function deleteProfile() {
  return http().delete('/profile');
}

export function getUserById(id) {
  return http().get(`/profile/user/${id}`);
}

export function editProfileExp(profileExp) {
  return http().put('/profile/experience', profileExp);
}

export function deleteProfileExp(id) {
  return http().delete(`/profile/experience//${id}`);
}

export function editProfileEdu(profileEdu) {
  return http().put('/profile/education', profileEdu);
}

export function deleteProfileEdu(id) {
  return http().delete(`/profile/education/${id}`);
}

export function deleteNetworkRequest(id) {
  return http().delete(`/profile/network//${id}`);
}

export function acceptNetworkRequest(id) {
  return http().put(`/profile/network//${id}`);
}

export function getGitProfile(gitUsername) {
  return http().get(`/profile/network//${gitUsername}`);
}