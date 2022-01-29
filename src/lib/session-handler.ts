const TODO_SESSION_KEY = 'react-app-session-key'
export const sessionHandler = {
  saveToken: (token: string) => { 
    window.sessionStorage.setItem(TODO_SESSION_KEY, token)
  },
  getToken: () => {
    return window.sessionStorage.getItem(TODO_SESSION_KEY)
  },
  clearToken: () => window.sessionStorage.clear()
}