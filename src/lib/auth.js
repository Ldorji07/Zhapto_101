export function login(role) {
  localStorage.setItem('role', role)
  localStorage.setItem('isAuthed', 'true')
}

export function logout() {
  localStorage.removeItem('role')
  localStorage.removeItem('isAuthed')
}

export function getRole() {
  return localStorage.getItem('role')
}

export function isAuthed() {
  return localStorage.getItem('isAuthed') === 'true'
}
