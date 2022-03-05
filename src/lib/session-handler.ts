const TODO_SESSION_KEY = 'react-app-session-key';
const sessionHandler = {
  saveToken: (token: string) => {
    window.sessionStorage.setItem(TODO_SESSION_KEY, token);
  },
  getToken: () => {
    return window.sessionStorage.getItem(TODO_SESSION_KEY);
  },
  clearToken: () => window.sessionStorage.clear(),
};
export default sessionHandler;
